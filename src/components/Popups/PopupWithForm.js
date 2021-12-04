import React, { useCallback } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
export default function PopupWithForm(props) {
  let statusOpened = ""

  if (props.isOpen) {
    statusOpened = "popup_opened"

  } else {
    statusOpened = ""

  }

  const closePopups = props.onClose

  const closeEventListeners = (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopups()
    }
  }

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
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

  let inactive = '';
  if (!isValid) {
    inactive = 'inactive';
  }

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser, props.isOpen]);

  function handleUserName(e) {
    setName(e.target.value);
  }
  function handleUserEmail(e) {
    setEmail(e.target.value);
  }

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      email: email,
    });
    resetForm()
  }



  return (
    <div className={`popup popup_${props.name} ${statusOpened} `} onClick={closeEventListeners} >
      <div className={`popup__container`}>
        <button className="popup__close-button" onClick={closePopups} type="button"></button>
        <form onChange={handleChange} className={`form form_${props.name} form__error`} name={props.name} onSubmit={handleSubmit}>
          <h2 className="form__text form__error-text">{props.title}</h2>
          <input name="name" className="form__field-text form__field-text_input_name form__input-text" placeholder="Имя" type="text"
            size="40" id="username" required minLength="2" value={name} maxLength="40" onChange={handleUserName} />
          <span id="username-error" className="username-error form__input-error">{errors.name}</span>

          <input name="info" className="form__field-text form__field-text_input_job form__input-text" placeholder="Email"
            type="email" size="40" id="status" required minLength="2" value={email} maxLength="200" onChange={handleUserEmail} />
          <span id="status-error" className="status-error form__input-error">{errors.info}</span>
          <button type="submit" className={`form__save-button form__save-button_login form__error-button ${inactive}`}>{props.buttonText}</button>
        </form>
      </div>
    </div>)
}

