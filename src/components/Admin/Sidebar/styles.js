// src/components/Admin/Sidebar/styles.js
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.aside`
  width: 250px;
  background: white;
  height: 100vh;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
    z-index: 1000;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

export const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

export const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s;
  background: ${({ $active }) => $active ? 'rgba(255, 105, 180, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 105, 180, 0.1);
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }
`;

export const UserInfo = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem; // Reduzindo o tamanho da fonte
  flex-wrap: wrap; // Permite quebra de linha
  margin-top: auto; // Empurra para o final do sidebar

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    white-space: nowrap; // Evita quebra no meio do email
    overflow: hidden;
    text-overflow: ellipsis; // Adiciona ... quando o texto é muito longo
    max-width: 150px; // Limita a largura do email
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.9rem; // Reduzindo o tamanho da fonte
  width: 100%; // Ocupa toda a largura
  justify-content: center; // Centraliza o conteúdo
  margin-top: 0.5rem; // Adiciona espaço acima do botão

  &:hover {
    opacity: 0.8;
    background: rgba(255, 0, 0, 0.1); // Adiciona um fundo sutil no hover
  }

  svg {
    font-size: 1.1rem; // Ajusta o tamanho do ícone
  }
`;

export const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;