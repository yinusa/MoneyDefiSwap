import React from "react";
import { Content } from "antd/lib/layout/layout";
import './exchange.css'
import { ThemeContext } from '../../contexts';

const Exchange = () => {
    const themeState = React.useContext(ThemeContext.State);

    return (
        <div>
            Exchange
        </div>
    )
}

export default Exchange;