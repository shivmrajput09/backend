 import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

// Imports
import UserContext, { dataContext } from './context/UserContext'; 
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function ProtectedRoute({ children }) {
  const { userData } = useContext(dataContext);
  if (!userData) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <UserContext>
      <Routes>
         {/* 🌟 यह लाइन जोड़नी है ताकि "/" एरर खत्म हो जाए 🌟 */}
         <Route path="/" element={<Navigate to="/home" />} />

         <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
         
         <Route 
           path="/home" 
           element={
             <ProtectedRoute>
               <Home />
             </ProtectedRoute>
           } 
         />
      </Routes>
    </UserContext>
  );
}

export default App;