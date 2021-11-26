import React from 'react'
//import api from '../utils/api.js'


function NavTab(props) {


    return (
        <section className="navTab">
            <button className="navTab__button">О проекте</button>
            <button className="navTab__button">Технологии</button>
            <button className="navTab__button">Студент</button>
        </section>
    );
}

export default NavTab;