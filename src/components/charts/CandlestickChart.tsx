import { FC, useEffect, useState, useContext, useRef } from "react";
import { Chart } from "react-google-charts";
import { tokenContext } from "../Controller";
import Loading from "../Loading";
import useLiveFeed from "../../hooks/useLiveFeed";

// note: a logical next step would be to keep the graph valid even if candleSize were to change (i.e. via a slider)
// that should not be too complicated, but im not doing it

const options = {
  legend: "none",
};

const computeCandle = (newTrades: trade[], t: number): (string | number)[] => {
  let temp = newTrades.map((trade) => trade.price);

  return [
    new Date(t).toLocaleTimeString(),
    Math.min(...temp),
    temp[0],
    temp[temp.length - 1],
    Math.max(...temp),
  ];
};

interface props {
  candleSize: number; //time interval each candle represents in ms
}

let Candlestick: FC<props> = ({ candleSize }) => {
  let {
    subscription: currData,
    tokens,
    maxFeedSize,
  } = useContext(tokenContext);
  let [time, setTime] = useState<number>(-1);
  const [currList, setCurrList] = useState<trade[]>([]);
  const [liveData, setLiveData] = useLiveFeed([], maxFeedSize, tokens);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currData[tokens[0]]?.time) return; //escape for corrupt data
    if (time == -1) {
      setTime(currData[tokens[0]].time);
      return;
    }

    setCurrList((prev) => [...prev, currData[tokens[0]]]);

    // if we have enough data to make a given interval
    if (currData[tokens[0]].time - time > candleSize) {
      if (loading) setLoading(tokens.some((t) => currData[t].time === 0));
      let newCandle = computeCandle(currList, time);
      setCurrList([]);
      setLiveData((prev) => {
        return [...prev, newCandle];
      });
      setTime(currData[tokens[0]].time);
    }
  }, [currData]);

  return (
    <>
      {loading ? (
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
        </>
      )}
      <div className="my-10 text-center font-medium text-gray-800">
        Please note: The candlestick requires some time to gather enough data
        (each candle represents 10s worth of trading, as the volume is quite
        low.).
      </div>
    </>
  );
};

export default Candlestick;
