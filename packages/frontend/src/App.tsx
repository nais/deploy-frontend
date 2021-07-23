import React from 'react'
import Header from './ui/header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ApiKeys from './apiKeys/apiKeys'
import Dashboard from './dashboard/dashboard'
import { Provider } from 'react-redux'
import configureStore from './config/configureStore'
const store = configureStore()

export function App() {
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
