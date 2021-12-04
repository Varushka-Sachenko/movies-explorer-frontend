import React from 'react'
//import api from '../utils/api.js'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    let visible = '';
    if (!props.MoreVisible){
        visible = 'not'
    }
    console.log(props.cards)

    return (
        <section className="elements">

            {props.cards.map((element) => {
                return (<MoviesCard onClick={props.onClick} key={element._id} cardsToAdd={element} buttonClass={props.buttonClass}/>)
            })}
            <button onClick={props.moreClick} className={`pre__button ${visible}`}>Ещё</button>
        </section>
    );
}

export default MoviesCardList;