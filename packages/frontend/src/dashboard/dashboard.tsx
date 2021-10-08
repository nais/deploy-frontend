import { useEffect, useReducer } from 'react'
import { logPageView } from '../amplitude'
import { getDeployments } from './deploymentAPI'
import { deploymentReducer, initialState } from './deploymentReducer'
import DeploymentTable from './deploymentFilteredTable'
import FilterPanel from './filterPanel'

export default function Dashboard(props) {
  logPageView('/')

  const [dashboardState, deploymentsDispatch] = useReducer(deploymentReducer, initialState)
  const params = new URLSearchParams(window.location.search)
  const teamFilter = params.get('team')
  const clusterFilter = params.get('cluster')

  if (teamFilter !== null) {
    dashboardState.filters.set('team', teamFilter)
  }
  if (clusterFilter !== null) {
    dashboardState.filters.set('cluster', clusterFilter)
  }

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
      <DeploymentTable dashboardState={dashboardState} dispatch={deploymentsDispatch} />
    </div>
  )
}
