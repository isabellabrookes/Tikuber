import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import NavBarWrapper from '../navbar/NavBarWrapper'
import LandingPage from '../landing/LandingPage'
import LoginPage from '../../user/login/LoginPage'
import SignupPage from '../../user/signup/SignupPage'
import LogoutPage from '../../user/logout/LogoutPage'
import EventsList from '../../events/EventsList'
import EventDetails from '../../events/EventPage'
import TicketsList from '../../tickets/TicketsList'
import SellTickets from '../../tickets/SellTickets'
import Ticket from '../../tickets/TicketPage'
import EventsTickets from '../../events/EventsTickets'
import CreateEvent from '../../events/CreateEvent'
import NotFound404 from '../errors/NotFound404'
import {Switch} from 'react-router'
import MyTickets from '../../user/profile/MyTickets'
import EditTicket from '../../tickets/EditTicket'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App Container-Div'>
          <nav>
            <NavBarWrapper />
          </nav>
          <main>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/events" component={EventsList} />
              <Route exact path="/events/create" component={CreateEvent} />
              <Route exact path="/events/:id(\d+)" component={EventDetails} />
              <Route exact path="/events/:id(\d+)/tickets" component={EventsTickets} />
              <Route exact path="/tickets" component={TicketsList} />
              <Route exact path="/tickets/sell" component={SellTickets} />
              <Route exact path="/tickets/:id(\d+)" component={Ticket} />
              <Route exact path="/tickets/:id(\d+)/edit" component={EditTicket} />
              <Route exact path="/my/tickets" component={MyTickets}/>
              <Route component={NotFound404}/>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}
export default App
