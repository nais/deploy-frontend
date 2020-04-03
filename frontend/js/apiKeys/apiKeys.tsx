import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  APIKEYS_REQUEST,
  APIKEY_ROTATE_REQUEST,
  APIKEY_ROTATE_CONFIRMATION,
  APIKEY_CANCEL_ROTATION
} from '../config/actionTypes'
import TeamCard from './teamCard'
import InfoPanel from './infoPanel'
import './apikey-styles.less'
import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi'
import NavFrontendSpinner from 'nav-frontend-spinner'
import RotateKeyModal from './rotate/rotateKeyModal'

const groupByTeam = (data: Array<any>) => {
  return data.reduce((result, currentValue) => {
    const teamName = currentValue['team']

    if (!result.hasOwnProperty(teamName)) {
      result[teamName] = []
    }

    result[teamName].push(currentValue)
    return result
  }, {})
}

class ApiKeys extends Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  showConfirmationModal(teamName) {
    this.props.dispatch({ type: APIKEY_ROTATE_CONFIRMATION, value: teamName })
  }

  cancelKeyRotation() {
    this.props.dispatch({ type: APIKEY_CANCEL_ROTATION })
  }

  rotateKey(teamName) {
    this.props.dispatch({ type: APIKEY_ROTATE_REQUEST, team: teamName })
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({ type: APIKEYS_REQUEST })
  }

  render() {
    const { apiKeys, fetchStatus, errorMessage, rotateKey } = this.props
    const apiKeysByTeam = groupByTeam(apiKeys)
    const teamNames = Object.keys(apiKeysByTeam).sort()

    return (
      <>
        {fetchStatus == 'FETCHING' ? (
          <Undertittel>
            <NavFrontendSpinner type="XS" className="spinner" /> Loading...
          </Undertittel>
        ) : (
          <>
            <div>
              <InfoPanel />
              {fetchStatus === 'ERROR' && (
                <AlertStripe type="feil" className="errorMessage">
                  <Element>An error occured when fetching apikeys.</Element>
                  <Normaltekst>{errorMessage}</Normaltekst>{' '}
                </AlertStripe>
              )}
              {teamNames.map((teamName: string, idx: number) => {
                return (
                  <TeamCard
                    key={idx}
                    apiKeys={apiKeysByTeam[teamName]}
                    handleKeyRotation={team => this.showConfirmationModal(team)}
                  />
                )
              })}
            </div>
            <RotateKeyModal
              keyRotationStatus={rotateKey}
              onRequestClose={() => this.cancelKeyRotation()}
              onRotatekey={team => this.rotateKey(team)}
            />
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    apiKeys: state.apiKeys.data,
    fetchStatus: state.apiKeys.status,
    errorMessage: state.apiKeys.errorMessage,
    rotateKey: state.rotateKey
  }
}

type KeyRotationStatus = {
    status: string
    errorMessage: string
    confirmationPending: boolean
    teamName: string
  }
  
  type Props = {
    apiKeys: Array<any>
    fetchStatus: string
    errorMessage: string
    dispatch: Function
    rotateKey: KeyRotationStatus
  }

export default connect(mapStateToProps)(ApiKeys)
