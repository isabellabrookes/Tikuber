import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import NavBarWrapper from '../navbar/NavBarWrapper'
import LandingPage from '../landing/LandingPage'
import LoginPage from '../../user/login/LoginPage'
import SignupPage from '../../user/signup/SignupPage'
import LogoutPage from '../../user/logout/LogoutPage'
import EventsList from '../../events/EventsList'
import EventDetails from '../../events/EventDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <nav>
            <NavBarWrapper />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/:id" component={EventDetails} />
            {/*<Route exact path="/events/:id" component={GameDetails} />*/}
          </main>
        </div>
      </Router>
    )
  }
}
export default App
