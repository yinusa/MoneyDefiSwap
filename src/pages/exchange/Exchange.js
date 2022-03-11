import React from "react";
import { Content } from "antd/lib/layout/layout";
import './exchange.css'
import { ThemeContext } from '../../contexts';
import Charactor1 from '../../assets/img/y1.svg'
import Charactor2 from '../../assets/img/w2.svg'
import ExchangeComponent from "../../components/ExchangeComponent";

const Exchange = (props) => {
    const themeState = React.useContext(ThemeContext.State);
    const [selectTab, setSelectTab] = React.useState(0);

    const handleClickTab = index => {
        setSelectTab(index)
    }

    return (
        <div className="exchange">
            <div className="tab-content">
                <div className="tab-area">
                    <span className={`tab-button  tab-exchange ${selectTab==0 ? themeState.on ? 'tab-button-color' : 'tab-button-color-select' :  themeState.on ? 'tab-button-color-select' : 'tab-button-color'}`} onClick={() => handleClickTab(0)}>Exchange</span>
                    <span className={`tab-button ${themeState.on ? "tab-trade-light" : "tab-trade-dark"} ${selectTab==1 ? themeState.on ? 'tab-button-color' : 'tab-button-color-select' :  themeState.on ? 'tab-button-color-select' : 'tab-button-color'}`} onClick={() => handleClickTab(1)}>Trade</span>
                    <span className={`tab-button tab-liquidity ${selectTab==2 ? themeState.on ? 'tab-button-color' : 'tab-button-color-select' :  themeState.on ? 'tab-button-color-select' : 'tab-button-color'}`} onClick={() => handleClickTab(2)}>Liquidity</span>
                </div>
            </div>
            <div className="main-content">
                <img className="image" src={themeState.on ? Charactor2 : Charactor1}></img>
                <div className="main-area">
                    <ExchangeComponent account={props.account} requestAccount={props.requestAccount} tokens={props.tokens}/>
                </div>
            </div>
        </div>
    )
}

export default Exchange;