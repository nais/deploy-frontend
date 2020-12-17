'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var react_1 = __importDefault(require('react'))
var nav_frontend_veilederpanel_1 = __importDefault(require('nav-frontend-veilederpanel'))
require('./apikey-styles.less')
var nav_frontend_typografi_1 = require('nav-frontend-typografi')
var nav_frontend_lenker_1 = __importDefault(require('nav-frontend-lenker'))
var svg_1 = require('../ui/svg')
function InfoPanel() {
  return react_1['default'].createElement(
    'div',
    { className: 'infoPanel' },
    react_1['default'].createElement(
      nav_frontend_veilederpanel_1['default'],
      { svg: svg_1.Veileder },
      react_1['default'].createElement(
        nav_frontend_typografi_1.Normaltekst,
        null,
        "Here are your teams' API keys."
      ),
      react_1['default'].createElement(
        nav_frontend_typografi_1.Normaltekst,
        null,
        'Please refer to the',
        ' ',
        react_1['default'].createElement(
          nav_frontend_lenker_1['default'],
          { href: 'https://doc.nais.io/deployment', target: 'new' },
          'nais documentation'
        ),
        ' ',
        'for how to use the key when setting up your deployment pipeline.'
      )
    )
  )
}
exports['default'] = InfoPanel
