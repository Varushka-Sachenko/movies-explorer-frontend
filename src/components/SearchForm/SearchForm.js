import React from 'react'
import search from '../../images/find.png'

function SearchForm(props) {
    const [word, setWord] = React.useState();
    if (props.buttonClass === 'element__saved'){
        setWord(localStorage.getItem('wordSaved'));
    } else{
        setWord(localStorage.getItem('word'));
    }
    
    const [isShort, setShort] = React.useState(false);
    function handleSubmit (e){
        props.onSubmit(word, isShort)
    }
    function handleWord(e) {
        setWord(e.target.value);
    }
    function handleCheckbox() {
        setShort(!isShort);
    }
    return (
        <div>
            <form className="searchForm" onSubmit={handleSubmit}>
                <input value={word} onChange={handleWord} className="form__input" placeholder="Фильм" required></input>
                <button className="form__button"><img alt="поиск" src={search}></img></button>
            </form>
            <div className="switch__box">
                <input onChange={handleCheckbox} className="switch" type="checkbox" value="Короткометражки" ></input>
                <label className="switch__text">Короткометражки</label>
            </div>
        </div>

    );
}

export default SearchForm;