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
        console.log(dotData);
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

// Get user dots
export const getDots = createAsyncThunk('dots/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dotService.getDots(token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
} )


//Delete new dot
export const deleteDots = createAsyncThunk('dots/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dotService.deleteDots(id, token)
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
        
        
        
        }
})


export const {reset} = dotSlice.actions
export default dotSlice.reducer