import React from 'react'

import {Link } from 'react-router-dom'
import { i18n } from "../../i18n";
function Error404Page() {
  return (
  
      
      <div className="container">
  <div className="logo">
    <i className="fas fa-coins logo-icon" />
    <div className="logo-text">NUXES</div>
  </div>
  <div className="error-content">
    <div className="error-icon">
      <i className="fas fa-exclamation-triangle" />
    </div>
    <h1 className="error-title">ERROR 404</h1>
    <p className="error-message">{i18n('errors.404')}</p>

    <Link to="/" className="underline">
    <a href="#" className="home-button">
      <i className="fas fa-home" />
  {i18n('errors.backToHome')} 
    </a>
    </Link>
  </div>
  <div className="crypto-elements">
    <div className="crypto-element">
      <div className="crypto-icon">
        <i className="fab fa-bitcoin" />
      </div>
      <div className="crypto-name">Bitcoin</div>
    </div>
    <div className="crypto-element">
      <div className="crypto-icon">
        <i className="fab fa-ethereum" />
      </div>
      <div className="crypto-name">Ethereum</div>
    </div>
    <div className="crypto-element">
      <div className="crypto-icon">
        <i className="fas fa-coins" />
      </div>
      <div className="crypto-name">Altcoins</div>
    </div>
  </div>
  <div className="footer">
    <p>© 2023 NUXES. All rights reserved.</p>
  </div>
</div>

      
    
  )
}

export default Error404Page
