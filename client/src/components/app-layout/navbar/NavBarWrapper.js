import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import NavBar from './NavBar'
import {userId} from '../../../jwt'
import {getUsers} from '../../../actions/users'
import {getEvents} from '../../../actions/events'
import {getComments} from '../../../actions/comments'

class NavBarWrapper extends Component {
  componentWillMount() {
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
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
  comments: state.comments
})

export default connect(mapStateToProps, {getUsers, getEvents, getComments})(NavBarWrapper)
