import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
function Register(props) {

    return (

        <>

            <form className={`form form_login`} name="test">
                <Link to="/" className="header__logo" />
                <h2 className="form__text form__text_login">Добро пожаловать!</h2>
                <label class="form__label">Имя</label>
                <input name="name" className="form__field-text form__field-text_input_name form__field-text_login" placeholder="Имя" type="text"
                    size="40" required minLength="2" maxLength="40" />
                <span id="username-error" className="username-error form__input-error"></span>
                <label class="form__label">Email</label>
                <input name="email" className="form__field-text form__field-text_input_name form__field-text_login" placeholder="Email" type="email"
                    size="40" required minLength="2" maxLength="40" />
                <span id="username-error" className="username-error form__input-error"></span>
                <label class="form__label">Пароль</label>
                <input name="password" className="form__field-text form__field-text_input_job form__field-text_login" placeholder="Пароль"
                    type="password" size="40" required minLength="2" maxLength="200" />
                <span id="status-error" className="status-error form__input-error"></span>
                <button type="submit" className="form__save-button form__save-button_login">Зарегистрироваться</button>
                <p className="form__under-button-text">Уже зарегистрированы? <Link className="form__under-button-link" to="/signin">Войти</Link></p>
            </form>


        </>
    )
}

export default withRouter(Register)