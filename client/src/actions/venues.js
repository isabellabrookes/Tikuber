import * as request from 'superagent'
import {baseUrl} from '../constants'

export const UPDATE_VENUES = 'UPDATE_VENUES'

const updateVenues = venues => ({
  type: UPDATE_VENUES,
  payload: venues
})

export const getVenues = () => dispatch => {
  request
  .get(`${baseUrl}/venues`)
  .then(result => dispatch(updateVenues(result.body)))
  .catch(err => console.log(err))
}
