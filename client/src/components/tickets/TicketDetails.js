import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/Loading'
import NotFound from '../app-layout/NotFound'

class TicketDetails extends Component {
  render() {
    const {ticket} = this.props
    return (
      <div className='Container-Div'>
        {ticket === null && <Loading />}
        {!ticket && <NotFound message={`Ticket ${this.props.match.params.id}`}/>}
        {ticket &&
        <div>
          Ticket {ticket.id}
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ticket: state.tickets && state.tickets[props.match.params.id]
})

export default connect(mapStateToProps)(TicketDetails)
