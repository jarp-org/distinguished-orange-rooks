import { FC, useEffect, useState } from "react";
// import { WebSocketServer } from 'ws';

const PriceDisplay: FC = () => {
  const coin = "btcusdt";

  useEffect(() => {
    // initialise websocket
    const ws = new WebSocket("wss://stream.bybit.com/contract/usdt/public/v3");

    // connect to websocket and send request for BTC
    ws.onopen = () => {
      ws.send('{"op": "subscribe", "args": ["publicTrade.BTCUSDT"]}');
    };

    // retrieve BTC price on trade
    ws.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      setPrice(trade.data[0].p);
    };
  }, []);

  let [price, setPrice] = useState("0");
  return <div>{price}</div>;
};

export default PriceDisplay;
