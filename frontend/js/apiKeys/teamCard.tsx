import React from 'react'
import Panel from 'nav-frontend-paneler'
import { Normaltekst, Undertittel, Element, Feilmelding } from 'nav-frontend-typografi'
import { KeyIcon, AddCircle } from '../ui/svg'
import Lenke from 'nav-frontend-lenker'
import { Knapp } from 'nav-frontend-knapper'
import moment from 'moment'
import './apikey-styles.less'

const azureAdGroupUrl =
  'https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/'

export type ApiKey = {
  team: string
  groupId: string
  key: string
  expires: string
  created: string
}

type Props = {
  apiKeys: Array<ApiKey>
  handleKeyRotation: Function
}

const formatTimestamp = (timestamp: string) => {
  return moment(timestamp).format('DD MMMM YYYY')
}

const findNewestKey = (apiKeys) => {
  const apiKeysByExpieryDate = apiKeys.sort((a, b) => {
    return moment(b.expires).unix() - moment(a.expires).unix()
  })
  return apiKeysByExpieryDate[0]
}

function TeamCard(props: Props) {
  const { apiKeys, handleKeyRotation } = props
  const { team, key, expires, groupId, created } = findNewestKey(apiKeys)

  return (
    <Panel border className="apikeyCard">
      <Undertittel>{team}</Undertittel>
      <Element style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
          <span>Rotate key</span>
        </Knapp>
      </div>
    </Panel>
  )
}

const KeyStatus = (props) => {
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
