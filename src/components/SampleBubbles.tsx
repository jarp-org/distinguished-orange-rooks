import { FC, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useExchange from "../hooks/useExchange";

const data = [
  ["ID", "Time", "Price", "Token", "Quantity"],
  ["", 80.66, 1.67, 0, 33739900],
  ["", 79.84, 1.36, 0, 81902307],
  ["", 78.6, 1.84, 0, 5523095],
  ["", 72.73, 2.78, 0, 79716203],
  ["", 80.05, 2, 0, 61801570],
  ["", 72.49, 1.7, 0, 73137148],
  ["", 68.09, 4.77, 0, 31090763],
  ["", 81.55, 2.96, 0, 7485600],
  ["", 68.6, 1.54, 0, 141850000],
  ["", 78.09, 2.05, 0, 307007000],
];

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

const SampleBubbles: FC<props> = ({ tokens }) => {
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

  return (
    <Chart
      chartType='BubbleChart'
      width='100%'
      height='400px'
      data={[["ID", "Time", "Price", "Token", "Quantity"], ...liveData]}
      options={options}
    />
  );
};

export default SampleBubbles;
