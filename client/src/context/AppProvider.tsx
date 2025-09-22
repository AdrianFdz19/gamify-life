import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  google_id: string;
  refresh_token: string;
  level: number;
  xp: number;
  created_at: string;
}

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  isLoading: boolean;
  refreshToken: () => void;
}

// Creamos el contexto con un valor inicial vacío
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('No se pudo refrescar el token');

      const { user } = await res.json();
      setUser(user); // actualiza el contexto
      return user;
    } catch (err) {
      setUser(null);
      console.log('Refresh fallido', err);
      return null;
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      try {
        // 1️⃣ Intento inicial con JWT
        const res = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Usuario no autenticado");

        const { user } = await res.json();
        setUser(user);
        console.log("El usuario activo es: ", user);

      } catch (error) {
        console.log("JWT inválido o expirado, intentando refresh…");

        try {
          // 2️⃣ Intento de refresh usando refresh_token guardado en backend
          const refreshRes = await fetch("http://localhost:3000/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) throw new Error("Refresh fallido");

          const { user } = await refreshRes.json();
          setUser(user);
          console.log("Refresh exitoso, usuario actualizado: ", user);

        } catch (refreshError) {
          console.log("Refresh fallido, usuario no autenticado.");
          setUser(null);
        }

      } finally {
        setIsLoading(false); // ✅ siempre quitamos el loading
      }
    };

    authenticate();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 1️⃣ Borra el usuario del localStorage
  };

  const data = { user, setUser, logout, isLoading, refreshToken };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
