import React from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header1';
import { Link } from 'react-router-dom';
function Profile(props) {

    return (

        <>
            <Header />
            <section className="profile">
                <h2 className="profile__header">Привет, {props.name}!</h2>
                <div className="profile__block">
                    <div className="profile__wrap">
                        <p className="profile__info">Имя</p>
                        <p className="profile__info">{props.name}</p>
                    </div>
                    <div className="profile__wrap">
                        <p className="profile__info">Email</p>
                        <p className="profile__info">{props.email}</p>
                    </div>
                </div>
                <button className="profile__button">Редактировать</button>
                <Link to="/signin" className="profile__link">Выйти из аккаунта</Link>
            </section>


        </>
    )
}

export default withRouter(Profile)