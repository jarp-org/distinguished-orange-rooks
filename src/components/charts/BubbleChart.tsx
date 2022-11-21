import { FC, useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useLiveFeed from "../../hooks/useLiveFeed";
import { tokenContext } from "../Controller";
import Loading from "../Loading";

const buildRow = (newData: trade): (string | number)[] => {
  const newRow: (string | number)[] = ["", 0, 0, "", 0];
  newRow[1] = newData.time;
  newRow[2] = newData.price;
  newRow[3] = newData.symbol;
  newRow[4] = newData.quantity;
  return newRow;
};

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
  },
  colors: ["#ff6600"],
  title: "Trade Volume",
  legend: { position: "none" },
  height: 400,
};

const BubbleChart: FC = () => {
  let {
    subscription: currData,
    tokens,
    maxFeedSize,
  } = useContext(tokenContext);
  const [liveData, setLiveData] = useLiveFeed([], maxFeedSize, tokens);

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
    </>
  );
};

export default BubbleChart;
