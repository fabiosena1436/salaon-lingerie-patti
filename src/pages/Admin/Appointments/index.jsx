// src/pages/Admin/Appointments/index.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppointments } from '../../../contexts/AppointmentContext';
import { useNotification } from '../../../contexts/NotificationContext';
import { 
  AiOutlineCheck, 
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineCalendar,
  AiOutlinePlus 
} from 'react-icons/ai';
import {
  Container,
  Header,
  FilterSection,
  SearchBar,
  FilterTabs,
  TabButton,
  AppointmentsList,
  AppointmentCard,
  AppointmentInfo,
  AppointmentActions,
  StatusBadge,
  Button,
  DateFilter,
  EmptyState,
  LoadingState
} from './styles';

export const Appointments = () => {
  const { appointments, loading, loadAppointments, updateAppointment } = useAppointments();
  const { showSuccess, showError } = useNotification();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await updateAppointment(appointmentId, { status: newStatus });
      showSuccess(`Status atualizado com sucesso!`);
      await loadAppointments();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      showError('Erro ao atualizar status do agendamento');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f0ad4e',
      confirmed: '#5cb85c',
      cancelled: '#d9534f'
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      cancelled: 'Cancelado'
    };
    return statusTexts[status] || 'Pendente';
  };

  const filteredAppointments = appointments.filter(appointment => {
    // Filtro por status
    if (activeTab !== 'all' && appointment.status !== activeTab) {
      return false;
    }

    // Filtro por data
    if (selectedDate && appointment.date !== selectedDate) {
      return false;
    }

    // Filtro por busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = appointment.clientName?.toLowerCase().includes(searchLower);
      const emailMatch = appointment.clientEmail?.toLowerCase().includes(searchLower);
      const serviceMatch = appointment.service?.toLowerCase().includes(searchLower);
      
      return nameMatch || emailMatch || serviceMatch;
    }

    return true;
  });

  // Ordenar por data e hora
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB - dateA; // Ordem decrescente
  });

  if (loading) {
    return <LoadingState>Carregando agendamentos...</LoadingState>;
  }

  return (
    <Container>
      <Header>
        <div>
          <h1>Gerenciar Agendamentos</h1>
          <p>{sortedAppointments.length} agendamentos encontrados</p>
        </div>
        <div>
          <Link to="/admin/appointments/new">
            <Button>
              <AiOutlinePlus />
              Novo Agendamento
            </Button>
          </Link>
        </div>
      </Header>

      <FilterSection>
        <SearchBar>
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Buscar por cliente ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <DateFilter>
          <AiOutlineCalendar />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <Button 
              $variant="text" 
              onClick={() => setSelectedDate('')}
            >
              Limpar
            </Button>
          )}
        </DateFilter>
      </FilterSection>

      <FilterTabs>
        <TabButton 
          $active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          Todos
        </TabButton>
        <TabButton 
          $active={activeTab === 'pending'} 
          onClick={() => setActiveTab('pending')}
        >
          Pendentes
        </TabButton>
        <TabButton 
          $active={activeTab === 'confirmed'} 
          onClick={() => setActiveTab('confirmed')}
        >
          Confirmados
        </TabButton>
        <TabButton 
          $active={activeTab === 'cancelled'} 
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelados
        </TabButton>
      </FilterTabs>

      <AppointmentsList>
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map(appointment => (
            <AppointmentCard key={appointment.id}>
              <AppointmentInfo>
                <div className="client-info">
                  <h3>{appointment.clientName}</h3>
                  <p>{appointment.clientEmail}</p>
                </div>
                <div className="service-info">
                  <h4>{appointment.service}</h4>
                  <p>
                    {formatDate(appointment.date)} às {appointment.time}
                  </p>
                  <p className="price">
                    {appointment.servicePrice?.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </div>
                <StatusBadge color={getStatusColor(appointment.status)}>
                  {getStatusText(appointment.status)}
                </StatusBadge>
              </AppointmentInfo>

              {appointment.status === 'pending' && (
                <AppointmentActions>
                  <Button 
                    $variant="success"
                    onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                  >
                    <AiOutlineCheck />
                    Confirmar
                  </Button>
                  <Button 
                    $variant="danger"
                    onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                  >
                    <AiOutlineClose />
                    Cancelar
                  </Button>
                </AppointmentActions>
              )}
            </AppointmentCard>
          ))
        ) : (
          <EmptyState>
            <p>Nenhum agendamento encontrado</p>
          </EmptyState>
        )}
      </AppointmentsList>
    </Container>
  );
};