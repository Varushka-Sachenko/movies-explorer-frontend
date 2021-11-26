import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import account from '../../images/account.svg'
import open from '../../images/open.png'
function Header(props) {
  //console.log(props)
  const openAside = () =>{
    props.asideClick()
  }
  return (
    <header className="header header1">
      <Link to="/" className="header__logo header0__logo"><img src={logo}></img></Link>
      <nav className="header__nav">
        <Link to={props.moviesLink} onClick={props.moviesClick} className="header__link">Фильмы</Link>
        <Link to={props.savedLink} onClick={props.savedClick} className="header__link">Сохраненные фильмы</Link>
      </nav>
      <div className="header__buttons">
        <Link to="/profile" onClick={props.accClick} className="header__reg-button">Аккаунт</Link>
        <div className="acount__img" alt="аккаунт"><img src={account}></img></div>
      </div>
      <button className={`header__open ${props.isopen}`} onClick={openAside}><img src={open}></img></button>
    </header>);
}

export default Header;