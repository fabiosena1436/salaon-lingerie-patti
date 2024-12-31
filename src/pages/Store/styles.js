// src/pages/Store/styles.js
import styled from 'styled-components';

export const StoreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2.5rem;
  }
`;

export const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
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

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const CategoryFilter = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
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

export const PriceFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  input {
    width: 100px;
    border: none;
    font-size: 1rem;
    outline: none;
    padding: 0.25rem;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .category {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .description {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    font-size: 1.2rem;
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
    opacity: 0.7;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.text};
`;