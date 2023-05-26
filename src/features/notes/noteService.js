import axios from "axios";

const API_URL = 'https://support-server-p3at.onrender.com/api/tickets/'

//Get Notes
const getNotes = async (ticketId,token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
   
    const response = await axios.get(API_URL + ticketId + '/notes', config)
    
    return response.data
}

//Create a note
const createNote = async (noteText,ticketId,token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
   
    const response = await axios.post(API_URL + ticketId + '/notes',
    {
        text: noteText
    } ,config)
    
    return response.data
}


const noteService = {
    getNotes,
    createNote
}

export default noteService