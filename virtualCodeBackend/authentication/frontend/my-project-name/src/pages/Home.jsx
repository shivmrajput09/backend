import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../context/UserContext';

function Home() {
  // 1. Import और स्पेलिंग ठीक की (setUserData)
  let { userData, setUserData, serverUrl } = useContext(dataContext);
  const navigate = useNavigate();

  // 2. लॉगआउट करने का फंक्शन
  const handleLogout = async () => {
    try {
      // Backend की Logout API कॉल करें (अगर बनी है तो)
      // await axios.get(`${serverUrl}/api/logout`, { withCredentials: true });
      
      setUserData(null); // Context से यूज़र डेटा हटा दें
      navigate('/login'); // वापस लॉगिन पेज पर भेज दें
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black p-6">
      
      {/* 3. यूज़र का असली नाम दिखाएं (अगर userData में name है) */}
      <h1 className="text-4xl font-bold text-white text-center">
        Welcome Home, <span className="text-blue-500">{userData?.name || 'User'}</span>!
      </h1>

      <p className="text-center text-gray-400">
        You have successfully logged in to the React Authentication App.
      </p>

      {/* 4. Login/Signup की जगह अब Logout बटन दिया है */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Home;