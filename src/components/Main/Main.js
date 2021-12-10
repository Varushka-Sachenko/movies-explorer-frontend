import React from 'react'
//import api from '../utils/api.js'
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

import { CurrentUserContext} from '../../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    //console.log(currentUser)
        
    return (
        <main className="main">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe user={currentUser} />
            <Portfolio />
        </main>
    );
}

export default Main;