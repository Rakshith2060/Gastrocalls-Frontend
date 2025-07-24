import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

export default function AccountVerified() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4">
      <CheckCircleIcon className="h-24 w-24 text-green-500 mb-6" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Account Verified!</h2>
      <p className="text-gray-600 mb-6 text-center">Your account has been successfully verified. You can now log in.</p>
      <button
        onClick={handleLogin}
        className="bg-green-700 hover:bg-green-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-xl transition duration-200"
      >
        Go to Login
      </button>
    </div>
  )
}
