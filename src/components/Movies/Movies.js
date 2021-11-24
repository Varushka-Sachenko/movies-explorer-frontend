import React from 'react'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
function Movies(props) {
    return (
        <section className="movies">
            <SearchForm />
            
            <MoviesCardList cards={props.cards} buttonClass={props.buttonClass}/>
            <Preloader />
        </section>);
}

export default Movies;