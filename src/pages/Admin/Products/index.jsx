// src/pages/Admin/Products/index.jsx
import { useState, useEffect } from 'react';
import { 
  AiOutlinePlus, 
  AiOutlineEdit, 
  AiOutlineDelete,
  AiOutlineSearch 
} from 'react-icons/ai';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { Button } from '../../../components/Button';
import { ProductForm } from './ProductForm';
import {
  ProductsContainer,
  Header,
  SearchBar,
  SearchInput,
  TableContainer,
  Table,
  ActionButton,
  EmptyState
} from './styles';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        await loadProducts(); // Recarrega a lista
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProductsContainer>
      <Header>
        <h1>Produtos</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <AiOutlinePlus /> Novo Produto
        </Button>
      </Header>

      <SearchBar>
        <AiOutlineSearch />
        <SearchInput
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBar>

      {loading ? (
        <p>Carregando...</p>
      ) : filteredProducts.length > 0 ? (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      width="50" 
                      height="50"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    <ActionButton onClick={() => handleEdit(product)}>
                      <AiOutlineEdit />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => handleDelete(product.id)}
                      className="delete"
                    >
                      <AiOutlineDelete />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState>
          <p>Nenhum produto encontrado</p>
        </EmptyState>
      )}

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedProduct(null);
          }}
          onSave={() => {
            loadProducts();
            setIsFormOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </ProductsContainer>
  );
};