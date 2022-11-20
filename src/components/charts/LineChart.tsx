import { FC, useState, useEffect, useContext } from "react";
import { Chart } from "react-google-charts";
import { tokenContext } from "../Controller";
import useLiveFeed from "../../hooks/useLiveFeed";
import Loading from "../Loading";
import Slider from "../Slider";

const options = {
  curveType: "function",
  hAxis: {
    title: "Time",
    slantedText: true,
    titleTextStyle: {
      fontSize: 16,
      bold: true,
      italic: false,
    },
  },
  vAxis: {
    title: "Price ($)",
    titleTextStyle: {
      fontSize: 16,
      bold: true,
      italic: false,
    },
  },
  chartArea: { height: 265 },
  colors: ["#ff6600"],
  legend: { position: "none" },
  title: "Price Over Time",
};

const LineChart: FC = () => {
  let { subscription: currData, tokens } = useContext(tokenContext);

  let [loading, setLoading] = useState(true);
  const [sliderVal, setSliderVal] = useState(35);
  const [liveData, setLiveData] = useLiveFeed([], sliderVal, tokens);

  useEffect(() => {
    setLoading(true);
  }, [tokens]);

  useEffect(() => {
    if (!currData[tokens[0]]?.time) return; //escape for corrupt data

    let d = new Date(currData[tokens[0]].time);
    const temp = [d.toLocaleTimeString(), ...tokens.map(() => 0)];

    tokens.forEach((token) => {
      temp[tokens.indexOf(token) + 1] = currData[token].price;
    });

    if (loading) setLoading(tokens.some((t) => currData[t].time === 0));

    setLiveData((prev) => {
      if (prev.length >= 60) {
        prev.splice(0, 1);
      }
      return [...prev, temp];
    });
  }, [currData]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={[["time", ...tokens], ...liveData]}
        options={options}
      />
      <div className="w-1/2">
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

export default LineChart;
