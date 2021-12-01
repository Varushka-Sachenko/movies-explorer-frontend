import React, { useCallback } from "react";

export default function PopupWithForm(props) {
	let statusOpened = ""
	
	if (props.isOpen){
		statusOpened = "popup_opened"
		
	}else {
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
        props.onSubmit()
        resetForm()
    }
    

    let inactive = '';
    if (!isValid){
        inactive = 'inactive';
    }


	
	return (
		<div className={`popup popup_${props.name} ${statusOpened} `} onClick={closeEventListeners} >
			<div className={`popup__container`}>
				<button className="popup__close-button" onClick={closePopups} type="button"></button>
				<form onChange={handleChange} className={`form form_${props.name} form__error`} name={props.name} onSubmit={submit}>
					<h2 className="form__text form__error-text">{props.title}</h2>
					{props.children}
					<button type="submit" className={`form__save-button form__save-button_login ${inactive}`}>{props.buttonText}</button>
                </form>
            </div>
		</div>)
}

