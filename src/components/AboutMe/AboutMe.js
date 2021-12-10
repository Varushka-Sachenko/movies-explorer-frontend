import React from 'react'
import avatar from '../../images/avatar.jpg'
//import api from '../utils/api.js'


function AboutMe(props) {


    return (
        <section className="about">
            <h2 className="about__header">Студент</h2>
            <div className="about__columns">
                <div className="about__right">

                    <h3 className="about__name">Варя</h3>
                    <p className="about__status">Разработчик, 17 лет</p>
                    <p className="about__text">Я родилась и живу в Москве. На данный момент заканчиваю Лицей НИУ ВШЭ, направление МатИнфо.
                        После выпуска планирую начать активно заниматься веб-разработкой и работать удаленно.</p>

                    <div className="about__links">
                        <a href="https://github.com/Varushka-Sachenko" className="about__link">Github</a>
                    </div>
                </div>
                <div className="about__left"><img alt="аватар" className="avatar" src={avatar} ></img></div>
                
            </div>
        </section >
    );
}

export default AboutMe;