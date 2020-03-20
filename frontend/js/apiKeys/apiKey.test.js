import React from 'react'
import ApiKey from './apiKey'
import { shallow } from 'enzyme'

const apiKeys = [
  {
    team: 'team1',
    groupId: '6fbc76c4-7909-4e58-99fa-64d542567c8c',
    key: 'b4n4ndf849fg4adsfølj443dløkjølkjsdfgsdfgdf69443',
    created: '2020-03-16T10:29:58.05+01:00',
    expires: '2022-03-16T10:30:23.655+01:00'
  },
  {
    team: 'team2',
    groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
    key: 'k4k3sfdf849fg4k4k3ølj443dløkjølkjsdfgsdfgdf69443',
    created: '2018-03-16T10:29:58.05+01:00',
    expires: '2020-03-16T10:30:23.655+01:00'
  }
]

describe('(Component) ApiKey renders OK', () => {
  const wrapper = shallow(<ApiKey apiKey={apiKeys[0]} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
    const title = wrapper.find('Undertittel')
    expect(
      title
        .children()
        .first()
        .text()
    ).toBe('team1')
  })
})

describe('(Component) Expired ApiKey shows expired message', () => {
  const wrapper = shallow(<ApiKey apiKey={apiKeys[1]} />)
  it('Renders without exploding', () => {
    const keyStatus = wrapper.find('KeyStatus').shallow()
    expect(
      keyStatus
        .children()
        .first()
        .text()
    ).toContain('Key expired')
  })
})

describe('(Component) Valid ApiKey shows valid message', () => {
    const wrapper = shallow(<ApiKey apiKey={apiKeys[0]} />)
    it('Renders without exploding', () => {
      const keyStatus = wrapper.find('KeyStatus').shallow()
      expect(
        keyStatus
          .children()
          .first()
          .text()
      ).toContain('Key is valid for another')
    })
  })
