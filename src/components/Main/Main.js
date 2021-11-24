import React from 'react'
//import api from '../utils/api.js'
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

import { CurrentUserContext} from '../../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    //console.log(currentUser)
    

    const [statusVisible, changeStatus] = React.useState("");
   
    const profileAvatarHover = () => {
        changeStatus("profile__avatar-overlay_visible")
        
    }
    const profileAvatarHoverNot = () => {
        changeStatus("")
       
    }

    

    return (
        <main className="main">
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}

export default Main;