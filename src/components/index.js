import React, { useState, useEffect } from "react";
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
import { addNet, switchNet, network, chain } from '../constants/network';
import { ethers } from "ethers";
import { address } from "../constants/addresses";
import UniswapV2Factory from '../contracts/UniswapV2Factory.sol/UniswapV2Factory.json';
import UniswapV2Pair from '../contracts/UniswapV2Pair.sol/UniswapV2Pair.json';
import ERC20 from '../contracts/test/Token.sol/Token.json';

const ScreenList = (props) => {
    let routes = useRoutes([
        {
            path: "/", element: <div>
                <div className="middle-gradient" />
                <Home />
                <div className='bottom-gradient' />
            </div>
        },
        { path: "/exchange", element: <Exchange account={props.account} requestAccount={props.requestAccount} tokens={props.tokens}/> },
    ]);
    return routes;
};

const Dashboard = () => {
    const themeState = React.useContext(ThemeContext.State);
    const [menuCollapse, setMenuCollapse] = useState(true);
    const [userAccount, setUserAccount] = useState();
    const [tokens, setTokens] = useState([]);
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    // get all tokens
    useEffect(() => {
        async function getTokens() {
            try {
                const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
                const factoryContract = new ethers.Contract(address[chain]['factory'], UniswapV2Factory.abi, provider);
                const pairsLength = await factoryContract.allPairsLength();
                // get all pairs
                let tokenList = [];
                for(let i = 0; i < pairsLength.toNumber() ; i++) {
                    const pairAddress = await factoryContract.allPairs(i);
                    const pairContract = new ethers.Contract(pairAddress, UniswapV2Pair.abi, provider);
                    const token0 = await pairContract.token0();
                    const token1 = await pairContract.token1();
                    tokenList.push(token0);
                    tokenList.push(token1);
                }
                const uniqueTokens = [...new Set(tokenList)];
                // make token list
                tokenList = [];
                for(let i = 0 ; i< uniqueTokens.length ; i++) {
                    const tokenContract = new ethers.Contract(uniqueTokens[i], ERC20.abi, provider);
                    const name = await tokenContract.name();
                    const symbol = await tokenContract.symbol();
                    const decimals = await tokenContract.decimals();
                    tokenList.push({
                        name: name,
                        symbol: symbol,
                        decimals: decimals,
                        address: uniqueTokens[i]
                    });
                }
                setTokens(tokenList);
            } catch (err) {
                throw err;
            }
        }
        getTokens();
    }, []);

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
                    <ScreenList account={userAccount} requestAccount={requestAccount} tokens={tokens}/>
                </Router>
            </div>
            <Footer />
        </div >
    )
}

export default Dashboard;
