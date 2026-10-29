import React, { createContext, useState } from 'react'

export const dataContext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState(null)

  // Apne backend ka actual port yahan rakho
  const serverUrl = 'http://localhost:1001'

  const getUserData = async ()=>{
    try{
let {data} = await axios.get(serverUrl + "/api/test")
setUserData(data)
    }


     catch(error){

    }

  }

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserData
  }
useEffect(()=>{
   getUserDate() 
},[])



  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext