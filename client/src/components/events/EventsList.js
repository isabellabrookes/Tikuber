import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../../actions/users'
import {getEvents} from '../../actions/events'

class EventsList extends PureComponent {
 componentWillMount(){
   if (this.props.events === null) this.props.getEvents()
 }
  render() {
   const { events } = this.props
    return (
      <div>
        { events && events.map(event => <div>{event.name}</div>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users === null ? null : state.users,
  events: state.events === null ? null : Object.values(state.events).sort((a, b) => b.startDate - a.startDate)
})

export default connect(mapStateToProps, {getEvents, getUsers})(EventsList)
