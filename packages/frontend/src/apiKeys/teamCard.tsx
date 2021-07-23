import React, { useEffect, useState } from 'react'
import Panel from 'nav-frontend-paneler'
import { Normaltekst, Undertittel, Element, Feilmelding } from 'nav-frontend-typografi'
import { KeyIcon } from '../ui/svg'
import Lenke from 'nav-frontend-lenker'
import { Fareknapp, Knapp } from 'nav-frontend-knapper'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'
import './apikey-styles.less'
import { Copy, CopyFilled, EyeFilled, EyeScreenedFilled, RefreshFilled } from '@navikt/ds-icons'

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
  const [copied, setCopied] = useState(false)
  const [hidden, setHidden] = useState(true)
  const { apiKeys, handleKeyRotation } = props
  const { team, key, expires, groupId, created } = findNewestKey(apiKeys)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (copied) setCopied(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <Panel border className="apikeyCard">
      <Undertittel>{team}</Undertittel>
      <div className="keyWrapper">
        <KeyIcon />
        <Element className="key">{hidden ? '*'.repeat(key.length) : key}</Element>
        <div className="eye">
          {hidden ? (
            <EyeFilled onClick={() => setHidden(!hidden)} />
          ) : (
            <EyeScreenedFilled onClick={() => setHidden(!hidden)} />
          )}
        </div>
      </div>
      <KeyStatus expiresTimestamp={expires} />
      <Normaltekst>{`Created ${formatTimestamp(created)}`}</Normaltekst>
      <Element className="aad">{`Azure AD team id`}</Element>
      <Normaltekst>
        <Lenke href={`${azureAdGroupUrl}${groupId}`} target="new">{`${groupId}`}</Lenke>
      </Normaltekst>
      <div className="apiButtons">
        <div className="newKeyButton">
          <Knapp mini onClick={() => setCopied(true)} style={{ transform: 'translateY(-2px)' }}>
            {copied ? <CopyFilled /> : <Copy />}
            <CopyToClipboard text={key}>
              <span>{copied ? 'Copied...' : 'Copy key'}</span>
            </CopyToClipboard>
          </Knapp>
        </div>
        <div className="newKeyButton">
          <Fareknapp mini onClick={() => handleKeyRotation(team)}>
            <RefreshFilled />
            <span>Rotate key</span>
          </Fareknapp>
        </div>
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
