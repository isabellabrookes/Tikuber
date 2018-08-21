import {ADD_TICKET, UPDATE_TICKET, UPDATE_TICKETS} from '../actions/tickets'


export default (state = null, {type, payload}) => {
  switch (type) {

    case ADD_TICKET:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_TICKET:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_TICKETS:
      return payload.reduce((tickets, ticket) => {
        tickets[ticket.id] = ticket
        return tickets
      }, {})

    default:
      return state

  }
}
