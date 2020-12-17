'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var react_1 = __importDefault(require('react'))
var nav_frontend_modal_1 = __importDefault(require('nav-frontend-modal'))
var nav_frontend_paneler_1 = __importDefault(require('nav-frontend-paneler'))
var nav_frontend_knapper_1 = require('nav-frontend-knapper')
var nav_frontend_alertstriper_1 = __importDefault(require('nav-frontend-alertstriper'))
var nav_frontend_typografi_1 = require('nav-frontend-typografi')
require('./rotate-key-styles.less')
function RotateKeyModal(props) {
  var keyRotationStatus = props.keyRotationStatus,
    onRequestClose = props.onRequestClose,
    onRotatekey = props.onRotatekey
  nav_frontend_modal_1['default'].setAppElement(document.getElementById('root'))
  return react_1['default'].createElement(
    nav_frontend_modal_1['default'],
    {
      className: 'confirmationDialog',
      //ariaHideApp={false}
      isOpen: keyRotationStatus.confirmationPending,
      onRequestClose: function () {
        return onRequestClose()
      },
      closeButton: true,
      contentLabel: 'Confirm key rotation',
    },
    react_1['default'].createElement(
      nav_frontend_paneler_1['default'],
      { className: 'confirmationDialog' },
      react_1['default'].createElement(
        nav_frontend_alertstriper_1['default'],
        { type: 'advarsel', form: 'inline' },
        react_1['default'].createElement(nav_frontend_typografi_1.Undertittel, null, 'Warning'),
        react_1['default'].createElement(
          nav_frontend_typografi_1.Normaltekst,
          null,
          'This will rotate the API key for team ',
          keyRotationStatus.teamName,
          ' and invalidate all existing keys.'
        )
      ),
      keyRotationStatus.status === 'ERROR' &&
        react_1['default'].createElement(
          nav_frontend_alertstriper_1['default'],
          { type: 'feil', className: 'errorMessage' },
          react_1['default'].createElement(
            nav_frontend_typografi_1.Element,
            null,
            'An error occured when creating new apikey.'
          ),
          react_1['default'].createElement(
            nav_frontend_typografi_1.Normaltekst,
            null,
            keyRotationStatus.errorMessage
          ),
          ' '
        ),
      react_1['default'].createElement(
        'div',
        { className: 'confirmButton' },
        react_1['default'].createElement(
          nav_frontend_knapper_1.Fareknapp,
          {
            mini: true,
            spinner: keyRotationStatus.status === 'PROCESSING',
            onClick: function () {
              return onRotatekey(keyRotationStatus.teamName)
            },
          },
          'Confirm'
        )
      )
    )
  )
}
exports['default'] = RotateKeyModal
