// src/components/Banner/index.jsx
import { Button } from '../Button';
import { 
  BannerContainer, 
  BannerContent, 
  BannerTitle, 
  BannerText,
  BannerButtons 
} from './styles';




export const Banner = () => {

  const handleViewAllProducts = () => {
    window.location.href = '/store';
   }

   const handleViewAllAgendaments = () => {
    window.location.href = '/client/new-appointment';
   }


  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle>Beleza & Elegância</BannerTitle>
        <BannerText>
          Transforme seu visual e realce sua beleza com nossos serviços 
          exclusivos e nossa coleção de lingerie.
        </BannerText>
        <BannerButtons>
          <Button  onClick={handleViewAllAgendaments}>Agendar Horário</Button>
          <Button variant="secondary" onClick={handleViewAllProducts}>Ver Produtos</Button>
        </BannerButtons>
      </BannerContent>
    </BannerContainer>
  );
};