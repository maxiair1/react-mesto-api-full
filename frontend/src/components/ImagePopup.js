import React from "react";

function ImagePopup(props) {

    return (
        <div className={`popup popup_type_photo-open ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__image-container">
                <img
                    src={props.card.link ? props.card.link : "https://via.placeholder.com/250x200"}
                    alt={props.card.name}
                    className="popup__image"/>
                <p className="popup__subtitle">{props.card.name}</p>
                <button
                    type="button"
                    name="button-close_type_photo-open"
                    aria-label="Закрыть"
                    className="popup__button-close popup__button-close_type_photo-open"
                    onClick={props.onClose}/>
            </div>
        </div>)
}

export default ImagePopup;