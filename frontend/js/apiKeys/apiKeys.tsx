import React from 'react'
import { useHttpGet } from '../hooks'
import ApiKey from './apiKey'
import InfoPanel from './infoPanel'
import './apikey-styles.less'
import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi'
import NavFrontendSpinner from 'nav-frontend-spinner'
import moment from 'moment'

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

  const teams = groupByTeam(data)
  const teamNames = Object.keys(teams).sort()

  const teamKeyMap = teamNames.map(teamName => {
    return {
      name: teamName,
      apiKey: teams[teamName].sort((a, b) => {
        return moment(b.expires).unix() - moment(a.expires).unix()
      })[0]
    }
  })

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
          {teamKeyMap.map((team, idx: number) => {
return <ApiKey key={idx} apiKey={team} />
          }
              
          )}
        </div>
      )}
    </>
  )
}

export default ApiKeys
