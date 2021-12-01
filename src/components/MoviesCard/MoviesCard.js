import React from 'react'


function MoviesCard(props) {

    const handleClick = () => {
        props.onClick(props.cardsToAdd)
    }


    return (
        <a href={props.cardsToAdd.trailerLink} className="element">

            <div className="element__info">
                <div className="element__wrap">
                    <h2 className="element__title">{props.cardsToAdd.nameRU}</h2>
                    <p className="element__duration">{props.cardsToAdd.duration}</p>
                </div>

                <button className={props.buttonClass} onClick={handleClick} ></button>
            </div>
            <img alt="обложка фильма" className="element__image" src={`https://api.nomoreparties.co${props.cardsToAdd.image.url}`}/>
        </a>
    );

}

export default MoviesCard;