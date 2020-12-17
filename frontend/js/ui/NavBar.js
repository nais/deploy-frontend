'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var react_1 = __importDefault(require('react'))
var react_router_dom_1 = require('react-router-dom')
var svg_1 = require('./svg')
require('./navbar-styles.less')
var NavBar = function () {
  return react_1['default'].createElement(
    'nav',
    { className: 'mainNav', 'aria-label': 'Hoved' },
    react_1['default'].createElement(
      'div',
      { className: 'mainNav__wrapper' },
      react_1['default'].createElement(
        'ul',
        null,
        react_1['default'].createElement(
          'li',
          null,
          react_1['default'].createElement(
            react_router_dom_1.NavLink,
            { exact: true, activeClassName: 'active', to: '/' },
            'Dashboard'
          ),
          react_1['default'].createElement(
            react_router_dom_1.NavLink,
            { exact: true, activeClassName: 'active', to: '/apikeys' },
            'API keys'
          )
        ),
        react_1['default'].createElement('div', { style: { flexGrow: 1 } }),
        react_1['default'].createElement(
          'li',
          null,
          react_1['default'].createElement(
            'a',
            { href: 'https://doc.nais.io/basics/teams', target: 'new', className: 'nais' },
            react_1['default'].createElement(svg_1.NaisLogo, null),
            'NAIS documentation'
          )
        )
      )
    )
  )
}
exports['default'] = NavBar
