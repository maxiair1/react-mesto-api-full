import React from "react";

function Login(props) {

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
        props.handleLogin({email: formParams.email, password: formParams.password})
        setFormParams({email: '', password: ''})
    }

    return (
        <div className="authorize">
            <form onSubmit={handleSubmit} className="authorize__form">
                <h2 className="authorize__title">Вход</h2>
                <input placeholder="Email" name="email" type="email" className="authorize__input"
                       value={formParams.email || ""} onChange={handleChange} required/>
                <input placeholder="Пароль" name="password" type="password" className="authorize__input"
                       value={formParams.password || ""} onChange={handleChange} required/>
                <button type="submit" className="authorize__button-submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;