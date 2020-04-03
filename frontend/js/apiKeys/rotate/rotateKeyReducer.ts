import {
    APIKEY_ROTATE_REQUEST_PROCESSING,
    APIKEY_ROTATE_REQUEST_SUCCESS,
    APIKEY_ROTATE_REQUEST_FAILED,
    APIKEY_ROTATE_CONFIRMATION,
    APIKEY_CANCEL_ROTATION
  } from '../../config/actionTypes'
  
  export default (
    state = {
      status: '',
      errorMessage: '', 
      confirmationPending: false,
      teamName: ''
    },
    action
  ) => {
    switch (action.type) {
      case APIKEY_ROTATE_CONFIRMATION:
          return {
              ...state, 
              confirmationPending: true,
              teamName: action.value
          }
          case APIKEY_CANCEL_ROTATION: {
              return {
                  ...state,
                  confirmationPending: false,
                  teamName: '',
                  status: '',
                  errorMessage: ''
              }
          }

      case APIKEY_ROTATE_REQUEST_PROCESSING:
        return {
          ...state,
          status: 'PROCESSING',
          errorMessage: ''
        }
      case APIKEY_ROTATE_REQUEST_SUCCESS:
        return {
          ...state,
          status: 'SUCCESS',
          confirmationPending: false,
          teamName: ''

        }
      case APIKEY_ROTATE_REQUEST_FAILED:
        return {
          ...state,
          status: 'ERROR',
          errorMessage: action.error
        }
      default:
        return state
    }
  }
  