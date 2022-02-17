import React from "react";
import { Col } from "antd"
import { ThemeContext } from '../contexts';
import '../assets/css/exchangecomponent.css'
import BNB from '../assets/img/icon-bnb.svg'
import Swap from '../assets/img/swap.svg'
import Reload from '../assets/img/reload.svg'
import { MdKeyboardArrowDown } from "react-icons/md";

const ExchangeComponent = () => {
  const themeState = React.useContext(ThemeContext.State);

  return (
    <div >
      <div className="exchange-container">
        <div className="exchange-header">
          <h3>EXCHANGE</h3>
          <h6>TRADE TOKEN IN AN INSTANT</h6>
        </div>
        <div className="exchange-body">
          <div className="exchange-select-part">
            <div className="exchange-type-area">
              <div className="exchange-type-select">
                <img className="blockchain-icon" src={BNB} />
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
          <div className="btn-swap">
            <img src={Swap} />
          </div>
          <div className="exchange-select-part">
            <div className="exchange-type-area">
              <div className="exchange-type-select">
                <img className="blockchain-icon" src={BNB} />
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
            <img className="exchange-reload" src={Reload} />
          </div>
          <button className="exchange-connect-wallet">CONNECT WALLET</button>
        </div>
      </div>
      
    </div>
  )
}

export default ExchangeComponent
