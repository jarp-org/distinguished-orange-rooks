import { useEffect, useState } from "react";

function useExchange(tokens: string[]): tokenSubscription {
  //create state

  let initData: tokenSubscription = {};
  tokens.map((token) => {
    initData[token.toUpperCase()] = {
      symbol: token.toUpperCase(),
      direction: "",
      quantity: NaN,
      price: NaN,
      time: 0,
    };
  });

  let [data, setData] = useState<tokenSubscription>(initData);

  // initialise websocket
  useEffect(() => {
    console.log("setting up websocket");
    const ws = new WebSocket("wss://stream.bybit.com/contract/usdt/public/v3");

    // connect to websocket and subscribe to tokens
    ws.onopen = () => {
      console.log("socket opened");

      tokens.map((token) => {
        ws.send(
          `{"op": "subscribe", "args": ["publicTrade.${token.toUpperCase()}"]}`
        );
      });
    };

    ws.onmessage = (event) => {
      //extract trade data
      let eventData = JSON.parse(event.data);
      console.log(eventData);

      let parsedTrade = eventData.data[0];

      //extract symbol and build new trade object
      let symbol = parsedTrade.s;
      let newTrade: trade = {
        symbol: parsedTrade.s,
        direction: parsedTrade.L,
        quantity: parseFloat(parsedTrade.v),
        price: parseFloat(parsedTrade.p),
        time: parseInt(parsedTrade.T),
      };

      setData((prev) => {
        let newData = { ...prev };
        newData[symbol] = newTrade;
        return newData;
      });
    };
  }, []);

  return data;
}

export default useExchange;
