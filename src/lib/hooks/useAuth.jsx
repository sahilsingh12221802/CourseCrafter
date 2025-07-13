import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // You might want to validate the token here
      setCurrentUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiLogin(email, password);
      
      if (!data?.token) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('authToken', data.token);
      setCurrentUser({
        email: data.email,
        name: data.name,
        token: data.token
      });
      
      return data;
    } catch (err) {
      localStorage.removeItem('authToken');
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoading, 
      error,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);