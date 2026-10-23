import React, { useState } from 'react'

function Signup() {
    let {serverUrl} = useContext(dataContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })



  const [showPassword, setShowPassword] = useState(false)

  // Har input ka change handle karta hai (name attribute se match karta hai)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Form submit hone pe page reload rokta hai
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signup Data:', formData)
    // yahan API call laga sakte ho
  }
  const handleSignUP = async(e)=>{
    e.preventDefault()
    try{
        let data = await axios.post(`${serverUrl}/api/signup`,formData,{
            firstName,
            lastName,
            userName,
            email,
            password},{withCredentials:true})
            console.log(data);
    }
    catch(error){
console.log(error.message)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] flex flex-col justify-center items-center gap-[20px]'>

            <h1 className='text-white text-[20px] font-semibold'>SignUp</h1>

            {/* Blank Profile Picture */}
            <div className='w-[90px] h-[90px] rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>
            </div>

            <form
                onSubmit={handleSubmit}
                className='w-[100%] flex flex-col items-center justify-center gap-[20px]'
            >

                {/* First Name & Last Name */}
                <div className='w-[80%] flex justify-between gap-[10px]'>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder='first name'
                        required
                        className='w-[48%] bg-transparent border border-gray-500 text-white p-2 outline-none rounded'
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder='last name'
                        required
                        className='w-[48%] bg-transparent border border-gray-500 text-white p-2 outline-none rounded'
                    />
                </div>

                <div className='w-[80%]'>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='email'
                        required
                        className='w-full bg-transparent border border-gray-500 text-white p-2 outline-none rounded'
                    />
                </div>

                <div className='w-[80%] relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='password'
                        required
                        minLength={6}
                        className='w-full bg-transparent border border-gray-500 text-white p-2 pr-14 outline-none rounded'
                    />
                    {/* Show / Hide password */}
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm'
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <button
                    type="submit"
                    className='w-[20%] bg-blue-600 text-white p-2 mt-4 font-semibold rounded hover:bg-blue-700'
                >
                    Sign Up
                </button>
            </form>

        </div>
    </div>
  )
}

export default Signup