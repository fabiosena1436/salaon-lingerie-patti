// src/pages/Store/index.jsx
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNotification } from '../../contexts/NotificationContext';
import { useCart } from '../../contexts/CartContext';
import { 
  AiOutlineSearch, 
  AiOutlineFilter,
  AiOutlineShoppingCart
} from 'react-icons/ai';
import {
  StoreContainer,
  Header,
  SearchSection,
  SearchBar,
  FilterSection,
  CategoryFilter,
  PriceFilter,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductPrice,
  AddToCartButton,
  EmptyState,
  LoadingState
} from './styles';

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { showError } = useNotification();
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  
  const loadProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('stock', '>', 0));
      const querySnapshot = await getDocs(q);
      
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      showError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const getCategories = () => {
    const categories = new Set(products.map(product => product.category));
    return ['all', ...Array.from(categories)];
  };

  const filterProducts = () => {
    return products.filter(product => {
      // Filtro de busca
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de categoria
      const matchesCategory = 
        selectedCategory === 'all' || product.category === selectedCategory;

      // Filtro de preço
      const matchesPrice = 
        (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max));

      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Implementar adição ao carrinho depois
    console.log('Adicionar ao carrinho:', product);
  };

  if (loading) {
    return <LoadingState>Carregando produtos...</LoadingState>;
  }

  const filteredProducts = filterProducts();

  return (
    <StoreContainer>
      <Header>
        <h1>Nossa Loja</h1>
      </Header>

      <SearchSection>
        <SearchBar>
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchSection>

      <FilterSection>
        <CategoryFilter>
          <AiOutlineFilter />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas as Categorias</option>
            {getCategories()
              .filter(cat => cat !== 'all')
              .map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </CategoryFilter>

        <PriceFilter>
          <input
            type="number"
            placeholder="Preço mín"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
          />
          <span>até</span>
          <input
            type="number"
            placeholder="Preço máx"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
          />
        </PriceFilter>
      </FilterSection>

      {filteredProducts.length > 0 ? (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>
                <img src={product.imageUrl} alt={product.name} />
              </ProductImage>
              <ProductInfo>
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="description">{product.description}</p>
                <ProductPrice>
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </ProductPrice>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  <AiOutlineShoppingCart />
                  Adicionar ao Carrinho
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      ) : (
        <EmptyState>
          <p>Nenhum produto encontrado</p>
        </EmptyState>
      )}
    </StoreContainer>
  );
};