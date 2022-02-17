import React from "react";
import { Col } from "antd"
import { ThemeContext } from '../contexts';

const ExchangeComponent = () => {
  const themeState = React.useContext(ThemeContext.State);

  return (
    <div>
      <div>
        <h1>EXCHANGE</h1>
      </div>
    </div>
  )
}

export default ExchangeComponent
