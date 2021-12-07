import React from 'react'


function MoviesCard(props) {
    let isLiked = ((props.savedCards.includes(props.cardsToAdd)));
    console.log(isLiked)
    const handleClick = () => {
        props.onClick(props.cardsToAdd, isLiked)
        isLiked = !isLiked
        likedStatus = 'like_active'
        console.log(likedStatus)
    }
    let likedStatus ='';
    if (isLiked){
        likedStatus = 'like_active'
    }

    let image= props.cardsToAdd.image.url

    if (props.buttonClass !== 'element__like'){
        image = props.cardsToAdd.image;
    } else {
        image = `https://api.nomoreparties.co${props.cardsToAdd.image.url}`
    }


    return (
        <div className="element">
            <div className="element__info">
                <div className="element__wrap">
                    <a href={props.cardsToAdd.trailerLink} className="element__title">{props.cardsToAdd.nameRU}</a>
                    <p className="element__duration">{props.cardsToAdd.duration}</p>
                </div>

                <button className={`${props.buttonClass} ${isLiked ? 'like_active' : ''}`} onClick={handleClick} ></button>
            </div>
            <a href={props.cardsToAdd.trailerLink}>
                <img alt="обложка фильма" className="element__image" src={`${image}`} />
            </a >
        </div>
    );

}

export default MoviesCard;