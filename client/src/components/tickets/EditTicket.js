import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import TicketsForm from './TicketForm'
import {userId} from '../../jwt'
import {updateMyTicket} from '../../actions/tickets'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import Button from '@material-ui/core/Button/Button'

class EditTicket extends Component {
  handleSubmit = (data) => {
    this.props.updateMyTicket(parseInt(data.price,10), data.description, data.image, data.sellerUser, data.event, data.id)
    return (<Redirect to={"/my/tickets/"}/>)
  }

  render() {
    const { ticket, user, users } = this.props
    const ticketSeller = ticket && users && ticket.sellerUser.id === user.id
    return (
      <Paper className='Details-Paper padding-1 margin-1'>
        <Typography gutterBottom variant="display1" component="h1">Edit Ticket</Typography>
        {ticketSeller && <TicketsForm onSubmit={this.handleSubmit} />}

        { !user && <Grid container direction='column' justify='space-around' alignItems='center' style={{height:'40vh'}}>
            <Grid item>
              <Typography variant='title'>You need to be logged in to edit a ticket</Typography>
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
        }
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)],
  ticket: state.tickets && state.tickets[props.match.params.id],
  users: state.users
})

export default connect(mapStateToProps, {updateMyTicket})(EditTicket)
