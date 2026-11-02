import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../context/UserContext'; // Context import किया

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Navigate हुक 
  const { getUserData, serverUrl } = useContext(dataContext); // Context से डेटा निकाला

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${serverUrl}/api/login`,
        formData,
        { withCredentials: true }
      );

      // 1. लॉगिन सफल होने के बाद User का डेटा अपडेट करो
      await getUserData(); 
      
      // 2. होम पेज पर Navigate करो
      navigate('/home'); 

    } catch (error) {
      const message = error.response?.data?.message;

      if (message === 'Incorrect password') {
        alert('Incorrect password! Please try again.');
      } else {
        alert(message || 'Login failed. Please try again.');
      }
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-5">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#141f1f] p-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white outline-none focus:border-blue-500"
          />

          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white outline-none focus:border-blue-500"
          />

          <button type="submit" className="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          New user? <Link to="/signup" className="text-blue-400 hover:underline">Create account</Link>
        </p>

        <Link to="/" className="mt-4 block text-center text-sm text-gray-400 hover:text-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;