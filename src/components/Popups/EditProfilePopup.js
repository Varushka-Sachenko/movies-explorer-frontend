import React from 'react'

import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
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
      } 

    return (
        <PopupWithForm buttonText="Сохранить" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Редактировать профиль" name="field_edit" children={
            <>
                <input name="name" className="form__field-text form__field-text_input_name form__input-text" placeholder="Имя" type="text"
                    size="40" id="username" required minLength="2" value={name} maxLength="40" onChange={handleUserName} />
                <span id="username-error" className="username-error form__input-error"></span>

                <input name="info" className="form__field-text form__field-text_input_job form__input-text" placeholder="Email"
                    type="email" size="40" id="status" required minLength="2" value={email}  maxLength="200" onChange={handleUserEmail} />
                <span id="status-error" className="status-error form__input-error"></span>
            </>
        } />
    )
}
