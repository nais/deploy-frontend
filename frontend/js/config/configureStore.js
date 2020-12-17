'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var redux_1 = require('redux')
var redux_saga_1 = __importDefault(require('redux-saga'))
var redux_devtools_extension_1 = require('redux-devtools-extension')
var sagas_1 = __importDefault(require('../sagas'))
var rootReducer_1 = __importDefault(require('./rootReducer'))
function configureStore() {
  var sagaMiddleware = redux_saga_1['default']()
  var composedMiddleware
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      'WARNING: Running Redux with devTools extension. This should only be used in development and not in production.'
    )
    composedMiddleware = redux_devtools_extension_1.composeWithDevTools(
      redux_1.applyMiddleware(sagaMiddleware)
    )
  } else {
    composedMiddleware = redux_1.compose(redux_1.applyMiddleware(sagaMiddleware))
  }
  var store = redux_1.createStore(rootReducer_1['default'], composedMiddleware)
  sagaMiddleware.run(sagas_1['default'])
  return store
}
exports['default'] = configureStore
