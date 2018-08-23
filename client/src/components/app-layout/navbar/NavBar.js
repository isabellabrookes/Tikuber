import React from 'react'
import {connect} from 'react-redux'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router'
import AccountMenu from './AccountMenu'
import {userId} from '../../../jwt'

const NavBar = (props) => {
  const { location, history, user } = props

  return (
    <AppBar position="absolute" style={{zIndex:10, backgroundColor:'rgba(255,255,255,0.1)'}} >
      <Toolbar>
        <Button color="inherit" onClick={() => history.push('/')} style={{flex: 1, alignItems: 'flex-start'}}>
          <Typography variant="display1" color="inherit" >Tikuber</Typography>
        </Button>
        {
          !user && !location.pathname.includes('login') &&
          <Button variant="contained" color="primary" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          !user && location.pathname.includes('login') &&
          <Button variant="contained" color="primary" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          user && !location.pathname.includes('tickets/') &&
          <Button variant='contained' color="secondary" onClick={() => history.push('/tickets')}>All Tickets</Button>
        }
        {
          user && !location.pathname.includes('events/') &&
          <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button>
        }
        {
          user &&
          <AccountMenu user={user} history={history} />
        }
      </Toolbar>
    </AppBar>
  )
}

const MapStateToProps = state => ({
  user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)]
})

export default connect(MapStateToProps)(withRouter(NavBar))
