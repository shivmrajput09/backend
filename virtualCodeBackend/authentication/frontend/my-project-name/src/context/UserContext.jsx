import React ,{createContext} from 'react'


export const dataContext = createContext()

const serverUrl  = "http://localhost:8000"

const value = {
   serverUrl 
}


function UserContext({children}) {
  return (
    <dataContext.Provider value={value}> 
 {children}
    </dataContext.Provider>
  )
}

export default UserContext