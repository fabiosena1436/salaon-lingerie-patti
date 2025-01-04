// src/pages/Store/index.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, checkFirebaseConnection } from '../../services/firebase';

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('Iniciando carregamento de produtos');
        
        // Verifica conexão
        const isConnected = await checkFirebaseConnection();
        console.log('Status da conexão:', isConnected);

        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);
        
        console.log('Documentos encontrados:', querySnapshot.size);

        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log('Produtos carregados:', productsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        color: 'red', 
        textAlign: 'center', 
        padding: '20px' 
      }}>
        Erro ao carregar produtos: {error}
      </div>
    );
  }

  return (
    <div>
      <h1>Nossa Loja</h1>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado</p>
      ) : (
        <div>
          {products.map(product => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>R$ {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};