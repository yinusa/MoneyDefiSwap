import React from "react";
import { Col } from "antd"
import { ThemeContext } from '../contexts';
import '../assets/css/exchangecomponent.css'
import BNB from '../assets/img/icon-bnb.svg'
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {AiOutlineReload} from "react-icons/ai";
import {VscArrowSwap} from "react-icons/vsc";

const ExchangeComponent = () => {
  const themeState = React.useContext(ThemeContext.State);
  const [showGraphics, setShowGraphics] = React.useState(false);

  return (
    <div className="exchange-main">
      <div className={`exchange-graphics-area  ${themeState.on ? "exchange-graphics-area-light" : "exchange-graphics-area-dark" } ${showGraphics? "exchange-graphics-area-open" : "exchange-graphics-area-close"}`}>
        {showGraphics ?
          <MdKeyboardArrowRight className={`exchange-graphics-arrow-icon ${themeState.on ? "exchange-graphics-arrow-icon-light" : "exchange-graphics-arrow-icon-dark"}`} onClick={() => {setShowGraphics(!showGraphics)}}/> :
          <MdKeyboardArrowLeft className={`exchange-graphics-arrow-icon ${themeState.on ? "exchange-graphics-arrow-icon-light" : "exchange-graphics-arrow-icon-dark"}`} onClick={() => {setShowGraphics(!showGraphics)}}/>}
          <div className={showGraphics ? "exchange-graphics-div-open" : "exchange-graphics-div-hide"}>
            <div className={`exchange-graphics-content ${themeState.on ? "exchange-graphics-content-light" : "exchange-graphics-content-dark"}`}>

            </div>
          </div>
          
      </div>
      <div className={`exchange-container ${themeState.on ? "exchange-container-light" : "exchange-container-dark"}`}>
        <div className={`exchange-header ${themeState.on ? "exchange-header-light" : "exchange-header-dark"}`}>
          <h3 className={themeState.on ? "exchange-text-light" : "exchange-text-dark"}>EXCHANGE</h3>
          <h6 className={themeState.on ? "exchange-text-light" : "exchange-text-dark"}>TRADE TOKEN IN AN INSTANT</h6>
        </div>
        <div className={`exchange-body ${themeState.on ? "exchange-text-light" : "exchange-text-dark"}`}>
          <div className="exchange-select-part">
            <div className="exchange-type-area">
              <div className="exchange-type-select">
                <img className={`blockchain-icon ${themeState.on ? "blockchain-icon-light" : "blockchain-icon-dark"}`} src={BNB} />
                <span className="blockchain-name">BNB</span>
                <MdKeyboardArrowDown className="arrow-down-icon" />
              </div>
              <div className="blockchain-balance">
                <span>Available:</span>
                <span>62.1246</span>
              </div>
            </div>
            <div className="exchange-input-area">
              <button className="btn-max">MAX</button>
              <input className="exchange-input " placeholder="0.0"/>
            </div>
          </div>
          <VscArrowSwap className="btn-swap" />
          <div className="exchange-select-part">
            <div className="exchange-type-area">
              <div className="exchange-type-select">
                <img className={`blockchain-icon ${themeState.on ? "blockchain-icon-light" : "blockchain-icon-dark"}`} src={BNB} src={BNB} />
                <span className="blockchain-name">BNB</span>
                <MdKeyboardArrowDown className="arrow-down-icon" />
              </div>
              <div className="blockchain-balance">
                <span>Available:</span>
                <span>62.1246</span>
              </div>
            </div>
            <div className="exchange-input-area">
              <button className="btn-max">MAX</button>
              <input className="exchange-input " placeholder="0.0"/>
            </div>
          </div>
          <div className="exchange-ratio">
            <span>Price </span>
            <span>0.019616</span>
            <span> BNB </span>
            <span> per </span>
            <span>CAKE</span>
            <AiOutlineReload className="exchange-reload"/>
          </div>
          <button className={`exchange-connect-wallet ${themeState.on ? "exchange-connect-wallet-light" : "exchange-connect-wallet-dark"}`} >CONNECT WALLET</button>
        </div>
      </div>
      
    </div>
  )
}

export default ExchangeComponent
