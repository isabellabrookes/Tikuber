import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/Loading'
import NotFound from '../app-layout/NotFound'
import TicketCard from '../tickets/TicketCard'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card/Card'
import Button from '@material-ui/core/Button/Button'
import EventInfo from './EventInfo'

class EventPage extends Component {
  render() {
    const { event } = this.props

    return (
      <div>
        {event === null && <Loading />}
        {!event && <NotFound message={`Event ${this.props.match.params.id}`}/>}
        {event &&
        <Grid
          container
          spacing={8}>
          <Grid item xs={8}>
            <Paper className='Details-Paper'>
              <img src={event.image} />
              <EventInfo event={event} description={event.description} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className='Details-Paper'>
              {event.tickets.length ? (<div className='center-align-flex'>
                <Button style={{margin: 'auto'}}href={`/events/${event.id}/tickets`} variant="contained" color="secondary">
                  SEE ALL TICKETS
                </Button>
                {event.tickets.map(ticket => <TicketCard parent={'EventDetails'} ticket={ticket}/>)}
              </div>) : <Card className='centered-flex' style={{padding: '1em', height:'100vh'}}>
                <Typography variant="title" style={{color: 'red'}}>No tickets for sale currently, sell yours!</Typography>
                <Button href={'/sell'} variant="contained" color="secondary">
                  Sell Tickets
                </Button>
              </Card>}
            </Paper>
          </Grid>
        </Grid>
        }
      </div>
    )
  }
}

const mapPropsToState = (state, props) => ({
  event: state.events && state.events[props.match.params.id]
})

export default connect(mapPropsToState)(EventPage)
