import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from ls
const user = JSON.parse(localStorage.getItem('user'))

const initialState ={
    user: user? user : null, 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
}
//Register the user
export const register = createAsyncThunk('auth/register',
 async(user, thunkAPI) => {
    try{
        return await authService.register(user)
    }
    catch (error){
        const message = (
            error.message && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Login the user
export const login = createAsyncThunk('auth/login',
 async(user, thunkAPI) => {
    try{
        return await authService.login(user)
    }catch(error){
        const message = (
            error.message && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout user
export const logout = createAction('auth/logout', () => {
    authService.logout()
    return {}
})

export const authSlice = createSlice({
    name: "auth", 
    initialState, 
    reducers: {
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
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
        })
        .addCase(login.pending, (state) => {
            state.isLoading = false
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})


export default authSlice.reducer