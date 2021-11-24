import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
function Header(props) {
  //console.log(props)
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <nav className="header__nav">
        <Link to={props.moviesLink} onClick={props.moviesClick} className="header__link">Фильмы</Link>
        <Link to={props.savedLink} onClick={props.savedClick} className="header__link">Сохраненные фильмы</Link>
      </nav>
      <div className="header__buttons">
        <Link to="/profile" onClick={props.accClick} className="header__reg-button">Аккаунт</Link>
        <div className="acount__img" alt="аккаунт"></div>
      </div>
      <button className="header__open"></button>
    </header>);
}

export default Header;