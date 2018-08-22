import {ADD_USER, UPDATE_USER, UPDATE_USERS, USER_LOGIN_SUCCESS, USER_LOGOUT} from '../actions/users'
import {localStorageJwtKey} from '../constants'

/*
The state will contain the users in an object with the game ID as key
*/

const users = (state = null, {type, payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
      
    case ADD_USER:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_USER:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_USERS:
      return payload.reduce((users, user) => {
        users[user.id] = user
        return users
      }, {})

    default:
      return state
  }
}
