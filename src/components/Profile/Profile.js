import React from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header1';
import HeaderAside from '../Header/HeaderAside';
import PopupWithForm from '../Popups/PopupWithForm'
import { CurrentUserContext} from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom';
function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.email);

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
      }, [currentUser]);

    return (
        <>
            <HeaderAside isOpen={props.isAsideOpened} closeClick={props.handleAsideChange}/>
            <PopupWithForm title="Редактировать профиль" name="field_edit" buttonText="Сохранить" onUpdateUser={props.handleUpdateUser} isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups} />
            <Header isOpen={props.isAsideOpened} asideClick={props.handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
            <section className="profile">
                <h2 className="profile__header">Привет, {props.name}!</h2>
                <div className="profile__block">
                    <div className="profile__wrap">
                        <p className="profile__info">Имя</p>
                        <p className="profile__info">{props.name}</p>
                    </div>
                    <div className="profile__wrap">
                        <p className="profile__info">Email</p>
                        <p className="profile__info">{props.email}</p>
                    </div>
                </div>
                <button className="profile__button" onClick={props.onEditProfile}>Редактировать</button>
                <Link to="/" onClick={props.signOut} className="profile__link">Выйти из аккаунта</Link>
                
            </section>


        </>
    )
}

export default withRouter(Profile)