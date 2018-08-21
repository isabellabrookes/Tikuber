import * as request from 'superagent'
import {baseUrl} from '../constants'

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
