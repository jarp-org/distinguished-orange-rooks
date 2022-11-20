import { FC, useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useLiveFeed from "../../hooks/useLiveFeed";
import { tokenContext } from "../Controller";
import Loading from "../Loading";

const options = {
  colorAxis: { legend: { position: "none" } },
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
    viewWindowMode: "pretty",
    viewWindow: { min: 16500, max: 16800 },
  },
  colors: ["#ff6600"],
  legend: { position: "none" },
  height: 400,
};

const buildRow = (newData: trade): (string | number)[] => {
  const newRow: (string | number)[] = ["", 0, 0, "", 0];
  newRow[1] = newData.time;
  newRow[2] = newData.price;
  newRow[3] = newData.symbol;
  newRow[4] = newData.quantity;
  return newRow;
};

const BubbleChart: FC = () => {
  let { subscription: currData, tokens } = useContext(tokenContext);
  const [sliderVal, setSliderVal] = useState(35);
  const [liveData, setLiveData] = useLiveFeed([], sliderVal);
  const [minVal, setMinVal] = useState();
  const [maxVal, setMaxVal] = useState();

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [tokens]);

  useEffect(() => {
    if (!currData[tokens[0]]?.time) return; //escape for corrupt data

    let temp: (string | number)[][] = [];

    tokens.forEach((token) => {
      temp.push(buildRow(currData[token]));
    });

    if (loading) setLoading(tokens.some((t) => currData[t].time === 0));

    setLiveData((prev) => {
      return [...prev, ...temp];
    });

    console.log(liveData);
  }, [currData]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Chart
        chartType="BubbleChart"
        width="100%"
        height="400px"
        data={[["ID", "Time", "Price", "Token", "Quantity"], ...liveData]}
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

export default BubbleChart;
