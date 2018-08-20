import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class LandingPage extends Component {

  render() {
    const {authenticated} = this.props

    if (authenticated) return (
      <Redirect to="/" />
    )

    return (
      <div id={'LandingPage-Main'}>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null
})

export default connect(mapStateToProps)(LandingPage)
