import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/Loading'
import NotFound from '../app-layout/NotFound'
import TicketCard from '../tickets/TicketCard'

class EventDetails extends Component {

  render() {
    const { event } = this.props
    console.log(event)
    return (
      <div className='Container-Div'>
        {event === null && <Loading />}
        {!event && <NotFound message={`Event ${this.props.match.params.id}`}/>}
        {event &&
        <div>
          Event {event.name}
          {event.tickets.length ? event.tickets.map(ticket => <TicketCard ticket={ticket}/>) : <div>No tickets for sale currently, sell yours!</div>}
        </div>
        }
      </div>
    )
  }
}

const mapPropsToState = (state, props) => ({
  events: state.events,
  event: state.events && state.events[props.match.params.id]
})

export default connect(mapPropsToState)(EventDetails)
