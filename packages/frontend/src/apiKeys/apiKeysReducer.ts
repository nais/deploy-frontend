import {
  APIKEYS_REQUEST_FETCHING,
  APIKEYS_REQUEST_SUCCESSFUL,
  APIKEYS_REQUEST_FAILED,
} from '../config/actionTypes'

const apiKeyReducer = (
  state = {
    data: [],
    status: '',
    errorMessage: '',
  },
  action
) => {
  switch (action.type) {
    case APIKEYS_REQUEST_FETCHING:
      return {
        ...state,
        status: 'FETCHING',
      }
    case APIKEYS_REQUEST_SUCCESSFUL:
      return {
        ...state,
        status: 'SUCCESS',
        data: action.value,
      }
    case APIKEYS_REQUEST_FAILED:
      return {
        ...state,
        data: [],
        status: 'ERROR',
        errorMessage: action.error,
      }
    default:
      return state
  }
}

export default apiKeyReducer
