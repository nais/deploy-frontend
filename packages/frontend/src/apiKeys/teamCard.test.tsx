import TeamCard from './teamCard'
import { render } from '@testing-library/react'
import moment from 'moment'

const apiKeys = [
  {
    team: 'team1',
    groupId: '6fbc76c4-7909-4e58-99fa-64d542567c8c',
    key: 'theNewestKey',
    created: '2020-03-16T10:29:58.05+01:00',
    expires: moment.utc().add(1, 'year').format(),
  },
  {
    team: 'team1',
    groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
    key: 'aTinyBitOlderKey',
    created: '2019-03-16T10:29:58.05+01:00',
    expires: '2020-03-16T10:30:23.655+01:00',
  },
  {
    team: 'team1',
    groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
    key: 'theOldestKeyThatIsLonger',
    created: '2018-03-16T10:29:58.05+01:00',
    expires: '2019-03-16T10:30:23.655+01:00',
  },
]

const expiredApiKey = [
  {
    team: 'teamExpired',
    groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
    key: 'k4k3sfdf849fg4k4k3ølj443dløkjølkjsdfgsdfgdf69443',
    created: '2018-03-16T10:29:58.05+01:00',
    expires: '2020-03-16T10:30:23.655+01:00',
  },
]

describe('(Component) ApiKey renders OK', () => {
  it('Renders without exploding', async () => {
    const wrapper = render(<TeamCard apiKeys={apiKeys} handleKeyRotation={() => {}} />)
    expect(wrapper).toBeDefined()
    expect(wrapper.queryByText('team1')).toBeTruthy()
    expect(wrapper.queryAllByText('team1')).toHaveLength(1)
  })

  it('From a list of keys for a team, the key with the newest expiery date is displayed', async () => {
    const wrapper = render(<TeamCard apiKeys={apiKeys} handleKeyRotation={() => {}} />)
    expect(wrapper.queryByText('*'.repeat('theNewestKey'.length))).toBeTruthy()
  })

  it('Shows valid message', () => {
    const wrapper = render(<TeamCard apiKeys={apiKeys} handleKeyRotation={() => {}} />)
    expect(wrapper.queryByText('Valid for another', { exact: false })).toBeTruthy()
  })
})

describe('(Component) Expired ApiKey shows expired message', () => {
  it('Shows expired message', () => {
    const wrapper = render(<TeamCard apiKeys={expiredApiKey} handleKeyRotation={() => {}} />)
    expect(wrapper.queryByText('Key expired', { exact: false })).toBeTruthy()
  })
})
