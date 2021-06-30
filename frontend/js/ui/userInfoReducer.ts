import { USERINFO_REQUEST_SUCCESS, USERINFO_REQUEST_FAILED } from '../config/actionTypes'

export default (
  state = {
    userName: '',
  },
  action
) => {
  switch (action.type) {
    case USERINFO_REQUEST_SUCCESS:
      return {
        ...state,
        userName: `${action.value.givenName} ${action.value.surname}`,
      }
    case USERINFO_REQUEST_FAILED:
      return {
        ...state,
        userName: '',
      }

    default:
      return state
  }
}
