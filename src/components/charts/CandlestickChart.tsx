import { FC, useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { tokenContext } from "../Controller";
import Loading from "../Loading";
import useLiveFeed from "../../hooks/useLiveFeed";

const data = [
  ["Time", "min", "open", "close", "max"],
  ["Mon", 20, 28, 38, 45],
  ["Tue", 31, 38, 55, 66],
  ["Wed", 50, 55, 77, 80],
  ["Thu", 50, 77, 66, 77],
  ["Fri", 15, 66, 22, 68],
];

const options = {
  legend: "none",
};

// trades = [{name : BTC, price:40} ,  {name: ETH, price:10}]

const computeCandle = (newTrades: trade[]): (string | number)[] => {
  let temp: number[] = [];
  newTrades.forEach((trade) => {
    temp.push(trade.price);
  });

  return [Math.min(...temp), temp[0], temp[temp.length - 1], Math.max(...temp)];
};

let Candlestick: FC = () => {
  let { subscription: currData, tokens } = useContext(tokenContext);
  const [sliderVal, setSliderVal] = useState(35);
  const [currList, setCurrList] = useState([]);
  const [liveData, setLiveData] = useLiveFeed([], sliderVal);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let i = setInterval(() => {
      let newCandle = computeCandle(currList);
      setCurrList([]);
      if (loading) setLoading(tokens.some((t) => currData[t].time === 0));

      setLiveData((prev) => {
        return [...prev, newCandle];
      });
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, [currData]);

  return loading ? (
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
      <div className='mx-40 w-1/2'>
        <label
          htmlFor='steps-range'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        />
        <input
          id='steps-range'
          type='range'
          min='10'
          max='60'
          step='1'
          value={sliderVal}
          onChange={(e) => setSliderVal(parseInt(e.target.value))}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
      </div>
    </>
  );
};

export default Candlestick;
