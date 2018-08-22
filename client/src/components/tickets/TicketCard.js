import React from 'react'
import Card from '@material-ui/core/Card/Card'
import Typography from '@material-ui/core/Typography/Typography'

const TicketCard = (props) => {
  const {ticket} = props
  return (
    <Card>
      <Typography>{ticket.id}</Typography>
    </Card>
  )
}

export default TicketCard
