import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from "./AddPlacePopup";
import {CurrentUserContext} from '../context/CurrentUserContext.js';
import {api} from '../utils/Api.js';
import {register, login, getContent} from '../utils/authApi.js';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
    const history = useHistory();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isCardsLoading, setIsCardsLoading] = useState(false);
    const [isHeaderAuth, setIsHeaderAuth] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [infoToolTip, setInfoToolTip] = React.useState({isOpen: false, status: false, text:''});

    useEffect(() => {
        tokenCheck();
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/main");
            setIsProfileLoading(true);
            api.getProfile()
                .then(res => {
                    setCurrentUser(res);
                })
                .catch((err) => console.log('Ошибка загрузки профиля: ', err))
                .finally(() => setIsProfileLoading(false));

            api.getCards()
                .then(res => {
                    setCards(res.map(card => {
                        return ({
                            _id: card._id,
                            name: card.name,
                            link: card.link,
                            likes: card.likes,
                            owner: card.owner
                        })
                    }))
                })
                .catch((err) => console.log('Ошибка загрузки карточек: ', err))
                .finally(() => setIsCardsLoading(false));
        }
    }, [isLoggedIn]);

    //переключаем состояние видимости "Войти"/"Зарегистрироваться"
    function handleHeaderAuthClick() {
        isHeaderAuth ? setIsHeaderAuth(false) : setIsHeaderAuth(true);
    }

    function handleLogin(user) {
        login(user.email, user.password)
            .then(res => {
                    localStorage.setItem('JWT', res.token)
                    tokenCheck()
                }
            )
            .catch(res => {
                setInfoToolTip({isOpen: true, status: false, text:'Что-то пошло не так!Попробуйте ещё раз.'});
                if (res.status === 400) {
                    console.log('400 - не передано одно из полей')
                } else if (res.status === 401) {
                    console.log('401 - не корректно введен email или пароль')
                } else
                    console.log('login fail:', res.statusText)
            })
    }

    function handleRegistration(user) {
        register(user.email, user.password)
            .then(res => {
                setInfoToolTip({isOpen: true, status: true, text:'Вы успешно зарегистрировались!'});
                setIsHeaderAuth(false);
                    history.push("/sign-in");
                }
            )
            .catch(res => {
                setInfoToolTip({isOpen: true, status: false, text:'Что-то пошло не так!Попробуйте ещё раз.'});
                if (res.status === 400) {
                    console.log('400 - некорректно заполнено одно из полей')
                } else
                    console.log('login fail:', res.statusText)
            })
    }

    function tokenCheck() {
        if (localStorage.getItem('JWT')) {
            let jwt = localStorage.getItem('JWT');

            getContent(jwt)
                .then((res) => {
                    if (res) {
                        let newUserEmail = res.data.email
                        setIsLoggedIn(true);
                        setUserEmail(newUserEmail);
                    }
                })
                .catch(err => {
                    console.log('Токена нет', err)
                });
        }
    }

    function handleLogoff() {
        localStorage.removeItem('JWT');
        setIsLoggedIn(false)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsOpen(true)
    }

    function closeAllPopups() {
        setIsOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({name: '', link: ''});
        setInfoToolTip({isOpen: false, status: false, text:''})
    }

    function handleUpdateUser(user) {
        api.editProfile(user)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log('Ошибка загрузки профиля: ', err));
    }

    function handleUpdateAvatar(avatar) {
        api.updateAvatar(avatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log('Ошибка загрузки аватара: ', err));
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log('Ошибка загрузки карточки: ', err));
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные лайка
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => console.log('Ошибка обновления лайка: ', err));
    }

    function handleCardDelete(card) { //cards.filter(item => item !== card))
        api.deleteCard(card._id)
            .then(() => {
                setCards(prevState => prevState.filter(item => item !== card))
            })
            .catch((err) => console.log('Ошибка удаления карточки: ', err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header
                        handleHeaderAuthClick={handleHeaderAuthClick}
                        isHeaderAuth={isHeaderAuth}
                        isLoggedIn={isLoggedIn}
                        handleLogoff={handleLogoff}
                        email={userEmail}/>
                    <Switch>
                        <Route path="/sign-in">
                            <Login handleLogin={handleLogin}/>
                        </Route>
                        <Route path="/sign-up">
                            <Register
                                handleHeaderAuthClick={handleHeaderAuthClick}
                                handleRegistration={handleRegistration}
                            />
                        </Route>
                        <Route exact path="/main">
                            <Main
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                isCardsLoading={isCardsLoading}
                                isProfileLoading={isProfileLoading}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                            />
                            <Footer/>
                        </Route>
                        <Route>
                            {isLoggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in"/>}
                        </Route>
                    </Switch>
                    {infoToolTip.isOpen && <InfoTooltip
                        info={infoToolTip}
                        onClose={closeAllPopups}
                    />}
                    {isEditProfilePopupOpen &&
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>}
                    {isAddPlacePopupOpen &&
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit}
                                   onClose={closeAllPopups}
                    />}
                    {isEditAvatarPopupOpen &&
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>}
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isOpen}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
