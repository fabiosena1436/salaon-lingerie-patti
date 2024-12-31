// src/pages/Admin/Products/styles.js
import styled from 'styled-components';

export const ProductsContainer = styled.div`
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  svg {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    margin-right: 0.5rem;
  }
`;

export const SearchInput = styled.input`
  border: none;
  flex: 1;
  font-size: 1rem;
  outline: none;
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f9f9f9;
    font-weight: 600;
  }

  img {
    border-radius: 4px;
    object-fit: cover;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &.delete {
    color: ${({ theme }) => theme.colors.error};
  }

  & + button {
    margin-left: 0.5rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: ${({ theme }) => theme.colors.text};
`;