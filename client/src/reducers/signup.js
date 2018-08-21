import {
	USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED
} from '../actions/users'

export default function (state = null, {type, payload}) {
	switch(type) {
    case USER_SIGNUP_SUCCESS:
      return {
        success: true
      }

    case USER_SIGNUP_FAILED:
      return {
        error: payload
      }

		default:
      return state
	}
}
