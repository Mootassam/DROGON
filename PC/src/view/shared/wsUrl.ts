/**
 * Returns the WebSocket URL for the TradingView data feed.
 *
 * In development  → ws://localhost:PORT/ws/socket.io/websocket
 *                   Vite proxies this to wss://widgetdata.tradingview.com
 *
 * In production   → ws://VPS_IP:PORT/ws/socket.io/websocket
 *                   Nginx proxies this to wss://widgetdata.tradingview.com
 *                   with Origin: https://www.tradingview.com  (required by TV)
 *
 * Never connect directly to widgetdata.tradingview.com from the browser —
 * TradingView rejects unknown Origin headers.
 */
export function getTvWsUrl(): string {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.host}/ws/socket.io/websocket`;
}
