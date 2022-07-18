import React from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__trash' : 'element__trash_hidden'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__heart ${isLiked ? 'element__heart_black_active' : ''}`);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <article className="element">
                <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
                <div className="element__title-field">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__like">
                        <button type="button" name="button-like" aria-label="Нравится"
                                className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                        <span className="element__heart-count">{props.card.likes.length}</span>
                    </div>
                </div>
                <button type="button" name="button-trash" aria-label="Удалить" className={cardDeleteButtonClassName}
                        onClick={handleDeleteClick}></button>
            </article>
        </CurrentUserContext.Provider>
    )
}

export default Card;