import { FC, useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import useExchange from "../../hooks/useExchange";

const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

interface props {
  tokens: string[];
}

const argMax = (obj: tokenSubscription) => {
  Object.values(obj).reduce((a, r) => (a.time > r.time ? a : r));
};

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
      return [...prev, temp];
    });
  }, [currData]);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={[["time", ...tokens], ...liveData]}
          options={options}
        />
      )}
    </div>
  );
};

export default LineChart;
