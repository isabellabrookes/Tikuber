import {UPDATE_VENUES} from '../actions/venues'

export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_VENUES:
      return payload.reduce((venues, venue) => {
        venues[venue.id] = venue
        return venues
      }, {})

    default:
      return state
  }
}
