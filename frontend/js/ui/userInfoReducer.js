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
      userName: '',
    }
  }
  switch (action.type) {
    case actionTypes_1.USERINFO_REQUEST_SUCCESS:
      return __assign(__assign({}, state), {
        userName: action.value.givenName + ' ' + action.value.surname,
      })
    case actionTypes_1.USERINFO_REQUEST_FAILED:
      return __assign(__assign({}, state), { userName: '' })
    default:
      return state
  }
}
