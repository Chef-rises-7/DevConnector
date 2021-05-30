import React from 'react';
import bubble from "./bubble.png";
import duck from "./duck.png";
import "../layout_css/Spinner.css";

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={bubble} alt="bubble" className="spinner__image" />
            <img src={duck} alt="duck" className="spinner__image" />
        </div>
    )
}

export default Spinner;
