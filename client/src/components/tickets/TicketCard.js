import React from 'react'
import {connect} from 'react-redux'
import './Ticket.css'
import {calculateRiskFactor} from '../../lib/FraudRiskAlgorithm'
import EventInfo from '../events/EventInfo'
import Card from '@material-ui/core/Card/Card'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Warning from '@material-ui/core/es/internal/svg-icons/Warning'
import Grid from '@material-ui/core/Grid/Grid'
import Moment from 'react-moment'

const TicketCard = (props) => {
  const {ticket, tickets, eventsTickets, parent} = props
  const dateClass = ticket && new Date() > new Date(ticket.event.endDate) ? 'Event-Finished' : 'Event-Live'
  const soldClass = ticket.buyerUser ? 'Ticket-Sold' : 'Ticket-Available'
  const riskFactor = calculateRiskFactor(ticket, tickets, eventsTickets)
  const calculateGridProperties = (parent) => {
    switch(parent){
      case 'TicketsList':
        return {outerGridxs: 6, outerGridsm: 3, outerGridDirection: 'row', innerGridDirection: 'column'}
      case 'EventTickets':
        return {outerGridxs: 12, outerGridsm: 6, outerGridDirection: 'row', innerGridDirection: 'row'}
      case 'EventPage':
        return {outerGridxs: 12, outerGridsm: 12, outerGridDirection: 'row', innerGridDirection: 'column'}
      default:
        return {outerGridxs: 12, outerGridsm: 12, outerGridDirection: 'row', innerGridDirection: 'column'}
    }
  }
  const ticketStatus = () => {
    if (dateClass === 'Event-Finished') return <Typography color='secondary' style={{textAlign: 'center'}}>Event has finished</Typography>
    if (soldClass === 'Ticket-Sold') return <Typography color='secondary' style={{textAlign: 'center'}}>Ticket has been sold</Typography>
    return <Button href={`/tickets/${ticket.id}`} variant='contained' color='primary'>See Ticket</Button>
  }

  const gridProperties = calculateGridProperties(parent)
  return (
    <Card className={`${dateClass} ${soldClass} padding-1 margin-1 ${riskFactor.riskClass}`}>
      <Grid container spacing={24} direction={`${gridProperties.outerGridDirection}`} alignItems="stretch">
        {parent === 'TicketsList' && <Grid item xs={gridProperties.outerGridxs} sm={gridProperties.outerGridsm} className='centered-flex-column'><img src={ticket.event.image} alt={`Ticket for sale for ${ticket.event}`} style={{height: '20vh', maxWidth: '40vw', borderRadius:'0.5em'}}/></Grid>}
        {parent === 'TicketsList' && <Grid item xs={gridProperties.outerGridxs} sm={gridProperties.outerGridsm}><EventInfo event={ticket.event}/></Grid>}
        {parent !== 'EventPage' && <Grid item xs={gridProperties.outerGridxs} sm={gridProperties.outerGridsm} className='centered-flex-column'><img src={ticket.image} alt={`Ticket for sale for ${ticket.event}`} style={{height: '20vh', maxWidth: '40vw', borderRadius:'0.5em'}}/></Grid>}
        <Grid item xs={gridProperties.outerGridxs} sm={gridProperties.outerGridsm} clas >
          <Grid container direction={`${gridProperties.innerGridDirection}`} justify="space-evenly" alignItems="center" className={`Ticket-Card-Info height-100`}>
            <Grid item xs={6} sm={3} >
              <Typography className={`${riskFactor.riskClass}-risk centered-flex-row`} ><Warning /> Risk: {riskFactor.riskClass}</Typography>
            </Grid>
            <Grid item xs={6} sm={3} >
              <Typography color='primary' className='centered-flex-row'><AccountIcon />{ticket.sellerUser.firstName} </Typography>
            </Grid>
            <Grid item xs={6} sm={3} >
              <Typography><Moment fromNow>{ticket.createdAt}</Moment></Typography>
            </Grid>
            <Grid item xs={6} sm={3} >
              <Typography>€{ticket.price}</Typography>
            </Grid>
              {parent === 'EventDetails' && <div>
                <Typography>EventDetails</Typography>
              </div>}
          </Grid>
        </Grid> {/*Grid Inner Container*/}
          <div className='center-align-flex width-100'>
            {
              ticketStatus()
            }
            </div>
      </Grid>
    </Card>
  )
}

const mapStateToProps = (state, props) => ({
  tickets: state.tickets,
  eventsTickets: state.tickets && state.events && Object.values(state.tickets).filter(ticket => ticket.event.id === state.tickets[props.ticket.id].event.id)
})

export default connect(mapStateToProps)(TicketCard)
