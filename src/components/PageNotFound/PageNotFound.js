import React from 'react'
import { Link } from 'react-router-dom';
function PageNotFound(props) {
    return (
        <section className="notFound">
            <h1 className="notFound__header">404</h1>
            <p className="notFound__text">Страница не найдена</p>
            <Link to="/" className="profile__link">Назад</Link>
            
        </section>);
}

export default PageNotFound;