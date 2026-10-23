 import React from 'react'
 import axios from 'axios'
import { useState } from 'react'
  
 function App() {
  let[name, setName] = useState('');
    let[age, setAge] = useState('');
  let[city , setCity] = useState('');

  async function getRes(){
      axios.post("http://localhost:4001/",{
        name,
        age,
         city
      })
    .then((e)=>{
      console.log(e.data)
    }).catch((e)=>{
      console.log(e)
    })
  
  } 
   return (
     <div>
      <input type='text' placeholder='name' value={name}     onChange={(e)=>setName(e.target.value)} />
      <input type='text' placeholder='age' value={age} onChange={(e)=>setAge(e.target.value)}/>
      <input type='text' placeholder='city' value={city} onChange={(e)=>setCity(e.target.value)} />
      <button onClick={()=>getRes()}>send</button>
     </div>
   )
 }
 
 export default App