// src/components/Services/index.jsx
import { MdSpa,  MdFaceUnlock } from 'react-icons/md'; // Usando Material Icons
import { BiWinkSmile } from "react-icons/bi";
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
      icon: <BiWinkSmile />,
      title: 'Depilação',
      description: 'Transforme seu visual '
    },
    {
      icon: <MdFaceUnlock />,
      title: 'Desginer de Sobrancelhas',
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