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
  averageTicketPrice = (eventsTickets) => {
    if (eventsTickets) {
      return (eventsTickets.reduce((total, eventTicket) => total + parseFloat(eventTicket.price), 0) / eventsTickets.length).toFixed(2)
    }
  }

  calculateRiskFactor = (ticket, tickets, eventsTickets) => {
    let risk = 0
    risk = this.calculateRiskOfOnlyTicket(risk, ticket, tickets)
    risk = this.calculateRiskOfPrice(risk, ticket, eventsTickets)
    risk = this.calculateRiskBusinessHours(risk, ticket)
    risk = this.calculateRiskNumberComments(risk, ticket)
    risk = Math.round(risk)
    risk = Math.min(risk, 98)
    risk = Math.max(risk, 2)
    return risk
  }

  calculateRiskOfOnlyTicket = (risk, ticket, tickets) => {
    const ticketsCurrentSellerHas = Object.values(tickets).filter(singleTicket => singleTicket.sellerUser.id === ticket.sellerUser.id)
    if (ticketsCurrentSellerHas.length === 1) return risk + 4
    return risk
  }

  calculateRiskOfPrice = (risk, ticket, eventsTickets) => {
    const averagePrice = this.averageTicketPrice(eventsTickets)
    if (ticket.price > averagePrice) {
      const percentDifference = risk + averagePrice/ticket.price * 100
      if (percentDifference < 15) return risk - percentDifference
      return risk - 15
    } else if (ticket.price < averagePrice){
      return risk + ticket.price/averagePrice * 100
    } else return risk
  }

  calculateRiskBusinessHours = (risk, ticket) => {
    const date = new Date(ticket.createdAt)
    const hours = date.getHours()
    const mins = (date.getMinutes().toString().length === 1 ) ? '0'+date.getMinutes().toString() :date.getMinutes()
    const time = parseInt(`${hours}${mins}`)
    if (time >= 900 && hours <= 1700) return risk - 13
    return risk + 13
  }

  calculateRiskNumberComments = (risk, ticket) => {
    if (ticket.comments.length > 3) return risk + 6
    return risk
  }

  render() {
    const { ticket, tickets, eventsTickets } = this.props

    return (
      <div className='Container-Div'>
        {ticket === null && <Loading />}
        {!ticket && <NotFound message={`Ticket ${this.props.match.params.id}`}/>}
        {ticket && tickets && eventsTickets &&
        <Paper className='Details-Paper'>
          <Grid container spacing={8}>
            <Grid item xs={6} className='padding-1'>
              <img src={ticket.image} alt={`ticket for sale for ${ticket.event.name}`}/>
              <div className='padding-1' style={{borderLeft: '2px solid blue'}}>
              <Typography gutterBottom variant="display1" component="h1"> <AccountIcon />{ticket.sellerUser.firstName}</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='secondary'> <Warning />Risk: {this.calculateRiskFactor(ticket, tickets, eventsTickets)}%</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='primary'> <EuroSymbol />{ticket.price}</Typography>
              <div className='centered-flex'><Button href={`/events/${ticket.event.id}`} variant='contained' color='secondary'>Buy</Button></div>
              </div>
            </Grid>
            <Grid item xs={6} className='padding-1'>
              <img src={ticket.event.image} alt={`ticket for sale for ${ticket.event.name}`}/>
              <EventInfo event={ticket.event} description={''}/>
              <Typography>Average Price of Tickets: €{this.averageTicketPrice(eventsTickets)}</Typography>
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
