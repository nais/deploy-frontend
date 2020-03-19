import React from 'react'
import { useFetch } from '../hooks'
import ApiKey from './apiKey'
import InfoPanel from './infoPanel'
import './apikey-styles.less'


function ApiKeys() {
  const [apiKeys, loading] = useFetch('/api/v1/apikeys')

  return (
    <>
      {loading ? (
        'Loading....'
      ) : (
        <div>
        <InfoPanel/>
          {apiKeys.map((apiKey, idx) => (<ApiKey key={idx} apiKey={apiKey} />))}
        </div>
      )}
    </>
  )
}

export default ApiKeys