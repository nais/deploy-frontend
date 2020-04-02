import { call, put, takeEvery } from 'redux-saga/effects'
import { httpGet, httpPost } from './httpClient'
import {
  APIKEYS_REQUEST_FETCHING,
  APIKEYS_REQUEST_SUCCESSFUL,
  APIKEYS_REQUEST_FAILED,
  APIKEYS_REQUEST,
  APIKEY_ROTATE_REQUEST,
  APIKEY_ROTATE_REQUEST_PROCESSING,
  APIKEY_ROTATE_REQUEST_SUCCESS,
  APIKEY_ROTATE_REQUEST_FAILED
} from './actionTypes'

const apiKeysApiPath = '/downstream/api/v1/apikey/'
const rotateKeyApiPath = '/downstream/api/v1/apikey/'

function* fetchApiKeys() {
  try {
    yield put({ type: APIKEYS_REQUEST_FETCHING })
    const apiKeys = yield call(httpGet, apiKeysApiPath)
    yield put({ type: APIKEYS_REQUEST_SUCCESSFUL, value: apiKeys })
  } catch (e) {
    yield put({ type: APIKEYS_REQUEST_FAILED, error: e })
  }
}

function* rotateKey(action) {
  try {
    yield put({ type: APIKEY_ROTATE_REQUEST_PROCESSING })
    yield call(httpPost, `${rotateKeyApiPath}${action.team}` )
    yield put({ type: APIKEY_ROTATE_REQUEST_SUCCESS})
   yield put({ type: APIKEYS_REQUEST})
  } catch (e) {
      yield put({type: APIKEY_ROTATE_REQUEST_FAILED, error: e})
  }
}

function* apiKeysSaga() {
  yield takeEvery(APIKEYS_REQUEST, fetchApiKeys)
  yield takeEvery(APIKEY_ROTATE_REQUEST, rotateKey)
}

export default apiKeysSaga
