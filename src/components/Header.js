import React, { useState } from 'react';
import '../assets/css/header.css'
import { FaTimes } from "react-icons/fa";

const Header = () => {
    const [worningTopic, setWorningTopic] = useState("PHISHING WARNING:");
    const [worningContent, setWorningContent] = useState("Please make sure you're visiting https://moneydefiswap.net/ - check the URL carefully.");

    console.log(worningTopic)
    return (
        <div className="header d-flex justify-content-center">
            <div className="worning-url d-flex justify-content-center align-self-center">
                <span className="worning-topic align-self-center">{worningTopic}</span>
                <span className="worning-content align-self-center">{worningContent}</span>
            </div>
            <FaTimes className='worning-cancel align-self-center' onClick={() => {
                setWorningTopic("");
                setWorningContent("");
            }} />
        </div>
    )
}

export default Header;