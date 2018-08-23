import React, {Component} from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import {userId} from '../../../jwt'
import {getUsers} from '../../../actions/users'
import {getEvents} from '../../../actions/events'
import {getTickets} from '../../../actions/tickets'
import {getComments} from '../../../actions/comments'
import {getVenues} from '../../../actions/venues'

class NavBarWrapper extends Component {
  componentWillMount() {
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
    if (this.props.venues === null) this.props.getVenues()
    if (this.props.tickets === null) this.props.getTickets()
    if (this.props.comments === null) this.props.getComments()
  }
  render() {
    const {user} = this.props
    return (
      <NavBar user={user}/>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)],
  events: state.events,
  tickets: state.tickets,
  comments: state.comments,
  venues: state.venues
})

export default connect(mapStateToProps, {getUsers, getEvents, getVenues, getTickets, getComments})(NavBarWrapper)
