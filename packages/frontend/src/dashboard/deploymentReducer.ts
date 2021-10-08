import { DeploymentList } from './deploymentAPI'

type DeploymentFilterChange =
  | { type: 'FILTER_ADD_TEAM'; value: string }
  | { type: 'FILTER_REMOVE_TEAM'; value: string }
  | { type: 'FILTER_ADD_CLUSTER'; value: string }
  | { type: 'FILTER_REMOVE_CLUSTER'; value: string }
  | { type: 'FILTER_CLEAR' }

type FetchResult =
  | { type: 'FETCH_SUCCESS'; payload: object }
  | { type: 'FETCH_ERROR'; error: JSX.Element }

export interface dashboardState {
  loading: boolean
  deployments: DeploymentList
  filters: Map<string, string>
  error: JSX.Element | null
}

export const initialState: dashboardState = {
  loading: true,
  deployments: [],
  filters: new Map(),
  error: null,
}

export const deploymentReducer = (
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
    case 'FILTER_REMOVE_TEAM':
      const removeFilters = new Map(state.filters)
      removeFilters.delete('team')
      return {
        loading: true,
        deployments: state.deployments,
        filters: removeFilters,
        error: state.error,
      }
    case 'FILTER_ADD_TEAM':
      const newTeamFilters = new Map(state.filters)
      newTeamFilters.set('team', action.value)
      return {
        loading: true,
        deployments: state.deployments,
        filters: newTeamFilters,
        error: state.error,
      }
    case 'FILTER_ADD_CLUSTER':
      const newClusterFilters = new Map(state.filters)
      newClusterFilters.set('cluster', action.value)
      return {
        loading: true,
        deployments: state.deployments,
        filters: newClusterFilters,
        error: state.error,
      }
    case 'FILTER_REMOVE_CLUSTER':
      const removeClusterFilters = new Map(state.filters)
      removeClusterFilters.delete('cluster')
      return {
        loading: true,
        deployments: state.deployments,
        filters: removeClusterFilters,
        error: state.error,
      }
    default:
      return state
  }
}
