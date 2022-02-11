import React from "react";
import { Col } from "antd"
import "../assets/css/footer.css"
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa"
import { ThemeContext } from '../contexts';

const Footer = () => {
  const themeState = React.useContext(ThemeContext.State);

  return (
    <div>
      <div className={`footer ${themeState.on ? 'light_footer' : 'dark_footer'}`}>
        <Col lg={6} md={6} sm={6}>
          <div className="navLeft d-flex">
            <div
              className={`mark align-self-center ${themeState.on ? 'light_mark' : 'dark_mark'}`}
              style={{ margin: "0" }}
            ></div>
            <span className="markName align-self-center">Moneydefiswap</span>
          </div>
          <h4 style={{ color: themeState.on ? "#273252" : "white" }}>Stay Connected</h4>
          <div className="social-icon">
            <FaFacebook style={{ margin: "0rem .5rem", cursor: "pointer"  }} />
            <FaInstagram style={{ margin: "0rem .5rem", cursor: "pointer" }} />
            <FaPinterest style={{ margin: "0rem .5rem", cursor: "pointer" }} />
            <FaYoutube style={{ margin: "0rem .5rem", cursor: "pointer" }} />
          </div>
          <div className="mail-info">
            <p style={{color: themeState.on ? "#273252" : "white"}}>Info@Moneydefiswap.com</p>
          </div>
          <p style={{color: themeState.on ? "#273252" : "white"}}>+00 000 0000000</p>
          <p style={{color: themeState.on ? "#273252" : "white"}}>+00 000 0000000</p>
        </Col>
        <Col lg={4} md={4} sm={6}></Col>
        <Col lg={4} md={4} sm={6}>
          <h4 style={{ padding: 0, margin: 0, color: themeState.on ? "#273252" : "white" }}>Newsletter</h4>
          <p style={{ fontSize: "12px", lineHeight: ".8rem", color: themeState.on ? "#273252" : "white" }}>
            Please send me the email for the latest updates
            <br />
            and announcements.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="your email address"
              className={themeState.on ? "light-custom-form" : "custom-form"}
            ></input>
            <button className={`btn btn-subscribe ${themeState.on ? 'light-btn-subscribe' : 'dark-btn-subscribe'}`}>Subscribe</button>
          </div>
        </Col>
      </div>
      <div className={`copyright ${themeState.on ? 'light-copyright' : 'dark-copyright'}`}>
        <p style={{ fontSize: "16px", textAlign: "right", color: themeState.on ? '#E0B000' : '#151C2F'  }}>
          All Rights Reserved 2022-2023
        </p>
      </div>
    </div>
  )
}

export default Footer
