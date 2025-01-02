// src/components/Footer/index.jsx
import { Link } from 'react-router-dom';
import { 
  AiOutlinePhone, 
  AiOutlineMail, 
  AiOutlineEnvironment,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineWhatsApp 
} from 'react-icons/ai';

import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterList,
  FooterListItem,
  FooterContact,
  SocialLinks,
  SocialIcon,
  FooterBottom,
  FooterRights
} from './styles';

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Sobre Nós</FooterTitle>
          <p>
            Oferecemos os melhores serviços de beleza e uma seleção exclusiva de lingerie
            para realçar sua beleza e autoestima.
          </p>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <FooterList>
            <FooterListItem>
              <Link to="/servicos">Serviços</Link>
            </FooterListItem>
            <FooterListItem>
              <Link to="/store">Produtos</Link>
            </FooterListItem>
            <FooterListItem>
              <Link to="/client/new-appointment">Agendamento</Link>
            </FooterListItem>
           
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <FooterContact>
            <FooterListItem>
              <AiOutlinePhone /> (11) 99999-9999
            </FooterListItem>
            <FooterListItem>
              <AiOutlineMail /> contato@salaoelingerie.com
            </FooterListItem>
            <FooterListItem>
              <AiOutlineEnvironment /> Rua Example, 123 - São Paulo
            </FooterListItem>
          </FooterContact>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Redes Sociais</FooterTitle>
          <SocialLinks>
            <SocialIcon>
              <AiFillFacebook size={24} />
            </SocialIcon>
            <SocialIcon>
              <AiFillInstagram size={24} />
            </SocialIcon>
            <SocialIcon>
              <AiOutlineWhatsApp size={24} />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterRights>
          © 2024 Salão & Lingerie. Todos os direitos reservados, feito com dedicação por Fabio Sena.
        </FooterRights>
      </FooterBottom>
    </FooterContainer>
  );
};