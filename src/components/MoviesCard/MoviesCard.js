import React from 'react'


function MoviesCard(props) {
    let isLiked = false;
    props.savedCards.forEach(i => {
        //console.log(i.nameRU, props.cardsToAdd.nameRU, i.nameRU === props.cardsToAdd.nameRU)
        if (i.nameRU === props.cardsToAdd.nameRU){
            isLiked = true
        }
    });
    
    const handleClick = () => {
        props.onClick(props.cardsToAdd, isLiked)

    }
    const cardLikeButtonClassName = `${props.buttonClass} ${isLiked ? 'like_active' : ''}`;

    let image= props.cardsToAdd.image

    if (props.buttonClass === 'element__like'){
        image = `https://api.nomoreparties.co${props.cardsToAdd.image.url}`
    }
    return (
        <div className="element">
            <div className="element__info">
                <div className="element__wrap">
                    <a href={props.cardsToAdd.trailerLink} className="element__title">{props.cardsToAdd.nameRU}</a>
                    <p className="element__duration">{props.cardsToAdd.duration}</p>
                </div>

                <button className={cardLikeButtonClassName} onClick={handleClick} ></button>
            </div>
            <a href={props.cardsToAdd.trailerLink}>
                <img alt="обложка фильма" className="element__image" src={`${image}`} />
            </a >
        </div>
    );

}

export default MoviesCard;