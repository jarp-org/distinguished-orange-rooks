import { FC, useState, useEffect, useContext } from "react";
import { Chart } from "react-google-charts";
import { tokenContext } from "../Controller";
import Loading from "../Loading";

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
};

const LineChart: FC = () => {
  let { subscription: currData, tokens } = useContext(tokenContext);

  let [liveData, setLiveData] = useState<(string | number)[][]>([]);

  let [loading, setLoading] = useState(true);

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
      if (prev.length >= 50) {
        prev.splice(0, 1);
      }
      return [...prev, temp];
    });
  }, [currData]);

  return loading ? (
    <Loading />
  ) : (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={[["time", ...tokens], ...liveData]}
      options={options}
    />
  );
};

export default LineChart;
