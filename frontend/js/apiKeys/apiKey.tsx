import React from 'react'
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import { Normaltekst } from 'nav-frontend-typografi';



type ApiKeyProps = {
    team: string,
    groupId: string,
    key: string, 
    expires: string, 
    created: string
  }

const ApiKey = (props) => {
    const {team, groupId, key, expires, created} = props.apiKey
    return (
    <Panel border>
        <Systemtittel>{`Team: ${team}`}</Systemtittel>
        <Normaltekst>{`Id: ${groupId}`}</Normaltekst>
        <Normaltekst>{`Key: ${key}`}</Normaltekst>
        <Normaltekst>{`Created: ${created}`}</Normaltekst>
        <Normaltekst>{`Expires: ${expires}`}</Normaltekst>
        </Panel>
)
}

export default ApiKey