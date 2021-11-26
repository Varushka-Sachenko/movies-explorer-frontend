import React from 'react'

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__block">
                <div className="footer__right">© 2021</div>
                <div className="footer__left">
                    <a href="https://github.com/Varushka-Sachenko" className="footer__link">Github</a>
                    <a href="https://practicum.yandex.ru" className="footer__link">Яндекс.Практикум</a>
                </div>
            </div>
        </footer>);
}

export default Footer;