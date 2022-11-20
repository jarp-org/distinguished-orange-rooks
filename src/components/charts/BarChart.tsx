import { FC, useState, useEffect } from "react";
import useExchange from "../../hooks/useExchange";
import Loading from "../Loading";
import { Chart } from "react-google-charts";

export const headers = [
  "Crypto",
  "Price",
  { role: "style" },
  {
    sourceColumn: 0,
    role: "annotation",
    type: "string",
    calc: "stringify",
  },
];

export const options = {
  title: "Will ETH pass BTC?",
  width: 1200,
  height: 500,
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

interface props {
  tokens: string[];
}

const BarChart: FC<props> = ({ tokens }) => {
  const currData = useExchange(tokens);

  let loading = tokens.some((t) => currData[t].time === 0);

  const [liveData, setLiveData] = useState<(string | number | null)[][]>([]);

  useEffect(() => {
    let colors = ["red", "blue"];
    let temp: (string | number | null)[][] = [];
    Object.values(currData).map((element) => {
      let color = colors[tokens.indexOf(element.symbol)];
      temp.push([element.symbol, element.price, color, null]);
    });
    setLiveData(temp);
    console.log(temp);
  }, [currData]);

  useEffect(() => {}, [currData]);

  return loading ? (
    <Loading />
  ) : (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={[headers, ...liveData]}
      options={options}
      className="flex justify-center"
    />
  );
};

export default BarChart;
