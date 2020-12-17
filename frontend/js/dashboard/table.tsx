import 'nav-frontend-tabell-style'
import React from 'react'
import './apikey-styles.less'

function Table() {
  return (
    <table className="tabell">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Team</th>
          <th>Repository</th>
          <th>Deploy</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  )
}

export default Table
