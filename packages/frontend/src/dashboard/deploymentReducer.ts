import { DeploymentList } from './deploymentAPI'

type DeploymentFilterChange =
  | { type: 'FILTER_ADD'; value: string }
  | { type: 'FILTER_REMOVE'; value: string }
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
