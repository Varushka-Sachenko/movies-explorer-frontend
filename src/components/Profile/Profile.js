import React from 'react'
import { withRouter } from 'react-router-dom';
import validator from 'validator'
import Header from '../Header/Header1';
import HeaderAside from '../Header/HeaderAside';
import PopupWithForm from '../Popups/PopupWithForm'
import { Link } from 'react-router-dom';
import InfoTooltip from '../Popups/InfoTooltip';
import MainApi from '../../utils/MainApi'
import union from '../../images/Union.png'
import error from '../../images/Error.png'
function Profile(props) {
    const handleSubmit = (evt, data) => {
        // console.log(data)
        evt.preventDefault()
        mainApi.editProfileINfo({
            name: name,
            email: email,
        })
            .then((useData) => {
                props.updateCurrentUser({
                    name: useData.name,
                    email: useData.email
                })
                setIsSuccessPopupOpened(true)

            })
            .catch((err) => {
                setIsErrorPopupOpened(true)
                console.log(err);
            });

    }
    const mainApi = new MainApi({
        adress: 'https://api.mesto-cards.nomoredomains.rocks',
        token: localStorage.getItem('token')
    })

    const [isErrorPopupOpened, setIsErrorPopupOpened] = React.useState(false);
    const [isSuccessPopupOpened, setIsSuccessPopupOpened] = React.useState(false);

    const [values, setValues] = React.useState({ name: props.currentUser.name, email: props.currentUser.email });
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const [activeButton, setActiveButton] = React.useState(true)
    const [name, setName] = React.useState(props.currentUser.name);
    const [email, setEmail] = React.useState(props.currentUser.email);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
        if (name === 'email' && !validator.isEmail(value)) {
            setErrors({ ...errors, [name]: 'Пожалуйста, введите адрес электронной почты.' });
        }
    };
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if ((props.currentUser.name !== name || props.currentUser.email !== email) && isValid) {
            setActiveButton(true)
        } else {
            setActiveButton(false)
        }
    }, [name, email, isValid, props.currentUser.name, props.currentUser.email])
    
    function handleUserName(e) {
        setName(e.target.value);
    }
    function handleUserEmail(e) {
        setEmail(e.target.value);
    }

    const closeAllPopups = () => {
        setIsErrorPopupOpened(false)
        setIsSuccessPopupOpened(false)
    }

   

    return (
        <>
            <InfoTooltip title="Что-то пошло не так! Попробуйте ещё раз." name="modal" isOpen={isErrorPopupOpened} onClose={closeAllPopups} image={error} />
            <InfoTooltip title="Запрос выполнен успешно!" name="modal" isOpen={isSuccessPopupOpened} onClose={closeAllPopups} image={union} />
            <HeaderAside isOpen={props.isAsideOpened} closeClick={props.handleAsideChange} />
            <PopupWithForm title="Редактировать профиль" name="field_edit" buttonText="Сохранить" onUpdateUser={props.handleUpdateUser} isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups} />
            <Header isOpen={props.isAsideOpened} asideClick={props.handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
            <section className="profile">
                <h2 className="profile__header">Привет, {props.currentUser.name}!</h2>
                <form onChange={handleChange} onSubmit={(evt) => {handleSubmit(evt, {name: name, email: email})}} className="profile__block">
                    <div className="profile__wrap">
                        <label className="profile__info">Имя</label>
                        <input onChange={handleUserName} value={name} className="profile__info"></input>
                        <span id="username-error" className="username-error form__input-error">{errors.name}</span>
                    </div>
                    <div className="profile__wrap">
                        <label className="profile__info">Email</label>
                        <input onChange={handleUserEmail} value={email} className="profile__info"></input>
                        <span id="status-error" className="status-error form__input-error">{errors.info}</span>
                    </div>

                    {activeButton
                        ? <input className="profile__button" type="submit" value="Редактировать"></input>
                        : <input className="profile__button inactive" type="submit" value="Редактировать" disabled></input>
                    }

                    <Link to="/" onClick={props.signOut} className="profile__link">Выйти из аккаунта</Link>
                </form>
            </section>


        </>
    )
}

export default withRouter(Profile)