import React, { useCallback } from "react";
import { Link, withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
function Register(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handleUserName(e) {
        setName(e.target.value);
    }

    function handleUserEmail(e) {
        setEmail(e.target.value);
    }
    function handleUserPassword(e) {
        setPassword(e.target.value);
    }

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
    if (target.name === 'email' &&(!(( target.value.indexOf('.')=== (target.value.length - 2) || target.value.indexOf('.')=== (target.value.length - 3))))){
        setErrors({...errors, [name]: 'Пожалуйста, введите адрес электронной почты.' });
    }
    
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
        props.onSubmit(e, name, email, password)
        resetForm()
    }
    

    let inactive = '';
    if (!isValid){
        inactive = 'inactive';
    }


    return (

        <>

            <form className={`form form_login`} onChange={handleChange} name="test" method="post" onSubmit={submit}>
            <Link to="/" className="header__logo"><img alt="логотип" src={logo}></img></Link>
                <h2 className="form__text form__text_login">Добро пожаловать!</h2>
                <label className="form__label">Имя</label>
                <input value={name} onChange={handleUserName} name="name" className="form__field-text form__field-text_input_name form__field-text_login" placeholder="Имя" type="text"
                    size="40" required minLength="2" maxLength="40" />
                <span id="username-error" className="username-error form__input-error">{errors.name}</span>
                
                <label className="form__label">Email</label>
                <input  value={email} onChange={handleUserEmail} name="email" className="form__field-text form__field-text_input_name form__field-text_login" placeholder="Email" type="email"
                    size="40" required minLength="2" maxLength="40" />
                <span id="username-error" className="username-error form__input-error">{errors.email}</span>
                
                <label className="form__label">Пароль</label>
                <input  value={password} onChange={handleUserPassword} name="password" className="form__field-text form__field-text_input_job form__field-text_login" placeholder="Пароль"
                    type="password" size="40" required minLength="2" maxLength="200" />
                <span id="status-error" className="status-error form__input-error">{errors.password}</span>
                
                <button type="submit" className={`form__save-button form__save-button_login ${inactive}`}>Зарегистрироваться</button>
                <p className="form__under-button-text">Уже зарегистрированы? <Link className="form__under-button-link" to="/signin">Войти</Link></p>
            </form>


        </>
    )
}

export default withRouter(Register)