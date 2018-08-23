import React, {Component} from 'react'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper/Paper'
import TicketsForm from './TicketForm'
import Typography from '@material-ui/core/Typography/Typography'
import {createTicket} from '../../actions/tickets'
import Grid from '@material-ui/core/Grid/Grid'
import Button from '@material-ui/core/Button/Button'

class SellTickets extends Component {
  handleSubmit = (data) => {
    this.props.createTicket(parseInt(data.price,10), data.description, data.image, data.sellerUser, data.event)
  }
  render() {
    const { authenticated } = this.props

    return (
      <Paper className='Details-Paper padding-1 margin-1'>
        <Typography gutterBottom variant="display1" component="h1">Sell Tickets</Typography>
        {authenticated ? <TicketsForm onSubmit={this.handleSubmit} /> : (
          <Grid container direction='column' justify='space-around' alignItems='center' style={{height:'40vh'}}>
            <Grid item>
            <Typography variant='title'>You need to be logged in to sell a ticket</Typography>
            </Grid>
            <Grid container direction='row' justify='space-around' style={{width:'50%'}}>
              <Grid item>
                <Button href={'/login'} variant="contained" color="secondary">
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button href={'/signup'} variant="contained" color="primary">
                  Signup
                </Button>
              </Grid>
            </Grid>
          </Grid>
          )}
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null
})

export default connect(mapStateToProps, {createTicket})(SellTickets)
