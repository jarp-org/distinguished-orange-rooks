import { FC, useEffect, useState, useContext, useRef } from "react";
import { Chart } from "react-google-charts";
import { tokenContext } from "../Controller";
import Loading from "../Loading";
import useLiveFeed from "../../hooks/useLiveFeed";

const options = {
  legend: "none",
};

// trades = [{name : BTC, price:40} ,  {name: ETH, price:10}]

const computeCandle = (newTrades: trade[]): (string | number)[] => {
  let temp = newTrades.map((trade) => trade.price);

  return [
    new Date(newTrades[0].time).toLocaleTimeString(),
    Math.min(...temp),
    temp[0],
    temp[temp.length - 1],
    Math.max(...temp),
  ];
};

let Candlestick: FC = () => {
  let { subscription: currData, tokens } = useContext(tokenContext);
  let started = useRef(0);
  const [sliderVal, setSliderVal] = useState(35);
  const [currList, setCurrList] = useState<trade[]>([]);
  const [liveData, setLiveData] = useLiveFeed([], sliderVal, tokens);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      console.log("interval");
      let newCandle = computeCandle(currList);
      setCurrList([]);
      if (loading) setLoading(tokens.some((t) => currData[t].time === 0));

      setLiveData((prev) => {
        return [...prev, newCandle];
      });
    }, 10000);
  }, [liveData]);

  useEffect(() => {
    if (!currData[tokens[0]]?.time) return; //escape for corrupt data
    setCurrList((prev) => [...prev, currData[tokens[0]]]);
  }, [currData]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Chart
            chartType='CandlestickChart'
            width='100%'
            height='400px'
            data={[["Time", "min", "open", "close", "max"], ...liveData]}
            options={options}
          />
        </>
      )}
      <div className='mt-10 text-center font-medium text-gray-800'>
        Please note: The candlestick requires some time to gather enough data
        (each candle represents 10s worth of trading, as the volume is quite
        low.).
      </div>
    </>
  );
};

export default Candlestick;
