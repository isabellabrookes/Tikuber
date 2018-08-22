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

class TicketPage extends Component {
  render() {
    const { tickets, ticket, eventsTickets } = this.props
    const averageTicketPrice = () => {
      if (eventsTickets) {
        return (eventsTickets.reduce((total, eventTicket) => total + parseFloat(eventTicket.price), 0) / eventsTickets.length).toFixed(2)
      }
    }

    const calculateRiskFactor = () => {
      let risk = 0
      risk = calculateRiskOfOnlyTicket(risk)
      risk = calculateRiskOfPrice(risk)
      risk = calculateRiskBusinessHours(risk)
      risk = calculateRiskNumberComments(risk)
      console.log('risk: ' + risk)
      return Math.round(risk)
    }

    const calculateRiskOfOnlyTicket = risk => {
      const ticketsCurrentSellerHas = Object.values(tickets).filter(singleTicket => singleTicket.sellerUser.id === ticket.sellerUser.id)
      if (ticketsCurrentSellerHas.length === 1) return risk + 4
      return risk
    }

    const calculateRiskOfPrice = risk => {
      const averagePrice = averageTicketPrice()
      if (ticket.price > averagePrice) {
        const percentDifference = risk + averagePrice/ticket.price * 100
        if (percentDifference < 15) return risk - percentDifference
        return risk - 15
      } else if (ticket.price < averagePrice){
        return risk + ticket.price/averagePrice * 100
      }
    }

    const calculateRiskBusinessHours = risk => {
      
      return risk
    }

    const calculateRiskNumberComments = risk => {
      if (ticket.comments.length > 3) return risk + 6
      return risk
    }

    return (
      <div className='Container-Div'>
        {ticket === null && <Loading />}
        {!ticket && <NotFound message={`Ticket ${this.props.match.params.id}`}/>}
        {ticket &&
        <Paper className='Details-Paper'>
          <img src={ticket.image} alt={`ticket for sale for ${ticket.event.name}`}/>
          <Grid container spacing={8}>
            <Grid item xs={6} className='padding-1'>
              <div className='padding-1'>
              <Typography gutterBottom variant="display1" component="h1"> <AccountIcon />{ticket.sellerUser.firstName}</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='secondary'> <Warning />Risk: {calculateRiskFactor()}%</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='primary'> <EuroSymbol />{ticket.price}</Typography>
              <div className='centered-flex'><Button href={`/events/${ticket.event.id}`} variant='contained' color='secondary'>Buy</Button></div>
              </div>
            </Grid>
            <Grid item xs={6} className='padding-1'>
              <EventInfo event={ticket.event} description={''}/>
              <Typography>Average Price of Tickets: €{averageTicketPrice()}</Typography>
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
