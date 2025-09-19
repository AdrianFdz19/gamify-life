import React, { useEffect } from "react";

export default function SignUp() {

  /* const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  console.log(clientId, redirectUri); */
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    console.log(clientId, redirectUri);


    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/gmail.readonly"
    ].join(" ");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(
      scope
    )}&access_type=offline&prompt=consent`;

    // Redirige al usuario a Google para que acepte permisos
    window.location.href = authUrl;
  };

  // Verifica si ya hay sesión activa en el backend
  /* useEffect(() => {
    const authenticateMe = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/me', {
          method: 'GET',
          credentials: 'include' // ⚠️ enviar cookies HTTPOnly
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Usuario logueado:', result);
        }
      } catch (err) {
        console.error('Error verificando sesión:', err);
      }
    };

    authenticateMe();
  }, []); */

  return (
    <div className="signup">
      <h2>Inicia sesión con Google</h2>
      <button onClick={handleGoogleLogin}>
        Conectar con Google (OAuth 2.0)
      </button>
    </div>
  );
}
