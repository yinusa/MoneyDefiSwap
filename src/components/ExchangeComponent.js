import React, { useEffect } from "react";
import { Col } from "antd"
import { ThemeContext } from '../contexts';
import '../assets/css/exchangecomponent.css'
import BNB from '../assets/img/icon-bnb.svg'
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { VscArrowSwap } from "react-icons/vsc";
import TokenInsertModal from "./TokenInsertModal";
import ReactApexChart from 'react-apexcharts';
import { ethers } from "ethers";
import { network, chain } from '../constants/network';
import ERC20 from '../contracts/test/Token.sol/Token.json';
import { formatUnits, parseEther, parseUnits } from "ethers/lib/utils";
import Router from '../contracts/UniswapV2Router02.sol/UniswapV2Router02.json';
import { address } from "../constants/addresses";

const ExchangeComponent = ({ account, requestAccount, tokens }) => {
  const [rate, setRate] = React.useState(1);
  const [amountIn, setAmountIn] = React.useState(0);
  const [amountOut, setAmountOut] = React.useState(0);
  const themeState = React.useContext(ThemeContext.State);
  const [showGraphics, setShowGraphics] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState(0);
  const [openSwapCoin, setOpenSwapCoin] = React.useState(false);
  const [openPurposeCoin, setOpenPurposeCoin] = React.useState(false);
  const [listToken, setListToken] = React.useState([
    { name: 'Wrapped BNB', symbol: 'WBNB', balance: '0.0', decimals: 18, address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' },
    { name: 'MoneydefiSwap', symbol: 'MSD', balance: '0.0', decimals: 18, address: '0xfA5D78d4517d2C5CCbAd2e56fA8Fc321d6544F2b' },
  ])

  const [swapToken, setSwapToken] = React.useState(listToken[0]);
  const [purposeToken, setPurposeToken] = React.useState(listToken[1]);

  const [chartsSeries, setChartSeries] = React.useState([
    {
      data: [1]
    }
  ])

  const [chartOptionLight, setChartOptionLight] = React.useState({
    colors: ['#151C2F'],
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
    colors: ['#E0B000'],
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

  useEffect(() => {
    const getRate = async ()  => {
      const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
      const router = new ethers.Contract(address[chain]['router'], Router.abi, provider);
      const path = [swapToken.address, purposeToken.address];
      const amounts = await router.getAmountsOut(ethers.utils.parseEther("1"), path);
      const amount1 = ethers.utils.formatEther(amounts[0]);
      const amount2 = ethers.utils.formatEther(amounts[1]);
      const rate = Number(amount2) / Number(amount1);
      setRate(rate);
    }
    getRate();
  }, [swapToken]);

  // calculate balance
  useEffect(() => {
    async function getBalance() {
      let balance = 0;
      let tokenList = [];
      for (let i = 0; i < tokens.length; i++) {
        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
        const contract = new ethers.Contract(tokens[i].address, ERC20.abi, provider);
        if (!account) {
          balance = 0;
        } else {
          try {
            if (tokens[i].address.toLocaleLowerCase() === address[chain]['wether'].toLocaleLowerCase()) {
              const provider1 = new ethers.providers.Web3Provider(window.ethereum);
              balance = await provider1.getBalance(account);
              console.log(balance)
            } else {
              balance = await contract.balanceOf(account);
            }
          } catch (err) {
            throw err;
          }
        }
        tokenList.push({
          name: tokens[i].name,
          symbol: tokens[i].symbol,
          balance: formatUnits(balance, tokens[i].decimals),
          decimals: tokens[i].decimals,
          address: tokens[i].address
        });
      }
      console.log(tokenList);
      tokenList.length != 0 && setListToken(tokenList);
    }
    
    getBalance();
  }, [account, tokens]);
  // calculate amountOut
  useEffect(() => {
    async function getAmountOut() {
      setChartSeries([
        {
          data: [1]
        }
      ]);
      try {
        const provider = new ethers.providers.JsonRpcBatchProvider(network.rpcUrls[0]);
        const contract = new ethers.Contract(address[chain]['router'], Router.abi, provider);
        const path = [swapToken.address, purposeToken.address];
        const amounts = await contract.getAmountsOut(parseUnits(String(amountIn), swapToken.decimals), path);
        console.log(amounts);
        setAmountOut(formatUnits(amounts[1], purposeToken.decimals));
      } catch (err) {
        throw err;
      }
    }
    getAmountOut();
  }, [amountIn, purposeToken, swapToken]);

  // swap , request account
  const swapTokens = async () => {
    if (!account) {
      requestAccount();
    } else {
      // approve
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const router = new ethers.Contract(address[chain]['router'], Router.abi, signer);
      const today = new Date();
      const deadline = (today.getTime() / 1000 + 60).toFixed();
      const path = [swapToken.address, purposeToken.address];
      if (swapToken.address.toLocaleLowerCase() === address[chain]['wether'].toLocaleLowerCase()) {
        console.log("ether2token")
        const swapTx = await router.swapExactETHForTokens(
          0,
          path,
          String(account),
          deadline,
          { value: amountIn * Math.pow(10, 18), gasLimit: 42000 }
        );
        await swapTx.wait();
      } else if (purposeToken.address.toLocaleLowerCase() === address[chain]['wether'].toLocaleLowerCase()) {
        console.log("token2ether")
        const contract = new ethers.Contract(swapToken.address, ERC20.abi, signer);
        await contract.approve(address[chain]['router'], parseUnits(String(amountIn), swapToken.decimals));
        contract.once("Approval", async () => {
          const swapTx = await router.swapExactTokensForETH(
            parseEther(String(amountIn)),
            0,
            path,
            String(account),
            deadline,
            {gasLimit: 42000}
          );
          await swapTx.wait();
        });
      } else {
        const contract = new ethers.Contract(swapToken.address, ERC20.abi, signer);
        await contract.approve(address['router'], parseUnits(String(amountIn), swapToken.decimals));
        contract.once("Approval", async () => {
          // swap
          const tx = await router.swapExactTokensForTokens(
            parseUnits(String(amountIn)),
            0,
            path,
            String(account),
            deadline
          );
          await tx.wait();
          console.log("swaped");
        });
      }
    }
  }

  useEffect(() => {
    if(listToken[0] && listToken[1]) {
      setSwapToken(listToken[0]);
      setPurposeToken(listToken[1]);
    }
  }, [listToken]);

  const setAmountInByMax = () => {
    setAmountIn(swapToken.balance);
  }

  const handleClickDuration = index => {
    setSelectedDuration(index);
  }

  const handleCloseSwapCoinModal = (index) => {

    setOpenSwapCoin(false);
    setSwapToken(listToken[index==0 ? 0 : index - 1]);
  }

  const handleClosePurposeModal = (index) => {
    setOpenPurposeCoin(false);
    setPurposeToken(listToken[index == 0 ? 1 : index-1]);
  }

  const handleChangeTokens = () => {
    const token = swapToken;
    setSwapToken(purposeToken);
    setPurposeToken(token);
  }

  return (
    <div className="exchange-main">
      <TokenInsertModal listToken={listToken} disableToken={purposeToken} isOpen={openSwapCoin} closeModal={handleCloseSwapCoinModal} />
      <TokenInsertModal listToken={listToken} disableToken={swapToken} isOpen={openPurposeCoin} closeModal={handleClosePurposeModal} />
      <div className={`exchange-graphics-area  ${themeState.on ? "exchange-graphics-area-light" : "exchange-graphics-area-dark"} ${showGraphics ? "exchange-graphics-area-open" : "exchange-graphics-area-close"}`}>
        {showGraphics ?
          <MdKeyboardArrowRight className={`exchange-graphics-arrow-icon ${themeState.on ? "exchange-graphics-arrow-icon-light" : "exchange-graphics-arrow-icon-dark"}`} onClick={() => { setShowGraphics(!showGraphics) }} /> :
          <MdKeyboardArrowLeft className={`exchange-graphics-arrow-icon ${themeState.on ? "exchange-graphics-arrow-icon-light" : "exchange-graphics-arrow-icon-dark"}`} onClick={() => { setShowGraphics(!showGraphics) }} />}
        <div className={showGraphics ? "exchange-graphics-div-open" : "exchange-graphics-div-hide"}>
          <div className={`exchange-graphics-content ${themeState.on ? "exchange-graphics-content-light" : "exchange-graphics-content-dark"}`}>
            <div className="exchange-graphics-header">
              <span className="exchange-graphics-coins">{swapToken && purposeToken ? <>{purposeToken.symbol} / {swapToken.symbol}</> : ""}</span>
              <span className="exchange-graphics-basic-view">BASIC VIEW</span>
              <span className="exchange-graphics-trading-view">TRADING VIEW</span>
            </div>
            <span className="exchange-graphics-current-time">Feb 03-2022, 11:39 PM</span>
            <div className="exchange-graphics-control-area">
              <div>
                <div className="exchange-graphics-ratio">{rate}</div>
                <span className="exchange-graphics-coins1">{swapToken && purposeToken ? <>{purposeToken.symbol} / {swapToken.symbol}</> : ""}</span>
                <span className="exchange-graphics-percent">+0.296 (0.58%)</span>
              </div>
              <div className="exchange-graphics-control">
                <span className={`exchange-graphics-select-24h ${themeState.on ? selectedDuration == 0 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 0 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={() => handleClickDuration(0)}>24H</span>
                <span className={`exchange-graphics-select-1w ${themeState.on ? selectedDuration == 1 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 1 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={() => handleClickDuration(1)}>1W</span>
                <span className={`exchange-graphics-select-1m ${themeState.on ? selectedDuration == 2 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 2 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={() => handleClickDuration(2)}>1M</span>
                <span className={`exchange-graphics-select-1y ${themeState.on ? selectedDuration == 3 ? "exchange-graphics-select-dark" : "exchange-graphics-select-light" : selectedDuration == 3 ? "exchange-graphics-select-light" : "exchange-graphics-select-dark"}`} onClick={() => handleClickDuration(3)}>1Y</span>
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
              <div className="exchange-type-select" onClick={() => setOpenSwapCoin(true)}>
                <img className={`blockchain-icon ${themeState.on ? "blockchain-icon-light" : "blockchain-icon-dark"}`} src={BNB} />
                <span className="blockchain-name">{swapToken ? swapToken.symbol : "BTC"}</span>
                <MdKeyboardArrowDown className="arrow-down-icon" />
              </div>
              <div className="blockchain-balance">
                <span>Available:</span>
                <span>{swapToken ? Number(swapToken.balance).toFixed(2) : 0}</span>
              </div>
            </div>
            <div className="exchange-input-area">
              <button onClick={setAmountInByMax} className="btn-max">MAX</button>
              <input value={amountIn} onChange={e => setAmountIn(e.target.value)} className="exchange-input " placeholder="0.0" />
            </div>
          </div>
          <VscArrowSwap className="btn-swap" onClick={handleChangeTokens} />
          <div className="exchange-select-part">
            <div className="exchange-type-area">
              <div className="exchange-type-select" onClick={() => setOpenPurposeCoin(true)}>
                <img className={`blockchain-icon ${themeState.on ? "blockchain-icon-light" : "blockchain-icon-dark"}`} src={BNB}/>
                <span className="blockchain-name">{purposeToken ? purposeToken.symbol : "ETH"}</span>
                <MdKeyboardArrowDown className="arrow-down-icon" />
              </div>
              <div className="blockchain-balance">
                <span>Available:</span>
                <span>{purposeToken ? Number(purposeToken.balance).toFixed(2) : 0}</span>
              </div>
            </div>
            <div className="exchange-input-area">
              <button className="btn-max">MAX</button>
              <input value={amountOut} onChange={e => setAmountOut(e.target.value)} className="exchange-input " placeholder="0.0" />
            </div>
          </div>
          {purposeToken && swapToken ?
            <div className="exchange-ratio">
              <span>Price </span>
              <span>{`${rate}`}</span>
              <span> {purposeToken.symbol} </span>
              <span> per </span>
              <span>{swapToken.symbol}</span>
              <AiOutlineReload className="exchange-reload" />
            </div> : ""
          }
          <button onClick={swapTokens} className={`exchange-connect-wallet ${themeState.on ? "exchange-connect-wallet-light" : "exchange-connect-wallet-dark"}`} >
            {
              !account ? (
                <div>CONNECT WALLET</div>
              ) : (
                <div>Swap</div>
              )
            }

          </button>
        </div>
      </div>

    </div>
  )
}

export default ExchangeComponent
