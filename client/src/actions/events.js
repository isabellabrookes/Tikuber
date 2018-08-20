export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'

const addEvent = event => ({
  type: ADD_EVENT,
  payload: event
})

const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: event
})
