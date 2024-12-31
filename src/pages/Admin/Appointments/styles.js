// src/pages/Admin/Appointments/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
`;

export const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const SearchBar = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  svg {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    margin-right: 0.5rem;
  }

  input {
    flex: 1;
    border: none;
    font-size: 1rem;
    outline: none;
  }
`;

export const DateFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  svg {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
  }

  input {
    border: none;
    font-size: 1rem;
    outline: none;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
  padding-bottom: 1px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 1rem;
  color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.text};
  border-bottom: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AppointmentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const AppointmentInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .client-info {
    h3 {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.8;
    }
  }

  .service-info {
    h4 {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.8;
    }

    .price {
      margin-top: 0.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: ${({ color }) => color};
  color: white;
  font-size: 0.875rem;
  text-align: center;
`;

export const AppointmentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background: ${theme.colors.success};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
      case 'text':
        return `
          background: none;
          color: ${theme.colors.primary};
          padding: 0;
          &:hover {
            text-decoration: underline;
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.text};
`;