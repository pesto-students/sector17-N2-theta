import dynamic from 'next/dynamic'
import { useState } from 'react'
import Link from 'next/link'
import HeaderStyle from './Style'
import MiniCart from '../Components/MiniCart'
import Navigation from '../Components/Navigation'
import Search from '../Components/Search'

const User = dynamic(() => import("../Components/User"), {
  ssr: false
});

const Header = () => {
  const [dropMenu, setDropMenu] = useState('');

  const handleDropMenu = (menuName) => {
    setDropMenu(menuName);
  }

  return <HeaderStyle>
    <div className="header__wrapper">
      <div className="logo">
        <Link href="/">
          <a>Sector17</a>
        </Link>
      </div>
      <div className="header__actions">
        <Search />
        <User dropMenu={dropMenu} handleDropMenu={handleDropMenu} />
        <MiniCart dropMenu={dropMenu} handleDropMenu={handleDropMenu} />
      </div>
    </div>
    <Navigation />
  </HeaderStyle>
}

export default Header;