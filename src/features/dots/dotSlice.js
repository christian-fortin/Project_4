// This file completes the requests to the front end via createAsyncThunk and then error handles via createSlice for the DOTS

// ====================================================================================================================


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// createSlice: Basically adds on the status of everything that happens
// createAsyncThunk: Just a little bit more of a complicated asyncHandler -- 410 Need a better explination for this.
import dotService from './dotService'
// Imports dotService which handles the requests.

const initialState = {
    dots: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
// Set's the initial state of everything to null essentially 

//Create new dot
export const createDot = createAsyncThunk('dots/create', async (dotData, thunkAPI) => {
    // -- 410 Why is the route like this 'dots/create'?
    // It is the name to handle how this finishes
    try {
        console.log(dotData);
        // When the dot is created it will log the data.
        const token = thunkAPI.getState().auth.user.token
        // Checks for user authentication on the front end
        return await dotService.createDot(dotData, token)
        // Will wait until dotService uses the function 'createDot' to create the dot and check the token using the function created in dotService

    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    // This handles the error if creating the dot doesn't work
})

// Get user dots
export const getDots = createAsyncThunk('dots/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        // Checks for user authentication
        return await dotService.getDots(token)
        // Gets the dot using the function created in dotService
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    // This handles the error if getting the dot doesn't work
} )


//Delete new dot
export const deleteDots = createAsyncThunk('dots/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
         // Checks for user authentication
        return await dotService.deleteDots(id, token)
        // Deletes the dot using the function created in dotService
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    // This handles the error if deleting the dot doesn't work
})


// This is the message handling system to check where things go wrong or right.
export const dotSlice = createSlice({
    name: 'dot',
    // the slice's name
    initialState,
    // What it should start to look like.
    reducers:{
        reset: (state) => initialState
        // resets state
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDot.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDot.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dots.push(action.payload)
            })
            .addCase(createDot.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message= action.payload
            })
            .addCase(getDots.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDots.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dots = action.payload
            })
            .addCase(getDots.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteDots.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDots.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dots = state.dots.filter((dot) => dot._id !== action.payload.id)
            })
            .addCase(deleteDots.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message= action.payload
            })
        
        // ALL of these are pretty self explanitory
        
        }
})


export const {reset} = dotSlice.actions
export default dotSlice.reducer
// Exports the reset function and the reducers (reduces what the issues are)