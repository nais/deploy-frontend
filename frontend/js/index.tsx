import React from 'react'
import * as DOM from 'react-dom'
import Header from './ui/header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ApiKeys from './apiKeys/apiKeys'
import Dashboard from './dashboard/dashboard'
import { Provider } from 'react-redux'
import configureStore from './config/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.less'

const store = configureStore()

function Application() {
  return (
    <Provider store={store}>
      <Router>
        <div className="mainWrapper">
          <Header />
          <Switch>
            <Route path="/apikeys">
              <ApiKeys />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

DOM.render(<Application />, document.getElementById('root'))
