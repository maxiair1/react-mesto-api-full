import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../context/CurrentUserContext";

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value)
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name={"profile-edit"}
            title={"Редактировать профиль"}
            onClose={props.onClose}
            buttonText={'Сохранить'}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}>
            <label className="popup__label">
                <input id="profile-name" type="text" name="profile-name" placeholder="Имя" value={name || ''}
                       onChange={handleChangeName}
                       className="popup__input popup__input_field_name" required minLength="2"
                       maxLength="40"/>
                <span className="popup__input-error profile-name-error"></span>
            </label>
            <label className="popup__label">
                <input id="profile-about" type="text" name="profile-about" placeholder="О себе" value={description || ''}
                       onChange={handleChangeDescription}
                       className="popup__input popup__input_field_about" required minLength="2"
                       maxLength="200"/>
                <span className="popup__input-error profile-about-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;