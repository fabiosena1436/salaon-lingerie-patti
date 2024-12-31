// src/pages/Client/NewAppointment/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext';
import { createNotification } from '../../../services/notifications';
import { 
  AiOutlineCalendar, 
  AiOutlineClockCircle,
  AiOutlineScissor
} from 'react-icons/ai';
import {
  Container,
  FormContainer,
  StepContainer,
  ServiceCard,
  DateTimeContainer,
  TimeGrid,
  TimeSlot,
  ConfirmationCard,
  Button,
  StepIndicator,
  IconWrapper
} from './styles';

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

export const NewAppointment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedDate) {
      checkAvailableTimeSlots();
    }
  }, [selectedDate]);

  const checkAvailableTimeSlots = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef,
        where('date', '==', selectedDate),
        where('status', 'in', ['pending', 'confirmed'])
      );
      const querySnapshot = await getDocs(q);
      
      const bookedSlots = querySnapshot.docs.map(doc => doc.data().time);
      const businessHours = generateTimeSlots();
      const available = businessHours.filter(time => !bookedSlots.includes(time));
      
      setAvailableTimeSlots(available);
    } catch (error) {
      console.error('Erro ao verificar horários disponíveis:', error);
      showError('Erro ao carregar horários disponíveis.');
    }
  };

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };

  const handleConfirm = async () => {
    if (!user) {
      showError('Você precisa estar logado para fazer um agendamento.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        userId: user.uid,
        clientName: user.name || user.email,
        clientEmail: user.email,
        service: selectedService.name,
        serviceDuration: selectedService.duration,
        servicePrice: selectedService.price,
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Criar o agendamento
      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);

      // Criar notificação para o usuário
      await createNotification(
        user.uid,
        'Agendamento Realizado',
        `Seu agendamento de ${selectedService.name} foi realizado com sucesso para ${formatDate(selectedDate)} às ${selectedTime}.`,
        'success'
      );

      // Criar notificação para o admin (você precisará definir o ID do admin)
      await createNotification(
        'admin-uid', // Substitua pelo ID real do admin
        'Novo Agendamento',
        `Novo agendamento de ${selectedService.name} para ${formatDate(selectedDate)} às ${selectedTime} por ${user.name || user.email}.`,
        'info'
      );

      showSuccess('Agendamento realizado com sucesso!');
      navigate('/client/appointments');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      showError('Erro ao criar agendamento. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <StepIndicator>
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <IconWrapper>
            <AiOutlineScissor />
          </IconWrapper>
          <span>Serviço</span>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <IconWrapper>
            <AiOutlineCalendar />
          </IconWrapper>
          <span>Data e Hora</span>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <IconWrapper>
            <AiOutlineClockCircle />
          </IconWrapper>
          <span>Confirmação</span>
        </div>
      </StepIndicator>

      <FormContainer>
        {currentStep === 1 && (
          <StepContainer>
            <h2>Escolha o Serviço</h2>
            <div className="services-grid">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  $selected={selectedService?.id === service.id}
                  onClick={() => handleServiceSelect(service)}
                >
                  <h3>{service.name}</h3>
                  <p>{service.duration} minutos</p>
                  <p className="price">
                    {service.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </ServiceCard>
              ))}
            </div>
          </StepContainer>
        )}

        {currentStep === 2 && (
          <StepContainer>
            <h2>Escolha a Data e Horário</h2>
            <DateTimeContainer>
              <div className="date-select">
                <label>Data</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {selectedDate && (
                <div className="time-select">
                  <label>Horário</label>
                  <TimeGrid>
                    {availableTimeSlots.map(time => (
                      <TimeSlot
                        key={time}
                        $selected={selectedTime === time}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </TimeSlot>
                    ))}
                  </TimeGrid>
                </div>
              )}
            </DateTimeContainer>
          </StepContainer>
        )}

        {currentStep === 3 && (
          <StepContainer>
            <h2>Confirme seu Agendamento</h2>
            <ConfirmationCard>
              <div className="info-item">
                <strong>Serviço:</strong>
                <span>{selectedService.name}</span>
              </div>
              <div className="info-item">
                <strong>Data:</strong>
                <span>{formatDate(selectedDate)}</span>
              </div>
              <div className="info-item">
                <strong>Horário:</strong>
                <span>{selectedTime}</span>
              </div>
              <div className="info-item">
                <strong>Valor:</strong>
                <span>
                  {selectedService.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>
            </ConfirmationCard>
          </StepContainer>
        )}

        <div className="buttons">
          {currentStep > 1 && (
            <Button 
              $variant="secondary"
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Voltar
            </Button>
          )}
          {currentStep === 3 ? (
            <Button 
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
            </Button>
          ) : null}
        </div>
      </FormContainer>
    </Container>
  );
};