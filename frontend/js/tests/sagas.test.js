import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { fetchApiKeys, rotateKey } from '../sagas'
import apiKeysReducer from '../apiKeys/apiKeysReducer'
import rotateKeyReducer from '../apiKeys/rotate/rotateKeyReducer'
import { httpGet, httpPost } from '../httpClient'

import { APIKEYS_REQUEST, APIKEY_ROTATE_REQUEST } from '../config/actionTypes'

it('(Fetch apikeys saga) Fetches list of apikeys', () => {
  const action = {
    type: APIKEYS_REQUEST
  }
  return expectSaga(fetchApiKeys, action)
    .withReducer(apiKeysReducer)
    .provide([[matchers.call.fn(httpGet), apiKeys]])
    .hasFinalState({ data: apiKeys, status: 'SUCCESS', errorMessage: '' })
    .run()
})

it('(Fetch apikeys saga) Handles errors from backend', () => {
  const action = {
    type: APIKEYS_REQUEST
  }
  return expectSaga(fetchApiKeys, action)
    .withReducer(apiKeysReducer)
    .provide([[matchers.call.fn(httpGet), throwError('Error message')]])
    .hasFinalState({ data: [], status: 'ERROR', errorMessage: 'Error message' })
    .run()
})

it('(Rotate apikeys saga) Rotates apikey for a specific team and requests a new fetch of apiKeys', () => {
  const action = {
    type: APIKEY_ROTATE_REQUEST,
    team: 'aTeam'
  }
  return expectSaga(rotateKey, action)
    .withReducer(rotateKeyReducer)
    .provide([[matchers.call.fn(httpPost), apiKeys[0]]])
    .call(httpPost, '/downstream/api/v1/apikey/aTeam')
    .put({ type: APIKEYS_REQUEST })
    .hasFinalState({
      status: 'SUCCESS',
      confirmationPending: false,
      teamName: '',
      errorMessage: ''
    })
    .run()
})

it('(Rotate apikeys saga) Handles errors when rotating key', () => {
  const action = {
    type: APIKEY_ROTATE_REQUEST,
    team: 'aTeam'
  }
  return expectSaga(rotateKey, action)
    .withReducer(rotateKeyReducer)
    .provide([[matchers.call.fn(httpPost), throwError('Error message')]])
    .hasFinalState({
      status: 'ERROR',
      errorMessage: 'Error message',
      teamName: '',
      confirmationPending: false
    })
    .run()
})

const apiKeys = [
  {
    team: 'team1',
    groupId: '6fbc76c4-7909-4e58-99fa-64d542567c8c',
    key: 'theNewestKey',
    created: '2020-03-16T10:29:58.05+01:00',
    expires: '2022-03-16T10:30:23.655+01:00'
  },
  {
    team: 'team1',
    groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
    key: 'aBitOlderKey',
    created: '2019-03-16T10:29:58.05+01:00',
    expires: '2020-03-16T10:30:23.655+01:00'
  },
  {
    team: 'team1',
    groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
    key: 'theOldestKey',
    created: '2018-03-16T10:29:58.05+01:00',
    expires: '2019-03-16T10:30:23.655+01:00'
  }
]
