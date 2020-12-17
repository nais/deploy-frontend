'use strict'
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
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
exports.ApiKeys = void 0
var react_1 = __importStar(require('react'))
var react_redux_1 = require('react-redux')
var actionTypes_1 = require('../config/actionTypes')
var teamCard_1 = __importDefault(require('./teamCard'))
var infoPanel_1 = __importDefault(require('./infoPanel'))
require('./apikey-styles.less')
var nav_frontend_alertstriper_1 = __importDefault(require('nav-frontend-alertstriper'))
var nav_frontend_typografi_1 = require('nav-frontend-typografi')
var nav_frontend_spinner_1 = __importDefault(require('nav-frontend-spinner'))
var rotateKeyModal_1 = __importDefault(require('./rotate/rotateKeyModal'))
var groupByTeam = function (data) {
  return data.reduce(function (result, currentValue) {
    var teamName = currentValue['team']
    if (!result.hasOwnProperty(teamName)) {
      result[teamName] = []
    }
    result[teamName].push(currentValue)
    return result
  }, {})
}
var ApiKeys = /** @class */ (function (_super) {
  __extends(ApiKeys, _super)
  function ApiKeys(props) {
    return _super.call(this, props) || this
  }
  ApiKeys.prototype.showConfirmationModal = function (teamName) {
    this.props.dispatch({ type: actionTypes_1.APIKEY_ROTATE_CONFIRMATION, value: teamName })
  }
  ApiKeys.prototype.cancelKeyRotation = function () {
    this.props.dispatch({ type: actionTypes_1.APIKEY_CANCEL_ROTATION })
  }
  ApiKeys.prototype.rotateKey = function (teamName) {
    this.props.dispatch({ type: actionTypes_1.APIKEY_ROTATE_REQUEST, team: teamName })
  }
  ApiKeys.prototype.componentDidMount = function () {
    var dispatch = this.props.dispatch
    dispatch({ type: actionTypes_1.APIKEYS_REQUEST })
  }
  ApiKeys.prototype.render = function () {
    var _this = this
    var _a = this.props,
      apiKeys = _a.apiKeys,
      fetchStatus = _a.fetchStatus,
      errorMessage = _a.errorMessage,
      rotateKey = _a.rotateKey
    var apiKeysByTeam = groupByTeam(apiKeys)
    var teamNames = Object.keys(apiKeysByTeam).sort()
    return react_1['default'].createElement(
      react_1['default'].Fragment,
      null,
      fetchStatus == 'FETCHING'
        ? react_1['default'].createElement(
            nav_frontend_typografi_1.Undertittel,
            null,
            react_1['default'].createElement(nav_frontend_spinner_1['default'], {
              type: 'XS',
              className: 'spinner',
            }),
            ' Loading...'
          )
        : react_1['default'].createElement(
            react_1['default'].Fragment,
            null,
            react_1['default'].createElement(
              'div',
              null,
              react_1['default'].createElement(infoPanel_1['default'], null),
              fetchStatus === 'ERROR' &&
                react_1['default'].createElement(
                  nav_frontend_alertstriper_1['default'],
                  { type: 'feil', className: 'errorMessage' },
                  react_1['default'].createElement(
                    nav_frontend_typografi_1.Element,
                    null,
                    'An error occured when fetching apikeys.'
                  ),
                  react_1['default'].createElement(
                    nav_frontend_typografi_1.Normaltekst,
                    null,
                    errorMessage
                  ),
                  ' '
                ),
              teamNames.map(function (teamName, idx) {
                return react_1['default'].createElement(teamCard_1['default'], {
                  key: idx,
                  apiKeys: apiKeysByTeam[teamName],
                  handleKeyRotation: function (team) {
                    return _this.showConfirmationModal(team)
                  },
                })
              })
            ),
            react_1['default'].createElement(rotateKeyModal_1['default'], {
              keyRotationStatus: rotateKey,
              onRequestClose: function () {
                return _this.cancelKeyRotation()
              },
              onRotatekey: function (team) {
                return _this.rotateKey(team)
              },
            })
          )
    )
  }
  return ApiKeys
})(react_1.Component)
exports.ApiKeys = ApiKeys
var mapStateToProps = function (state) {
  return {
    apiKeys: state.apiKeys.data,
    fetchStatus: state.apiKeys.status,
    errorMessage: state.apiKeys.errorMessage,
    rotateKey: state.rotateKey,
  }
}
exports['default'] = react_redux_1.connect(mapStateToProps)(ApiKeys)
