// src/contexts/AppointmentContext.jsx
import { createContext, useContext, useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useNotification } from './NotificationContext';

const AppointmentContext = createContext({});

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const createAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointmentData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      showSuccess('Agendamento criado com sucesso!');
      return docRef.id;
    } catch (error) {
      showError('Erro ao criar agendamento');
      throw new Error('Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  };

  const loadAppointments = async (filters = {}) => {
    try {
      setLoading(true);
      const appointmentsRef = collection(db, 'appointments');
      let queryConstraints = [];

      // Filtro por usuário
      if (filters.userId) {
        queryConstraints.push(where('userId', '==', filters.userId));
      }
      
      // Filtro por status
      if (filters.status && filters.status !== 'all') {
        queryConstraints.push(where('status', '==', filters.status));
      }

      // Filtro e ordenação por data
      if (filters.date) {
        // Se houver uma data específica, filtra por ela e ordena por hora
        queryConstraints.push(where('date', '==', filters.date));
        queryConstraints.push(orderBy('time', 'asc'));
      } else {
        // Se não houver data específica, ordena por data decrescente
        queryConstraints.push(orderBy('date', 'desc'));
      }

      // Se não houver nenhum filtro, adiciona ordenação padrão
      if (queryConstraints.length === 0) {
        queryConstraints.push(orderBy('createdAt', 'desc'));
      }

      const q = query(appointmentsRef, ...queryConstraints);
      const querySnapshot = await getDocs(q);
      
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      showError('Erro ao carregar agendamentos. Por favor, tente novamente.');
      
      // Se houver erro de índice, tenta carregar sem ordenação
      if (error.code === 'failed-precondition') {
        try {
          const simpleQuery = query(collection(db, 'appointments'));
          const snapshot = await getDocs(simpleQuery);
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAppointments(data);
        } catch (fallbackError) {
          console.error('Erro ao carregar agendamentos (fallback):', fallbackError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (appointmentId, data) => {
    try {
      setLoading(true);
      const appointmentRef = doc(db, 'appointments', appointmentId);
      
      await updateDoc(appointmentRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      
      showSuccess('Agendamento atualizado com sucesso!');
      
      // Recarrega os agendamentos após atualização
      await loadAppointments();
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      showError('Erro ao atualizar agendamento. Por favor, tente novamente.');
      throw new Error('Erro ao atualizar agendamento');
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      });
      showSuccess('Agendamento cancelado com sucesso!');
      await loadAppointments();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      showError('Erro ao cancelar agendamento. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentsByDate = async (date) => {
    try {
      const q = query(
        collection(db, 'appointments'),
        where('date', '==', date),
        where('status', 'in', ['pending', 'confirmed'])
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar agendamentos por data:', error);
      showError('Erro ao verificar horários disponíveis');
      return [];
    }
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      loading,
      createAppointment,
      loadAppointments,
      updateAppointment,
      deleteAppointment,
      getAppointmentsByDate
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments deve ser usado dentro de um AppointmentProvider');
  }
  return context;
};