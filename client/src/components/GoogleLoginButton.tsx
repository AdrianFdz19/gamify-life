import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const handleSuccess = async (credentialResponse: any) => {
    console.log(credentialResponse);
    // Aquí sí viene: credentialResponse.credential -> el id_token JWT
    const idToken = credentialResponse.credential;

    // Enviar al backend
    const response = await fetch('http://localhost:3000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: idToken })
    });
    const data = await response.json();
    console.log('JWT interno:', data.token);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Login Failed')}
    />
  );
}


export default Login;