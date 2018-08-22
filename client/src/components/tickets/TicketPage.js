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

class TicketPage extends Component {
  render() {
    const { ticket, eventsTickets } = this.props
    const averageTicketPrice = () => {
      if (eventsTickets) {
        return (eventsTickets.reduce((total, eventTicket) => total + parseFloat(eventTicket.price), 0) / eventsTickets.length).toFixed(2)
      }
    }

    const riskFactor = () => {

    }
    return (
      <div className='Container-Div'>
        {ticket === null && <Loading />}
        {!ticket && <NotFound message={`Ticket ${this.props.match.params.id}`}/>}
        {ticket &&
        <Paper className='Details-Paper'>
          <img src={ticket.image} />
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Typography gutterBottom variant="display2" component="h1"> <AccountIcon />{ticket.sellerUser.firstName}</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='secondary'> <Warning />Risk: %</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='primary'> <EuroSymbol />{ticket.price}</Typography>
            </Grid>
            <Grid item xs={6}>
              <EventInfo event={ticket.event} description={''}/>
              <Typography>Average Price of Tickets: €{averageTicketPrice()}</Typography>
            </Grid>
            <Grid item xs={12}>
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
  ticket: state.tickets && state.tickets[props.match.params.id],
  eventsTickets: state.tickets && state.events && Object.values(state.tickets).filter(ticket => ticket.event.id === state.tickets[props.match.params.id].event.id),
})

export default connect(mapStateToProps)(TicketPage)
