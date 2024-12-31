// src/components/Header/index.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Button } from '../Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Cart } from '../Cart';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavLinks,
  MobileIcon,
  ButtonContainer
} from './styles';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useNotification();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess('Logout realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      showError('Erro ao fazer logout. Tente novamente.');
    }
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">Salão & Lingerie</Link>
      </Logo>

      <MobileIcon onClick={toggleMenu}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </MobileIcon>

      <Nav $isOpen={isOpen}>
        <NavLinks>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/servicos">Serviços</Link></li>
          <li><Link to="/produtos">Lingerie</Link></li>
          <li><Link to="/store">Loja</Link></li>
          <li>
            <Link to={user ? "/client/new-appointment" : "/login"}>
              Agendar
            </Link>
          </li>
        </NavLinks>
        <ButtonContainer>
          <Cart />
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin">
                  <Button $variant="secondary">Painel Admin</Button>
                </Link>
              )}
              <Link to="/client">
                <Button $variant="secondary">Minha Área</Button>
              </Link>
              <Button $variant="secondary" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button $variant="secondary">Login</Button>
            </Link>
          )}
        </ButtonContainer>
      </Nav>
    </HeaderContainer>
  );
};