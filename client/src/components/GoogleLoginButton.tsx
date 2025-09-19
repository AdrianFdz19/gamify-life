import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

function GoogleLoginButton() {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse);
            // Handle successful login, e.g., send token to backend for verification
        },
        onError: error => console.log('Login Failed:', error)
    });

    return (
        <button onClick={() => login()}>
            Sign in with Google
        </button>
    );
}

export default GoogleLoginButton;