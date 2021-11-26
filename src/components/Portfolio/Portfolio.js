import React from 'react'
//import api from '../utils/api.js'


function Portfolio(props) {


    return (
        <section className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <div className="portfolio__list">
                <div className="porfolio__elem">
                    <a rel="noreferrer" target="_blank" href="https://github.com/Varushka-Sachenko/how-to-learn" className="elem__text">Статичный сайт</a>
                    <div className="elem__image"></div>
                </div>
                <div className="porfolio__elem">
                    <a rel="noreferrer" target="_blank" href="https://github.com/Varushka-Sachenko/russian-travel" className="elem__text">Адаптивный сайт</a>
                    <div className="elem__image"></div>
                </div>
                <div className="porfolio__elem">
                    <a rel="noreferrer" target="_blank" href="https://github.com/Varushka-Sachenko/react-mesto-api-full" className="elem__text">Одностраничное приложение</a>
                    <div className="elem__image"></div>
                </div>
            </div>
        </section >
    );
}

export default Portfolio;