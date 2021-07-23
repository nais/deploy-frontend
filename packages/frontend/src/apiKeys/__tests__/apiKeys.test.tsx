import React from 'react'
import { ApiKeys } from '../apiKeys'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import {
  APIKEYS_REQUEST,
  APIKEY_ROTATE_CONFIRMATION,
  APIKEY_CANCEL_ROTATION,
} from '../../config/actionTypes'

const defaultProps = {
  apiKeys: [],
  fetchStatus: '',
  errorMessage: '',
  dispatch: () => {},
  rotateKey: {
    status: '',
    errorMessage: '',
    confirmationPending: true,
    teamName: '',
  },
}

describe('(ApiKeys) Spinner is only visible when apikeys are loading', () => {
  const props = {
    ...defaultProps,
    fetchStatus: 'FETCHING',
  }

  const wrapper = render(<ApiKeys {...props} />)

  it('Spinner is visible', () => {
    expect(wrapper.queryByLabelText('Laster innhold')).toBeTruthy()
  })
})

describe('(ApiKeys) Spinner is hidden when loading is complete', () => {
  const wrapper = render(<ApiKeys {...defaultProps} />)

  it('Spinner is hidden', () => {
    expect(wrapper.queryByLabelText('Laster innhold')).toBeFalsy()
  })
})

describe('(ApiKeys) Error message is displayed when fetch status is ERROR', () => {
  const props = {
    ...defaultProps,
    fetchStatus: 'ERROR',
    errorMessage: 'Such error',
  }

  it('Error message is displayed', () => {
    const wrapper = render(<ApiKeys {...props} />)

    expect(wrapper.queryByText('An error occured when fetching apikeys.')).toBeTruthy()
    expect(wrapper.queryByText('Such error')).toBeTruthy()
  })
})

describe('(ApiKeys) Correct dispatch action is triggered when executing rotateKey function', () => {
  const dispatch = jest.fn()
  const props = {
    ...defaultProps,
    dispatch,
    apiKeys: [
      {
        team: 'team3',
        groupId: '54fb2d74-97bd-40c2-a112-085de2739fc6',
        key: 'b4n4nk4k353c328714ec75dd31c32b8aaca7eaee06fa36ac7c79322f574ce571',
        expires: '2025-03-23T14:05:18.555205Z',
        created: '2020-03-23T14:05:18.555205Z',
      },
    ],
  }

  it('ApiKeys_Request is triggers on component mount and apikey_rotate_request when rotateKey function is executed', async () => {
    render(<ApiKeys {...props} />)
    await waitFor(() => screen.getByText('Rotate key'))
    fireEvent.click(screen.getByText('Rotate key'))
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: APIKEYS_REQUEST })
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: APIKEY_ROTATE_CONFIRMATION,
      value: 'team3',
    })
  })
})

describe('(ApiKeys) Correct dispatch action is triggered when showing and hiding confirmation modal', () => {
  const dispatch = jest.fn()
  const props = {
    ...defaultProps,
    dispatch,
    apiKeys: [
      {
        team: 'team3',
        groupId: '54fb2d74-97bd-40c2-a112-085de2739fc6',
        key: 'b4n4nk4k353c328714ec75dd31c32b8aaca7eaee06fa36ac7c79322f574ce571',
        expires: '2025-03-23T14:05:18.555205Z',
        created: '2020-03-23T14:05:18.555205Z',
      },
    ],
  }

  it('Toggle modal is triggered with correct teamname', async () => {
    render(<ApiKeys {...props} />)
    await waitFor(() => screen.getByText('Rotate key'))
    fireEvent.click(screen.getByText('Rotate key'))

    expect(screen.queryByText('Warning')).toBeTruthy()
    expect(screen.queryByText('Confirm')).toBeTruthy()

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: APIKEY_ROTATE_CONFIRMATION,
      value: 'team3',
    })
    fireEvent.click(screen.getByText('Lukk'))
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: APIKEY_CANCEL_ROTATION,
    })
  })
})

describe('(ApiKeys) List of API keys from backend are grouped by team.', () => {
  const apiKeys = [
    {
      team: 'team1',
      groupId: '6fbc76c4-7909-4e58-99fa-64d542567c8c',
      key: 'theNewestKey',
      created: '2020-03-16T10:29:58.05+01:00',
      expires: '2022-03-16T10:30:23.655+01:00',
    },
    {
      team: 'team1',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00',
    },
    {
      team: 'team3',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00',
    },
    {
      team: 'team2',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'aBitOlderKey',
      created: '2019-03-16T10:29:58.05+01:00',
      expires: '2020-03-16T10:30:23.655+01:00',
    },
    {
      team: 'team3',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00',
    },
    {
      team: 'team3',
      groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
      key: 'theOldestKey',
      created: '2018-03-16T10:29:58.05+01:00',
      expires: '2019-03-16T10:30:23.655+01:00',
    },
  ]

  it('One teamCard component is shown pr team', () => {
    const props = { ...defaultProps, apiKeys }
    const wrapper = render(<ApiKeys {...props} />)

    expect(wrapper.queryAllByText('team1')).toHaveLength(1)
    expect(wrapper.queryAllByText('team2')).toHaveLength(1)
    expect(wrapper.queryAllByText('team3')).toHaveLength(1)
  })
})
