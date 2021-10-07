import RotateKeyModal, { Props } from './rotateKeyModal'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const defaultProps: Props = {
  keyRotationStatus: {
    confirmationPending: true,
    status: '',
    errorMessage: '',
    teamName: 'team1',
  },
  onRequestClose: () => {},
  onRotatekey: () => {},
}

describe('(RotateKeyModal) Basic rendering', () => {
  it('Renders without exploding', () => {
    const wrapper = render(<RotateKeyModal {...defaultProps} />)
    expect(wrapper.container).toBeDefined()
    expect(wrapper.getByText('Warning')).toBeTruthy()
  })
})

describe('(RotateKeyModal) Error handling', () => {
  const props = {
    ...defaultProps,
    keyRotationStatus: {
      ...defaultProps.keyRotationStatus,
      status: 'ERROR',
      errorMessage: 'Such error',
    },
  }

  it('Error message is shown', () => {
    const wrapper = render(<RotateKeyModal {...props} />)
    expect(wrapper.queryByText('Warning')).toBeTruthy()
    expect(wrapper.getByText('An error occured when creating new apikey.')).toBeTruthy()
    expect(wrapper.queryByText('Such error', { exact: false })).toBeTruthy()
  })
})

describe('(RotateKeyModal) Rotatekey button is clicked with correct teamName parameter', () => {
  const eventHandlerSpy = jest.fn()
  const props = {
    ...defaultProps,
    keyRotationStatus: { ...defaultProps.keyRotationStatus, teamName: 'aTeam' },
    onRotatekey: eventHandlerSpy,
  }
  it('Rotate key button is clicked', async () => {
    render(<RotateKeyModal {...props} />)
    await waitFor(() => screen.getByText('Warning'))
    fireEvent.click(screen.getByText('Confirm'))

    expect(eventHandlerSpy).toHaveBeenCalledTimes(1)
    expect(eventHandlerSpy).toHaveBeenNthCalledWith(1, 'aTeam')
  })
})
