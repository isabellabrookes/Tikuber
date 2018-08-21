import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/app-layout/navbar/NavBar'
import LandingPage from './components/app-layout/landing/LandingPage'
import LoginPage from './components/user/login/LoginPage'
import SignupPage from './components/user/signup/SignupPage'
import LogoutPage from './components/user/logout/LogoutPage'
import EventsList from './components/events/EventsList'
import EventDetails from './components/events/EventDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <nav>
            <NavBar />
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
