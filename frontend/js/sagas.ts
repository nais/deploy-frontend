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
  APIKEY_ROTATE_REQUEST_FAILED,
  USERINFO_REQUEST,
  USERINFO_REQUEST_SUCCESS,
  USERINFO_REQUEST_FAILED
} from './config/actionTypes'

const apiKeysApiPath = '/downstream/api/v1/apikey/'
const rotateKeyApiPath = '/downstream/api/v1/apikey/'
const userInfoPath = '/me'

export function* fetchApiKeys() {
  try {
    yield put({ type: APIKEYS_REQUEST_FETCHING })
    const apiKeys = yield call(httpGet, apiKeysApiPath)
    yield put({ type: APIKEYS_REQUEST_SUCCESSFUL, value: apiKeys })
  } catch (e) {
    yield put({ type: APIKEYS_REQUEST_FAILED, error: e })
  }
}

export function* rotateKey(action) {
  try {
    yield put({ type: APIKEY_ROTATE_REQUEST_PROCESSING })
    yield call(httpPost, `${rotateKeyApiPath}${action.team}`)
    yield put({ type: APIKEY_ROTATE_REQUEST_SUCCESS })
    yield put({ type: APIKEYS_REQUEST })
  } catch (e) {
    yield put({ type: APIKEY_ROTATE_REQUEST_FAILED, error: e })
  }
}

export function* fetchUserInfo() {
  try {
    const userInfo = yield call(httpGet, userInfoPath)
    yield put({ type: USERINFO_REQUEST_SUCCESS, value: userInfo })
  } catch (e) {
    yield put({ type: USERINFO_REQUEST_FAILED, error: e })
  }
}

function* apiKeysSaga() {
  yield takeEvery(APIKEYS_REQUEST, fetchApiKeys)
  yield takeEvery(APIKEY_ROTATE_REQUEST, rotateKey)
  yield takeEvery(USERINFO_REQUEST, fetchUserInfo)
}

export default apiKeysSaga
