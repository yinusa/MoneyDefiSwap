import React, { useState } from "react";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarContent,
    SubMenu,
} from "react-pro-sidebar";

import { FaTractor, FaExchangeAlt, FaFacebook, FaPinterest, FaYoutubeSquare, FaInstagramSquare, FaRegSun } from "react-icons/fa";
import { BiCategory, BiHome } from "react-icons/bi";

import Inflatable from '../assets/img/inflatable.svg'
import LightIcon from '../assets/img/icon_light.svg';
import LightIconTop from '../assets/img/icon_light_top.svg';
import DarkIcon from '../assets/img/icon_dark.svg';
import DarkIconTop from '../assets/img/icon_dark_top.svg';

import "react-pro-sidebar/dist/css/styles.css";
import '../assets/css/sidebar.css'
import { ThemeContext } from "../contexts";

//import sidebar css from react-pro-sidebar module and our custom css 

const Sidebar = (props, history ) => {
    const [sideStatus, setSideStatus] = React.useState([true, false, false, false, false])

    const bg1 = '#E0B000'
    const bg2 = '#151C2F'
    const themeDispatch = React.useContext(ThemeContext.Dispatch);
    const themeState = React.useContext(ThemeContext.State);

    const handleChangeThem = () => {
        themeDispatch({type:'light'});
    }
    
    const handleClickSidebar = (index) => {
        let defaultValue = [false, false, false, false, false];
        defaultValue[index] = true;
        setSideStatus(defaultValue);
        switch(index) {
            case 0:
                break;
            case 1:
                break;
            default:
                break;
        }
    }

    return (
        <div id="sidbar">
            <ProSidebar collapsed={props.collapsed} onToggle={(value)=>{console.log(value)}}>
                <SidebarContent className={themeState.on ? props.collapsed ? 'light_background_close' : 'light_background_open' : props.collapsed ? 'dark_background_close' : 'dark_background_open'}>
                    <Menu className={themeState.on ? 'light-text' : 'dark-text'} iconShape="square">
                        <MenuItem active={sideStatus[0]} icon={<BiHome />} onClick={() => handleClickSidebar(0)}>
                            Home
                        </MenuItem>
                        <SubMenu icon={<FaExchangeAlt />} title='Trade/Exchange'>
                            <MenuItem active={sideStatus[1]} onClick={() => handleClickSidebar(1)}>Trade</MenuItem>
                            <MenuItem active={sideStatus[2]} onClick={() => handleClickSidebar(2)}>Liquidity</MenuItem>
                        </SubMenu>
                        <MenuItem active={sideStatus[3]} icon={<FaTractor />} onClick={() => handleClickSidebar(3)}>
                            Farm
                        </MenuItem>
                        <MenuItem active={sideStatus[4]} icon={<img src={Inflatable} />} onClick={() => handleClickSidebar(4)}>
                            Pool
                        </MenuItem>
                        <SubMenu icon={<BiCategory />} title='More'>
                            <MenuItem>Moneydefi Website</MenuItem>
                            <MenuItem>Poocoin Chart</MenuItem>
                            <MenuItem>Token Contract Address</MenuItem>
                            <MenuItem>Product</MenuItem>
                            <MenuItem>Dex Tool</MenuItem>
                            <MenuItem>Audit</MenuItem>
                        </SubMenu>
                    </Menu>
                    <div className="justify-content-around others" style={{ display: props.collapsed ? 'none' : 'flex' }}>
                        <div className="d-flex">
                            <div className="toggleWrapper">
                                <label className="switch">
                                    <input type="checkbox" onChange={handleChangeThem}/>
                                    <span className="slider round">
                                        <img className="light-icon" src={LightIcon} />
                                        /
                                        <img className="dark-icon" src={DarkIcon} />
                                    </span>
                                </label>
                            </div>
                            <div><FaRegSun className="other-connect-icon" /></div>
                        </div>
                        <div className="d-flex other-connect">
                            <a><FaFacebook className="other-connect-icon" /></a>
                            <a><FaInstagramSquare className="other-connect-icon" /></a>
                            <a><FaPinterest className="other-connect-icon" /></a>
                            <a><FaYoutubeSquare className="other-connect-icon" /></a>
                        </div>
                    </div>
                </SidebarContent>
            </ProSidebar>
        </div>
    )
}

export default Sidebar;