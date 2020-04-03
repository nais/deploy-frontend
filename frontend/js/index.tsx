import React from 'react'
import * as DOM from 'react-dom'
import Header from './ui/header'
import { BrowserRouter as Router } from 'react-router-dom'
import ApiKeys from './apiKeys/apiKeys'
import { Provider } from 'react-redux'
import configureStore from './config/configureStore'

import './styles.less'

const store = configureStore()

function Application() {
  return (
    <Provider store={store}>
      <Router>
        <div className="mainWrapper">
          <Header />
          <ApiKeys />
        </div>
      </Router>
    </Provider>
  )
}

DOM.render(<Application />, document.getElementById('root'))
