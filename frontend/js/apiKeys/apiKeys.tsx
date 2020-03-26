import React from 'react'
import { useHttpGet } from '../hooks'
import TeamCard from './teamCard'
import InfoPanel from './infoPanel'
import './apikey-styles.less'
import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi'
import NavFrontendSpinner from 'nav-frontend-spinner'

const groupByTeam = data => {
  return data.reduce((result, currentValue) => {
    const teamName = currentValue['team']

    if (!result.hasOwnProperty(teamName)) {
      result[teamName] = []
    }

    result[teamName].push(currentValue)
    return result

    // (result[currentValue['team']] = result[currentValue['team']] || []).push(currentValue)
  }, {})
}

function ApiKeys() {
  const [{ data, isLoading, isError, errorMessage }] = useHttpGet('/downstream/api/v1/apikey/')

  const apiKeysByTeam = groupByTeam(data)
  const teamNames = Object.keys(apiKeysByTeam).sort()

  return (
    <>
      {isLoading ? (
        <>
          <Undertittel>
            <NavFrontendSpinner type="XS" className="spinner" /> Loading...
          </Undertittel>
        </>
      ) : (
        <div>
          <InfoPanel />
          {isError && (
            <AlertStripe type="feil" className="errorMessage">
              <Element>An error occured when fetching apikeys.</Element>
              <Normaltekst>{errorMessage}</Normaltekst>{' '}
            </AlertStripe>
          )}
          {teamNames.map((teamName: string, idx: number) => {
            return <TeamCard key={idx} apiKeys={apiKeysByTeam[teamName]} />
          })}
        </div>
      )}
    </>
  )
}

export default ApiKeys
