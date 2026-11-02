import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from './context/UserContext';

import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
       <UserContext>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext>
   );
}

export default App;