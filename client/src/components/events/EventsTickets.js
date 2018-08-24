import React from 'react'
import connect from 'react-redux/es/connect/connect'
import Loading from '../app-layout/errors/Loading'
import NotFound from '../app-layout/errors/NotFound'
import TicketCard from '../tickets/TicketCard'
import Typography from '@material-ui/core/Typography/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import Button from '@material-ui/core/Button/Button'
import EventInfo from './EventInfo'
import Grid from '@material-ui/core/Grid/Grid'

const EventsTickets = (props) => {
  const { event, eventTickets } = props
  return (
    <div className='Container-Div'>
      {!event && <NotFound message={`Event ${props.match.params.id}`}/>}
      {event && eventTickets === null && <Loading />}
      {event && eventTickets && (
        <Paper className='Container-Div'>
          <Grid container className='padding-1'>
            <Grid item xs={6}><img src={event.image} alt={event.name} style={{height: "200px", borderRadius: "1em"}}/></Grid>
            <Grid item xs={6}><EventInfo event={event} /></Grid>
            <Grid item xs={12} sm={12}><Button href={`/events/${event.id}`} variant='contained' color='secondary' className='width-100'>Back To Event</Button></Grid>
          </Grid>
          {eventTickets.length ? eventTickets.map(ticket => <TicketCard parent={'EventTickets'} ticket={ticket}/>) : (
            <div className='padding-1 centered-flex-column'>
              <Typography>No tickets for sale</Typography>
              {new Date() > new Date(event.endDate) ? <Typography color='secondary'>The event has ended</Typography> : (<Button href={'/sell'} variant="contained" color="secondary">
                Sell Tickets
              </Button>)}
            </div>)}
        </Paper>
      )}
    </div>
  )
}

const mapPropsToState = (state, props) => ({
  event: state.events && state.events[props.match.params.id],
  eventTickets: state.tickets && state.events && Object.values(state.tickets).filter(ticket => ticket.event.id === parseInt(props.match.params.id, 10))
})

export default connect(mapPropsToState)(EventsTickets)
