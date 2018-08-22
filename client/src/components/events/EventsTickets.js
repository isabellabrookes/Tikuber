import React from 'react'
import connect from 'react-redux/es/connect/connect'
import Loading from '../app-layout/Loading'
import NotFound from '../app-layout/NotFound'
import TicketCard from '../tickets/TicketCard'
import Typography from '@material-ui/core/Typography/Typography'
import Paper from '@material-ui/core/Paper/Paper'

const EventsTickets = (props) => {
  const { event, tickets } = props
  return (
    <div>
      {!event && <NotFound message={`Event ${props.match.params.id}`}/>}
      {tickets === null && <Loading />}
      {tickets && (
        <Paper>
          <Typography gutterBottom variant="display1" component="h1">Tickets For {event.name}</Typography>
          {tickets.map(ticket => <TicketCard parent={'EventTickets'} ticket={ticket}/>)}
        </Paper>
      )}
    </div>
  )
}

const mapPropsToState = (state, props) => ({
  event: state.events && state.events[props.match.params.id],
  tickets: state.events && state.events[props.match.params.id] && state.events[props.match.params.id].tickets
})

export default connect(mapPropsToState)(EventsTickets)
