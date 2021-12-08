import React from 'react'
//import api from '../utils/api.js'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    let visible = '';
    if (!props.MoreVisible){
        visible = 'not'
    }
    let elements = []
    if (props.message === 'Ничего не найдено'){
        elements = []
    } else {
        elements = props.cards
    }


    return (
        <section className="elements">

            {elements.map((element) => {
                return (<MoviesCard savedCards={props.savedCards} onClick={props.onClick} key={element._id} cardsToAdd={element} buttonClass={props.buttonClass}/>)
            })}
            <button onClick={props.moreClick} className={`pre__button ${visible}`}>Ещё</button>
        </section>
    );
}

export default MoviesCardList;