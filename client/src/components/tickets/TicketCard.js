import React from 'react'
import Card from '@material-ui/core/Card/Card'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'
import AccountIcon from '@material-ui/icons/AccountCircle'

const TicketCard = (props) => {
  const {ticket, parent} = props
  const dateClass = new Date() > new Date(ticket.event.endDate) ? 'Event-Finished' : 'Event-Live'
  return (
    <Card className={`${dateClass} padding-1 margin-1`}>
      <Typography><AccountIcon />{ticket.sellerUser.firstName}</Typography>
      <Typography>{ticket.price}</Typography>
      {parent === 'TicketsList' && <div>
        <Typography>TicketList</Typography>
      </div>}
      {parent === 'EventTickets' && <div>
        <Typography>EventTickets</Typography>
      </div>}
      {parent === 'EventDetails' && <div>
        <Typography>EventDetails</Typography>
      </div>}
      {dateClass === 'Event-Finished' ? <Typography color='secondary'>Event has finished</Typography> :<Button href={`/tickets/${ticket.id}`} variant='contained' color='primary'>Buy Ticket</Button>}
    </Card>
  )
}

export default TicketCard
