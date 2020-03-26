import React from 'react'
import Veilederpanel from 'nav-frontend-veilederpanel'
import './apikey-styles.less'
import {  Normaltekst } from 'nav-frontend-typografi'
import Lenke from 'nav-frontend-lenker'
import { Veileder } from '../ui/svg'

function InfoPanel() {
  return (
    <div className="infoPanel">
      <Veilederpanel svg={Veileder}>
        <Normaltekst>Here are your teams' API keys.</Normaltekst>
        <Normaltekst>
          Please refer to the{' '}
          <Lenke href="https://doc.nais.io/deployment" target="new">
            nais documentation
          </Lenke>{' '}
          for how to use the key when setting up your deployment pipeline.
        </Normaltekst>
      </Veilederpanel>
    </div>
  )
}

export default InfoPanel
