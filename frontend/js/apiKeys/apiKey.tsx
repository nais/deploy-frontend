import React from 'react'
import { Panel } from 'nav-frontend-paneler'
import { Systemtittel, Normaltekst, Undertittel, Element } from 'nav-frontend-typografi'
import Lenke from 'nav-frontend-lenker'
import './apikey-styles.less'
import { TeamIcon, KeyIcon, AzureAdIcon } from '../ui/svg'

import moment = require('moment');

const azureAdGroupUrl = "https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/"

type ApiKeyProps = {
  team: string
  groupId: string
  key: string
  expires: string
  created: string
}

const formatTimestamp = (timestamp: string) => {
return moment(timestamp).format("DD MMMM YYYY")
}

const isKeyExpired = (expires: string) => {
    return moment(expires).isAfter(moment.now())
}

const ApiKey = props => {
  const { team, groupId, key, expires, created } = props.apiKey
  return (
    <Panel border className="apikeyCard">
      <Undertittel className="team">{`${team}`}</Undertittel>
      <Element>{`API key`}</Element>
      <Normaltekst>{key}</Normaltekst>
      <Normaltekst>{`Expires: ${moment(expires).fromNow()}`}</Normaltekst>
      <Normaltekst>{`Created: ${formatTimestamp(created)}`}</Normaltekst>
      <Element className="aad">{`Azure AD team id`}</Element>
      <Normaltekst>
      <Lenke href={`${azureAdGroupUrl}${groupId}`} target="new">{`${groupId}`}</Lenke>
      </Normaltekst>
    </Panel>
  )
}

export default ApiKey