import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/errors/Loading'
import Typography from '@material-ui/core/Typography/Typography'
import TicketCard from './TicketCard'
import Grid from '@material-ui/core/Grid/Grid'

class TicketsList extends Component {
  render() {
    const { tickets } = this.props
    return (
      <Grid
        container
        spacing={16}
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        <Typography gutterBottom variant="display1" component="h1">Tickets List</Typography>
        {tickets === null && <Loading/>}
        {tickets && tickets.map(ticket => <Grid item ><TicketCard parent={'TicketsList'} ticket={ticket}/></Grid>)}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets === null ? null : Object.values(state.tickets).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
})

export default connect(mapStateToProps)(TicketsList)
