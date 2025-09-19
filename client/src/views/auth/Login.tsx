import React from 'react'
import GoogleLoginButton from '../../components/GoogleLoginButton'

export default function Login() {
  return (
    <div className="login">
        <div className="login__box">
            <h1>Inicia sesion</h1>
            <GoogleLoginButton />
        </div>
    </div>
  )
}
