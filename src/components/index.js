import React, { useState } from "react";
import Header from './Header'
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar'
import Home from '../pages/home/Home';
import Exchange from "../pages/exchange/Exchange";
import "antd/dist/antd.css";
import '../assets/css/common.css'
import { ThemeContext } from '../contexts';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes } from 'react-router-dom';

const ScreenList = () => {
    let routes = useRoutes([
      { path: "/", element: <div>
            <div className="middle-gradient" />
            <Home />
            <div className='bottom-gradient' />
          </div> },
      { path: "/exchange", element: <Exchange /> },
    ]);
    return routes;
};

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
                <Router>
                    <Sidebar collapsed={menuCollapse} />
                    <ScreenList />
                </Router>
                
                
            </div>
            <Footer />
        </div >
    )
}

export default Dashboard;
