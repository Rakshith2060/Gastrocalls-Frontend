import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    login: {
      loading: false,
      error: null,
    },
    register: {
      loading: false,
      error: null,
      success: false
    },
    confirm: {
      loading: false,
      error: null,
      success: false,
    },

    resendConfirmation: {
      loading: false,
      error: null,
      success: false,
    },
    error: null,
    isAuthenticated: false
  },
  reducers: {
    loginStart: (state) => {
      state.login.loading = true
      state.login.error = null
    },
    loginSuccess: (state, action) => {
      state.login.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    loginFailure: (state, action) => {
      state.login.loading = false
      state.login.error = action.payload
      state.isAuthenticated = false
    },
    registerStart: (state) => {
      state.register.loading = true
      state.register.error = null
    },
    registerSuccess: (state) => {
      state.register.loading = false
      state.register.error = null
      state.register.success = true
    },
    registerFailure: (state, action) => {
      state.register.loading = false
      state.register.error = action.payload
    },
    confirmStart: (state) => {
      state.confirm.loading = true;
      state.confirm.error = null;
      state.confirm.success = false;
    },
    confirmSuccess: (state) => {
      state.confirm.loading = false;
      state.confirm.success = true;
    },
    confirmFailure: (state, action) => {
      state.confirm.loading = false;
      state.confirm.error = action.payload;
      state.confirm.success = false;
    },
    resendStart: (state) => {
      state.resendConfirmation.loading = true;
      state.resendConfirmation.error = null;
      state.resendConfirmation.success = false;
    },
    resendSuccess: (state) => {
      state.resendConfirmation.loading = false;
      state.resendConfirmation.success = true;
    },
    resendFailure: (state, action) => {
      state.resendConfirmation.loading = false;
      state.resendConfirmation.error = action.payload;
      state.resendConfirmation.success = false;
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.login.error = null
      state.register.error = null
    }
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerFailure,
  registerSuccess,
  confirmStart,
  confirmFailure,
  confirmSuccess,
  resendStart,
  resendFailure,
  resendSuccess
} = userSlice.actions

export const loginRequest = (payload) => ({
  type: 'user/loginRequest',
  payload,
})

export const registerRequest = (payload) => ({
  type: 'user/registerRequest',
  payload,
})

export const confirmRequest = (payload) => ({
  type: 'user/confirmRequest',
  payload,
});

export const resendConfirmationRequest = (payload) => ({
  type: 'user/resendConfirmationRequest',
  payload,
});

export default userSlice.reducer
