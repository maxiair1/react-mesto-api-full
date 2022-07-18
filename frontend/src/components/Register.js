import React from "react";
import {Link} from "react-router-dom";

function Register(props) {

    const [formParams, setFormParams] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormParams((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formParams.email || !formParams.password) {
            return;
        }
        props.handleRegistration({email: formParams.email, password: formParams.password})
    }

    return (
        <div className="authorize">
            <form onSubmit={handleSubmit} className="authorize__form">
                <h2 className="authorize__title">Регистрация</h2>
                <input placeholder="Email" type="email" name="email" value={formParams.email}
                       className="authorize__input" onChange={handleChange} required/>
                <input placeholder="Пароль" type="password" name="password" value={formParams.password}
                       className="authorize__input" onChange={handleChange} required/>
                <button type="submit" className="authorize__button-submit">Зарегистрироваться</button>
                <p className="authorize__subtitle">Уже зарегистрированны? <Link onClick={props.handleHeaderAuthClick}
                                                                                to="/sign-in">Войти</Link></p>
            </form>
        </div>
    )
}

export default Register;