// src/pages/Admin/Products/styles.js
import styled from 'styled-components';

export const Container = styled.div`
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

export const SearchSection = styled.div`
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

export const FilterDropdown = styled.div`
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

  select {
    border: none;
    font-size: 1rem;
    outline: none;
    background: transparent;
    cursor: pointer;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  padding: 1rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  .category {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .stock {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
  }
`;

export const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #eee;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ConfirmDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;

    h3 {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 1rem;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
`;