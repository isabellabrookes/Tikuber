import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import './EventList.css'
import EventCard from './EventCard'
import Grid from '@material-ui/core/Grid/Grid'

class EventsList extends PureComponent {
  render() {
   const { events } = this.props

    return (
      <div className='EventList'>
        <Grid container
              className='EventList'
              spacing={16}
              direction="row"
              justify="space-around"
              alignItems="center"
        >
          { events && events.map(event => <Grid key={event.id} item sm={3}><EventCard event={event}/></Grid>)}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users === null ? null : state.users,
  events: state.events === null ? null : Object.values(state.events).sort((a, b) => new Date(b.startDate) - new Date(a.endDate))
})

export default connect(mapStateToProps)(EventsList)
