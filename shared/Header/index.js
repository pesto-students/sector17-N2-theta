import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderStyle from './Style'
import MiniCart from '../Components/MiniCart'
import Navigation from '../Components/Navigation'
import Search from '../Components/Search'

const User = dynamic(() => import("../Components/User"), {
    ssr: false,
});

const Header = () => {
  const router = useRouter();
  const currentPath = router.asPath;
  const [dropMenu, setDropMenu] = useState('');

  const handleDropMenu = (menuName) => {
    setDropMenu(menuName);
  }
  
  useEffect(() => {
    setDropMenu('');
  }, [currentPath])

  return (
      <HeaderStyle>
          <div className="app-container">
              <div className="header__wrapper">
                  <div className="logo">
                      <Link href="/">
                          <a>Sector17</a>
                      </Link>
                  </div>
                  <div className="header__actions">
                      <Search />
                      <User
                          dropMenu={dropMenu}
                          handleDropMenu={handleDropMenu}
                      />
                      <MiniCart
                          dropMenu={dropMenu}
                          handleDropMenu={handleDropMenu}
                      />
                  </div>
              </div>
          </div>
          <Navigation />
      </HeaderStyle>
  );
};

export default Header;
