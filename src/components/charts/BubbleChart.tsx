import { FC, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useExchange from "../../hooks/useExchange";
import Loading from "../Loading";

const options = {
  title: "Another Chart",
  colorAxis: { legend: { position: "none" } },
  hAxis: { title: "Time" },
  vAxis: { title: "Price" },
};

interface props {
  tokens: string[];
}

const buildRow = (newData: trade): (string | number)[] => {
  const newRow: (string | number)[] = ["", 0, 0, "", 0];
  newRow[1] = newData.time;
  newRow[2] = newData.price;
  newRow[3] = newData.symbol;
  newRow[4] = newData.quantity;
  return newRow;
};

const BubbleChart: FC<props> = ({ tokens }) => {
  const currData = useExchange(tokens);
  const [liveData, setLiveData] = useState<(string | number)[][]>([]);

  let loading = tokens.some((t) => currData[t].time === 0);

  useEffect(() => {
    if (loading) return;
    let temp: (string | number)[][] = [];

    tokens.forEach((token) => {
      temp.push(buildRow(currData[token]));
    });

    setLiveData((prev) => {
      return [...prev, ...temp];
    });

    console.log(liveData);
  }, [currData]);

  return loading ? (
    <Loading />
  ) : (
    <Chart
      chartType="BubbleChart"
      width="100%"
      height="400px"
      data={[["ID", "Time", "Price", "Token", "Quantity"], ...liveData]}
      options={options}
    />
  );
};

export default BubbleChart;
