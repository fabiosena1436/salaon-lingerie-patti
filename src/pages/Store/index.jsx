// src/pages/Store/index.jsx
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import { 
  AiOutlineSearch, 
  AiOutlineFilter,
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineStar
} from 'react-icons/ai';
import {
  StoreContainer,
  Header,
  SearchSection,
  SearchBar,
  FiltersContainer,
  FilterGroup,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductPrice,
  AddToCartButton,
  EmptyState,
  LoadingState,
  SortSelect,
  PriceRangeFilter,
  CategoryFilter,
  FilterButton,
  MobileFilters,
  CloseButton
} from './styles';

export const Store = () => {
  const { addToCart } = useCart();
  const { showSuccess } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsRef);
      
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Extrair categorias únicas
      const uniqueCategories = [...new Set(productsData.map(product => product.category))];
      setCategories(['all', ...uniqueCategories]);
      
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess('Produto adicionado ao carrinho!');
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
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  };

  const filteredProducts = filterProducts();

  if (loading) {
    return <LoadingState>Carregando produtos...</LoadingState>;
  }

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

        <FilterButton onClick={() => setShowMobileFilters(true)}>
          <AiOutlineFilter />
          Filtros
        </FilterButton>
      </SearchSection>

      <FiltersContainer $showMobile={showMobileFilters}>
        <div className="filters-content">
          <CloseButton onClick={() => setShowMobileFilters(false)}>
            ×
          </CloseButton>

          <FilterGroup>
            <h3>Ordenar por</h3>
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nome</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </SortSelect>
          </FilterGroup>

          <FilterGroup>
            <h3>Categoria</h3>
            <CategoryFilter>
              {categories.map(category => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Todas' : category}
                </button>
              ))}
            </CategoryFilter>
          </FilterGroup>

          <FilterGroup>
            <h3>Faixa de Preço</h3>
            <PriceRangeFilter>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
              <span>até</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </PriceRangeFilter>
          </FilterGroup>
        </div>
      </FiltersContainer>

      {filteredProducts.length > 0 ? (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>
                <img src={product.imageUrl} alt={product.name} />
              </ProductImage>
              <ProductInfo>
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
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