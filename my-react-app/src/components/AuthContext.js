import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from './firebase-config'; // Import the auth instance from firebase-config.js
import { onAuthStateChanged } from 'firebase/auth';

// Create a context to store the current user
const AuthContext = createContext();

// Custom hook to access the current user
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provide the AuthContext to the entire application
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
