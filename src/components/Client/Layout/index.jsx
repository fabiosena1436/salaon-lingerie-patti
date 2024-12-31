// src/components/Client/Layout/index.jsx
import { Outlet } from 'react-router-dom';
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import { 
  LayoutContainer, 
  MainContent,
  ClientNav,
  NavLink 
} from './styles';

export const ClientLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <ClientNav>
        <NavLink to="/client">Meu Painel</NavLink>
        <NavLink to="/client/appointments">Meus Agendamentos</NavLink>
        <NavLink to="/client/new-appointment">Agendar Horário</NavLink>
        <NavLink to="/client/profile">Meu Perfil</NavLink>
      </ClientNav>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};