import React from "react";
import { Content } from "antd/lib/layout/layout";
import Charactor1 from '../../assets/img/y1.svg'
import Charactor2 from '../../assets/img/w2.svg'
import Hand from '../../assets/img/hand.svg'
import HandBlue from '../../assets/img/hand_blue.svg'
import Money from '../../assets/img/money.svg'
import './home.css'
import { ThemeContext } from '../../contexts';

const Home = (props) => {
    const themeState = React.useContext(ThemeContext.State);

    return (
        <Content className="home">
            <div className="first-article d-flex justify-content-around">
                <div className="d-flex justify-content-end col-7"><img src={themeState.on ? Charactor2 : Charactor1}></img></div>
                <div className="col-5">
                    <p className={`home-font1 first-article-topic ${themeState.on ? 'light_home_font1' : 'dark_home_font1'}`}>MoneyDefiSwap</p>
                    <p className={`home-font2 first-article-explain ${themeState.on ? 'light_home_font2' : 'dark_home_font2'}`}>Together to the future with MoneydefiSwap $MSD&gt; </p>
                    <p className={`home-font3 first-article-content ${themeState.on ? 'light_home_font3' : 'dark_home_font3'}`}>$MSD also aims to bring businesses and developers together to solve real-world problems with the shared values of transparency, fee-less transaction, social and economic inclusion, environmental sustainability.</p>
                    <button className={`btn-home-trade ${themeState.on ? 'light-btn-home-trade' : 'dark-btn-home-trade'}`}>TRADE NOW</button>
                </div>
            </div>
            <div className="second-article d-flex justify-content-between">
                <div className="col-sm-1" />
                <div className="col-sm-10" style={{zIndex: 1}}>
                    <p className={`home-font1 second-article-topic ${themeState.on ? 'light_home_font1' : 'dark_home_font1'}`}>MoneyShow MoneyShow ($MYS)</p>
                    <p className={`home-font3 second-article-content ${themeState.on ? 'light_home_font3' : 'dark_home_font3'}`}>is a new Defi utility deflationary token built on the Binance Smart Chain network. And it is the
                        governance token of MoneydefiSwap. The grand and detailed information of the token and the utility
                        platform will be revealed in subsequent post. And also, have you been thinking or asking yourself on how to
                        maximize your profits on holding MSD, a new staking pool has now been opened on the MoneydefiSwap
                        decentralized platform. This gives you an opportunity to stake your MSD to earn MYS, once you have staked your
                        assets you'll be earning staking rewards on it and grow them further by compounding those future rewards, Stake
                        your MSD today to start earning the future gem in MYS.</p>
                </div>
                <div><img src={themeState.on ? HandBlue : Hand}></img></div>
            </div>
            <div className="third-article d-flex justify-content-center">
                <div className="d-flex justify-content-center col-7"><img src={Money}></img></div>
                <div className="col-5">
                    <p className={`home-font1 third-article-topic ${themeState.on ? 'light_home_font1' : 'dark_home_font1'}`}>Together to the future</p>
                    <p className={`home-font3 third-article-content ${themeState.on ? 'light_home_font3' : 'dark_home_font3'}`}>MoneydefiSwap is an innovative BEP-20 token that uses complex
                        algorithms to generate automatic gas-less yield rewards, rewards, incentivizes
                        holding while stabilizing the price through automatically generating
                        liquidity, providing an unbreakable price floor.<br />
                        <br />

                        What makes MoneydefiSwap truly Money shot growing up is the
                        the automatic market-making mechanism that guarantees an ever-lasting
                        baseline liquidity (basically a price floor) that inches higher on each trade
                        executed.</p>
                </div>
            </div>
        </Content>
    )
}

export default Home;