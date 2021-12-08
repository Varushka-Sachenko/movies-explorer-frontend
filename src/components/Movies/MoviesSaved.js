import React from 'react'
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFormSaved from '../SearchForm/SearchFormSaved'
function MoviesSaved(props) {
    return (
        <section className="movies">
            <SearchFormSaved onSubmit={props.searchClick} />
            <MoviesCardList savedCards={props.savedCards} MoreVisible={props.MoreVisible} onClick={props.onClick} moreClick={props.moreClick} cards={props.cards} buttonClass={props.buttonClass}/>
            <Preloader />
        </section>);
}

export default MoviesSaved;