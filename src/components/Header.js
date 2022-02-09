import React, { useState } from 'react';
import '../assets/css/header.css'
import { FaTimes } from "react-icons/fa";

const Header = () => {
    const [worningTopic, setWorningTopic] = useState("PHISHING WARNING:");
    const [worningContent, setWorningContent] = useState("Please make sure you're visiting https://moneydefiswap.net/ - check the URL carefully.");
    const [worningState, setWorningState] = useState(false);

    return (
        <div className="header justify-content-center" style={{ display: worningState ? 'none' : 'flex' }}>
            <div className="worning-url d-flex justify-content-center align-self-center">
                <span className="worning-topic align-self-center">{worningTopic}</span>
                <span className="worning-content align-self-center">{worningContent}</span>
            </div>
            <FaTimes className='worning-cancel align-self-center' onClick={() => {
                setWorningState(true)
            }} />
        </div>
    )
}

export default Header;