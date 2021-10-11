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
  const filters = new Map(state.filters)
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
      filters.delete('team')
      return {
        loading: true,
        deployments: state.deployments,
        filters: filters,
        error: state.error,
      }
    case 'FILTER_ADD_TEAM':
      filters.set('team', action.value)
      return {
        loading: true,
        deployments: state.deployments,
        filters: filters,
        error: state.error,
      }
    case 'FILTER_ADD_CLUSTER':
      filters.set('cluster', action.value)
      return {
        loading: true,
        deployments: state.deployments,
        filters: filters,
        error: state.error,
      }
    case 'FILTER_REMOVE_CLUSTER':
      filters.delete('cluster')
      return {
        loading: true,
        deployments: state.deployments,
        filters: filters,
        error: state.error,
      }
    default:
      return state
  }
}
