import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppProvider";

export default function AuthCallback() {
  const {setUser} = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code"); // capturamos el code que envía Google
    
    if (code) {
      // Enviar el code al backend
      fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // para enviar cookies HTTPOnly
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Respuesta del backend:", data);

          // Redirigir a home o dashboard y setear el usuario de una vez.
          setUser(data.user);
          navigate("/");
        })
        .catch(err => console.error("Error en callback:", err));
    }
  }, [searchParams, navigate]);

  return <div>Autenticando con Google…</div>;
}
