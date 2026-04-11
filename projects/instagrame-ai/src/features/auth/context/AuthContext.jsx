import { createContext, useContext, useState } from 'react';
import { currentUser as defaultUser } from '../../../shared/data/dummyUsers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const login = (username, password) => {
    // Dummy login
    setIsAuthenticated(true);
    setCurrentUser(defaultUser);
  };

  const register = (username, email, fullName, password) => {
    // Dummy register
    setIsAuthenticated(true);
    setCurrentUser({
      ...defaultUser,
      username,
      fullName,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
