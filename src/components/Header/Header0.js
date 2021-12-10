import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
function Header(props) {

  return (
    <header className="header0 header">
      <Link to="/" className="header__logo header0__logo"><img alt="логотип" src={logo}></img></Link>
      <div className="header0__buttons header__buttons">
        <Link to={props.regLink} className="header__reg-button">Регистрация</Link>
        <Link to={props.signinLink} className="header__log-in-button">Войти</Link>
      </div>

    </header>);
}

export default Header;