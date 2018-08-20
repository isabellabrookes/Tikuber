import {ADD_EVENT, UPDATE_EVENT} from '../actions/events'


export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_EVENT:
      return {
        ...state,
        [payload.id]: payload
      }
    case UPDATE_EVENT:
      return {
        ...state,
        [payload.id]: payload
      }
    default:
      return state
  }
}
