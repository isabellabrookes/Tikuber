import * as request from 'superagent'
import {baseUrl} from '../constants'

export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const UPDATE_EVENTS = 'UPDATE_EVENTS'

const addEvent = event => ({
  type: ADD_EVENT,
  payload: event
})

const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: event
})

const updateEvents = events => ({
  type: UPDATE_EVENTS,
  payload: events
})

export const getEvents = () => dispatch => {
  request
    .get(`${baseUrl}/events`)
    .then(result => dispatch(updateEvents(result.body)))
    .catch(err => console.error(err))
}
