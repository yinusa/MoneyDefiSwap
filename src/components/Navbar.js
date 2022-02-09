import React from 'react'
import '../assets/css/nabvar.css'
import { FaTimes, FaChevronDown } from "react-icons/fa";
import 'antd/dist/antd.css';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const Navbar = (props) => {
    const dropDown = () => {
        document.getElementById("languageDropdown").classList.toggle("show");
    }
    return (
        <div className="navbar d-flex justify-content-*-between">
            <div className='nav-left d-flex'>
                <div className=' align-self-center'>{React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    style: { color: "white" },
                    className: 'trigger navbars align-self-center',
                    onClick: props.toggle
                })}</div>
                <div className='mark align-self-center'></div>
                <span className='mark-name align-self-center'>Moneydefiswap</span>
            </div>
            <div className='nav-right d-flex'>
                <div className='small-mark align-self-center'></div>
                <span className='balance align-self-center'>$</span>
                <span className='balance-f align-self-center'>36</span>
                <span className='balance-e align-self-center'>.658</span>
                <div className='connect-wallet align-self-center justify-content-center'><span>Connect Wallet</span></div>
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