import React from 'react'
//import api from '../utils/api.js'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

    return (
        <section className="elements">

            {props.cards.map((element) => {
                return (<MoviesCard key={element._id} cardsToAdd={element} buttonClass={props.buttonClass}/>)
            })}
            <button className="pre__button">Ещё</button>
        </section>
    );
}

export default MoviesCardList;