// src/components/Client/Layout/index.jsx
import { Outlet, NavLink } from 'react-router-dom'; // Adicione NavLink aqui
import { 
  LayoutContainer, 
  MainContent,
  ClientNav
} from './styles';

export const ClientLayout = () => {
  return (
    <LayoutContainer>
      <ClientNav>
        <NavLink 
          to="/client" 
          className={({ isActive }) => isActive ? 'active' : ''}
          end
        >
          Meu Painel
        </NavLink>
        <NavLink 
          to="/client/appointments"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Meus Agendamentos
        </NavLink>
        <NavLink 
          to="/client/orders"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Meus Pedidos
        </NavLink>
        <NavLink 
          to="/client/profile"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Meu Perfil
        </NavLink>
      </ClientNav>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};