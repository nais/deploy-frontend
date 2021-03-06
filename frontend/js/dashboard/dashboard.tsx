import React, { useEffect, useState } from 'react'
import Deployment from './deployment'
import { logPageView } from '../amplitude.js'

function Deployments(props) {
  const [deploymentsList, setDeploymentsList] = useState([])
  var deploymentElementList = null

  useEffect(() => {
    fetch('/downstream/api/v1/dashboard/deployments')
      .then((res) => res.json())
      .then((json) => setDeploymentsList(json.deployments))
  }, [])

  return (
    <table className="tabell">
      <thead>
        <tr>
          <th>Resource(s)</th>
          <th>Created</th>
          <th>Team</th>
          <th>Cluster</th>
          <th>Status</th>
          <th>Links</th>
        </tr>
      </thead>
      <tbody>
        {deploymentsList.map((x) => (
          <Deployment key={x.id} initialData={x} />
        ))}
      </tbody>
    </table>
  )
}

export default function Dashboard(props) {
  logPageView('/')
  return (
    <div className={'mainContent'}>
      <Deployments />
    </div>
  )
}
