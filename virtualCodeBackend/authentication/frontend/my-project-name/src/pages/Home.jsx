
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold text-white">Welcome Home</h1>

      <p className="text-center text-gray-400">
        React Authentication Testing App
      </p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Sign Up
        </Link>

        <Link
          to="/login"
          className="rounded-lg border border-gray-600 px-6 py-3 text-white hover:bg-gray-800"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Home
