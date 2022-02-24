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
    useRoutes
} from 'react-router-dom';
import { addNet, switchNet } from '../constants/network';

const ScreenList = (props) => {
    let routes = useRoutes([
        {
            path: "/", element: <div>
                <div className="middle-gradient" />
                <Home />
                <div className='bottom-gradient' />
            </div>
        },
        { path: "/exchange", element: <Exchange account={props.account} requestAccount={props.requestAccount}/> },
    ]);
    return routes;
};

const Dashboard = () => {
    const themeState = React.useContext(ThemeContext.State);
    const [menuCollapse, setMenuCollapse] = useState(true);
    const [userAccount, setUserAccount] = useState();
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    // connect wallet
    async function requestAccount() {
        await window.ethereum.request(addNet); // add fantom newwork
        try {
            await window.ethereum.request(switchNet); // switch to fantom network
        } catch (err) {
            console.log(err);
        }
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });  // connect wallet
            setUserAccount(account);
        }
    }

    return (
        <div>
            <Header/>
            <Navbar 
                collapsed={menuCollapse} 
                toggle={menuIconClick} 
                account={userAccount}
                requestAccount={requestAccount}
            />
            <div className={`d-flex ${themeState.on ? 'light-content' : 'dark_content'}`}>
                <div className='top-gradient' />
                <Router>
                    <Sidebar collapsed={menuCollapse} />
                    <ScreenList account={userAccount} requestAccount={requestAccount}/>
                </Router>


            </div>
            <Footer />
        </div >
    )
}

export default Dashboard;
