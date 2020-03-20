import React from 'react'
import { Panel } from 'nav-frontend-paneler'
import { Normaltekst, Undertittel, Element, Feilmelding } from 'nav-frontend-typografi'
import {KeyIcon } from '../ui/svg'
import Lenke from 'nav-frontend-lenker'
import './apikey-styles.less'

import moment from 'moment'

const azureAdGroupUrl =
  'https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/'

type ApiKeyProps = {
  team: string
  groupId: string
  key: string
  expires: string
  created: string
}

const formatTimestamp = (timestamp: string) => {
  return moment(timestamp).format('DD MMMM YYYY')
}

const KeyStatus = props => {
  const { expiresTimestamp } = props
  if (moment(expiresTimestamp).isAfter(moment.now())) {
    return (
      <Normaltekst>
        {`Key is valid for another ${moment(expiresTimestamp).fromNow(true)}`}
      </Normaltekst>
    )
  } else {
    return (
      <Feilmelding>{`Key expired  ${formatTimestamp(expiresTimestamp)}`}</Feilmelding>
    )
  }
}

const ApiKey = props => {
  const { team, groupId, key, expires, created } = props.apiKey
  return (
    <Panel border className="apikeyCard">
      <Undertittel className="team">{`${team}`}</Undertittel>
      <Element><KeyIcon/>{key}</Element>
      <KeyStatus expiresTimestamp={expires} />
      <Normaltekst>{`Created ${formatTimestamp(created)}`}</Normaltekst>
      <Element className="aad">{`Azure AD team id`}</Element>
      <Normaltekst>
        <Lenke href={`${azureAdGroupUrl}${groupId}`} target="new">{`${groupId}`}</Lenke>
      </Normaltekst>
    </Panel>
  )
}

export default ApiKey
