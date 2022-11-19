import type { FC } from "react";
import useExchange from "../hooks/useExchange";

// import { WebSocketServer } from 'ws';

const PriceDisplay: FC = () => {
  let data = useExchange(["BTCUSDT", "ETHUSDT"]);
  return (
    <div>
      <p>BTC: {data.BTCUSDT.price}</p>
      <p>ETH: {data.ETHUSDT.price}</p>
    </div>
  );
};

export default PriceDisplay;
