// src/pages/Store/index.jsx
import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import { ProductDetailsModal } from '../../components/ProductDetails';
import {
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlineWarning
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
  CloseButton,
  ErrorState
} from './styles';

export const Store = () => {
  const { addToCart } = useCart();
  const { showSuccess, showError } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [categories, setCategories] = useState(['all']);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const productsRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsRef);

      if (!querySnapshot.empty) {
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Extrair e ordenar categorias únicas
        const uniqueCategories = [...new Set(productsData.map(product => product.category))].sort();
        setCategories(['all', ...uniqueCategories]);
        setProducts(productsData);
      } else {
        setProducts([]);
        showError('Nenhum produto encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Erro ao carregar produtos. Por favor, tente novamente.');
      showError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddToCart = useCallback((product, event) => {
    if (event) {
      event.stopPropagation();
    }
    try {
      addToCart(product);
      showSuccess('Produto adicionado ao carrinho!');
    } catch (error) {
      showError('Erro ao adicionar produto ao carrinho');
    }
  }, [addToCart, showSuccess, showError]);

  const filterProducts = useCallback(() => {
    return products.filter(product => {
      // Filtro de busca
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de categoria
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

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
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const filteredProducts = filterProducts();

  if (loading) {
    return <LoadingState>Carregando produtos...</LoadingState>;
  }

  if (error) {
    return (
      <ErrorState>
        <AiOutlineWarning />
        <p>{error}</p>
        <button onClick={loadProducts}>Tentar novamente</button>
      </ErrorState>
    );
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
            <ProductCard 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
            >
              <ProductImage>
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg'; // Imagem padrão
                    }}
                  />
                ) : (
                  <div className="no-image">Sem imagem</div>
                )}
              </ProductImage>
              <ProductInfo>
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ProductPrice>
                  {product.price?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </ProductPrice>
                <AddToCartButton
                  onClick={(e) => handleAddToCart(product, e)}
                >
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

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(e) => handleAddToCart(selectedProduct, e)}
        />
      )}
    </StoreContainer>
  );
};