import React from 'react'
//import api from '../utils/api.js'

function AboutProject(props) {


    return (
        <section className="about">
            <h2 className="about__header">О проекте</h2>
            <div className="about__text-wrap">
                <div className="about__descript">
                    <h2 className="about__text-header">Дипломный проект включал 5 этапов</h2>
                    <p className="about__text-parag">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__descript">
                    <h2 className="about__text-header">На выполнение диплома ушло 5 недель</h2>
                    <p className="about__text-parag">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__block">
                <div className="block__weeks">
                    <p className="block__weeks_f">1 неделя</p>
                    <p className="block__weeks_s">4 недели</p>
                </div>
                <div className="block__weeks">
                    <p className="block__steps_f">Back-end</p>
                    <p className="block__steps_s">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;