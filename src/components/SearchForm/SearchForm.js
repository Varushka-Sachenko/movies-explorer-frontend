import React from 'react'


function SearchForm() {
    return (
        <div>
            <form className="searchForm">
                <input className="form__input" defaultValue="Фильм"></input>
                <button className="form__button"></button>
            </form>
            <div className="switch__box">
                <input className="switch" type="checkbox" value="Короткометражки" checked></input>
                <label className="switch__text" for="click">Короткометражки</label>
            </div>
        </div>

    );
}

export default SearchForm;