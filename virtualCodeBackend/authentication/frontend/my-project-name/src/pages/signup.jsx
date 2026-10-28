import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [profilePic, setProfilePic] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // 1. FormData का ऑब्जेक्ट बनाएँ
    const submitData = new FormData();
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('userName', formData.userName);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    
    // 2. इमेज फाइल को भी append करें (अगर सेलेक्ट की गई है)
    if (profilePic) {
      submitData.append('profilePic', profilePic);
    }

    try {
      const response = await axios.post(
        'http://localhost:1001/api/signup',
        submitData, // यहाँ formData की जगह submitData भेजें
        {
          withCredentials: true,
          // 3. Header में multipart/form-data बताना ज़रूरी है
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        }
      );

      setMessage('Account created successfully!');
      console.log('Signup successful:', response.data);

      // फॉर्म को रिसेट करें
      setFormData({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
      });
      setProfilePic(null);

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message;

      setMessage(errorMessage);
      console.error('Signup error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }; // <-- handleSubmit फंक्शन यहाँ सही तरीके से बंद हुआ है

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-5">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#141f1f] p-8 shadow-2xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        {/* Profile Picture Upload */}
        <div className="mb-6 flex flex-col items-center">
          <label
            htmlFor="profilePic"
            className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-500 bg-gray-800 transition hover:border-blue-500"
          >
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-12 w-12 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"
                />
              </svg>
            )}

            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setProfilePic(file)
              }}
            />
          </label>

          <p className="mt-2 text-sm text-gray-400">
            Upload Profile Picture
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* First Name and Last Name */}
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              autoComplete="given-name"
              required
              className="w-1/2 min-w-0 rounded-lg border border-gray-600 bg-transparent p-3 text-white placeholder-gray-400 outline-none transition focus:border-blue-500"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              autoComplete="family-name"
              required
              className="w-1/2 min-w-0 rounded-lg border border-gray-600 bg-transparent p-3 text-white placeholder-gray-400 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white placeholder-gray-400 outline-none transition focus:border-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white placeholder-gray-400 outline-none transition focus:border-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="new-password"
            minLength={6}
            required
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white placeholder-gray-400 outline-none transition focus:border-blue-500"
          />

          {/* Success or Error Message */}
          {message && (
            <p className="text-center text-sm text-white" role="status">
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already registered?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

        <Link
          to="/"
          className="mt-4 block text-center text-sm text-gray-400 transition hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Signup