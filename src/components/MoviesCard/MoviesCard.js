import React from 'react'


function MoviesCard(props) {

    const handleClick = () => {
        props.onClick(props.cardsToAdd)
    }


    return (
        <div className="element">

            <div className="element__info">

                <div className="element__wrap">

                    <a href={props.cardsToAdd.trailerLink} className="element__title">{props.cardsToAdd.nameRU}</a>

                    <p className="element__duration">{props.cardsToAdd.duration}</p>
                </div>

                <button className={props.buttonClass} onClick={handleClick} ></button>
            </div>
            <a href={props.cardsToAdd.trailerLink}>
                <img alt="обложка фильма" className="element__image" src={`https://api.nomoreparties.co${props.cardsToAdd.image.url}`} />
            </a >
        </div>
    );

}

export default MoviesCard;