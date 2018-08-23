import * as request from 'superagent'
import {baseUrl} from '../constants'
import {isExpired} from '../jwt'
import {logout} from './users'

export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'

const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
})

const updateComment = comment => ({
  type: UPDATE_COMMENT,
  payload: comment
})

const updateComments = comments => ({
  type: UPDATE_COMMENTS,
  payload: comments
})

export const getComments = () => dispatch => {
  request
    .get(`${baseUrl}/comments`)
    .then(result => dispatch(updateComments(result.body)))
    .catch(err => console.log(err))
}

export const createComment = (comment, ticket, user) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({comment, ticket, user})
    .then(result =>dispatch(addComment(result.body)))
    .catch(err => console.log(err))
}
