import React from 'react'
import connect from 'react-redux/es/connect/connect'
import Loading from '../app-layout/Loading'
import NotFound from '../app-layout/NotFound'
import TicketCard from '../tickets/TicketCard'

const EventsTickets = (props) => {
  const { event, tickets } = props
  return (
    <div>
      {!event && <NotFound message={`Event ${props.match.params.id}`}/>}
      {tickets === null && <Loading />}
      {tickets && tickets.map(ticket => <TicketCard parent={'EventTickets'} ticket={ticket}/>)}
    </div>
  )
}

const mapPropsToState = (state, props) => ({
  event: state.events && state.events[props.match.params.id],
  tickets: state.events && state.events[props.match.params.id] && state.events[props.match.params.id].tickets
})

export default connect(mapPropsToState)(EventsTickets)
