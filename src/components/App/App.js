

import React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as Auth from '../../utils/Auth'
import film1 from '../../images/33words.png'

import api from '../../utils/api.js'
import Header from '../Header/Header0'
import Header1 from '../Header/Header1'
import Main from '../Main/Main'
import HeaderAside from '../Header/HeaderAside'

import Movies from '../Movies/Movies';
import Footer from '../../components/Footer/Footer'
import Profile from '../Profile/Profile';

import { CurrentUserContext, defaultUserInfo } from '../../contexts/CurrentUserContext';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App(props) {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = React.useState(false);
  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = React.useState(false);
  const [isAsideOpened, setIsAsideOpened] = React.useState(false);


  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = React.useState(defaultUserInfo);

  const [cards, setCards] = React.useState([]);

  const [isLogged, setIsLogged] = React.useState(false);

  const [userData, setUserData] = React.useState({ email: "", password: "" });

  const moviesCards = [
    {
      name: "33 слова о дизайне",
      link: film1,
      _id: 0,
      duration: "1ч 42м"
    },
    {
      name: "33 слова о дизайне",
      link: film1,
      _id: 0,
      duration: "1ч 42м"
    }
  ]


  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        const cards = [
          {
            name: "33 слова о дизайне",
            link: film1,
            _id: 0,
            duration: "1ч 42м"
          },
          {
            name: "33 слова о дизайне",
            link: film1,
            _id: 0,
            duration: "1ч 42м"
          }
        ]

        setCards(cards)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  React.useEffect(() => {
    api.loadUserInfo()
      .then((res) => {

        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err);
      })
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
    //console.log(api.changeLikeCardStatus)
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleCardDelete = (card) => {
    if (card.owner._id === currentUser._id) {
      api.deleteCard(card._id)
        .then(() => {
          const cardsCopy = cards.filter(elem => elem._id !== card._id);
          setCards(cardsCopy)
        }
        )
        .catch((err) => {
          console.log(err);
        })
    }


  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    // console.log('click')
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsErrorPopupOpened(false)
    setIsSuccessPopupOpened(false)
    setSelectedCard({ name: "", link: "" })
    setIsAsideOpened(false)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)

  }



  const handleUpdateAvatar = (link) => {

    api.changeAvatar(link)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: link.avatar })
        setIsEditAvatarPopupOpen(false)
        //console.log(currentUser)
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const handleUpdateUser = (data) => {
    api.editProfileINfo(data)
      .then((useData) => {
        setCurrentUser(useData)
        setIsEditProfilePopupOpen(false)
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const handleAddPlaceSubmit = (newCard) => {
    api.addNewCard(newCard)
      .then((res) => {

        setCards([res, ...cards]);
        //console.log(cards)
        setIsAddPlacePopupOpen(false)
      }

      )
      .catch((err) => {
        console.log(err);
      })

  }


  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена 
    const token = localStorage.getItem('token');

    if (token) {
      //console.log(token)
      // проверим токен
      Auth.getContent(token)
        .then((res) => {
          //console.log(res)
          if (res) {

            // здесь можем получить данные пользователя!
            setUserData({
              username: res.username,
              email: res.email
            })
            //console.log(userData)
            // поместим их в стейт внутри App.js
            setIsLogged(true)
            history.push("/");
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


  React.useEffect(() => {
    tokenCheck()
  }, [])

  const MainComponent = () => {

    return (<>
      <Header regLink="/signup" signinLink="/signin" />
      <Main cards={cards} />
      <Footer />
    </>)
  }
  

  const MoviesComponent = (props) => {

    return (<>
      <HeaderAside isOpen={isAsideOpened} closeClick={closeAllPopups}/>
      <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
      <Movies cards={moviesCards} buttonClass="element__like" />
      <Footer />

    </>)
  }

  const SavedMoviesComponent = (props) => {

    return (<>
      <HeaderAside isOpen={isAsideOpened} closeClick={handleAsideChange}/>
      <Header1 isOpen={isAsideOpened} asideClick={handleAsideChange} savedLink="/saved-movies" moviesLink="/movies" />
      <Movies cards={moviesCards} buttonClass="element__saved" />
      <Footer />
    </>)
  }

  const handleAsideChange = () => {
    setIsAsideOpened(!isAsideOpened)
  }

  const handleSubmitLogin = (e, email, password, setEmail, setPassword) => {
    e.preventDefault()
    Auth.authorise(email, password)
      .then((data) => {
        if (data.token) {
          setUserData({ email, password })
          setEmail('')
          setPassword('')
          handleLogin(e)

          history.push('/');
        }

      })
      .catch((err) => {
        console.log(err);
      });


  }

  const handleSubmitRegister = (e, email, password) => {
    e.preventDefault()
    Auth.register(email, password)
      .then((data) => {
        if (data) {
          setIsSuccessPopupOpened(true)
          history.push('/sign-in')
        } else {
          setIsErrorPopupOpened(true)
        }
      })
      .catch((err) => {
        setIsErrorPopupOpened(true)
        console.log(err);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="App">

        <div className="page">
          <Switch>

            <Route path="/movies">
              <MoviesComponent />
            </Route>
            <Route path="/saved-movies">
              <SavedMoviesComponent />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>
            <Route path="/profile">
              <Profile name="Варя" email="varushka@ya.ru" isAsideOpened={isAsideOpened} handleAsideChange={handleAsideChange} />
            </Route>
            <Route path="/">
              <MainComponent />
            </Route>
          </Switch>

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
