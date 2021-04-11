import 'nav-frontend-tabell-style'
import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import { Badge } from 'react-bootstrap'
import FilterButton from './filterButton'
import { DeploymentData } from './deploymentAPI'

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

const Resources = ({ resources }) => {
  const weakStyle: React.CSSProperties = {
    opacity: 0.6,
    fontStyle: 'italic',
  }
  if (!Array.isArray(resources) || !resources.length) {
    return <div style={weakStyle}>no app in deployment</div>
  }

  return (
    <div>
      {resources.map((r, index) => (
        <div key={index}>
          <span style={weakStyle}>{r.namespace}/</span>
          {r.name} <span style={weakStyle}>{r.kind}</span>
        </div>
      ))}
    </div>
  )
}

const LogsLink = ({ deployment }) => {
  const timeStamp = (ds) => Math.trunc(Date.parse(ds) / 1000) // ISO 8601 to unix epoch

  return (
    <a
      className="knapp--mini knapp--hoved knapp"
      href={`https://deploy.nais.io/logs?delivery_id=${deployment.id}&ts=${timeStamp(
        deployment.created
      )}&v=1`}
    >
      Log
    </a>
  )
}

interface DeploymentProps {
  deployment: DeploymentData
  dispatch: any // chickening out for now
}

const Deployment = ({ deployment, dispatch }: DeploymentProps) => (
  <tr>
    <td>
      <Resources resources={deployment.resources} />
    </td>
    <td>
      <TimeAgo date={deployment.deployment.created} />
    </td>
    <td>
      <FilterButton filterDispatch={dispatch} team={deployment.deployment.team} />
    </td>
    <td>{deployment.deployment.cluster}</td>
    <td>
      <StatusBadge statuses={deployment.statuses} />
    </td>
    <td>
      <RepoLink repo={deployment.deployment.githubRepository} />
      <LogsLink deployment={deployment.deployment} />
    </td>
  </tr>
)

export default Deployment
