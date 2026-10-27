import React, { useState, useRef, useContext } from 'react'
import axios from 'axios'
// dataContext import kar lena jahan se bhi banaya ho
// import { dataContext } from './context/userContext' 

function Signup() {
  let { serverUrl } = useContext(dataContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  
  // 1. Image upload ke liye states aur ref
  const [frontEndImage, setFrontEndImage] = useState(null) // Image preview ke liye
  const [backendImage, setBackendImage] = useState(null)   // Actual file backend bhejney ke liye
  const fileRef = useRef(null)                             // Hidden input ko trigger karne ke liye

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 2. Image select handle karna
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setBackendImage(file); // Backend bhejne ke liye save kiya
        setFrontEndImage(URL.createObjectURL(file)); // Preview dikhane ke liye URL banaya
    }
  }

  // 3. API Call with FormData
  const handleSignUP = async(e) => {
    e.preventDefault()
    try {
        // Normal JSON ki jagah FormData use karna padega kyunki file bhejni hai
        const submitData = new FormData();
        submitData.append("firstName", formData.firstName);
        submitData.append("lastName", formData.lastName);
        submitData.append("email", formData.email);
        submitData.append("password", formData.password);
        
        // Agar image select ki hai toh usko bhi append kardo
        if (backendImage) {
            submitData.append("profileImage", backendImage);
        }

        let response = await axios.post(`${serverUrl}/api/signup`, submitData, {
            headers: {
                "Content-Type": "multipart/form-data" // Backend ko batana ki ye form-data hai
            },
            withCredentials: true
        });
        
        console.log("Success:", response.data);
    }
    catch(error) {
        console.log("Error:", error.message)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] flex flex-col justify-center items-center gap-[20px]'>

            <h1 className='text-white text-[20px] font-semibold'>SignUp</h1>

            {/* 4. Clickable Profile Picture Area */}
            <div 
                className='w-[90px] h-[90px] rounded-full border-2 border-gray-500 flex justify-center items-center overflow-hidden cursor-pointer relative group'
                onClick={() => fileRef.current.click()} // Click karne par hidden input trigger hoga
            >
                {/* Agar image select ho gayi toh preview dikhao, warna default SVG */}
                {frontEndImage ? (
                    <img src={frontEndImage} alt="Profile" className='w-full h-full object-cover' />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                    </svg>
                )}
                
                {/* Hover Effect (Video mein dikhaya tha) */}
                <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity'>
                     <span className='text-white text-2xl'>+</span>
                </div>
            </div>

            {/* 5. Hidden File Input */}
            <input 
                type="file" 
                hidden 
                ref={fileRef} 
                onChange={handleImageChange} 
                accept="image/*"
            />

            <form
                onSubmit={handleSignUP} // onSubmit par apka original API call function lagaya
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

export default Signup;