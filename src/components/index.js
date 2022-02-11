import React, { useState } from "react";
import Header from './Header'
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar'
import Home from '../pages/home/Home';
import "antd/dist/antd.css";
import '../assets/css/common.css'
import { ThemeContext } from '../contexts';

const Dashboard = () => {
    const themeState = React.useContext(ThemeContext.State);
    const [menuCollapse, setMenuCollapse] = useState(true)
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <div>
            <Header />
            <Navbar collapsed={menuCollapse} toggle={menuIconClick} />
            <div className={`d-flex ${themeState.on ? 'light-content' : 'dark_content'}`}>
                <div className='top-gradient' />
                <div className="middle-gradient" />
                <Sidebar collapsed={menuCollapse} />
                <Home />
                <div className='bottom-gradient' />
            </div>
            <Footer />
        </div >
    )
}

export default Dashboard;
