import HeaderStyle from './Style'
import MiniCart from '../Components/MiniCart'
import Navigation from '../Components/Navigation'
import Profile from '../Components/Profile'
import Search from '../Components/Search'

const Header = () => {
  return <HeaderStyle>
    <div className="header__wrapper">
      <div className="logo">Sector17</div>
      <div className="header__actions">
        <Search />
        <Profile />
        <MiniCart />
      </div>
    </div>
    <Navigation />
  </HeaderStyle>
}

export default Header;