// src/components/Services/index.jsx
import { MdSpa, MdContentCut, MdFace } from 'react-icons/md'; // Usando Material Icons
import {
  ServicesContainer,
  ServicesTitle,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription
} from './styles';

export const Services = () => {
  const services = [
    {
      icon: <MdSpa />,
      title: 'Manicure & Pedicure',
      description: 'Cuidados completos para suas unhas com os melhores produtos.'
    },
    {
      icon: <MdContentCut />,
      title: 'Corte & Penteado',
      description: 'Transforme seu visual com nossos especialistas.'
    },
    {
      icon: <MdFace />,
      title: 'Tratamentos',
      description: 'Tratamentos especiais para sua beleza.'
    }
  ];

  return (
    <ServicesContainer>
      <ServicesTitle>Nossos Serviços</ServicesTitle>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};