// src/components/Client/Layout/styles.js
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const ClientNav = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: ${({ theme }) => theme.colors.primary}20;
      color: ${({ theme }) => theme.colors.primary};
    }

    &.active {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
    gap: 0.5rem;

    a {
      padding: 0.5rem;
      font-size: 0.9rem;
    }
  }
`;