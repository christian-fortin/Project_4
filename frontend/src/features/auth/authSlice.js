// This file completes the requests to the front end via createAsyncThunk and then error handles via createSlice for the USERS

// ====================================================================================================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// createSlice: Basically adds on the status of everything that happens
// createAsyncThunk: Just a little bit more of a complicated asyncHandler -- 410 Need a better explination for this.
import authService from './authService'
// Imports dotService which handles the requests.

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
// Set's the initial state of everything to null essentially 

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
      return await authService.register(user)
           // The user is created using the register function in the AuthService.
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
      // Error handling if a user isn't registering
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    let checkAuthService = await authService.login(user)
    // Checks autherization, and uses the function login to log the user in.
    console.log(checkAuthService);
    return checkAuthService
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
    // Error handling if a user isn't logging in
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})
// Applies the logout function 


// This is the message handling system to check where things go wrong or right.
export const authSlice = createSlice({
  name: 'auth',
    // the slice's name
  initialState,
   // What it should start to look like.
  reducers: {
    reset: (state) => {
              // resets state
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
          console.log('This was hit');
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        console.log('This was hit');
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      // ALL of these are pretty self explanitory
  },
})

export const { reset } = authSlice.actions
// Exports the reset function
export default authSlice.reducer
// Exports the reset function and the reducers (reduces what the issues are)
export const loggedInUser = (state) => state.user
// Set's the state for the loggedInUser