import React from "react";
import { Col } from "antd"
import { ThemeContext } from '../contexts';
import '../assets/css/exchangecomponent.css'
import BNB from '../assets/img/icon-bnb.svg'
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {AiOutlineReload} from "react-icons/ai";
import {VscArrowSwap} from "react-icons/vsc";
import TokenInsertModal from "./TokenInsertModal";
import ReactApexChart from 'react-apexcharts';

const ExchangeComponent = () => {
  const themeState = React.useContext(ThemeContext.State);
  const [showGraphics, setShowGraphics] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState(0);
  const [openSwapCoin, setOpenSwapCoin] = React.useState(false);
  const [openPurposeCoin, setOpenPurposeCoin] = React.useState(false);
  const [listToken, setListToken] = React.useState([
    {name: 'Bitcoin', symbol: 'BTC', balance: 10},
    {name: 'Ethereum', symbol: 'ETH', balance: 11},
    {name: 'Tether', symbol: 'USDT', balance: 14},
    {name: 'BNB', symbol: 'BNB', balance: 15.2},
    {name: 'XRP', symbol: 'XRP', balance: 1.3},
    {name: 'Solana', symbol: 'SOL', balance: 13.5},
    {name: 'Terra', symbol: 'LUNA', balance: 0},
    {name: 'Avalanche', symbol: 'AVAX', balance: 13.2},
    {name: 'Dogecoin', symbol: 'DOGE', balance: 12.6},
    {name: 'Polkadot', symbol: 'DOT', balance: 1.2},
    {name: 'Polygon', symbol: 'MATIC', balance: 1.7},
  ])

  const [swapToken, setSwapToken] = React.useState(listToken[0]);
  const [purposeToken, setPurposeToken] = React.useState(listToken[1]);

  const [chartsSeries, setChartSeries] = React.useState([
    {
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ])

  const [chartOptionLight, setChartOptionLight] = React.useState({
    colors : ['#151C2F'],
    chart: {
      height: 400,
      type: 'area',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    
  })

  const [chartOptionDark, setChartOptionDark] = React.useState({
    colors : ['#E0B000'],
    chart: {
      height: 400,
      type: 'area',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  })

  const handleClickDuration = index => {
    setSelectedDuration(index);
  }

  const handleCloseSwapCoinModal = (index) => {
    setOpenSwapCoin(false);
    setSwapToken(listToken[index]);
  }

  const handleClosePurposeModal = (index) => {
    setOpenPurposeCoin(false);
    setPurposeToken(listToken[index]);
  }

  const handleChangeTokens = () => {
    const token = swapToken;
    setSwapToken(purposeToken);
    setPurposeToken(token);
  }

  return (
    <div className="exchange-main">
      <TokenInsertModal listToken={listToken} isOpen={openSwapCoin} closeModal={handleCloseSwapCoinModal} />
      <TokenInsertModal listToken={listToken} isOpen={openPurposeCoin} closeModal={handleClosePurposeModal} />
      <div className={`exchange-graphics-area  ${themeState.on ? "exchange-graphics-area-light" : "exchange-graphics-area-dark" } ${showGraphics? "exchange-graphics-area-open" : "exchange-graphics-area-close"}`}>
        {showGraphics ?
          <MdKeyboardArrowRight className={`exchange-graphics-arrow-icon ${themeState.on ? "exchange-graphics-arrow-icon-light" : "exchange-graphics-arrow-icon-dark"}`} onClick={() => {setShowGraphics(!showGraphics)}}/> :
          <MdKeyboardArrowLeft className={`exchange-graphics-arrow-icon ${themeState.on ? "exchange-graphics-arrow-icon-light" : "exchange-graphics-arrow-icon-dark"}`} onClick={() => {setShowGraphics(!showGraphics)}}/>}
          <div className={showGraphics ? "exchange-graphics-div-open" : "exchange-graphics-div-hide"}>
            <div className={`exchange-graphics-content ${themeState.on ? "exchange-graphics-content-light" : "exchange-graphics-content-dark"}`}>
              <div className="exchange-graphics-header">
                <span className="exchange-graphics-coins">{swapToken.symbol} / {purposeToken.symbol}</span>
                <span className="exchange-graphics-basic-view">BASIC VIEW</span>
                <span className="exchange-graphics-trading-view">TRADING VIEW</span>
              </div>
              <span className="exchange-graphics-current-time">Feb 03-2022, 11:39 PM</span>
              <div className="exchange-graphics-control-area">
                <div>
                  <span className="exchange-graphics-ratio">64.58</span>
                  <span className="exchange-graphics-coins1">{swapToken.symbol} / {purposeToken.symbol}</span>
                  <span className="exchange-graphics-percent">+0.296 (0.58%)</span>
                </div>
                <div className="exchange-graphics-control">
                  <span className={`exchange-graphics-select-24h ${themeState.on? selectedDuration == 0 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 0 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={()=>handleClickDuration(0)}>24H</span>
                  <span className={`exchange-graphics-select-1w ${themeState.on? selectedDuration == 1 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 1 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={()=>handleClickDuration(1)}>1W</span>
                  <span className={`exchange-graphics-select-1m ${themeState.on? selectedDuration == 2 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 2 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={()=>handleClickDuration(2)}>1M</span>
                  <span className={`exchange-graphics-select-1y ${themeState.on? selectedDuration == 3 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 3 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={()=>handleClickDuration(3)}>1Y</span>
                </div>
              </div>
              <div className='exchange-graphics-view-area'>
                <ReactApexChart className="exchange-graphics" options={themeState.on ? chartOptionLight : chartOptionDark} series={chartsSeries} type="area" height={350} />
              </div>
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
              <div className="exchange-type-select" onClick={()=>setOpenSwapCoin(true)}>
                <img className={`blockchain-icon ${themeState.on ? "blockchain-icon-light" : "blockchain-icon-dark"}`} src={BNB} />
                <span className="blockchain-name">{swapToken.symbol}</span>
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
          <VscArrowSwap className="btn-swap" onClick={handleChangeTokens} />
          <div className="exchange-select-part">
            <div className="exchange-type-area">
              <div className="exchange-type-select" onClick={()=>setOpenPurposeCoin(true)}>
                <img className={`blockchain-icon ${themeState.on ? "blockchain-icon-light" : "blockchain-icon-dark"}`} src={BNB} src={BNB} />
                <span className="blockchain-name">{purposeToken.symbol}</span>
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
            <span> {purposeToken.symbol} </span>
            <span> per </span>
            <span>{swapToken.symbol}</span>
            <AiOutlineReload className="exchange-reload"/>
          </div>
          <button className={`exchange-connect-wallet ${themeState.on ? "exchange-connect-wallet-light" : "exchange-connect-wallet-dark"}`} >CONNECT WALLET</button>
        </div>
      </div>
      
    </div>
  )
}

export default ExchangeComponent
