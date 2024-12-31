// src/components/Admin/Dashboard/index.jsx
import { 
    AiOutlineShoppingCart, 
    AiOutlineCalendar, 
    AiOutlineUser, 
    AiOutlineDollar 
  } from 'react-icons/ai';
  import {
    DashboardContainer,
    DashboardTitle,
    StatsGrid,
    StatCard,
    StatIcon,
    StatValue,
    StatLabel
  } from './styles';
  
  const stats = [
    {
      icon: <AiOutlineShoppingCart />,
      value: '150',
      label: 'Produtos'
    },
    {
      icon: <AiOutlineCalendar />,
      value: '45',
      label: 'Agendamentos'
    },
    {
      icon: <AiOutlineUser />,
      value: '289',
      label: 'Clientes'
    },
    {
      icon: <AiOutlineDollar />,
      value: 'R$ 15.890',
      label: 'Vendas'
    }
  ];
  
  export const Dashboard = () => {
    return (
      <DashboardContainer>
        <DashboardTitle>Dashboard</DashboardTitle>
        
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatIcon>{stat.icon}</StatIcon>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </DashboardContainer>
    );
  };