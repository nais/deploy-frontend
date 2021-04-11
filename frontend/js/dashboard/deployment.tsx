import 'nav-frontend-tabell-style'
import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import { Badge } from 'react-bootstrap'
import FilterButton from './filterButton'

const StatusBadge = ({ statuses }) => {
  if (statuses == null)
    return (
      <Badge pill variant="secondary">
        undefined
      </Badge>
    )

  const buttonStyles = {
    error: 'danger',
    failure: 'danger',
    queued: 'warning',
    pending: 'warning',
    in_progress: 'warning',
    success: 'success',
  }

  const stateText = statuses[0].status

  return (
    <Badge pill variant={stateText in buttonStyles ? buttonStyles[stateText] : null}>
      {stateText}
    </Badge>
  )
}

const RepoLink = ({ repo }) => {
  const style: React.CSSProperties = {
    marginRight: '.5em',
    width: 'content-fit',
  }
  if (repo == null) {
    return (
      <div style={style} className="knapp--mini knapp knapp--disabled">
        GitHub
      </div>
    )
  }

  return (
    <a style={style} className="knapp--mini knapp--hoved knapp" href={`https://github.com/${repo}`}>
      GitHub
    </a>
  )
}

function Deployment(props) {
  const { initialData, dispatch } = props

  const dep = initialData

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
      <td>
        <StatusBadge statuses={dep.statuses} />
      </td>
      <td>
        <RepoLink repo={dep.deployment.githubRepository} />
        {logsLink(dep.deployment)}
      </td>
    </tr>
  )
}

export default Deployment
