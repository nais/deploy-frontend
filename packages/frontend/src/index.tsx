import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './styles.less'
import { initAmplitude } from './amplitude'

initAmplitude()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
