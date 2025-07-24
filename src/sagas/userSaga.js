import { call, put, takeLatest } from 'redux-saga/effects'
import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, confirmStart, confirmSuccess, confirmFailure, resendStart, resendSuccess, resendFailure } from '../features/user/userSlice'
import { confirmUserApi, loginUserApi, registerUserApi, resendConfirmationUserApi } from '../api/user'

function* loginUserSaga(action) {
  try {
    yield put(loginStart())
    const { email, password } = action.payload
    
    const data = yield call(loginUserApi, { email, password })
    console.log(data)

    yield put(loginSuccess(data))
  } catch (error) {
    console.error("Login error:", error);
    yield put(loginFailure(error.response?.data?.message || error.message))
  }
}

function* registerUserSaga(action) {
  try {
    yield put(registerStart())

    const data = yield call(registerUserApi, action.payload)

    if(data?.success)
    {
        yield put(registerSuccess(data.message))
    }
    else{
        yield put(registerFailure("Registration failed"))
    }

  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || error.message))
  }
}

function* confirmUserSaga(action) {
  try {
    yield put(confirmStart())

    const { success } = yield call(confirmUserApi, action.payload)

    if(success)
    {
        yield put(confirmSuccess())
    }
    else{
        yield put(confirmFailure("Invalid Code"))
    }

  } catch (error) {
    yield put(confirmFailure(error.response?.data?.message || error.message))
  }
}

function* resendConfirmationUserSaga(action) {
  try {
    yield put(resendStart())

    const { success } = yield call(resendConfirmationUserApi, action.payload)

    if(success)
    {
        yield put(resendSuccess())
    }
    else{
        yield put(resendFailure("Error resending verification code"))
    }

  } catch (error) {
    console.log("error", error)
    yield put(resendFailure(error.response?.data?.message || error.message))
  }
}

export default function* watchUserSaga() {
  yield takeLatest('user/loginRequest', loginUserSaga)
  yield takeLatest('user/registerRequest', registerUserSaga)
  yield takeLatest('user/confirmRequest', confirmUserSaga)
  yield takeLatest('user/resendConfirmationRequest', resendConfirmationUserSaga)
}
