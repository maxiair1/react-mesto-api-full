import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            name={"card-add"}
            title={"Новое место"}
            onClose={props.onClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
            isOpen={props.isOpen}>
            <label className="popup__label">
                <input id="card-name" type="text" name="addCard-name" placeholder="Название" value={name || ''}
                       onChange={handleChangeName}
                       className="popup__input popup__input_field_name" required minLength="2"
                       maxLength="30"/>
                <span className="popup__input-error card-name-error"></span>
            </label>
            <label className="popup__label">
                <input id="card-link" type="url" name="addCard-link" value={link || ''} onChange={handleChangeLink}
                       placeholder="Ссылка на картинку"
                       className="popup__input popup__input_field_about" required/>
                <span className="popup__input-error card-link-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;