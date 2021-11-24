import React from 'react'

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    //console.log(props)
    const isOwn = props.cardsToAdd.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.cardsToAdd.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

    
    function handleClick() {
        props.onCardClick(props.cardsToAdd);
    }
    //this.handleClick = this.handleClick.bind(this);

    
    function handleDeleteClick (card){
        //console.log('delete')
        props.onCardDelete(card)
    }
    //this.handleDeleteClick = this.handleDeleteClick.bind(this);

    
    function handleLikeClick (card){
        //console.log('card')
        props.onCardLike(card)
    }
    //this.handleLikeClick = this.handleLikeClick.bind(this);
    return (
        <div className="element">
            <img className="element__image" alt="Изображение места" src={props.cardsToAdd.link} onClick={() => handleClick()} />
            <button className={cardDeleteButtonClassName} onClick={() => handleDeleteClick(props.cardsToAdd)}></button>
            <div className="element__info">
                <h2 className="element__title">{props.cardsToAdd.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} onClick={() => handleLikeClick(props.cardsToAdd)}></button>
                    <p className="element__like-count">{props.cardsToAdd.likes.length}</p>
                </div>
            </div>

        </div>
    );

}

export default Card;