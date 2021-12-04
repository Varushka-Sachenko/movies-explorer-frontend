

import React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as Auth from '../../utils/Auth'
import union from '../../images/Union.png'
import error from '../../images/Error.png'

import MoviesApi from '../../utils/MoviesApi.js'
import MainApi from '../../utils/MainApi.js'

import Header from '../Header/Header0'
import Header1 from '../Header/Header1'
import Main from '../Main/Main'
import HeaderAside from '../Header/HeaderAside'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../Popups/InfoTooltip';
import MoviesMessage from '../MoviesMessage/MoviesMessage';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import Movies from '../Movies/Movies';
import Footer from '../../components/Footer/Footer'
import Profile from '../Profile/Profile';

import { CurrentUserContext, defaultUserInfo } from '../../contexts/CurrentUserContext';
import Register from '../Register/Register';
import Login from '../Login/Login';

import { handleFilmsToShow } from './functions';
function App(props) {
  const history = useHistory();
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const moviesApi = new MoviesApi({
    adress: 'https://api.nomoreparties.co/beatfilm-movies',
    token: token
  })

  const mainApi = new MainApi({
    adress: 'https://api.mesto-cards.nomoredomains.rocks',
    token: token
  })

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = React.useState(false);
  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = React.useState(false);
  const [isAsideOpened, setIsAsideOpened] = React.useState(false);
  const [isPreloaderOpened, setPreloaderOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [movieMes, setMovieMes] = React.useState('Выполни поиск фильма');
  const [moreVisible, setMoreVisible] = React.useState(true);
  const [show, setShow] = React.useState(3);
  const [word, setWord] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState(defaultUserInfo);

  const [cards, setCards] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filmCounter, setShowMovies] = React.useState([]);
  const [isShort, setIsShort] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    //console.log('loading')
    if (isLoading) {
      setPreloaderOpened(true)
    } else {
      setPreloaderOpened(false)
    }
  }, [isLoading])

  React.useEffect(() => {
    moviesApi.getMovies()
      .then((res) => {
        setCards(res)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }, [])


  const signOut = () => {

    localStorage.removeItem('token');
    setIsLogged(false)
    history.push('/');
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])




  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  const handleCardLike = (card) => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    mainApi.addSavedMovie(card._id).then((newCard) => {
      setSavedMovies((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleCardDelete = (card) => {
    if (card.owner._id === currentUser._id) {
      mainApi.deleteCard(card._id)
        .then(() => {
          const cardsCopy = cards.filter(elem => elem._id !== card._id);
          setSavedMovies(cardsCopy)
        }
        )
        .catch((err) => {
          console.log(err);
        })
    }

  }

  const handleEditProfileClick = () => {
    // console.log('click')
    setIsEditProfilePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsErrorPopupOpened(false)
    setIsSuccessPopupOpened(false)
    setIsAsideOpened(false)
  }


  const handleUpdateUser = (data) => {
    console.log(data)
    mainApi.editProfileINfo(data)
      .then((useData) => {
        setCurrentUser(useData)
        setIsEditProfilePopupOpen(false)
        setIsSuccessPopupOpened(true)
      })
      .catch((err) => {
        setIsEditProfilePopupOpen(false)
        setIsErrorPopupOpened(true)
        console.log(err);
      });

  }

  // const handleFilmsToShow = (filteredFilms, setFilmCounter, setMoreOn, isShortFilm) => {
  //   const { counter } = show;
  //   const shortFilms = filteredFilms.filter(film => film.duration <= 40);
  //   const filmsToShow = isShortFilm ? shortFilms : filteredFilms;

  //   if (filmsToShow.length <= counter) {
  //     setShowMovies(filmsToShow)
  //     setMoreOn(false)
  //   }
  //   else {
  //     setFilmCounter(filmsToShow.slice(0, counter))
  //     setMoreOn(true)
  //   }
  // }

  React.useEffect(() => {
    //console.log(foundMovies)
    handleFilmsToShow(foundMovies, setShowMovies, setMoreVisible, isShort, show);
  }, [foundMovies, isShort, setShowMovies, show])

  const handleFindFilm = (word, isShort) => {
    setIsShort(isShort)
    setIsLoading(true)
    word = word.trim().toLowerCase();
    
    let found = cards.filter(v => v.nameRU.toLowerCase().includes(word));
    if (isShort) {
      found = found.filter(v => v.duration <= 40);
    }
    if (found.length === 0) {
      setMovieMes('Ничего не найдено')
      setMoreVisible(false)
      console.log(movieMes)
    }
    console.log(found)

    setFoundMovies(found)
    //console.log(filmCounter)
    setIsLoading(false)
  }

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена 
    console.log('token')
    if (token) {

      Auth.getContent(token)
        .then((res) => {
          if (res) {
            //console.log(res)
            // здесь можем получить данные пользователя!
            setCurrentUser({
              name: res.name,
              email: res.email
            })

            // поместим их в стейт внутри App.js
            setIsLogged(true)
            mainApi.getSavedMovies()
              .then((res) => {
                setSavedMovies(res)
                setIsLoading(false)
              })
              .catch((err) => {
                setIsLoading(false)
                console.log(err);
              })
            history.push("/movies");
            setIsLoading(true)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLogged(true)
  }

  const MainComponent = () => {
    console.log('main')
    if (isLogged) {
      return (<>
        <HeaderAside isOpen={isAsideOpened} closeClick={closeAllPopups} />
        <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
        <Main />
        <Footer />
      </>)

    }

    return (<>
      <HeaderAside isOpen={isAsideOpened} closeClick={closeAllPopups} />
      <Header regLink="/signup" signinLink="/signin" />
      <Main />
      <Footer />
    </>)
  }

  const handleMoreClick = () => {
    setShow(show + 3);
    const foundLen = foundMovies.length;
    if (show < foundLen) {
      setShowMovies(foundMovies.splice(0, show))
    } else {
      setShowMovies(foundMovies)
      setMoreVisible(false)
    }
  }


  const MoviesComponent = () => {
    console.log(filmCounter)
    if (filmCounter.length !== 0) {
      return (<>
        <HeaderAside isOpen={isAsideOpened} closeClick={closeAllPopups} />
        <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
        <Movies MoreVisible={moreVisible} moreClick={handleMoreClick} searchClick={handleFindFilm} onClick={handleCardLike} cards={filmCounter} buttonClass="element__like" />
        <Footer />

      </>)
    }

    return (<>
      <HeaderAside isOpen={isAsideOpened} closeClick={closeAllPopups} />
      <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
      <SearchForm onSubmit={handleFindFilm} />
      <MoviesMessage message={movieMes} />
      <Footer />

    </>)


  }

  const SavedMoviesComponent = (props) => {

    return (<>
      <HeaderAside isOpen={isAsideOpened} closeClick={handleAsideChange} />
      <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
      <Movies MoreVisible={moreVisible} moreClick={handleMoreClick} onClick={handleCardDelete} cards={savedMovies} buttonClass="element__saved" />
      <Footer />
    </>)
  }

  const ProfileComponent = (props) => {

    return (<>
      <InfoTooltip title="Что-то пошло не так! Попробуйте ещё раз." name="modal" isOpen={isErrorPopupOpened} onClose={closeAllPopups} image={error} />
      <InfoTooltip title="Запрос выполнен успешно!" name="modal" isOpen={isSuccessPopupOpened} onClose={closeAllPopups} image={union} />
      <Profile onEditProfile={handleEditProfileClick} signOut={signOut} handleUpdateUser={handleUpdateUser} isEditProfilePopupOpen={isEditProfilePopupOpen} closeAllPopups={closeAllPopups} name={userData.name} email={userData.email} isAsideOpened={isAsideOpened} handleAsideChange={handleAsideChange}></Profile>
    </>)
  }

  const handleAsideChange = () => {
    setIsAsideOpened(!isAsideOpened)
  }

  const handleSubmitLogin = (e, email, password) => {
    e.preventDefault()
    Auth.authorise(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin(e)
          setToken(data.token)
          Auth.getContent(token)
            .then((res) => {
              if (res) {
                // здесь можем получить данные пользователя!
                setUserData({
                  name: res.name,
                  email: res.email
                })
                //console.log(userData)
                // поместим их в стейт внутри App.js
                setIsLogged(true)
                mainApi.getSavedMovies()
                  .then((res) => {
                    setSavedMovies(res)
                    setIsLoading(false)
                  })
                  .catch((err) => {
                    setIsLoading(false)
                    console.log(err);
                  })
                history.push("/movies");
                setIsLoading(true)
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleSubmitRegister = (e, name, email, password) => {
    console.log('err1');
    e.preventDefault()
    setIsLoading(true)
    Auth.register(name, email, password)
      .then((data) => {
        if (data) {
          setIsLoading(false)
          setIsSuccessPopupOpened(true)
          handleSubmitLogin(e, email, password)
        } else {
          setIsLoading(false)
          setIsErrorPopupOpened(true)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setIsErrorPopupOpened(true)
        console.log(err);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="App">

        <div className="page">
          <InfoTooltip title="Что-то пошло не так! Попробуйте ещё раз." name="modal" isOpen={isErrorPopupOpened} onClose={closeAllPopups} image={error} />
          <InfoTooltip title="Вы успешно зарегистрировались!" name="modal" isOpen={isSuccessPopupOpened} onClose={closeAllPopups} image={union} />
          <Preloader isOpen={isPreloaderOpened} />
          <Switch>

            <ProtectedRoute
              path="/movies"
              loggedIn={isLogged}
              component={MoviesComponent}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={isLogged}
              component={SavedMoviesComponent}
            />

            <ProtectedRoute
              path="/profile"
              loggedIn={isLogged}
              component={ProfileComponent}
            />
            <Route path="/signin">
              <Login onSubmit={handleSubmitLogin} />
            </Route>
            <Route path="/signup">

              <Register onSubmit={handleSubmitRegister} />
            </Route>
            <Route path="/">
              <MainComponent />
            </Route>
            <Route>
              {isLogged ? (
                <Redirect to="/movies" />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
