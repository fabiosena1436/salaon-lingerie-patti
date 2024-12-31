// src/pages/Client/NewAppointment/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 2rem;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.5;
    transition: all 0.3s;

    &.active {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
    
    span {
      font-size: 0.8rem;
    }
  }
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  svg {
    font-size: 1.2rem;
  }
`;

export const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 2rem;

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const StepContainer = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 2rem;
    text-align: center;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
`;

export const ServiceCard = styled.div`
  padding: 1.5rem;
  border: 2px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#eee'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
  }

  .price {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DateTimeContainer = styled.div`
  .date-select {
    margin-bottom: 2rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.text};
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  .time-select {
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
`;

export const TimeSlot = styled.button`
  padding: 0.5rem;
  border: 1px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#ddd'};
  border-radius: 4px;
  background: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : 'white'};
  color: ${({ $selected }) => $selected ? 'white' : 'inherit'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ConfirmationCard = styled.div`
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;

  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    strong {
      color: ${({ theme }) => theme.colors.text};
    }

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  ${({ $variant, theme }) =>
    $variant === 'secondary'
      ? `
        background: white;
        border: 1px solid ${theme.colors.primary};
        color: ${theme.colors.primary};
      `
      : `
        background: ${theme.colors.primary};
        color: white;
      `}

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;