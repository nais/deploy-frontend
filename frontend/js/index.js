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
var react_1 = __importDefault(require('react'))
var DOM = __importStar(require('react-dom'))
var header_1 = __importDefault(require('./ui/header'))
var react_router_dom_1 = require('react-router-dom')
var apiKeys_1 = __importDefault(require('./apiKeys/apiKeys'))
var dashboard_1 = __importDefault(require('./dashboard/dashboard'))
var react_redux_1 = require('react-redux')
var configureStore_1 = __importDefault(require('./config/configureStore'))
require('./styles.less')
var store = configureStore_1['default']()
function Application() {
  return react_1['default'].createElement(
    react_redux_1.Provider,
    { store: store },
    react_1['default'].createElement(
      react_router_dom_1.BrowserRouter,
      null,
      react_1['default'].createElement(
        'div',
        { className: 'mainWrapper' },
        react_1['default'].createElement(header_1['default'], null),
        react_1['default'].createElement(
          react_router_dom_1.Switch,
          null,
          react_1['default'].createElement(
            react_router_dom_1.Route,
            { path: '/apikeys' },
            react_1['default'].createElement(apiKeys_1['default'], null)
          ),
          react_1['default'].createElement(
            react_router_dom_1.Route,
            { path: '/' },
            react_1['default'].createElement(dashboard_1['default'], null)
          )
        )
      )
    )
  )
}
DOM.render(react_1['default'].createElement(Application, null), document.getElementById('root'))
