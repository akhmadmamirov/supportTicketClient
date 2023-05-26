import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService'



const initialState = {
    tickets: null,
    ticket: null,
}

//Create new ticket
export const createTicket = createAsyncThunk('tickets/create',
 async(ticketData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
    }
    catch (error){
        const message = (
            error.message && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get Tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll', 
    async(_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTickets(token)
        }
        catch (error){
            const message = (
                error.message && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//Get Ticket
export const getTicket = createAsyncThunk(
    'tickets/get', 
    async(ticketId, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTicket(ticketId, token)
        }
        catch (error){
            const message = (
                error.message && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

////Close Ticket
export const closeTicket = createAsyncThunk(
    'tickets/close', 
    async(ticketId, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.closeTicket(ticketId, token)
        }
        catch (error){
            const message = (
                error.message && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState, 
    extraReducers: (builder) => {
        builder.addCase(getTickets.pending, (state) => {
            state.ticket = null
        })
        .addCase(getTickets.fulfilled, (state, action) => {
            state.tickets = action.payload
        })
        .addCase(getTicket.fulfilled, (state, action) => {
            state.ticket = action.payload
        })
        .addCase(closeTicket.fulfilled, (state, action) => {
            state.ticket = action.payload
            state.tickets = state.tickets.map((ticket) =>
              ticket._id === action.payload._id ? action.payload : ticket
            )
        })
    }
})


export default ticketSlice.reducer