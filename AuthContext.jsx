import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fp_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role) => {
    const userData = {
      id: role === 'admin' ? 'adm01' : 'st101',
      name: role === 'admin' ? 'System Administrator' : 'Palyam Sharan',
      rollNo: role === 'student' ? '2026-CSE-042' : null,
      role: role
    };
    setUser(userData);
    localStorage.setItem('fp_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fp_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);