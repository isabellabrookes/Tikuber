import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/Loading'
import Typography from '@material-ui/core/Typography/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import TicketCard from './TicketCard'

class TicketsList extends Component {
  render() {
    const { tickets } = this.props
    return (
      <Paper className='Details-Paper Details-Paper-Inner-Div '>
        <Typography gutterBottom variant="display1" component="h1">Tickets List</Typography>
        {tickets === null && <Loading/>}
        {tickets && tickets.map(ticket => <TicketCard parent={'TicketsList'} ticket={ticket}/>)}
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets === null ? null : Object.values(state.tickets).sort((a,b) => b.id - a.id)
})

export default connect(mapStateToProps)(TicketsList)
