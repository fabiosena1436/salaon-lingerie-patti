// src/components/Newsletter/index.jsx
import { Button } from '../Button';
import {
  NewsletterContainer,
  NewsletterContent,
  NewsletterTitle,
  NewsletterText,
  NewsletterForm,
  NewsletterInput
} from './styles';

export const Newsletter = () => {
  return (
    <NewsletterContainer>
      <NewsletterContent>
        <NewsletterTitle>Fique por dentro das novidades</NewsletterTitle>
        <NewsletterText>
          Cadastre-se para receber ofertas exclusivas e novidades!
        </NewsletterText>
        <NewsletterForm>
          <NewsletterInput 
            type="email" 
            placeholder="Digite seu melhor e-mail" 
          />
          <Button>Cadastrar</Button>
        </NewsletterForm>
      </NewsletterContent>
    </NewsletterContainer>
  );
};