
import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'
import method from 'src/modules/depositMethod/list/depositMethodListActions'
import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';

import { useDispatch, useSelector } from "react-redux";
function DepositPage() {
    const dispatch = useDispatch();
    const listMethod = useSelector(selectors.selectRows);
    const loading = useSelector(selectors.selectLoading);


    const offsiteExchanges = [
        { name: 'Gemini', icon: 'fas fa-gem', src: './images/market/gemini.jpg' },
        { name: 'Coinbase', icon: 'fas fa-coins', src: './images/market/coinbase.jpg' },
        { name: 'Kraken', icon: 'fas fa-anchor', src: './images/market/kraken.jpg' },
        { name: 'Shakepay', icon: 'fas fa-handshake', src: './images/market/shakepay.jpg' }
    ]


    useEffect(() => {
        dispatch(method.doFetch());
    }, [dispatch]);
    return (
        <div className="deposit-container">
            {/* Header Section - Matching HelpCenter */}
            <div className="header">
                <div className="nav-bar">
                    <Link to="/profile" className="back-arrow">
                        <i className="fas fa-arrow-left" />
                    </Link>
                    <div className="page-title">Deposit</div>
                    <Link className="header-icon" to="/history" style={{ color: 'white' }}>
                        <i className="fas fa-receipt" />
                    </Link>
                </div>
            </div>

            {/* Content Card - Matching HelpCenter */}
            <div className="content-card">
                <div className="deposit-content">
                    {/* Deposit Section - defaults to USDT */}
                    <div className="deposit-section">
                        <div className="section-title">Select the currency you want to deposit</div>
                        <Link to="/deposit/wallet/USDT" className="deposit-item">
                            <div className="deposit-item-icon">
                                <img
                                    src="https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/USDT.png"
                                    alt="USDT"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const img = e.currentTarget;
                                        img.onerror = null;
                                        img.style.display = 'none';
                                        if (img.parentElement) img.parentElement.innerHTML = 'USDT';
                                    }}
                                />
                            </div>
                            <div className="deposit-item-info">
                                <div className="deposit-item-name">USDT <span className="default-badge">Default</span></div>
                                <div className="deposit-item-sub">Tether USD</div>
                            </div>
                            <i className="fas fa-chevron-right offsite-arrow" />
                        </Link>
                    </div>

                    {/* OTC Section */}
                    <div className="otc-section">
                        <div className="section-title">Over-the-counter trading line</div>
                        <Link to="/online-service" className="otc-item">
                            <div className="otc-icon">
                                <i className="fas fa-headset" />
                            </div>
                            <div className="otc-name">Online Customer Support</div>
                            <i className="fas fa-chevron-right offsite-arrow" />
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }

                body {
                    background-color: #f5f7fa;
                    color: #333;
                    line-height: 1.6;
                    overflow-x: hidden;
                }

                .deposit-container {
                    max-width: 400px;
                    margin: 0 auto;
                    position: relative;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                }

                /* Header Section - Matching HelpCenter */
                .header {
                    min-height: 60px;
                    position: relative;
                    padding: 15px 20px;
                }

                .nav-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .back-arrow {
                    color: white;
                    font-size: 20px;
                    font-weight: 300;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }

                .back-arrow:hover {
                    opacity: 0.8;
                }

                .page-title {
                    color: white;
                    font-size: 17px;
                    font-weight: 600;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                /* Content Card - Matching HelpCenter */
                .content-card {
                    background: white;
                    border-radius: 40px 40px 0 0;
                    padding: 20px;
                    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
                    min-height: calc(100vh - 60px);
                }

                .deposit-content {
                    width: 100%;
                }

                .section-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #222;
                    margin-bottom: 20px;
                    line-height: 1.4;
                }

                /* Deposit Section */
                .deposit-section {
                    margin-bottom: 24px;
                }

                .deposit-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                    border: 1px solid transparent;
                }

                .deposit-item:hover {
                    background: #eef5ff;
                    transform: translateX(4px);
                    border-color: #106cf5;
                }

                .deposit-item-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-right: 16px;
                    flex-shrink: 0;
                    font-weight: 700;
                    font-size: 11px;
                    color: #106cf5;
                }

                .deposit-item-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .deposit-item-info {
                    flex: 1;
                }

                .deposit-item-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: #222;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .default-badge {
                    font-size: 10px;
                    font-weight: 600;
                    color: #106cf5;
                    background: #e8f4ff;
                    border: 1px solid #b6d9ff;
                    padding: 2px 8px;
                    border-radius: 20px;
                }

                .deposit-item-sub {
                    font-size: 12px;
                    color: #888;
                    margin-top: 2px;
                }

                /* Cryptocurrency Grid */
                .crypto-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 30px;
                }

                .crypto-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 16px 8px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    text-decoration: none;
                    color: inherit;
                }

                .crypto-item:hover {
                    background: #eef5ff;
                    transform: translateY(-2px);
                    border-color: #106cf5;
                    box-shadow: 0 4px 12px rgba(16, 108, 245, 0.15);
                }

                .crypto-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 8px;
                    overflow: hidden;
                }

                .crypto-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .crypto-icon:empty::after {
                    content: attr(data-symbol);
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .crypto-name {
                    font-size: 12px;
                    font-weight: 500;
                    color: #333;
                    text-align: center;
                }

                /* Offsite Links Section */
                .offsite-section {
                    margin-bottom: 30px;
                }

                .offsite-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .offsite-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .offsite-item:hover {
                    background: #eef5ff;
                    transform: translateX(4px);
                }

                .offsite-icon {
                    width: 21px;
                    height: 21px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 13px;
                    margin-right: 16px;
                }

                .offsite-name {
                    flex: 1;
                    font-size: 15px;
                    font-weight: 500;
                    color: #222;
                }

                .offsite-arrow {
                    color: #999;
                    font-size: 14px;
                }

                /* OTC Section */
                .otc-section {
                    margin-bottom: 20px;
                }

                .otc-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                }

                .otc-item:hover {
                    background: #eef5ff;
                    transform: translateX(4px);
                }

                .otc-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 16px;
                    margin-right: 16px;
                }

                .otc-name {
                    flex: 1;
                    font-size: 13px;
                    color: #222;
                }

                /* Responsive adjustments */
                @media (max-width: 380px) {
                    .deposit-container {
                        padding: 0;
                    }

                    .header {
                        padding: 16px;
                        min-height: 50px;
                    }

                    .content-card {
                        padding: 16px;
                        border-radius: 30px 30px 0 0;
                    }

                    .section-title {
                        font-size: 15px;
                        margin-bottom: 16px;
                    }

                    .crypto-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }

                    .crypto-item {
                        padding: 14px 6px;
                    }

                    .crypto-icon {
                        width: 40px;
                        height: 40px;
                        font-size: 13px;
                    }

                    .crypto-name {
                        font-size: 11px;
                    }

                    .offsite-item, .otc-item {
                        padding: 14px;
                    }

                    .offsite-icon, .otc-icon {
                        width: 36px;
                        height: 36px;
                        font-size: 15px;
                        margin-right: 14px;
                    }

                    .offsite-name, .otc-name {
                        font-size: 14px;
                    }
                }

                @media (min-width: 768px) {
                    .content-card {
                        border-radius: 30px 30px 0 0;
                    }

                    .deposit-content {
                        max-width: 600px;
                        margin: 0 auto;
                    }

                    .crypto-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 16px;
                    }
                }
            `}</style>
        </div>
    )
}

export default DepositPage
