// src/pages/Client/Dashboard/index.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  DashboardContainer,
  WelcomeCard,
  StatsGrid,
  StatCard,
  AppointmentsList,
  AppointmentCard,
  Button
} from './styles';

export const ClientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const loadAppointments = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef, 
        where('clientName', '==', user.name),
        where('status', '!=', 'cancelled')
      );
      const querySnapshot = await getDocs(q);
      
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getNextAppointment = () => {
    const now = new Date();
    return appointments
      .filter(app => new Date(`${app.date}T${app.time}`) > now)
      .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))[0];
  };

  const nextAppointment = getNextAppointment();

  return (
    <DashboardContainer>
      <WelcomeCard>
        <h1>Bem-vindo(a), {user?.name}!</h1>
        <p>Gerencie seus agendamentos e faça novos horários.</p>
      </WelcomeCard>

      <StatsGrid>
        <StatCard>
          <h3>Próximo Agendamento</h3>
          {nextAppointment ? (
            <>
              <p>{nextAppointment.service}</p>
              <p>{formatDate(nextAppointment.date)} às {nextAppointment.time}</p>
            </>
          ) : (
            <p>Nenhum agendamento próximo</p>
          )}
        </StatCard>

        <StatCard>
          <h3>Total de Agendamentos</h3>
          <p>{appointments.length}</p>
        </StatCard>
      </StatsGrid>

      <AppointmentsList>
        <div className="header">
          <h2>Agendamentos Recentes</h2>
          <Link to="/client/appointments">
            <Button>Ver Todos</Button>
          </Link>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : appointments.length > 0 ? (
          appointments.slice(0, 3).map(appointment => (
            <AppointmentCard key={appointment.id}>
              <div>
                <h3>{appointment.service}</h3>
                <p>{formatDate(appointment.date)} às {appointment.time}</p>
              </div>
              <span className={`status ${appointment.status}`}>
                {appointment.status === 'pending' && 'Pendente'}
                {appointment.status === 'confirmed' && 'Confirmado'}
                {appointment.status === 'cancelled' && 'Cancelado'}
              </span>
            </AppointmentCard>
          ))
        ) : (
          <p>Nenhum agendamento encontrado</p>
        )}

        <Link to="/client/new-appointment">
          <Button>Fazer Novo Agendamento</Button>
        </Link>
      </AppointmentsList>
    </DashboardContainer>
  );
};