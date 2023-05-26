import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'


function ViewTickets() {
    const {tickets} = useSelector((state) => state.ticket) 
  
    const dispatch = useDispatch()
 
    useEffect(() => {
        dispatch(getTickets())

    }, [dispatch])

    if (!tickets) {
        return <Spinner />
      }

    return (
        <>
        <BackButton url={'/'}/>
        <h1>Tickets</h1>
        {tickets.map((ticket) => (
            <TicketItem 
                key={ticket.id} 
                ticket={ticket}/>
                
     
        ))}
    </>
    )
}

export default ViewTickets