import React from 'react'
import { Link } from 'react-router-dom';
import close from '../../images/CloseIcon.svg'
import account from '../../images/account.svg'
function HeaderAside(props) {
  let statusOpened = ""
	
	if (props.isOpen){
		statusOpened = "active"
		
	}else {
		statusOpened = ""
		
	}
  //console.log(props)
  const closeAside = () =>{
    props.closeClick()
  }
  return (
    <div className={`aside__wrap ${statusOpened}`}>
      <header className="header aside">
        <button className="header__close" onClick={closeAside}><img src={close}></img></button>
        <nav className="header__nav header__nav_aside">
          <Link to="/" onClick={props.mainClick} className="header__link">Главная</Link>
          <Link to="/movies" onClick={props.moviesClick} className="header__link">Фильмы</Link>
          <Link to="/saved-movies" onClick={props.savedClick} className="header__link">Сохраненные фильмы</Link>
        </nav>
        <div className="header__buttons header__buttons_aside">
          <Link to="/profile" onClick={props.accClick} className="header__reg-button">Аккаунт</Link>
          <div className="acount__img" alt="аккаунт"><img src={account}></img></div>
        </div>
        <button className="header__open"></button>
      </header>
    </div>
  );
}

export default HeaderAside;