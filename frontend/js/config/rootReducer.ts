import { combineReducers } from 'redux'
import apiKeys from '../apiKeys/apiKeysReducer'
import rotateKey from '../apiKeys/rotate/rotateKeyReducer'
import userInfo from '../ui/userInfoReducer'

const rootReducer = combineReducers({
  apiKeys,
  rotateKey,
  userInfo
})

export default rootReducer
