import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/auth/Login'
import AuthCallback from './components/AuthCallback'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <div className="app">
        <Routes>

          <Route path='/login' element={<Login />} ></Route>
          <Route path="/auth/callback" element={<AuthCallback />} />

          <Route path='/' element={<ProtectedRoute />} >
            <Route index element={<Home />} ></Route>
          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App
