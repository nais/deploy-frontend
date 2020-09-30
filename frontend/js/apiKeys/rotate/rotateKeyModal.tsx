import React from 'react'
import Modal from 'nav-frontend-modal'
import Panel from 'nav-frontend-paneler'
import { Fareknapp } from 'nav-frontend-knapper'
import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi'
import './rotate-key-styles.less'

function RotateKeyModal(props: Props) {
  const { keyRotationStatus, onRequestClose, onRotatekey } = props
  Modal.setAppElement(document.getElementById('root'))
  return (
    <Modal
      className="confirmationDialog"
      //ariaHideApp={false}
      isOpen={keyRotationStatus.confirmationPending}
      onRequestClose={() => onRequestClose()}
      closeButton={true}
      contentLabel="Confirm key rotation"
    >
      <Panel className="confirmationDialog">
        <AlertStripe type="advarsel" form="inline">
          <Undertittel>Warning</Undertittel>
          <Normaltekst>
            This will rotate the API key for team {keyRotationStatus.teamName} and invalidate all
            existing keys.
          </Normaltekst>
        </AlertStripe>
        {keyRotationStatus.status === 'ERROR' && (
          <AlertStripe type="feil" className="errorMessage">
            <Element>An error occured when creating new apikey.</Element>
            <Normaltekst>{keyRotationStatus.errorMessage}</Normaltekst>{' '}
          </AlertStripe>
        )}
        <div className="confirmButton">
          <Fareknapp
            mini
            spinner={keyRotationStatus.status === 'PROCESSING'}
            onClick={() => onRotatekey(keyRotationStatus.teamName)}
          >
            Confirm
          </Fareknapp>
        </div>
      </Panel>
    </Modal>
  )
}

type Props = {
  keyRotationStatus: KeyRotationStatus
  onRequestClose: Function
  onRotatekey: Function
}

type KeyRotationStatus = {
  status: string
  errorMessage: string
  confirmationPending: boolean
  teamName: string
}

export default RotateKeyModal
