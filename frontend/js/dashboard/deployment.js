'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
require('nav-frontend-tabell-style')
var react_1 = __importDefault(require('react'))
var react_timeago_1 = __importDefault(require('react-timeago'))
var react_bootstrap_1 = require('react-bootstrap')
function Deployment(props) {
  var initialData = props.initialData
  var dep = initialData.deployment
  var repoLink = function (repo) {
    if (repo == null) {
      return react_1['default'].createElement('em', null, 'n/a')
    }
    return react_1['default'].createElement('a', { href: 'https://github.com/' + repo }, repo)
  }
  var state = function () {
    if (initialData.statuses != null) {
      var buttonStyle = void 0
      var stateText = initialData.statuses[0].status
      switch (stateText) {
        case 'error':
          buttonStyle = 'danger'
      }
      return react_1['default'].createElement(
        react_bootstrap_1.Badge,
        { variant: buttonStyle },
        stateText
      )
    }
    return react_1['default'].createElement(
      react_bootstrap_1.Badge,
      { variant: 'secondary' },
      'undefined'
    )
  }
  var logsLink = function (dep) {
    // ISO 8601 to unix epoch
    var timeStamp = function (ds) {
      return Math.trunc(Date.parse(ds) / 1000)
    }
    return react_1['default'].createElement(
      'a',
      {
        href:
          'http://localhost:8080/logs?delivery_id=' +
          dep.id +
          '&ts=' +
          timeStamp(dep.created) +
          '&version=1',
      },
      'logs'
    )
  }
  return react_1['default'].createElement(
    'tr',
    { key: dep.id },
    react_1['default'].createElement(
      'td',
      null,
      react_1['default'].createElement(react_timeago_1['default'], { date: dep.created })
    ),
    react_1['default'].createElement('td', null, dep.team),
    react_1['default'].createElement('td', null, repoLink(dep.githubRepository)),
    react_1['default'].createElement('td', null, state()),
    react_1['default'].createElement('td', null, logsLink(dep))
  )
}
exports['default'] = Deployment
//http://localhost:8080/logs?delivery_id=6a990e45-bbd6-4dd1-b26d-5285a721aaa5&ts=1608128410687&version=1
//http://localhost:8080/logs?delivery_id=6a990e45-bbd6-4dd1-b26d-5285a721aaa5&ts=1608128410&version=1
