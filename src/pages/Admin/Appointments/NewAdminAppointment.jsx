// src/pages/Admin/Appointments/NewAdminAppointment.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAppointments } from '../../../contexts/AppointmentContext';
import { useNotification } from '../../../contexts/NotificationContext';
import { 
  AiOutlineCalendar, 
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineMail
} from 'react-icons/ai';
import {
  Container,
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  TimeGrid,
  TimeSlot,
  BookedSlot,
  ClientSearch,
  ClientList,
  ClientCard
} from './NewAdminAppointment.styles';

const searchClients = async (term) => {
  if (term.length < 3) {
    setSearchResults([]);
    return;
  }

  try {
    const usersRef = collection(db, 'users');
    // Primeiro, buscamos todos os clientes
    const clientsQuery = query(
      usersRef,
      where('role', '==', 'client')
    );
    
    const querySnapshot = await getDocs(clientsQuery);
    
    // Depois filtramos localmente pelo nome
    const clients = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(client => 
        client.name?.toLowerCase().includes(term.toLowerCase()) ||
        client.email?.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 5); // Limitamos a 5 resultados para melhor performance
    
    setSearchResults(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    showError('Erro ao buscar clientes. Por favor, tente novamente.');
  }
};

const services = [
  {
    id: 'manicure',
    name: 'Manicure',
    duration: '60',
    price: 50.00
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    duration: '60',
    price: 60.00
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure + Pedicure',
    duration: '120',
    price: 100.00
  },
  {
    id: 'design-sobrancelhas',
    name: 'Design de Sobrancelhas',
    duration: '30',
    price: 40.00
  }
];

export const NewAdminAppointment = () => {
  const navigate = useNavigate();
  const { createAppointment } = useAppointments();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    date: '',
    time: '',
    userId: ''
  });
  
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gerar horários disponíveis (8h às 18h, intervalos de 30min)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute of ['00', '30']) {
        if (!(hour === 18 && minute === '30')) {
          slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
        }
      }
    }
    return slots;
  };

  // Carregar horários ocupados para a data selecionada
  const loadBookedSlots = async (date) => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef,
        where('date', '==', date),
        where('status', 'in', ['pending', 'confirmed'])
      );
      
      const querySnapshot = await getDocs(q);
      const booked = querySnapshot.docs.map(doc => ({
        time: doc.data().time,
        status: doc.data().status,
        clientName: doc.data().clientName,
        service: doc.data().service
      }));
      
      setBookedSlots(booked);
      
      // Atualizar horários disponíveis
      const allSlots = generateTimeSlots();
      const available = allSlots.filter(
        time => !booked.some(slot => slot.time === time)
      );
      setAvailableTimeSlots(available);
    } catch (error) {
      console.error('Erro ao carregar horários ocupados:', error);
      showError('Erro ao verificar horários disponíveis');
    }
  };

  // Buscar clientes
  const searchClients = async (term) => {
    if (term.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('role', '==', 'client'),
        where('name', '>=', term),
        where('name', '<=', term + '\uf8ff')
      );
      
      const querySnapshot = await getDocs(q);
      const clients = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setSearchResults(clients);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    if (formData.date) {
      loadBookedSlots(formData.date);
    }
  }, [formData.date]);

  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        searchClients(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleClientSelect = (client) => {
    setFormData(prev => ({
      ...prev,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
      userId: client.id
    }));
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userId) {
      showError('Por favor, selecione um cliente');
      return;
    }

    try {
      setLoading(true);
      await createAppointment({
        ...formData,
        status: 'confirmed', // Agendamentos criados pelo admin já são confirmados
        createdBy: 'admin'
      });
      
      showSuccess('Agendamento criado com sucesso!');
      navigate('/admin/appointments');
    } catch (error) {
      showError('Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Novo Agendamento</h1>
      
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <AiOutlineUser />
            Buscar Cliente
          </Label>
          <ClientSearch>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do cliente..."
            />
            {searchResults.length > 0 && (
              <ClientList>
                {searchResults.map(client => (
                  <ClientCard
                    key={client.id}
                    onClick={() => handleClientSelect(client)}
                  >
                    <h4>{client.name}</h4>
                    <p>{client.email}</p>
                    <p>{client.phone}</p>
                  </ClientCard>
                ))}
              </ClientList>
            )}
          </ClientSearch>
        </FormGroup>

        {formData.clientName && (
          <>
            <FormGroup>
              <Label>Serviço</Label>
              <Select
                value={formData.service}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  service: e.target.value
                }))}
                required
              >
                <option value="">Selecione um serviço</option>
                {services.map(service => (
                  <option key={service.id} value={service.name}>
                    {service.name} - {service.duration}min - R${service.price}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>
                <AiOutlineCalendar />
                Data
              </Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: e.target.value,
                  time: '' // Resetar horário ao mudar a data
                }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </FormGroup>

            {formData.date && (
              <FormGroup>
                <Label>
                  <AiOutlineClockCircle />
                  Horário
                </Label>
                <TimeGrid>
                  {generateTimeSlots().map(time => {
                    const isBooked = bookedSlots.find(slot => slot.time === time);
                    if (isBooked) {
                      return (
                        <BookedSlot key={time} title={`${isBooked.clientName} - ${isBooked.service}`}>
                          {time}
                        </BookedSlot>
                      );
                    }
                    return (
                      <TimeSlot
                        key={time}
                        $selected={formData.time === time}
                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                      >
                        {time}
                      </TimeSlot>
                    );
                  })}
                </TimeGrid>
              </FormGroup>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? 'Criando agendamento...' : 'Criar Agendamento'}
            </Button>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

export default NewAdminAppointment;