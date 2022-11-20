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

  return loading ? (
    <Loading />
  ) : (
    <>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={[["Time", "min", "open", "close", "max"], ...liveData]}
        options={options}
      />
      <div className="mx-40 w-1/2">
        <label
          htmlFor="steps-range"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        />
        <input
          id="steps-range"
          type="range"
          min="10"
          max="60"
          step="1"
          value={sliderVal}
          onChange={(e) => setSliderVal(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </>
  );
};

export default Candlestick;
