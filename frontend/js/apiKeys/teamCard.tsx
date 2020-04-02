import React, { Component } from 'react'
import { Panel } from 'nav-frontend-paneler'
import { Normaltekst, Undertittel, Element, Feilmelding } from 'nav-frontend-typografi'
import { KeyIcon, AddCircle } from '../ui/svg'
import Lenke from 'nav-frontend-lenker'
import './apikey-styles.less'
import { Knapp, Flatknapp, Fareknapp } from 'nav-frontend-knapper'
import Modal from 'nav-frontend-modal'
import AlertStripe from 'nav-frontend-alertstriper'
import { connect } from 'react-redux'

import moment from 'moment'

const azureAdGroupUrl =
  'https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/'

/*type State = {
  showKeyRotationModal: boolean
}*/

export type ApiKey = {
  team: string
  groupId: string
  key: string
  expires: string
  created: string
}

/*type KeyRotationStatus = {
  status: string
  errorMessage: string
}*/

type Props = {
  apiKeys: Array<ApiKey>
  //keyRotationStatus: KeyRotationStatus
  handleKeyRotation: Function
}

const formatTimestamp = (timestamp: string) => {
  return moment(timestamp).format('DD MMMM YYYY')
}

const findNewestKey = apiKeys => {
  const apiKeysByExpieryDate = apiKeys.sort((a, b) => {
    return moment(b.expires).unix() - moment(a.expires).unix()
  })
  return apiKeysByExpieryDate[0]
}

export class TeamCard extends Component<Props, {}> {
  constructor(props) {
    super(props)
  }





  render() {
    const { apiKeys, handleKeyRotation } = this.props
    const { team, key, expires, groupId, created } = findNewestKey(apiKeys)

    return (
      <>
        <Panel border className="apikeyCard">
          <Undertittel>{team}</Undertittel>
          <Element>
            <KeyIcon />
            {key}
          </Element>
          <KeyStatus expiresTimestamp={expires} />
          <Normaltekst>{`Created ${formatTimestamp(created)}`}</Normaltekst>
          <Element className="aad">{`Azure AD team id`}</Element>
          <Normaltekst>
            <Lenke href={`${azureAdGroupUrl}${groupId}`} target="new">{`${groupId}`}</Lenke>
          </Normaltekst>
          <div className="newKeyButton">
            <Knapp mini onClick={() => handleKeyRotation(team)}>
              <AddCircle />
              <span>Create new key</span>
            </Knapp>
          </div>
        </Panel>
       
      </>
    )
  }
}

const KeyStatus = props => {
  const { expiresTimestamp } = props
  if (moment(expiresTimestamp).isAfter(moment.now())) {
    return (
      <Normaltekst>{`Valid for another ${moment(expiresTimestamp).fromNow(true)}`}</Normaltekst>
    )
  } else {
    return <Feilmelding>{`Key expired  ${formatTimestamp(expiresTimestamp)}`}</Feilmelding>
  }
}

export default TeamCard
