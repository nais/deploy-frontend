'use strict'
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
exports.__esModule = true
exports.fetchUserInfo = exports.rotateKey = exports.fetchApiKeys = void 0
var effects_1 = require('redux-saga/effects')
var httpClient_1 = require('./httpClient')
var actionTypes_1 = require('./config/actionTypes')
var apiKeysApiPath = '/downstream/api/v1/apikey/'
var rotateKeyApiPath = '/downstream/api/v1/apikey/'
var userInfoPath = '/me'
function fetchApiKeys() {
  var apiKeys, e_1
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        _a.trys.push([0, 4, , 6])
        return [4 /*yield*/, effects_1.put({ type: actionTypes_1.APIKEYS_REQUEST_FETCHING })]
      case 1:
        _a.sent()
        return [4 /*yield*/, effects_1.call(httpClient_1.httpGet, apiKeysApiPath)]
      case 2:
        apiKeys = _a.sent()
        return [
          4 /*yield*/,
          effects_1.put({ type: actionTypes_1.APIKEYS_REQUEST_SUCCESSFUL, value: apiKeys }),
        ]
      case 3:
        _a.sent()
        return [3 /*break*/, 6]
      case 4:
        e_1 = _a.sent()
        return [
          4 /*yield*/,
          effects_1.put({ type: actionTypes_1.APIKEYS_REQUEST_FAILED, error: e_1 }),
        ]
      case 5:
        _a.sent()
        return [3 /*break*/, 6]
      case 6:
        return [2 /*return*/]
    }
  })
}
exports.fetchApiKeys = fetchApiKeys
function rotateKey(action) {
  var e_2
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        _a.trys.push([0, 5, , 7])
        return [
          4 /*yield*/,
          effects_1.put({ type: actionTypes_1.APIKEY_ROTATE_REQUEST_PROCESSING }),
        ]
      case 1:
        _a.sent()
        return [
          4 /*yield*/,
          effects_1.call(httpClient_1.httpPost, '' + rotateKeyApiPath + action.team),
        ]
      case 2:
        _a.sent()
        return [4 /*yield*/, effects_1.put({ type: actionTypes_1.APIKEY_ROTATE_REQUEST_SUCCESS })]
      case 3:
        _a.sent()
        return [4 /*yield*/, effects_1.put({ type: actionTypes_1.APIKEYS_REQUEST })]
      case 4:
        _a.sent()
        return [3 /*break*/, 7]
      case 5:
        e_2 = _a.sent()
        return [
          4 /*yield*/,
          effects_1.put({ type: actionTypes_1.APIKEY_ROTATE_REQUEST_FAILED, error: e_2 }),
        ]
      case 6:
        _a.sent()
        return [3 /*break*/, 7]
      case 7:
        return [2 /*return*/]
    }
  })
}
exports.rotateKey = rotateKey
function fetchUserInfo() {
  var userInfo, e_3
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        _a.trys.push([0, 3, , 5])
        return [4 /*yield*/, effects_1.call(httpClient_1.httpGet, userInfoPath)]
      case 1:
        userInfo = _a.sent()
        return [
          4 /*yield*/,
          effects_1.put({ type: actionTypes_1.USERINFO_REQUEST_SUCCESS, value: userInfo }),
        ]
      case 2:
        _a.sent()
        return [3 /*break*/, 5]
      case 3:
        e_3 = _a.sent()
        return [
          4 /*yield*/,
          effects_1.put({ type: actionTypes_1.USERINFO_REQUEST_FAILED, error: e_3 }),
        ]
      case 4:
        _a.sent()
        return [3 /*break*/, 5]
      case 5:
        return [2 /*return*/]
    }
  })
}
exports.fetchUserInfo = fetchUserInfo
function apiKeysSaga() {
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        return [4 /*yield*/, effects_1.takeEvery(actionTypes_1.APIKEYS_REQUEST, fetchApiKeys)]
      case 1:
        _a.sent()
        return [4 /*yield*/, effects_1.takeEvery(actionTypes_1.APIKEY_ROTATE_REQUEST, rotateKey)]
      case 2:
        _a.sent()
        return [4 /*yield*/, effects_1.takeEvery(actionTypes_1.USERINFO_REQUEST, fetchUserInfo)]
      case 3:
        _a.sent()
        return [2 /*return*/]
    }
  })
}
exports['default'] = apiKeysSaga
