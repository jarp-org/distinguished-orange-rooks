import { FC, useEffect, useState } from "react";

function computeCandle(arg1: any[]) {}

let Candlestick: FC = () => {
  let [curList, setCurList] = useState([]);
  let [liveData, setLiveData] = useState([]);
  useEffect(() => {
    let i = setInterval(() => {
      let new_candle = computeCandle(curList);
      setCurList([]);
      setLiveData([...liveData, new_candle]);
    }, 1000);
    return () => {
      clearInterval();
    };
  }, []);

  return <></>;
};

export default Candlestick;
