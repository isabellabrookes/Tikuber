import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/errors/Loading'
import NotFound from '../app-layout/errors/NotFound'
import TicketCard from '../tickets/TicketCard'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card/Card'
import Button from '@material-ui/core/Button/Button'
import EventInfo from './EventInfo'

class EventPage extends Component {
  render() {
    const { event, eventTickets } = this.props
    return (
      <div>
        {event === null && <Loading />}
        {!event && <NotFound message={`Event ${this.props.match.params.id}`}/>}
        {event &&
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
          spacing={8}>
          <Grid item xs={12} sm={6}>
            <Paper className='Details-Paper' >
              <img src={event.image} alt={event.name}/>
              <EventInfo event={event} description={event.description} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} >
              {eventTickets && eventTickets.length ? (<div className='center-align-flex'>
                <Button className='padding-1' style={{margin: '1em'}} href={`/events/${event.id}/tickets`} variant="contained" color="secondary">
                  SEE ALL EVENT TICKETS
                </Button>
                {eventTickets.map(ticket => <TicketCard parent={'EventPage'} ticket={ticket}/>)}
              </div>) : <Card className='centered-flex-column' style={{padding: '1em', height:'100vh'}}>
                <Typography variant="title" style={{color: 'red'}}>No tickets for sale currently, sell yours!</Typography>
                <Button href={'/sell'} variant="contained" color="secondary">
                  Sell Tickets
                </Button>
              </Card>}
          </Grid>
        </Grid>
        }
      </div>
    )
  }
}

const mapPropsToState = (state, props) => ({
  event: state.events && state.events[props.match.params.id],
  eventTickets: state.tickets && state.events && Object.values(state.tickets).filter(ticket => ticket.event.id === parseInt(props.match.params.id, 10))

})

export default connect(mapPropsToState)(EventPage)
