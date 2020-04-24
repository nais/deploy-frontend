import React from 'react'
import RotateKeyModal from '../rotateKeyModal'
import { shallow } from 'enzyme'
import { Fareknapp } from 'nav-frontend-knapper'
import { Normaltekst } from 'nav-frontend-typografi'
import sinon from 'sinon'

const defaultProps = {
  keyRotationStatus: { confirmationPending: true },
  onRequestClose: () => {},
  onRotatekey: () => {}
}

describe('(RotateKeyModal) Basic rendering', () => {
  const wrapper = shallow(<RotateKeyModal {...defaultProps} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})

describe('(RotateKeyModal) Error handling', () => {
  const props = {
    ...defaultProps,
    keyRotationStatus: { status: 'ERROR', errorMessage: 'Such error' }
  }
  const wrapper = shallow(<RotateKeyModal {...props} />)
  it('Error message is shown', () => {
    expect(
      wrapper
        .find({ type: 'feil' })
        .find(Normaltekst)
        .children()
        .text()
    ).toContain('Such error')
  })
})

describe('(RotateKeyModal) Rotatekey button is clicked with correct teamName parameter', () => {
  const eventHandlerSpy = sinon.spy()
  const props = {
    ...defaultProps,
    keyRotationStatus: { confirmationPending: true, teamName: 'aTeam' },
    onRotatekey: eventHandlerSpy
  }
  const wrapper = shallow(<RotateKeyModal {...props} />)
  it('Rotate key button is clicked ', () => {
    wrapper.find(Fareknapp).simulate('click')
    expect(eventHandlerSpy.calledOnceWith('aTeam')).toBe(true)
  })
})
