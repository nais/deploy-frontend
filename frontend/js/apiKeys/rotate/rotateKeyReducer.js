'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
exports.__esModule = true
var actionTypes_1 = require('../../config/actionTypes')
exports['default'] = function (state, action) {
  if (state === void 0) {
    state = {
      status: '',
      errorMessage: '',
      confirmationPending: false,
      teamName: '',
    }
  }
  switch (action.type) {
    case actionTypes_1.APIKEY_ROTATE_CONFIRMATION:
      return __assign(__assign({}, state), { confirmationPending: true, teamName: action.value })
    case actionTypes_1.APIKEY_CANCEL_ROTATION: {
      return __assign(__assign({}, state), {
        confirmationPending: false,
        teamName: '',
        status: '',
        errorMessage: '',
      })
    }
    case actionTypes_1.APIKEY_ROTATE_REQUEST_PROCESSING:
      return __assign(__assign({}, state), { status: 'PROCESSING', errorMessage: '' })
    case actionTypes_1.APIKEY_ROTATE_REQUEST_SUCCESS:
      return __assign(__assign({}, state), {
        status: 'SUCCESS',
        confirmationPending: false,
        teamName: '',
      })
    case actionTypes_1.APIKEY_ROTATE_REQUEST_FAILED:
      return __assign(__assign({}, state), { status: 'ERROR', errorMessage: action.error })
    default:
      return state
  }
}
