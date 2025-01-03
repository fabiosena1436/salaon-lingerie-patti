// src/pages/Admin/Dashboard/styles.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 2rem;
`;

export const DashboardTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const StatIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

export const RecentSection = styled.section`
  margin-top: 2rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const AppointmentsList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const AppointmentCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .client-info {
    h3 {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.7;
    }
  }

  .appointment-info {
    text-align: right;

    p {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.5rem;
    }
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success + '20';
      case 'cancelled':
        return theme.colors.error + '20';
      default:
        return theme.colors.warning + '20';
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.warning;
    }
  }};
`;