import React from 'react'
import {connect} from 'react-redux'
import './Ticket.css'
import Card from '@material-ui/core/Card/Card'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'
import AccountIcon from '@material-ui/icons/AccountCircle'
import {calculateRiskFactor} from '../../lib/FraudRiskAlgorithm'
import Warning from '@material-ui/core/es/internal/svg-icons/Warning'
import Grid from '@material-ui/core/Grid/Grid'
import EventInfo from '../events/EventInfo'

const TicketCard = (props) => {
  const {ticket, tickets, eventsTickets, parent} = props
  const dateClass = new Date() > new Date(ticket.event.endDate) ? 'Event-Finished' : 'Event-Live'
  const riskFactor = calculateRiskFactor(ticket, tickets, eventsTickets)
  const calculateGridSize = (parent) => {
    switch(parent){
      case 'TicketsList':
        return 3
      default:
        return 12
    }
  }
  const gridSize = calculateGridSize(parent)

  return (
    <Card className={`${dateClass} padding-1 margin-1 ${riskFactor.riskClass}`}>
      <Grid container spacing={24}>
        {parent === 'TicketsList' && <Grid item xs={gridSize} className='centered-flex'><img src={ticket.event.image} alt={`Ticket for sale for ${ticket.event}`} style={{height: '100px', borderRadius:'0.5em'}}/></Grid>}
        {parent === 'TicketsList' && <Grid item xs={gridSize} ><EventInfo event={ticket.event}/></Grid>}
        {parent === 'TicketsList' && <Grid item xs={gridSize} className='centered-flex'><img src={ticket.image} alt={`Ticket for sale for ${ticket.event}`} style={{height: '100px', borderRadius:'0.5em'}}/></Grid>}
        <Grid item xs={gridSize} >
          <Typography><AccountIcon />{ticket.sellerUser.firstName}</Typography>
          <Warning className={riskFactor.riskClass} />
          <Typography>€{ticket.price}</Typography>
          {parent === 'EventTickets' && <div>
            <Typography>EventTickets</Typography>
          </div>}
          {parent === 'EventDetails' && <div>
            <Typography>EventDetails</Typography>
          </div>}
          <div className='center-align-flex'>
            {dateClass === 'Event-Finished' ? <Typography color='secondary'>Event has finished</Typography> : <Button href={`/tickets/${ticket.id}`} variant='contained' color='primary'>See Ticket</Button>}
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

const mapStateToProps = (state, props) => ({
  tickets: state.tickets,
  eventsTickets: state.tickets && state.events && Object.values(state.tickets).filter(ticket => ticket.event.id === state.tickets[props.ticket.id].event.id)
})

export default connect(mapStateToProps)(TicketCard)
