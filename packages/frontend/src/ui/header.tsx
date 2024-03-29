import { NavLink } from 'react-router-dom'
import { NaisLogo } from './svg'
import NavBar from './NavBar'
import UserInfo from './userInfo'

import './header-styles.less'

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <NavLink to="/" className="header__logo">
          <NaisLogo />
          <div className="header__title">Nais deploy</div>
        </NavLink>
        <UserInfo />
        <NavBar />
      </div>
    </header>
  )
}

export default Header
