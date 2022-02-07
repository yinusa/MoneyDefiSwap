import Header from './Header'
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar'
import Home from '../pages/Home';
import '../assets/css/common.css'

import React, { Component } from "react";



import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;





class Dashboard extends Component {
    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div>
                <Header />
                <Navbar collapsed={this.state.collapsed} toggle={this.toggle} />
                <div className='content d-flex'>
                    <div className='top-gradient' />
                    <Sidebar collapsed={this.state.collapsed} />
                    <Home />
                    <div className='bottom-gradient' />
                </div>
                <Footer />
            </div >
        )
    }
}

export default Dashboard;
