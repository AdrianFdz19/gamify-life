import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <Router>
    <StrictMode>
      <GoogleOAuthProvider clientId='300573040955-fgjavhe8jkdvkq5ptp8eb9d99h5nbrej.apps.googleusercontent.com' >
        <App />
      </GoogleOAuthProvider>
    </StrictMode>
  </Router>
)
