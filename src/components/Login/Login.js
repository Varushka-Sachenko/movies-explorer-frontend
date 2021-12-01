import React, { useCallback } from "react";
import { Link, withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
    function submit (e){
        props.onSubmit(e, email, password)
        resetForm()
    }
    

    let inactive = '';
    if (!isValid){
        inactive = 'inactive';
    }
    function handleUserEmail(e) {
        setEmail(e.target.value);
    }
    function handleUserPassword(e) {
        setPassword(e.target.value);
    }
    


    return (

        <>

            <form className={`form form_login`} onChange={handleChange} name="test" method="post" onSubmit={submit}>
            <Link to="/" className="header__logo"><img alt="логотип" src={logo}></img></Link>
                <h2 className="form__text form__text_login">Рады видеть!</h2>

                <label className="form__label">Email</label>
                <input value={email} onChange={handleUserEmail} name="email" className="form__field-text form__field-text_input_name form__field-text_login" placeholder="Email" type="email"
                    size="40" required minLength="2" maxLength="40" />
                <span id="username-error" className="username-error form__input-error"></span>
                <label className="form__label">Пароль</label>
                <input value={password} onChange={handleUserPassword} name="password" className="form__field-text form__field-text_input_job form__field-text_login" placeholder="Пароль"
                    type="password" size="40" required minLength="2" maxLength="200" />
                <span id="status-error" className="status-error form__input-error"></span>
                <button type="submit" className={`form__save-button form__save-button_login ${inactive}`}>Войти</button>
                <p className="form__under-button-text">Еще не зарегистрированы? <Link className="form__under-button-link" to="/signup">Регистрация</Link></p>
            </form>


        </>
    )
}

export default withRouter(Login)