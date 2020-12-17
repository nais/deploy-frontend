'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var react_1 = __importDefault(require('react'))
var nav_frontend_paneler_1 = __importDefault(require('nav-frontend-paneler'))
var nav_frontend_typografi_1 = require('nav-frontend-typografi')
var svg_1 = require('../ui/svg')
var nav_frontend_lenker_1 = __importDefault(require('nav-frontend-lenker'))
var nav_frontend_knapper_1 = require('nav-frontend-knapper')
var moment_1 = __importDefault(require('moment'))
require('./apikey-styles.less')
var azureAdGroupUrl =
  'https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/'
var formatTimestamp = function (timestamp) {
  return moment_1['default'](timestamp).format('DD MMMM YYYY')
}
var findNewestKey = function (apiKeys) {
  var apiKeysByExpieryDate = apiKeys.sort(function (a, b) {
    return moment_1['default'](b.expires).unix() - moment_1['default'](a.expires).unix()
  })
  return apiKeysByExpieryDate[0]
}
function TeamCard(props) {
  var apiKeys = props.apiKeys,
    handleKeyRotation = props.handleKeyRotation
  var _a = findNewestKey(apiKeys),
    team = _a.team,
    key = _a.key,
    expires = _a.expires,
    groupId = _a.groupId,
    created = _a.created
  return react_1['default'].createElement(
    nav_frontend_paneler_1['default'],
    { border: true, className: 'apikeyCard' },
    react_1['default'].createElement(nav_frontend_typografi_1.Undertittel, null, team),
    react_1['default'].createElement(
      nav_frontend_typografi_1.Element,
      null,
      react_1['default'].createElement(svg_1.KeyIcon, null),
      key
    ),
    react_1['default'].createElement(KeyStatus, { expiresTimestamp: expires }),
    react_1['default'].createElement(
      nav_frontend_typografi_1.Normaltekst,
      null,
      'Created ' + formatTimestamp(created)
    ),
    react_1['default'].createElement(
      nav_frontend_typografi_1.Element,
      { className: 'aad' },
      'Azure AD team id'
    ),
    react_1['default'].createElement(
      nav_frontend_typografi_1.Normaltekst,
      null,
      react_1['default'].createElement(
        nav_frontend_lenker_1['default'],
        { href: '' + azureAdGroupUrl + groupId, target: 'new' },
        '' + groupId
      )
    ),
    react_1['default'].createElement(
      'div',
      { className: 'newKeyButton' },
      react_1['default'].createElement(
        nav_frontend_knapper_1.Knapp,
        {
          mini: true,
          onClick: function () {
            return handleKeyRotation(team)
          },
        },
        react_1['default'].createElement(svg_1.AddCircle, null),
        react_1['default'].createElement('span', null, 'Rotate key')
      )
    )
  )
}
var KeyStatus = function (props) {
  var expiresTimestamp = props.expiresTimestamp
  if (moment_1['default'](expiresTimestamp).isAfter(moment_1['default'].now())) {
    return react_1['default'].createElement(
      nav_frontend_typografi_1.Normaltekst,
      null,
      'Valid for another ' + moment_1['default'](expiresTimestamp).fromNow(true)
    )
  } else {
    return react_1['default'].createElement(
      nav_frontend_typografi_1.Feilmelding,
      null,
      'Key expired  ' + formatTimestamp(expiresTimestamp)
    )
  }
}
exports['default'] = TeamCard
