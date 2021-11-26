import React from 'react'


function MoviesCard(props) {

    return (
        <div className="element">

            <div className="element__info">
                <div className="element__wrap">
                    <h2 className="element__title">{props.cardsToAdd.name}</h2>
                    <p className="element__duration">{props.cardsToAdd.duration}</p>
                </div>

                <button className={props.buttonClass} ></button>
            </div>
            <img className="element__image" alt="Обложка фильма" src={props.cardsToAdd.link} />
        </div>
    );

}

export default MoviesCard;