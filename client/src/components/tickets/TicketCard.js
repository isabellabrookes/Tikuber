import React from 'react'
import Card from '@material-ui/core/Card/Card'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'

const TicketCard = (props) => {
  const {ticket, parent} = props
  return (
    <Card>
      <Typography>{ticket.id}</Typography>
      {parent === 'TicketsList' && <div>
        <Typography>TicketList</Typography>
      </div>}
      {parent === 'EventTickets' && <div>
        <Typography>EventTickets</Typography>
      </div>}
      {parent === 'EventDetails' && <div>
        <Typography>EventDetails</Typography>
      </div>}
      <Button href={`/tickets/${ticket.id}`} variant='contained' color='primary'>Buy Ticket</Button>
    </Card>
  )
}

export default TicketCard
