import React from 'react';
import Card from "./Card.js";
import {CurrentUserContext} from "../context/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile page__adaptive page__profile">
                {props.isProfileLoading && <span>Профиль загружаются...</span>}
                <figure className="profile__avatar" onClick={props.onEditAvatar}>
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-image"/>
                </figure>
                <div className="profile__info">
                    <div className="profile__info-text">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                    <button type="button" name="button-edit" aria-label="Редактировать профиль"
                            className="profile__button-edit" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" name="button-add" aria-label="Добавить фото" className="profile__button-add"
                        onClick={props.onAddPlace}></button>
            </section>
            <section className="elements page__adaptive page__elements">
                {props.isCardsLoading && <span>Карточки загружаются...</span>}
                {
                    props.cards.map(card =>
                        (<Card card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
                               onCardDelete={props.onCardDelete} key={card._id}/>)
                    )
                }
            </section>
        </main>
    )

}

export default Main;