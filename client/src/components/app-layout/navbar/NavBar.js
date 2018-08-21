import React from 'react'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router'
import AccountMenu from './AccountMenu'

const NavBar = (props) => {
  const { location, history, user } = props

  return (
    <AppBar position="absolute" style={{zIndex:10}}>
      <Toolbar>
        <Typography variant="display1" color="inherit" style={{flex: 1}}>
          Tikuber
        </Typography>
        {
          user &&
          <AccountMenu user={user} history={history} />
        }
        {
          !user && !location.pathname.includes('login') &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          !user && !location.pathname.includes('signup') &&
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          user && !location.pathname.includes('events/') &&
          <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button>
        }
        {
          user && !location.pathname.includes('tickets/') &&
          <Button color="inherit" onClick={() => history.push('/tickets')}>All Tickets</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(NavBar)
