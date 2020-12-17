import 'nav-frontend-tabell-style'
import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import { Badge } from 'react-bootstrap'

function Deployment(props) {
  const { initialData } = props

  const dep = initialData.deployment

  const repoLink = (repo) => {
    if (repo == null) {
      return <em>n/a</em>
    }
    return <a href={`https://github.com/${repo}`}>{repo}</a>
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
        href={`https://deploy.nais.io/logs?delivery_id=${dep.id}&ts=${timeStamp(
          dep.created
        )}&version=1`}
      >
        Log
      </a>
    )
  }

  return (
    <tr key={dep.id}>
      <td>{repoLink(dep.githubRepository)}</td>
      <td>
        <TimeAgo date={dep.created} />
      </td>
      <td>{dep.team}</td>
      <td>{statusBadge()}</td>
      <td>{logsLink(dep)}</td>
    </tr>
  )
}

export default Deployment
