// src/pages/Checkout/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineCreditCard,
  AiOutlineCalendar,
  AiOutlineLock
} from 'react-icons/ai';
import {
  CheckoutContainer,
  CheckoutContent,
  OrderSummary,
  PaymentForm,
  FormSection,
  FormGroup,
  Label,
  Input,
  Select,
  OrderItems,
  OrderItem,
  ItemImage,
  ItemInfo,
  OrderTotal,
  SubmitButton,
  LoadingOverlay
} from './styles';

export const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: '1'
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cart.length === 0) {
    navigate('/store');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substr(0, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getCartTotal(),
        status: 'pending',
        paymentMethod: 'credit_card',
        paymentDetails: {
          lastFourDigits: paymentData.cardNumber.slice(-4),
          installments: Number(paymentData.installments)
        },
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      showSuccess('Pedido realizado com sucesso!');
      clearCart();
      navigate(`/orders/${docRef.id}`);
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      showError('Erro ao processar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const installmentOptions = [1, 2, 3, 4, 5, 6].map(number => ({
    value: number.toString(),
    label: number === 1 
      ? '1x sem juros' 
      : `${number}x de ${(getCartTotal() / number).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}`
  }));

  return (
    <CheckoutContainer>
      <CheckoutContent>
        <PaymentForm onSubmit={handleSubmit}>
          <FormSection>
            <h2>Dados de Entrega</h2>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                type="text"
                value={user.name}
                disabled
                icon={<AiOutlineUser />}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={user.email}
                disabled
                icon={<AiOutlineMail />}
              />
            </FormGroup>
            <FormGroup>
              <Label>Telefone</Label>
              <Input
                type="tel"
                value={user.phone}
                disabled
                icon={<AiOutlinePhone />}
              />
            </FormGroup>
            <FormGroup>
              <Label>Endereço de Entrega</Label>
              <Input
                type="text"
                value={user.address}
                disabled
                icon={<AiOutlineEnvironment />}
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <h2>Pagamento</h2>
            <FormGroup>
              <Label>Número do Cartão</Label>
              <Input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => handleChange({
                  target: {
                    name: 'cardNumber',
                    value: formatCardNumber(e.target.value)
                  }
                })}
                maxLength="19"
                placeholder="0000 0000 0000 0000"
                icon={<AiOutlineCreditCard />}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Nome no Cartão</Label>
              <Input
                type="text"
                name="cardName"
                value={paymentData.cardName}
                onChange={handleChange}
                placeholder="Como está no cartão"
                icon={<AiOutlineUser />}
                required
              />
            </FormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Validade</Label>
                <Input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleChange({
                    target: {
                      name: 'expiryDate',
                      value: formatExpiryDate(e.target.value)
                    }
                  })}
                  placeholder="MM/AA"
                  maxLength="5"
                  icon={<AiOutlineCalendar />}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>CVV</Label>
                <Input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="4"
                  icon={<AiOutlineLock />}
                  required
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label>Parcelas</Label>
              <Select
                name="installments"
                value={paymentData.installments}
                onChange={handleChange}
                required
              >
                {installmentOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormSection>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </SubmitButton>
        </PaymentForm>

        <OrderSummary>
          <h2>Resumo do Pedido</h2>
          <OrderItems>
            {cart.map(item => (
              <OrderItem key={item.id}>
                <ItemImage>
                  <img src={item.imageUrl} alt={item.name} />
                </ItemImage>
                <ItemInfo>
                  <h4>{item.name}</h4>
                  <p>Quantidade: {item.quantity}</p>
                  <p className="price">
                    {(item.price * item.quantity).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </ItemInfo>
              </OrderItem>
            ))}
          </OrderItems>
          <OrderTotal>
            <span>Total:</span>
            <strong>
              {getCartTotal().toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </strong>
          </OrderTotal>
        </OrderSummary>
      </CheckoutContent>

      {loading && <LoadingOverlay />}
    </CheckoutContainer>
  );
};