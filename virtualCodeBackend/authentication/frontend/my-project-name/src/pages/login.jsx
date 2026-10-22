import React from 'react'

function Login() {
  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[500px] bg-[#141f1f] flex flex-col justify-center items-center gap-[20px]'>
            
            <h1 className='text-white text-[20px] font-semibold'>Login</h1>
            
            <form className='w-[100%] flex flex-col items-center justify-center gap-[20px]'>
                
                <div className='w-[80%]'>
                    <input 
                        type="email" 
                        placeholder='email' 
                        className='w-full bg-transparent border border-gray-500 text-white p-2 outline-none rounded'
                    />
                </div>

                <div className='w-[80%]'>
                    <input 
                        type="password" 
                        placeholder='password' 
                        className='w-full bg-transparent border border-gray-500 text-white p-2 outline-none rounded'
                    />
                </div>

                <button className='w-[80%] bg-blue-600 text-white p-2 mt-4 font-semibold rounded hover:bg-blue-700'>
                    Login
                </button>
            </form>

        </div>
    </div>
  )
}

export default Login