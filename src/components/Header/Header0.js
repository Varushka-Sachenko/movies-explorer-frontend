import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
function Header(props) {
  console.log(props)
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <div className="header__buttons">
        <Link to={props.regLink} className="header__reg-button">Регистрация</Link>
        <Link to={props.signinLink} className="header__log-in-button">Войти</Link>
      </div>

    </header>);
}

export default Header;