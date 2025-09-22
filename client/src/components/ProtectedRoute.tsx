// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppProvider";

export default function ProtectedRoute() {
  const { user, isLoading } = useAppContext();

  if (isLoading) return <p>Cargando…</p>;
  return user ? <Outlet /> : <Navigate to="/login" />;
}
