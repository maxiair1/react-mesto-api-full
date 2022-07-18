import React from 'react';
import {Link, Switch, Route} from "react-router-dom";

function Header(props) {

    return (
        <header className="header page__header">
            <div className="header__logo"></div>
            <div className="header__auth">
                <Switch>
                    <Route exact path="/sign-up">
                        {props.isHeaderAuth && <Link onClick={props.handleHeaderAuthClick} to="/sign-in">Войти</Link>}
                    </Route>
                    <Route exact path="/sign-in">
                        {!props.isHeaderAuth &&
                        <Link onClick={props.handleHeaderAuthClick} to="/sign-up">Зарегистрироваться</Link>}
                    </Route>
                    <Route exact path="/main">
                        {props.isLoggedIn && (<span className="header__auth-logged">{props.email} <Link to="/sign-in"
                                                                                                        onClick={props.handleLogoff}>Выйти</Link> </span>)}
                    </Route>
                </Switch>
            </div>

        </header>
    )
}

export default Header;