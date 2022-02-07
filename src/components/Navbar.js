import React from 'react'
import '../assets/css/nabvar.css'
import { FaBars, FaChevronDown } from "react-icons/fa";
import 'antd/dist/antd.css';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const Navbar = (props) => {
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
                <div className='language d-flex'><div></div><FaChevronDown className='lang-drop'></FaChevronDown></div>
            </div>
        </div>
    )
}

export default Navbar;