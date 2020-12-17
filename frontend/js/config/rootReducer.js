'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var redux_1 = require('redux')
var apiKeysReducer_1 = __importDefault(require('../apiKeys/apiKeysReducer'))
var rotateKeyReducer_1 = __importDefault(require('../apiKeys/rotate/rotateKeyReducer'))
var userInfoReducer_1 = __importDefault(require('../ui/userInfoReducer'))
var rootReducer = redux_1.combineReducers({
  apiKeys: apiKeysReducer_1['default'],
  rotateKey: rotateKeyReducer_1['default'],
  userInfo: userInfoReducer_1['default'],
})
exports['default'] = rootReducer
