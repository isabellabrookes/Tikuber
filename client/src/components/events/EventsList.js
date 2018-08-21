import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import './EventList.css'
import {getUsers} from '../../actions/users'
import {getEvents} from '../../actions/events'
import EventCard from './EventCard'
import Grid from '@material-ui/core/Grid/Grid'

class EventsList extends PureComponent {
 componentWillMount(){
   if (this.props.events === null) this.props.getEvents()
 }
  render() {
   const { events } = this.props
    return (
      <div className='EventList'>
        <Grid container
              className='EventList'
              spacing={40}
              direction="row"
              justify="space-around"
              alignItems="center"
        >
          { events && events.map(event => <Grid key={event.id} item><EventCard  event={event}/></Grid>)}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users === null ? null : state.users,
  events: state.events === null ? null : Object.values(state.events).sort((a, b) => new Date(b.startDate) - new Date(a.endDate))
})

export default connect(mapStateToProps, {getEvents, getUsers})(EventsList)
