import 'nav-frontend-tabell-style'
import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import { Badge } from 'react-bootstrap'
import FilterButton from './filterButton'

function Deployment(props) {
  const { initialData, dispatch } = props

  const dep = initialData

  const repoLink = (repo) => {
    if (repo == null) {
      return <div className="knapp--mini knapp knapp--disabled">GitHub</div>
    }

    return (
      <a className="knapp--mini knapp--hoved knapp" href={`https://github.com/${repo}`}>
        GitHub
      </a>
    )
  }

  const statusBadge = () => {
    if (initialData.statuses != null) {
      let buttonStyle
      const stateText = initialData.statuses[0].status
      switch (stateText) {
        case 'error':
        case 'failure':
          buttonStyle = 'danger'
          break
        case 'queued':
        case 'pending':
        case 'in_progress':
          buttonStyle = 'warning'
          break
        case 'success':
          buttonStyle = 'success'
      }
      return (
        <Badge pill variant={buttonStyle}>
          {stateText}
        </Badge>
      )
    }
    return (
      <Badge pill variant="secondary">
        undefined
      </Badge>
    )
  }

  const logsLink = (dep) => {
    // ISO 8601 to unix epoch
    const timeStamp = (ds) => Math.trunc(Date.parse(ds) / 1000)

    return (
      <a
        className="knapp--mini knapp--hoved knapp"
        href={`https://deploy.nais.io/logs?delivery_id=${dep.id}&ts=${timeStamp(dep.created)}&v=1`}
      >
        Log
      </a>
    )
  }

  const appName = (resources) => {
    if (!Array.isArray(resources) || !resources.length) {
      return 'no app in deployment'
    }

    return resources.map((r, index) => {
      return (
        <div key={index}>
          <span style={{ opacity: 0.6 }}>{r.namespace}/</span>
          {r.name} <em style={{ opacity: 0.6 }}>{r.kind}</em>
        </div>
      )
    })
  }

  return (
    <tr>
      <td>{appName(dep.resources)}</td>
      <td>
        <TimeAgo date={dep.deployment.created} />
      </td>
      <td>
        <FilterButton filterDispatch={dispatch} team={dep.deployment.team} />
      </td>
      <td>{dep.deployment.cluster}</td>
      <td>{statusBadge()}</td>
      <td>
        {repoLink(dep.deployment.githubRepository)} {logsLink(dep.deployment)}
      </td>
    </tr>
  )
}

export default Deployment
