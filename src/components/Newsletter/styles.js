// src/components/Newsletter/styles.js
import styled from 'styled-components';

export const NewsletterContainer = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

export const NewsletterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

export const NewsletterTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const NewsletterText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

export const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }
`;