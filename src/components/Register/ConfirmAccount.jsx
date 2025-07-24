import React, { useState, useEffect } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { useDispatch, useSelector } from 'react-redux'
import { confirmRequest, resendConfirmationRequest } from '../../features/user/userSlice'

export default function ConfirmAccount({email: initialEmail, onConfirmed}) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState(initialEmail)
  const [code, setCode] = useState('')
  const [resendTimer, setResendTimer] = useState(20)

  const {
    confirm: { loading: confirmLoading, error: confirmError, success: confirmSuccess },
    resendConfirmation: { loading: resendLoading, error: resendError, success: resendSuccess },
  } = useSelector((state) => state.user)

  useEffect(() => {
    if (confirmSuccess) {
      onConfirmed()
    }
  }, [confirmSuccess, dispatch, onConfirmed])

  useEffect(() => {
    let timer
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendTimer])

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(confirmRequest({ email, code }))
  }

  const handleResend = () => {
    dispatch(resendConfirmationRequest({ email }))
  }

  return (
    <form onSubmit={handleConfirm} className='space-y-5 text-center pt-5'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Verify your email</h2>
      <p>A verification code has been sent to your email</p>
      <div className="w-full">
      <input
        type="text"
        placeholder="Confirmation Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        className='mt-1 w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
      />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
        <button 
        type="submit" 
        className='cursor-pointer w-1/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75' 
        disabled={code.length==0 || confirmLoading}>
          {confirmLoading ? 'Verifying...' : 'Verify Account'}
        </button>
        <button
        type="button"
        className='cursor-pointer w-1/3 bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75'
        onClick={handleResend}
        disabled={resendTimer > 0 || resendLoading}>
          {resendTimer > 0 ? `Resend (${resendTimer}s)` : 'Resend'}
        </button>
      
      </div>
      </div>
      {confirmError && <p className="mt-2 text-red-600">{confirmError}</p>}
        {confirmSuccess && <p className="mt-2 text-green-600">Account confirmed successfully!</p>}
        {resendError && <p className="text-red-600 mt-1">{resendError}</p>}
        {resendSuccess && <p className="text-green-600 mt-1">Code resent successfully!</p>}

    </form>
  )
}
