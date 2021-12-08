

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
import PageNotFound from '../PageNotFound/PageNotFound'
import MoviesSaved from '../Movies/MoviesSaved';

import { CurrentUserContext, defaultUserInfo } from '../../contexts/CurrentUserContext';
import Register from '../Register/Register';
import Login from '../Login/Login';

import { handleFilmsToShow } from './functions';
function App(props) {
  const history = useHistory();
  const moviesApi = new MoviesApi({
    adress: 'https://api.nomoreparties.co/beatfilm-movies',
    token: localStorage.getItem('token')
  })

  const mainApi = new MainApi({
    adress: 'https://api.mesto-cards.nomoredomains.rocks',
    token: localStorage.getItem('token')
  })

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = React.useState(false);
  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = React.useState(false);
  const [isAsideOpened, setIsAsideOpened] = React.useState(false);
  const [isPreloaderOpened, setPreloaderOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckingToken, setIsCheckingToken] = React.useState(true)
  const [movieMes, setMovieMes] = React.useState('');
  const [moreVisible, setMoreVisible] = React.useState(true);
  const [show, setShow] = React.useState(3);
  const [currentUser, setCurrentUser] = React.useState(defaultUserInfo);
  const [cards, setCards] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filmCounter, setShowMovies] = React.useState([]);
  const [isShort, setIsShort] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState('checking');
  const [searchSaved, setSaved] = React.useState([]);

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
    localStorage.removeItem("isLogged")
    localStorage.removeItem("word")
    localStorage.removeItem("foundMovies")
    setCurrentUser('')
    setFoundMovies([])
    setSavedMovies([])
    setShowMovies([])
    // setToken('')
    setIsLogged('false')
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


  const handleCardClick = (card, isLiked) => {
    console.log(card)
    if (isLiked) {
      savedMovies.forEach(i => {
        //console.log(i.nameRU, props.cardsToAdd.nameRU, i.nameRU === props.cardsToAdd.nameRU)
        if (i.nameRU === card.nameRU) {
          card._id = i._id
        }
      });
      mainApi.deleteMovie(card._id)
        .then(() => {
          const cardsCopy = savedMovies.filter(elem => elem._id !== card._id);
          setSavedMovies(cardsCopy)
        }
        )
        .catch((err) => {
          console.log(err);
        })

    } else {
      let inSaved = false;
      savedMovies.forEach(i => {
        //console.log(i.nameRU, props.cardsToAdd.nameRU, i.nameRU === props.cardsToAdd.nameRU)
        if (i.nameRU === card.nameRU) {
          inSaved = true
        }
      });
      if (!inSaved) {
        console.log(card)
        mainApi.addSavedMovie(card)
          .then((newCard) => {
            console.log(newCard)
            setSavedMovies([newCard.data, ...savedMovies]);
          }).catch((err) => {
            console.log(err);
          });
      }


    }
    console.log(card)
    // Отправляем запрос в API и получаем обновлённые данные карточки

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
    // console.log(data)
    // console.log(data)
    mainApi.editProfileINfo(data)

      .then((useData) => {
        setCurrentUser({
          name: useData.name,
          email: useData.email
        })
        setIsEditProfilePopupOpen(false)
        setIsSuccessPopupOpened(true)

      })
      .catch((err) => {
        setIsEditProfilePopupOpen(false)
        setIsErrorPopupOpened(true)
        console.log(err);
      });

  }

  React.useEffect(() => {
    console.log(foundMovies)
    handleFilmsToShow(foundMovies, setShowMovies, setMoreVisible, isShort, show);
  }, [foundMovies, isShort, setShowMovies, show, savedMovies])

  const handleFindFilm = (word, isShort) => {
    setIsShort(isShort)
    setIsLoading(true)
    console.log(isLoading)
    word = word.trim().toLowerCase();

    let found = cards.filter(v => v.nameRU.toLowerCase().includes(word));

    if (found.length === 0) {
      setMovieMes('Ничего не найдено')
      setMoreVisible(false)
      console.log(movieMes)
    }
    //console.log(found)

    setFoundMovies(found)
    localStorage.setItem("word", word)
    localStorage.setItem("foundMovies", JSON.stringify(found))
    //console.log(filmCounter)
    setIsLoading(false)
  }

  React.useEffect(() => {
    //console.log(foundMovies)
    handleFilmsToShow(searchSaved, setShowMovies, setMoreVisible, isShort, 100);
  }, [searchSaved, setShowMovies, isShort])

  const handleFindSaved = (word, isShort) => {
    setIsShort(isShort)
    setIsLoading(true)
    console.log(isLoading)
    word = word.trim().toLowerCase();

    let found = savedMovies.filter(v => v.nameRU.toLowerCase().includes(word));

    if (found.length === 0) {
      setMovieMes('Ничего не найдено')
      console.log(movieMes)
    }
    //console.log(found)

    setSaved(found)
    //console.log(filmCounter)
    setIsLoading(false)
  }


  React.useEffect(() => {
    if (isLogged) {
      mainApi.getSavedMovies()
        .then((res) => {
          setSavedMovies(res)
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err);
        })
    }

  }, [isLogged])

  const tokenCheck = () => {
    setIsLogged('checking')
    const token = localStorage.getItem('token')
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена 
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
            if (localStorage.getItem('foundMovies')) {
              console.log(localStorage.getItem('foundMovies'))
              setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')))
            }


            // поместим их в стейт внутри App.js
            setIsLogged('true')

            //history.push("/movies");
            setIsLoading(true)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLogged('false')
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLogged('true')
  }

  const MainComponent = () => {
    if (isLogged === 'true') {
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
  }


  const MoviesComponent = () => {
    if (filmCounter.length !== 0) {
      return (<>
        <HeaderAside isOpen={isAsideOpened} closeClick={closeAllPopups} />
        <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
        <Movies savedCards={savedMovies} MoreVisible={moreVisible} moreClick={handleMoreClick} searchClick={handleFindFilm} onClick={handleCardClick} cards={filmCounter} buttonClass="element__like" />
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
    if (searchSaved.length === 0) {
      return (<>
        <HeaderAside isOpen={isAsideOpened} closeClick={handleAsideChange} />
        <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
        <MoviesMessage message={movieMes} />
        <MoviesSaved savedCards={savedMovies} searchClick={handleFindSaved} MoreVisible={false} moreClick={handleMoreClick} onClick={handleCardClick} cards={savedMovies} buttonClass="element__saved" />

        <Footer />
      </>)

    }
    return (<>
      <HeaderAside isOpen={isAsideOpened} closeClick={handleAsideChange} />
      <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
      <MoviesSaved savedCards={searchSaved} searchClick={handleFindSaved} MoreVisible={false} moreClick={handleMoreClick} onClick={handleCardClick} cards={searchSaved} buttonClass="element__saved" />
      <Footer />
    </>)


  }

  const ProfileComponent = (props) => {

    return (<>
      <Profile onEditProfile={handleEditProfileClick} signOut={signOut} handleUpdateUser={handleUpdateUser} isEditProfilePopupOpen={isEditProfilePopupOpen} closeAllPopups={closeAllPopups} name={currentUser.name} email={currentUser.email} isAsideOpened={isAsideOpened} handleAsideChange={handleAsideChange}></Profile>
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
          //setToken(data.token)
          Auth.getContent(data.token)
            .then((res) => {
              if (res) {
                // здесь можем получить данные пользователя!
                setCurrentUser({
                  name: res.name,
                  email: res.email
                })
                //console.log(userData)
                // поместим их в стейт внутри App.js
                setIsLogged('true')
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
          setCurrentUser({name, email})
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
          <InfoTooltip title="Запрос выполнен успешно!" name="modal" isOpen={isSuccessPopupOpened} onClose={closeAllPopups} image={union} />
          <Preloader isOpen={isPreloaderOpened} />
          <Switch>
          <Route exact path="/">
              <MainComponent />
            </Route>
            <Route path="/signin">
              <Login onSubmit={handleSubmitLogin} />
            </Route>
            <Route path="/signup">
              <Register onSubmit={handleSubmitRegister} />
            </Route>
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={isLogged}
              component={SavedMoviesComponent}
              isCheckingToken={isCheckingToken}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={isLogged}
              component={ProfileComponent}
              isCheckingToken={isCheckingToken}
            />
            <ProtectedRoute
              path="/movies"
              loggedIn={isLogged}
              component={MoviesComponent}
              isCheckingToken={isCheckingToken}
            />
            
            
            <Route path="*">
              <PageNotFound />
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
