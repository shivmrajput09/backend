
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
