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
import SellTickets from '../../tickets/selltickets/SellTickets'
import Ticket from '../../tickets/TicketDetails'
import EventsTickets from '../../events/EventsTickets'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App Container-Div'>
          <nav>
            <NavBarWrapper />
          </nav>
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/tickets" component={TicketsList} />
            <Route exact path="/sell" component={SellTickets} />
            <Route exact path="/tickets/:id" component={Ticket} />
            <Route exact path="/events/:id/tickets" component={EventsTickets} />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
