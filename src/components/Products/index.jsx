// src/components/Products/index.jsx
import { MdShoppingCart } from 'react-icons/md';
import { Button } from '../Button';
import {
  ProductsContainer,
  ProductsTitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ViewAllButton
} from './styles';

export const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Conjunto Elegance',
      price: 129.90,
      image: 'https://via.placeholder.com/300x400' // Substituir por imagem real depois
    },
    {
      id: 2,
      name: 'Body Rendado',
      price: 89.90,
      image: 'https://via.placeholder.com/300x400'
    },
    {
      id: 3,
      name: 'Conjunto Romantic',
      price: 149.90,
      image: 'https://via.placeholder.com/300x400'
    },
    {
      id: 4,
      name: 'Camisola Seda',
      price: 99.90,
      image: 'https://via.placeholder.com/300x400'
    }
  ];

  return (
    <ProductsContainer>
      <ProductsTitle>Destaques da Loja</ProductsTitle>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </ProductPrice>
              <Button>
                <MdShoppingCart size={20} />
                Adicionar
              </Button>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
      <ViewAllButton>
        <Button variant="secondary">Ver Todos os Produtos</Button>
      </ViewAllButton>
    </ProductsContainer>
  );
};