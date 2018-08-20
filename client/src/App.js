import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/app-layout/navbar/NavBar'
import LandingPage from './components/app-layout/landing/LandingPage'
import LoginPage from './components/user/login/LoginPage'
import SignupPage from './components/user/signup/SignupPage'
import GamesList from './components/games/GamesList'
import GameDetails from './components/games/GameDetails'
import LogoutPage from './components/user/logout/LogoutPage'

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
            <Route exact path="/games" component={GamesList} />
            <Route exact path="/games/:id" component={GameDetails} />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
