import React from 'react'
import TeamCard from '../teamCard'
import { shallow } from 'enzyme'

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
    key: 'aBitOlderKey',
    created: '2019-03-16T10:29:58.05+01:00',
    expires: '2020-03-16T10:30:23.655+01:00',
  },
  {
    team: 'team1',
    groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
    key: 'theOldestKey',
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
  const wrapper = shallow(<TeamCard apiKeys={apiKeys} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
    const title = wrapper.find('Undertittel')
    expect(title.children().first().text()).toBe('team1')
  })
})

describe('(Component) Correct api key is chosen', () => {
  const wrapper = shallow(<TeamCard apiKeys={apiKeys} />)
  it('From a list of keys for a team, the key with the newest expiery date is displayed', () => {
    expect(wrapper.length).toBe(1)
    const apiKey = wrapper.find('Element').at(0).childAt(1).text()
    expect(apiKey).toBe('theNewestKey')
  })
})

describe('(Component) Expired ApiKey shows expired message', () => {
  const wrapper = shallow(<TeamCard apiKeys={expiredApiKey} />)
  it('Shows expired message', () => {
    const keyStatus = wrapper.find('KeyStatus').shallow()
    expect(keyStatus.children().first().text()).toContain('Key expired')
  })
})

describe('(Component) Valid ApiKey shows valid message', () => {
  const wrapper = shallow(<TeamCard apiKeys={apiKeys} />)
  it('Shows valid message', () => {
    const keyStatus = wrapper.find('KeyStatus').shallow()
    expect(keyStatus.children().first().text()).toContain('Valid for another')
  })
})
