import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../../app-layout/errors/Loading'
import {userId} from '../../../jwt'
import Typography from '@material-ui/core/Typography/Typography'
import TicketCard from './../../tickets/TicketCard'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import Button from '@material-ui/core/Button/Button'

class MyTickets extends Component {
  render() {
    const { tickets, user } = this.props
    const mySellingTickets = tickets && user && tickets.filter(ticket => ticket.sellerUser.id === user.id)

    return (
      <Grid
        container
        spacing={16}
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        {tickets === null && <Loading/>}
        <Typography gutterBottom variant="display1" component="h1" color="secondary">My Tickets For Sale</Typography>
        <Button href={'/tickets/sell'} variant="contained" color="secondary" className='padding-1' style={{margin: '1em'}}>
          Sell Tickets
        </Button>
          {tickets && user && !mySellingTickets.length && (
            <Paper>
              <Typography>No Tickets For Sale</Typography>
            </Paper>) }
          {tickets && user && mySellingTickets.length && mySellingTickets.map(ticket => <Grid item ><TicketCard parent={'MyTickets-Selling'} ticket={ticket}/></Grid>)}

        </Grid>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)],
  tickets: state.tickets === null ? null : Object.values(state.tickets).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
})

export default connect(mapStateToProps)(MyTickets)
