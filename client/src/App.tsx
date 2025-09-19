import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/auth/Login'
import AuthCallback from './components/AuthCallback'

function App() {

  return (
    <>
      <div className="app">
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path="/auth/callback" element={<AuthCallback />} /> 
        </Routes>
      </div>
    </>
  )
}

export default App
