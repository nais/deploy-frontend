import { NavLink } from 'react-router-dom'
import { NaisLogo } from './svg'

import './navbar-styles.less'

const NavBar = () => (
  <nav className="mainNav" aria-label="Hoved">
    <div className="mainNav__wrapper">
      <ul>
        <li>
          <NavLink exact={true} activeClassName="active" to="/">
            Dashboard
          </NavLink>
          <NavLink exact={true} activeClassName="active" to="/apikeys">
            API keys
          </NavLink>
        </li>

        <div style={{ flexGrow: 1 }} />
        <li>
          <a href="https://doc.nais.io/basics/teams" target="new" className="nais">
            <NaisLogo />
            NAIS documentation
          </a>
        </li>
      </ul>
    </div>
  </nav>
)

export default NavBar
