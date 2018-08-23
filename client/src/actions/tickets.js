import * as request from 'superagent'
import {baseUrl} from '../constants'
import {isExpired} from '../jwt'
import {logout} from './users'

export const ADD_TICKET = 'ADD_TICKET'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const UPDATE_TICKETS = 'UPDATE_TICKETS'

const addTicket = ticket => ({
  type: ADD_TICKET,
  payload: ticket
})

const updateTicket = ticket => ({
  type: UPDATE_TICKET,
  payload: ticket
})

const updateTickets = tickets => ({
  type: UPDATE_TICKETS,
  payload: tickets
})

export const getTickets = () => dispatch => {
  request
    .get(`${baseUrl}/tickets`)
    .then(result => dispatch(updateTickets(result.body)))
    .catch(err => console.error(err))
}

export const createTicket = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/Tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result =>dispatch(addTicket(result.body)))
    .catch(err => console.log(err))
}
