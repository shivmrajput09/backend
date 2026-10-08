 import React from 'react'
  
 function App() {
  async function getRes(){
  const res =  await   fetch("http://localhost:4001/")
  let data = await res.json()
  console.log(data)
  
  }
   return (
     <div> 
      <button onClick={()=>getRes()}>send</button>
     </div>
   )
 }
 
 export default App