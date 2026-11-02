
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const dataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);

  // Backend URL
  const serverUrl = 'http://localhost:1001';

  // Get User Data
  const getUserData = async () => {
    try {
      let { data } = await axios.get(serverUrl + '/api/test', {
        withCredentials: true,
      });

      setUserData(data);
    } catch (error) {
      console.log('Get User Data Error:', error);
    }
  };

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserData,
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
}

export default UserContext;
