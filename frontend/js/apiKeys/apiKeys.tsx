import React from 'react'
import { useFetch } from '../hooks'
import ApiKey from './apiKey'

function ApiKeys() {
  const [apiKeys, loading] = useFetch('/api/v1/apikeys')

  return (
    <>
      {loading ? (
        'Loading....'
      ) : (
        <div>
          {apiKeys.map((apiKey, idx) => (<ApiKey key={idx} apiKey={apiKey} />))}
        </div>
      )}
    </>
  )
}

export default ApiKeys