import React, { useEffect } from "react";

export default function SignUp() {
/*  */
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

  return (
    <div className="signup">
      <h2>Inicia sesión con Google</h2>
      <button onClick={handleGoogleLogin}>
        Conectar con Google (OAuth 2.0)
      </button>
    </div>
  );
}
