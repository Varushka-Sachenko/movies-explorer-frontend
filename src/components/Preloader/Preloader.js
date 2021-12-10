import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    let statusOpened = ""

    if (props.isOpen) {
        statusOpened = "popup_opened"

    } else {
        statusOpened = ""

    }
    return (
        <div className={`preloader ${statusOpened}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
