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
var actionTypes_1 = require('../config/actionTypes')
exports['default'] = function (state, action) {
  if (state === void 0) {
    state = {
      data: [],
      status: '',
      errorMessage: '',
    }
  }
  switch (action.type) {
    case actionTypes_1.APIKEYS_REQUEST_FETCHING:
      return __assign(__assign({}, state), { status: 'FETCHING' })
    case actionTypes_1.APIKEYS_REQUEST_SUCCESSFUL:
      return __assign(__assign({}, state), { status: 'SUCCESS', data: action.value })
    case actionTypes_1.APIKEYS_REQUEST_FAILED:
      return __assign(__assign({}, state), {
        data: [],
        status: 'ERROR',
        errorMessage: action.error,
      })
    default:
      return state
  }
}
