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
var NavBar_1 = __importDefault(require('./NavBar'))
var userInfo_1 = __importDefault(require('./userInfo'))
require('./header-styles.less')
function Header() {
  return react_1['default'].createElement(
    'header',
    { className: 'header' },
    react_1['default'].createElement(
      'div',
      { className: 'header__content' },
      react_1['default'].createElement(
        react_router_dom_1.NavLink,
        { to: '/', className: 'header__logo' },
        react_1['default'].createElement(svg_1.NaisLogo, null),
        react_1['default'].createElement('div', { className: 'header__title' }, 'Nais deploy')
      ),
      react_1['default'].createElement(userInfo_1['default'], null),
      react_1['default'].createElement(NavBar_1['default'], null)
    )
  )
}
exports['default'] = Header
