import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dotService from './dotService'

const initialState = {
    dots: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new dot
export const createDot = createAsyncThunk('dots/create', async (dotData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dotService.createDot(dotData, token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const dotSlice = createSlice({
    name: 'dot',
    initialState,
    reducers:{
        reset: (state) => initialState
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
            })}
})


export const {reset} = dotSlice.actions
export default dotSlice.reducer