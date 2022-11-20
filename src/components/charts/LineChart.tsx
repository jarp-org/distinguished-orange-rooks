import { FC, useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import useExchange from "../../hooks/useExchange";
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

interface props {
  tokens: string[];
}

const LineChart: FC<props> = ({ tokens }) => {
  const currData = useExchange(tokens);

  const [liveData, setLiveData] = useState<(string | number)[][]>([]);

  let loading = tokens.some((t) => currData[t].time === 0);

  useEffect(() => {
    let d = new Date(currData[tokens[0]].time);
    const temp = [d.toLocaleTimeString(), ...tokens.map(() => 0)];

    if (loading) {
      console.log("from effect", currData);
      return;
    }

    tokens.forEach((token) => {
      temp[tokens.indexOf(token) + 1] = currData[token].price;
    });

    console.log(liveData);

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
      chartType='LineChart'
      width='100%'
      height='400px'
      data={[["time", ...tokens], ...liveData]}
      options={options}
    />
  );
};

export default LineChart;
