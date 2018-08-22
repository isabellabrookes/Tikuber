import React from 'react'

const TicketCard = (props) => {
  const {ticket} = props
  return (
    <div>
      {ticket.id}
    </div>
  )
}

export default TicketCard
