import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AppProvider from './context/AppProvider.tsx'
import GamifyProvider from './context/GamifyProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    <StrictMode>
      <AppProvider>
        <GamifyProvider>
          <App />
        </GamifyProvider>
      </AppProvider>
    </StrictMode>
  </Router>
)
