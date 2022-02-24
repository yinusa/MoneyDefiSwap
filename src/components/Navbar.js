import React from 'react'
import '../assets/css/nabvar.css'
import { FaTimes, FaChevronDown } from "react-icons/fa";
import 'antd/dist/antd.css';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { ThemeContext } from '../contexts';

const Navbar = (props) => {
    const themeState = React.useContext(ThemeContext.State);
    const dropDown = () => {
        document.getElementById("languageDropdown").classList.toggle("show");
    }

    return (
        <div className={`navbar d-flex justify-content-*-between ${themeState.on ? 'light_navbar' : 'dark_navbar'}`}>
            <div className='nav-left d-flex'>
                <div className=' align-self-center'>{React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    style: { color: themeState.on ? "black" : "white" },
                    className: 'trigger navbars align-self-center',
                    onClick: props.toggle
                })}</div>
                <div className={`mark align-self-center ${themeState.on ? 'light_mark' : 'dark_mark'}`}></div>
                <span className={`mark-name align-self-center ${themeState.on ? 'light_mark_name' : 'dark_mark_name'}`}>Moneydefiswap</span>
            </div>
            <div className='nav-right d-flex'>
                <div className='small-mark align-self-center'></div>
                <div className={`${themeState.on ? 'light_balance' : 'dark_balance'}`}>
                    <span className='balance align-self-center'>$</span>
                    <span className='balance-f align-self-center'>36</span>
                    <span className='balance-e align-self-center'>.658</span>
                </div>
                <div onClick={props.requestAccount} className={`connect-wallet align-self-center justify-content-center ${themeState.on ? 'light_connect_wallet' : 'dark_connect_wallet'}`}>
                    {
                        !props.account ? (
                            <div>Connect Wallet</div>
                        ) : (
                            <div>{`${props.account.substring(0, 5)}..${props.account.substring(props.account.length - 5)}`}</div>
                        )
                    }
                    
                </div>
                <div>
                    <div className='language d-flex' onClick={dropDown}><div></div><FaChevronDown className='lang-drop'></FaChevronDown></div>
                    <div id="languageDropdown" className="language-content flex-column">
                        <FaTimes className='closeLanguage' onClick={dropDown} />
                        <button>English</button>
                        <button>italiana</button>
                        <button>中国人</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
const windowOnClick = () => {
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("language-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}
 */
export default Navbar;