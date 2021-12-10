export const handleFilmsToShow = (filteredFilms, setFilmCounter, setMoreOn, isShortFilm, show, setMovieMes) => {
    //console.log(setMovieMes)
    const counter = show;
    const shortFilms = filteredFilms.filter(film => film.duration <= 40);
    const filmsToShow = isShortFilm ? shortFilms : filteredFilms;

    if (filmsToShow.length <= counter) {
        setFilmCounter(filmsToShow)
        setMoreOn(false)
    }
    else {
        const res = filmsToShow.slice(0, counter)
        setFilmCounter(res)
        setMoreOn(true)
    }

    // if (shortFilms.length === 0){
    //     setMovieMes('Ничего не найдено')
    // }
}