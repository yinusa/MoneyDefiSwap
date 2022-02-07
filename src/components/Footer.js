import { Col } from "antd"
import "../assets/css/footer.css"
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <Col lg={4} md={4} sm={6}>
          <div className="navLeft d-flex">
            <div
              className="mark align-self-center"
              style={{ margin: "0" }}
            ></div>
            <span className="markName align-self-center">Moneydefiswap</span>
          </div>
          <h4 style={{ color: "white" }}>Stay Connected</h4>
          <div className="social-icon">
            <FaFacebook style={{ margin: "0rem .5rem", cursor: "pointer" }} />
            <FaInstagram style={{ margin: "0rem .5rem", cursor: "pointer" }} />
            <FaPinterest style={{ margin: "0rem .5rem", cursor: "pointer" }} />
            <FaYoutube style={{ margin: "0rem .5rem", cursor: "pointer" }} />
          </div>
          <div className="mail-info">
            <p>Info@Moneydefiswap.com</p>
          </div>
          <p>+00 000 0000000</p>
          <p>+00 000 0000000</p>
        </Col>
        <Col lg={4} md={4} sm={6}></Col>
        <Col lg={4} md={4} sm={6}>
          <h4 style={{ padding: 0, margin: 0, color: "white" }}>Newsletter</h4>
          <p style={{ fontSize: "12px", lineHeight: ".8rem" }}>
            Please send me the email for the latest updates
            <br />
            and announcements.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="your email address"
              className="custom-form"
            ></input>
            <button className="btn btn-subscribe">Subscribe</button>
          </div>
        </Col>
      </div>
      <div className="copyright">
        <p style={{ fontSize: "16px", textAlign: "right" }}>
          All Rights Reserved 2022-2023
        </p>
      </div>
    </div>
  )
}

export default Footer
