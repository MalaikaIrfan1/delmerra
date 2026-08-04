'use client';
import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [adminKey, setAdminKey] = useState('');
  const isLoggedIn = !!adminKey;

  return (
    <AdminContext.Provider value={{ adminKey, setAdminKey, isLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);