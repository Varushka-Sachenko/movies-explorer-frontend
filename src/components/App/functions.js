export const handleFilmsToShow = (filteredFilms, setFilmCounter, setMoreOn, isShortFilm, show) => {
    const { counter } = show;
    const shortFilms = filteredFilms.filter(film => film.duration <= 40);
    const filmsToShow = isShortFilm ? shortFilms : filteredFilms;

    if (filmsToShow.length <= counter) {
        setFilmCounter(filmsToShow)
        setMoreOn(false)
    }
    else {
        setFilmCounter(filmsToShow.slice(0, counter))
        setMoreOn(true)
    }
}