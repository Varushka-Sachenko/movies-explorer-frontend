import React from 'react'
//import api from '../utils/api.js'
import NavTab from '../NavTab/NavTab';

function Promo(props) {


    return (
        <section className="promo">
            <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
            <NavTab />
        </section>
    );
}

export default Promo;