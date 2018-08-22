import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/Loading'
import NotFound from '../app-layout/NotFound'
import EventInfo from '../events/EventInfo'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import AccountIcon from '@material-ui/icons/AccountCircle'
import EuroSymbol from '@material-ui/icons/EuroSymbol'
import Warning from '@material-ui/core/es/internal/svg-icons/Warning'
import Button from '../../../node_modules/@material-ui/core/Button/Button'
import {averageTicketPrice, calculateRiskFactor} from '../../lib/FraudRiskAlgorithm'

class TicketPage extends Component {

  render() {
    const { ticket, tickets, eventsTickets } = this.props
    const risk = calculateRiskFactor(ticket, tickets, eventsTickets)
    return (
      <div className='Container-Div'>
        {ticket === null && <Loading />}
        {!ticket && <NotFound message={`Ticket ${this.props.match.params.id}`}/>}
        {ticket && tickets && eventsTickets &&
        <Paper className='Details-Paper'>
          <Grid container spacing={8} >
            <Grid item xs={6} className='padding-1'>
              <img src={ticket.image} alt={`ticket for sale for ${ticket.event.name}`}/>
              <div className='padding-1' style={{borderLeft: '2px solid blue'}}>
              <Typography gutterBottom variant="display1" component="h1"> <AccountIcon />{ticket.sellerUser.firstName}</Typography>
              <Typography gutterBottom variant="display1" component="h1" className={risk.riskClass}> <Warning />Risk: {risk.riskFactor}%</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='primary'> <EuroSymbol />{ticket.price}</Typography>
              <div className='centered-flex'><Button href={`/events/${ticket.event.id}`} variant='contained' color='secondary'>Buy</Button></div>
              </div>
            </Grid>
            <Grid item xs={6} className='padding-1'>
              <img src={ticket.event.image} alt={`ticket for sale for ${ticket.event.name}`}/>
              <EventInfo event={ticket.event} description={''}/>
              <Typography>Average Price of Tickets: €{averageTicketPrice(eventsTickets)}</Typography>
              <div className='centered-flex'><Button href={`/events/${ticket.event.id}`} variant='contained' color='primary'>Back to Event</Button></div>
            </Grid>
            <Grid item xs={12} className='padding-1'>
              <Typography>Comments</Typography>
            </Grid>
          </Grid>
        </Paper>
        }
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  tickets: state.tickets,
  ticket: state.tickets && state.tickets[props.match.params.id],
  eventsTickets: state.tickets && state.events && Object.values(state.tickets).filter(ticket => ticket.event.id === state.tickets[props.match.params.id].event.id),
})

export default connect(mapStateToProps)(TicketPage)
