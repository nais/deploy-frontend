import React from 'react'
import { NavLink } from 'react-router-dom'

import './navbar-styles.less'

const NavBar = () => (
  <nav className="mainNav" aria-label="Hoved">
    <div className="mainNav__wrapper">
      <ul>
        {
          <li>
            <NavLink exact={true} activeClassName="active" to="/">
              API keys
            </NavLink>
          </li>
        }
        <div style={{ flexGrow: 1 }} />
      </ul>
    </div>
  </nav>
)

export default NavBar
