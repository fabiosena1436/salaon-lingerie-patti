// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Buscar role do usuário no Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData?.role || 'client');
            setUser({ ...user, role: userData?.role || 'client' });
          } else {
            setUserRole('client');
            setUser({ ...user, role: 'client' });
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          setUserRole('client');
          setUser({ ...user, role: 'client' });
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (userData) => {
    try {
      // Criar usuário no Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      try {
        // Verificar se é o primeiro usuário
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const isFirstUser = usersSnapshot.empty;

        // Salvar dados adicionais no Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          role: isFirstUser ? 'admin' : 'client',
          createdAt: new Date().toISOString()
        });

        return user;
      } catch (error) {
        console.error("Erro ao salvar dados do usuário:", error);
        // Se falhar ao salvar no Firestore, ainda retorna o usuário
        return user;
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData?.role || 'client');
          return { ...user, role: userData?.role || 'client' };
        }
        return user;
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return user;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error("Erro no logout:", error);
      throw error;
    }
  };

  const value = {
    user,
    userRole,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};