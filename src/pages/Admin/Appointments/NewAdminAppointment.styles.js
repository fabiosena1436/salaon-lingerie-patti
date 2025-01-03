// src/pages/Admin/Appointments/NewAdminAppointment.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FormContainer = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
`;

export const TimeSlot = styled.button`
  padding: 0.75rem;
  border: 1px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#ddd'};
  border-radius: 4px;
  background: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : 'white'};
  color: ${({ $selected }) => $selected ? 'white' : 'inherit'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const BookedSlot = styled(TimeSlot)`
  background: #f5f5f5;
  border-color: #ddd;
  cursor: not-allowed;
  opacity: 0.7;

  &:hover {
    transform: none;
  }
`;

export const ClientSearch = styled.div`
  position: relative;
`;

export const ClientList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

export const ClientCard = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }

  h4 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }

  & + & {
    border-top: 1px solid #eee;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;