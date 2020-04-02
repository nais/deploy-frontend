import { combineReducers } from 'redux'
import apiKeys from './apiKeys/apiKeysReducer'
import rotateKey from './apiKeys/rotateKeyReducer'

const rootReducer = combineReducers({
  apiKeys,
  rotateKey
})

export default rootReducer
