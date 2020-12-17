'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var react_1 = __importStar(require('react'))
var deployment_1 = __importDefault(require('./deployment'))
function Deployments(props) {
  var _a = react_1.useState([]),
    deploymentsList = _a[0],
    setDeploymentsList = _a[1]
  var deploymentElementList = null
  react_1.useEffect(function () {
    fetch('http://localhost:8081/downstream/api/v1/dashboard/deployments')
      .then(function (res) {
        return res.json()
      })
      .then(function (json) {
        return setDeploymentsList(json.deployments)
      })
  }, [])
  return react_1['default'].createElement(
    'table',
    { className: 'tabell' },
    react_1['default'].createElement(
      'thead',
      null,
      react_1['default'].createElement(
        'tr',
        null,
        react_1['default'].createElement('th', null, 'Created'),
        react_1['default'].createElement('th', null, 'Team'),
        react_1['default'].createElement('th', null, 'Repository'),
        react_1['default'].createElement('th', null, 'State'),
        react_1['default'].createElement('th', null, 'Links')
      )
    ),
    react_1['default'].createElement(
      'tbody',
      null,
      deploymentsList.map(function (x) {
        return react_1['default'].createElement(deployment_1['default'], {
          key: x.id,
          initialData: x,
        })
      })
    )
  )
}
function Dashboard(props) {
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(Deployments, null)
  )
}
exports['default'] = Dashboard
