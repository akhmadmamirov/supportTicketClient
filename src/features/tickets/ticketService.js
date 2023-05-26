import axios from 'axios'

const API_URL = 'https://support-server-p3at.onrender.com/api/tickets/'

//Create new ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}


//Get tickets
const getTickets = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//Get ticket
const getTicket = async (ticketId,token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
   
    const response = await axios.get(API_URL + ticketId, config)
    
    return response.data
}
//Close Ticket
const closeTicket = async (ticketId,token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
   
    const response = await axios.put(
        API_URL + ticketId,
        {status: 'closed'},
        config)
    console.log(response.data)
    return response.data
}



const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}

export default ticketService 