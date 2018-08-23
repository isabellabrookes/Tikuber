import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper/Paper'
import connect from 'react-redux/es/connect/connect'
import Typography from '@material-ui/core/Typography/Typography'
import {userId} from '../../jwt'
import {Redirect} from 'react-router'
import Grid from '@material-ui/core/Grid/Grid'
import Button from '@material-ui/core/Button/Button'
import EventForm from './EventForm'

class CreateEvent extends Component {
  render() {
    const { authenticated, user } = this.props
    if (authenticated && user && user.role.type !== 'Admin') return (
      <Redirect to={"/"}/>
    )

    return (
      <Paper className='Details-Paper padding-1 margin-1'>
        <Typography gutterBottom variant="display1" component="h1">Create Event</Typography>

        {(user && user.role.type === 'Admin') ?  (
          <EventForm />
        ) : (
          <Grid container direction='column' justify='space-around' alignItems='center' style={{height:'40vh'}}>
            <Grid item>
              <Typography variant='title'>You need to be logged in as an admin to create an event</Typography>
            </Grid>
            <Grid item>
              <Button href={'/login'} variant="contained" color="secondary">
                Login
              </Button>
            </Grid>
          </Grid>
        )}


          </Paper>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)]
})

export default connect(mapStateToProps)(CreateEvent)
