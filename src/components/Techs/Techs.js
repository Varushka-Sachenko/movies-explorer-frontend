import React from 'react'
//import api from '../utils/api.js'


function Techs(props) {


    return (
        <section className="techs">
            <h2 className="about__header">Технологии</h2>
            <h3 className="techs__header">7 технологий</h3>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className="techs__wrap">
                <p className="techs__elem">HTML</p>
                <p className="techs__elem">CSS</p>
                <p className="techs__elem">JS</p>
                <p className="techs__elem">React</p>
                <p className="techs__elem">Git</p>
                <p className="techs__elem">Express.js</p>
                <p className="techs__elem">mongoDB</p>
            </div>
        </section>
    );
}

export default Techs;