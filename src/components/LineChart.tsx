import { FC, useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Year", "Sales"],
  [1, 1000],
  [2, 1170],
  [3, 660],
  [4, 1030],
];

const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const getRandom = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const LineChart: FC = () => {
  const [liveData, setLiveData] = useState(data);

  useEffect(() => {
    let i = 5;
    setInterval(() => {
      setLiveData((prev) => [...prev, [i, getRandom(250, 1500)]]);
      i++;
      if (i == 50) {
        clearInterval(i);
      }
    }, 1000);
  }, []);

  return (
    <div>
      <Chart
        chartType='LineChart'
        width='100%'
        height='400px'
        data={liveData}
        options={options}
      />
    </div>
  );
};

export default LineChart;
