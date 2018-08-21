import * as request from 'superagent'
import {baseUrl} from '../constants'

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
