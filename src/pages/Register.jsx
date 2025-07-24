import { useEffect, useState } from 'react'
// import { registerRequest } from '../features/user/userSlice'
// import { useDispatch } from 'react-redux'
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { RadioGroup } from '@headlessui/react'
import ConfirmAccount from '../components/Register/ConfirmAccount'
import AccountVerified from '../components/Register/AccountVerified'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerRequest } from '../features/user/userSlice'

export default function Register() {

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phoneNumber: '',
    givenName: '',
    familyName: '',
    name:''
  })

  const genderOptions = ['male', 'female']
  const dispatch = useDispatch()

   const [error, setError] = useState('')
   const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showVerificationCode, setShowVerificationCode] = useState(false)
  const [showVerifiedSection, setShowVerifiedSection] = useState(false)
  const { loading: registerLoading, error: registerError, success: registerSuccess } = useSelector((state) => state.user.register)

   useEffect(() => {
    if (registerSuccess) {
      setShowVerificationCode(true)
    }
  }, [registerSuccess, dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const onConfirmed = () => {
    setShowVerifiedSection(true)
    setShowVerificationCode(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const {
      email,
      password,
      confirmPassword,
      givenName,
      familyName,
      gender,
      phoneNumber } = form

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const payload = {
      email, password, givenName, familyName, gender, phoneNumber
    }

    dispatch(registerRequest(payload))

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-30">
      
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-md">
        {!showVerificationCode && !showVerifiedSection && 
        <>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="givenName"
                value={form.givenName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="familyName"
                value={form.familyName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:underline"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Retype Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-16"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:underline"
              >
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>

            </div>
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <RadioGroup value={form.gender} onChange={(value) => setForm({ ...form, gender: value })}>
            <RadioGroup.Label className="block text-sm font-medium text-gray-700">Gender</RadioGroup.Label>
            <div className="mt-1 flex gap-4">
              {genderOptions.map((option) => (
                <RadioGroup.Option
                key={option}
                value={option}
                className={({ active, checked }) =>
                  `cursor-pointer rounded-lg px-4 py-2 border ${
                    checked ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'
                  } ${active ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`
                }
                >
                  {({ checked }) => (
                    <span className="capitalize">{option}</span>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          {error && (
              <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
            )}
          {registerError && (
              <p className="mt-2 text-sm text-red-600 font-medium">{registerError}</p>
            )}

          {/* Submit Button */}
          <div className='text-center'>
            <button
              type="submit"
              className="cursor-pointer w-3/4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75"
              disabled={showVerificationCode}
            >
              {
                registerLoading ? (<span class="loading loading-bars loading-sm"></span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
        

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        </>
        }
        
      {showVerificationCode && !showVerifiedSection &&
        <ConfirmAccount email={form.email} onConfirmed={onConfirmed}/>}

      {!showVerificationCode && showVerifiedSection && 
      <AccountVerified /> 
      }
      </div>

  
    </div>
  )
}
