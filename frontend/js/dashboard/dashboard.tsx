import React, { useEffect, useReducer, useState } from 'react'
import Deployment from './deployment'
import { logPageView } from '../amplitude.js'
import { Close } from '@navikt/ds-icons'
import * as z from 'zod'

const FilterPanel = ({ dashboardState, dispatch }) => {
  const emptyListStyle: React.CSSProperties = {
    fontStyle: 'italic',
    display: 'inline-block',
    marginRight: '.5em',
    fontSize: '75%',
  }
  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#eee',
    fontFamily: "'Source Sans Pro', Arial, sans-serif",
    width: 'fit-content',
    padding: '.25em .4em',
    fontSize: '75%',
    borderRadius: '10rem',
    lineHeight: '1',
    border: '1px solid #ddd',
  }
  return !dashboardState.filters.size ? (
    <div style={emptyListStyle}>No filters currently enabled. Click a team name to filter.</div>
  ) : (
    <div>
      <div style={emptyListStyle}>Filters:</div>
      {Array.from(dashboardState.filters.entries()).map(([key, value]) => (
        <div
          style={buttonStyle}
          key={`${key}:${value}`}
          onClick={() => dispatch({ type: 'FILTER_REMOVE', value: value })}
        >
          <Close style={{ fontSize: '.7rem', marginRight: '.5em' }} />
          <span>
            {key}: {value}
          </span>
        </div>
      ))}
    </div>
  )
}

const DeploymentsTable = ({ dashboardState, dispatch }) => {
  const deploymentFilter = (deployment, filters) => {
    for (let [key, value] of filters) {
      if (key == 'team') {
        if (deployment.deployment.team != value) {
          return false
        }
      }
    }
    return true
  }

  if (dashboardState.error !== '') {
    return <div>{dashboardState.error}</div>
  }

  return (
    <div>
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
          {dashboardState.deployments
            .filter((x) => deploymentFilter(x, dashboardState.filters))
            .map((x) => (
              <Deployment key={x.deployment.id} dispatch={dispatch} initialData={x} />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Dashboard(props) {
  logPageView('/')

  type DeploymentFilterChange =
    | { type: 'FILTER_ADD'; value: string }
    | { type: 'FILTER_REMOVE'; value: string }
    | { type: 'FILTER_CLEAR' }

  type FetchResult =
    | { type: 'FETCH_SUCCESS'; payload: object }
    | { type: 'FETCH_ERROR'; error: string }

  const DeploymentSchema = z.object({
    cluster: z.string().nullable(),
    created: z.string(), // better support for date transformations expected with Zod 3
    githubID: z.number().nullable(),
    githubRepository: z.string().nullable(),
    id: z.string(),
    state: z.any().nullable(), // FIXME: I haven't seen this != null
    team: z.string(),
  })
  type Deployment = z.infer<typeof DeploymentSchema>

  const StatusSchema = z.object({
    created: z.string(),
    deploymentID: z.string().uuid(),
    id: z.string().uuid(),
    message: z.string().nullable(),
    status: z.string(),
  })
  type Status = z.infer<typeof StatusSchema>

  const ResourceSchema = z.object({
    deploymentID: z.string().uuid(),
    group: z.string().nullable(),
    id: z.string(),
    index: z.number(),
    kind: z.string(),
    name: z.string(),
    namespace: z.string(),
    version: z.string(),
  })
  type Resource = z.infer<typeof ResourceSchema>

  const DeploymentListSchema = z
    .object({
      deployment: DeploymentSchema,
      statuses: StatusSchema.array().nullable(),
      resources: ResourceSchema.array().nullable(),
    })
    .array()
  type DeploymentList = z.infer<typeof DeploymentListSchema>

  interface dashboardState {
    loading: boolean
    deployments: DeploymentList
    filters: Map<string, string>
    error: string
  }

  const initialState: dashboardState = {
    loading: true,
    deployments: new Array(),
    filters: new Map(),
    error: '',
  }

  const deploymentsReducer = (
    state: dashboardState,
    action: DeploymentFilterChange | FetchResult
  ) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false,
          deployments: action.payload,
          filters: state.filters,
          error: '',
        }
      case 'FETCH_ERROR':
        return {
          loading: false,
          deployments: state.deployments,
          filters: state.filters,
          error: action.error,
        }
      case 'FILTER_REMOVE':
        const removeFilters = new Map(state.filters)
        removeFilters.delete('team')
        return {
          loading: true,
          deployments: state.deployments,
          filters: removeFilters,
          error: state.error,
        }
      case 'FILTER_ADD':
        const addFilters = new Map(state.filters)
        addFilters.set('team', action.value)
        return {
          loading: true,
          deployments: state.deployments,
          filters: addFilters,
          error: state.error,
        }
      default:
        return state
    }
  }

  const [dashboardState, deploymentsDispatch] = useReducer(deploymentsReducer, initialState)

  useEffect(() => {
    let apiURL = '/downstream/api/v1/dashboard/deployments?'
    for (let [key, value] of dashboardState.filters) {
      apiURL += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
    }
    fetch(apiURL)
      .then((res) => res.json())
      .then((json) => {
        try {
          let deployments = DeploymentListSchema.parse(json.deployments)
          deploymentsDispatch({ type: 'FETCH_SUCCESS', payload: deployments })
        } catch (e) {
          deploymentsDispatch({
            type: 'FETCH_ERROR',
            error: (
              <div>
                <div>Data validation errors from backend</div>
                <pre>{e.toString()}</pre>
              </div>
            ),
          })
        }
      })
  }, [dashboardState.filters])

  return (
    <div className={'mainContent'}>
      <FilterPanel dashboardState={dashboardState} dispatch={deploymentsDispatch} />
      <DeploymentsTable dashboardState={dashboardState} dispatch={deploymentsDispatch} />
    </div>
  )
}
