import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/Home' // Naya Home page jo aap banaoge
import { useContext } from 'react'
import { dataContext } from './context/userContext' // Apna Context import karna

function App() {
  // Context se userData nikalna check karne ke liye ki user logged-in hai ya nahi
  const { userData } = useContext(dataContext);

  return (
    <Routes>
      {/* Protected Route: Agar user ka data hai (logged in) toh Home dikhao, warna Login pe bhej do */}
      <Route 
        path="/" 
        element={userData ? <Home /> : <Navigate to="/login" />} 
      />
      
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App