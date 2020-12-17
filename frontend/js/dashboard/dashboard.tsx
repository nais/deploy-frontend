import React, { useEffect, useState } from 'react'
import Deployment from './deployment'

function Deployments(props) {
  const [deploymentsList, setDeploymentsList] = useState([])
  var deploymentElementList = null

  useEffect(() => {
    fetch('http://localhost:8081/downstream/api/v1/dashboard/deployments')
      .then((res) => res.json())
      .then((json) => setDeploymentsList(json.deployments))
  }, [])

  return (
    <table className="tabell">
      <thead>
        <tr>
          <th>Repository</th>
          <th>Created</th>
          <th>Team</th>
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
  return (
    <div className={'mainContent'}>
      <Deployments />
    </div>
  )
}
