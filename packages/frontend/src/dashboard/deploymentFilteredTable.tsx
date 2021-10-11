import NavFrontendSpinner from 'nav-frontend-spinner'
import Deployment from './deployment'

const DeploymentTable = ({ dashboardState, dispatch }) => {
  /*   const deploymentFilter = (deployment, filters) => {
    for (let [key, value] of filters) {
      if (key === 'team') {
        if (deployment.deployment.team !== value) {
          return false
        }
      }
    }
    return true
  } */

  const loadingSpinner = () => (
    <tr>
      <td colSpan={6} style={{ textAlign: 'center' }}>
        <NavFrontendSpinner />
      </td>
    </tr>
  )

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
            // filter appears unnecessary since the backend handles filtering on the db level
            //.filter((x) => deploymentFilter(x, dashboardState.filters))
            .map((x) => (
              <Deployment key={x.deployment.id} dispatch={dispatch} deployment={x} />
            ))}
          {dashboardState.loading ? loadingSpinner() : null}
        </tbody>
      </table>
    </div>
  )
}

export default DeploymentTable
