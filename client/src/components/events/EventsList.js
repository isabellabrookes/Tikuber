import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import './EventList.css'
import EventCard from './EventCard'
import Grid from '@material-ui/core/Grid/Grid'

class EventsList extends PureComponent {
  render() {
   const { events } = this.props

    return (
        <Grid
          container
          spacing={16}
          direction="row"
          justify="space-evenly"
          alignItems="stretch"
        >
          { events && events.map(event => <Grid key={event.id} item xs={12} sm={6} md={3}><EventCard event={event}/></Grid>)}
        </Grid>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users === null ? null : state.users,
  events: state.events === null ? null : Object.values(state.events).sort((a, b) => new Date(b.startDate) - new Date(a.endDate))
})

export default connect(mapStateToProps)(EventsList)
