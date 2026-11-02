import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../context/UserContext'; 

function Signup() {
  const navigate = useNavigate(); 
  const { getUserData, serverUrl } = useContext(dataContext); 

  let [frontendImage, setFrontendImage] = useState(null); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (frontendImage) formData.append("image", frontendImage);

      // API Call
      await axios.post(`${serverUrl}/api/signup`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      // साइनअप सफल होने के बाद User Data मंगाएं
      await getUserData(); 

      // Home पेज पर भेज दें
      navigate("/home"); 

    } catch (error) {
      console.log(error);
      alert("Signup failed! Please check console.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-5">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#141f1f] p-8">
        
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white outline-none focus:border-blue-500"
          />
          
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white outline-none focus:border-blue-500"
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white outline-none focus:border-blue-500"
          />
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Profile Image (Optional):</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFrontendImage(e.target.files[0])} 
              className="w-full rounded-lg border border-gray-600 bg-transparent p-2 text-white outline-none file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
            />
          </div>

          <button 
            type="submit" 
            className="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already a user?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>

        <Link
          to="/"
          className="mt-4 block text-center text-sm text-gray-400 hover:text-white"
        >
          Back to Home
        </Link>

      </div>
    </div>
  )
}

export default Signup;