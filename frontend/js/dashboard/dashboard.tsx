import React, { useEffect, useReducer, useState } from 'react'
import Deployment from './deployment'
import { logPageView } from '../amplitude.js'
import { Close } from '@navikt/ds-icons'
import { ZodError } from 'zod'
import { getDeployments, DeploymentList } from './deploymentAPI'

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
    cursor: 'pointer',
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
              <Deployment key={x.deployment.id} dispatch={dispatch} deployment={x} />
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
    | { type: 'FETCH_ERROR'; error: JSX.Element }

  interface dashboardState {
    loading: boolean
    deployments: DeploymentList
    filters: Map<string, string>
    error: JSX.Element | null
  }

  const initialState: dashboardState = {
    loading: true,
    deployments: new Array(),
    filters: new Map(),
    error: null,
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
          error: null,
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
    getDeployments(dashboardState.filters)
      .then((deployments) => {
        deploymentsDispatch({ type: 'FETCH_SUCCESS', payload: deployments })
      })
      .catch((e) => {
        deploymentsDispatch({
          type: 'FETCH_ERROR',
          error: (
            <div>
              <pre>{e.toString()}</pre>
            </div>
          ),
        })
      })
  }, [dashboardState.filters])

  if (dashboardState.error) {
    return <div className={'mainContent'}>{dashboardState.error}</div>
  }

  return (
    <div className={'mainContent'}>
      <FilterPanel dashboardState={dashboardState} dispatch={deploymentsDispatch} />
      <DeploymentsTable dashboardState={dashboardState} dispatch={deploymentsDispatch} />
    </div>
  )
}
