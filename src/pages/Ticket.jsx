import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import { getTicket, closeTicket} from '../features/tickets/ticketSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import {toast} from 'react-toastify'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'


const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
}

Modal.setAppElement('#root')


function Ticket() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')


    const {ticket} = useSelector((state) => state.ticket)

    const {notes} = useSelector((state) => state.notes)

    const dispatch = useDispatch()
    const {ticketId}  = useParams()
    const navigate = useNavigate()
    

    useEffect(() => {
        dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
        dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
    }, [ticketId, dispatch])

    //Close Ticket
    const onTicketClose = () => {
      
        dispatch(closeTicket(ticketId))
        .unwrap()
        .then(() => {
          toast.success('Ticket Closed')
          navigate('/tickets')
        })
    }

    //create Note submit
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        .unwrap()
        .then(() => {
            setNoteText('')
            closeModal()
        })
        .catch(toast.error)
        
    }



    //Open/Close Modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)
    if (!ticket){
        return <Spinner />
    }


    return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <BackButton url='/tickets' />
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
            </h2>
            <h3>
                Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
            </h3>
            <h3>
                Product: {ticket.product}
            </h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of issue</h3>
                <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
        </header>

        {ticket.status !== 'closed' && (
            <button 
                onClick={openModal}
                className="btn"><FaPlus />
                Add Note
             </button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} 
        style={customStyles} contentLabel='Add Note'>
            <h2>Add Note</h2>
            <button className='btn-close' onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea 
                        name="noteText"
                        id="noteText"
                        className='form-control' 
                        placeholder='Note Text'
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)} 
                    ></textarea>
                    <div className="form-group">
                        <button className='btn' type='submit'>
                            Submit 
                        </button>
                    </div>
                </div>
            </form>
        </Modal>

        {notes ? notes.map((note) => (
            <NoteItem key={note._id} note={note} />
        )) : (
            <Spinner />
        )}

        {ticket.status !== "closed" && ( 
            <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
        )}
    </div>
    )
}

export default Ticket