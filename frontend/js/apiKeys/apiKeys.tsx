import React from 'react'
import { useHttpGet } from '../hooks'
import ApiKey from './apiKey'
import InfoPanel from './infoPanel'
import './apikey-styles.less'
import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst, Element } from 'nav-frontend-typografi'

function ApiKeys() {
  const [{ data, isLoading, isError, errorMessage }] = useHttpGet('/downstream/v1/apikey')

  return (
    <>
      
      {isLoading ? (
        'Loading....'
      ) : (
        <div>
          <InfoPanel />
          {isError && (
        <AlertStripe type="feil" className="errorMessage">
          <Element>An error occured when fetching apikeys.</Element>
          <Normaltekst>{errorMessage}</Normaltekst>{' '}
        </AlertStripe>
      )}
          {data.map((apiKey, idx: number) => (
            <ApiKey key={idx} apiKey={apiKey} />
          ))}
        </div>
      )}
    </>
  )
}

export default ApiKeys
