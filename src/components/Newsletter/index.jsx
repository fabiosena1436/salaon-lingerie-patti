// src/components/Newsletter/index.jsx
import { useState } from 'react';
import { Button } from '../Button';
import {
  NewsletterContainer,
  NewsletterContent,
  NewsletterTitle,
  NewsletterText,
  NewsletterMessage
} from './styles';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ type: 'error', message: 'Por favor, digite seu e-mail' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus({ type: 'error', message: 'Por favor, digite um e-mail válido' });
      return;
    }

    try {
      // Aqui você pode adicionar a lógica para enviar o email para sua API
      setStatus({ type: 'success', message: 'E-mail cadastrado com sucesso!' });
      setEmail('');
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro ao cadastrar. Tente novamente.' });
    }
  };

  return (
    <NewsletterContainer>
      <NewsletterContent>
        <NewsletterTitle>Fique por dentro das novidades</NewsletterTitle>
        <NewsletterText>
          Aqui voce encontra ofertas exclusivas!
        </NewsletterText>
        {status.message && (
          <NewsletterMessage $type={status.type}>
            {status.message}
          </NewsletterMessage>
        )}
      </NewsletterContent>
    </NewsletterContainer>
  );
};