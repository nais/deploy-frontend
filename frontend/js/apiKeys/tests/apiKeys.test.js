import React from 'react'
import { ApiKeys } from '../apiKeys'
import NavFrontendSpinner from 'nav-frontend-spinner'
import TeamCard from '../teamCard'
import AlertStripe from 'nav-frontend-alertstriper'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import {
  APIKEYS_REQUEST,
  APIKEY_ROTATE_REQUEST,
  APIKEY_ROTATE_CONFIRMATION,
  APIKEY_CANCEL_ROTATION
} from '../../config/actionTypes'

const defaultProps = {
  apiKeys: [],
  fetchStatus: '',
  errorMessage: '',
  dispatch: () => {},
  rotateKey: {}
}

describe('(ApiKeys) Spinner is only visible when apikeys are loading', () => {
  const props = {
    ...defaultProps,
    fetchStatus: 'FETCHING'
  }

  const wrapper = shallow(<ApiKeys {...props} />)

  it('Spinner is visible', () => {
    expect(wrapper.exists(NavFrontendSpinner)).toBe(true)
  })
})

describe('(ApiKeys) Spinner is hidden when loading is complete', () => {
  const wrapper = shallow(<ApiKeys {...defaultProps} />)

  it('Spinner is hidden', () => {
    expect(wrapper.exists(NavFrontendSpinner)).toBe(false)
  })
})

describe('(ApiKeys) Error message is displayed when fetch status is ERROR', () => {
  const props = {
    ...defaultProps,
    fetchStatus: 'ERROR',
    errorMessage: 'Such error'
  }

  it('Error message is displayed', () => {
    const wrapper = shallow(<ApiKeys {...props} />)

    expect(wrapper.exists('AlertStripe')).toBe(true)
    expect(
      wrapper
        .find(AlertStripe)
        .childAt(1)
        .html()
    ).toContain('Such error')
  })
})

describe('(ApiKeys) Correct dispatch action is triggered when executing rotateKey function', () => {
  const dispatch = sinon.spy()
  const props = { ...defaultProps, dispatch }
  const wrapper = shallow(<ApiKeys {...props} />)

  it('ApiKeys_Request is triggers on component mount and apikey_rotate_request when rotateKey function is executed', () => {
    wrapper.instance().rotateKey('aTeam')
    expect(dispatch.args[0][0].type).toBe(APIKEYS_REQUEST)
    expect(dispatch.args[1][0].type).toBe(APIKEY_ROTATE_REQUEST)
    expect(dispatch.args[1][0].team).toBe('aTeam')
  })
})

describe('(ApiKeys) Correct dispatch action is triggered when showing and hiding confirmation modal', () => {
  const dispatch = sinon.spy()
  const props = { ...defaultProps, dispatch }
  const wrapper = shallow(<ApiKeys {...props} />)

  it('Toggle modal is triggered with correct teamname', () => {
    wrapper.instance().showConfirmationModal('aTeam')

    expect(dispatch.args[1][0].type).toBe(APIKEY_ROTATE_CONFIRMATION)
    expect(dispatch.args[1][0].value).toBe('aTeam')
    wrapper.instance().cancelKeyRotation()
    expect(dispatch.args[2][0].type).toBe(APIKEY_CANCEL_ROTATION)
  })
})

describe('(ApiKeys) List of API keys from backend are grouped by team.', () => {
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
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00'
    },
    {
      team: 'team3',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00'
    },
    {
      team: 'team2',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'aBitOlderKey',
      created: '2019-03-16T10:29:58.05+01:00',
      expires: '2020-03-16T10:30:23.655+01:00'
    },
    {
      team: 'team3',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00'
    },
    {
      team: 'team3',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00'
    }
  ]

  it('One teamCard component is shown pr team', () => {
    const props = { ...defaultProps, apiKeys }
    const wrapper = shallow(<ApiKeys {...props} />)
    expect(wrapper.find(TeamCard).length).toBe(3)
  })
})
