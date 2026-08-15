import React from 'react'
import { i18n } from '../../../i18n'

function FutureList(props) {
    const { countFutures, futuretLoading, listFutures, handleOpenOrderModal, formatNumber, formatDateTime } = props
    
    return (
        <div className="orders-container">
            {countFutures > 0 && !futuretLoading &&
                listFutures?.map((order) => (
                    <div
                        key={order.id}
                        className="order-card"
                        onClick={() => handleOpenOrderModal(order)}
                    >
                        <div className="order-header">
                            <div className="order-pair">{order.futureCoin || "BTC/USD"}</div>
                            <div
                                className={`order-direction ${order.futuresStatus === "long" ? "buy" : "sell"}`}
                            >
                                {order.futuresStatus === "long"
                                    ? i18n('pages.futures.actions.buyUp')
                                    : i18n('pages.futures.actions.buyDown')}
                            </div>
                        </div>

                        <div className={`order-status ${order.finalized ? "closed" : "open"}`}>
                            ● {order.finalized
                                ? i18n('pages.futures.orderDetails.closed')
                                : i18n('pages.futures.orderDetails.open')}
                        </div>

                        <div className="order-details">
                            <div className="order-row">
                                <span className="order-label">
                                    {i18n('pages.futures.orderDetails.futuresAmount')}
                                </span>
                                <span className="order-value">${order.futuresAmount}</span>
                            </div>

                            <div className="order-row">
                                <span className="order-label">
                                    {i18n('pages.futures.orderDetails.openPositionPrice')}
                                </span>
                                <span className="order-value">
                                    {formatNumber(
                                        order?.openPositionPrice?.toString(),
                                        order?.openPositionPrice > 1000 ? 0 : 2
                                    )}
                                </span>
                            </div>

                            <div className="order-row">
                                <span className="order-label">
                                    {i18n('pages.futures.orderDetails.openPositionTime')}
                                </span>
                                <span className="order-value">
                                    {formatDateTime(order.openPositionTime)}
                                </span>
                            </div>

                            <div className="order-row">
                                <span className="order-label">
                                    {i18n('pages.futures.orderDetails.leverage')}
                                </span>
                                <span className="order-value">{order.leverage}x</span>
                            </div>
                        </div>
                    </div>
                ))}

            {listFutures.length === 0 && !futuretLoading && (
                <div className="no-orders">
                    <i className="fas fa-file-invoice" />
                    <div>{i18n('pages.futures.list.noOrders')}</div>
                </div>
            )}

            <style>{` 
                .order-status {
                    font-size: 12px;
                    margin-bottom: 12px;
                }
                
                .order-status.open {
                    color: #00C076;
                }
                
                .order-status.closed {
                    color: #777;
                }
            `}</style>
        </div>
    )
}

export default FutureList
