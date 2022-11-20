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

const BubbleChart: FC = () => {
  let {
    subscription: currData,
    tokens,
    maxFeedSize,
  } = useContext(tokenContext);
  const [liveData, setLiveData] = useLiveFeed([], maxFeedSize, tokens);

  let usedToken = tokens[0];

  const tokenBoundaries: { [token: string]: { min: number; max: number } } = {
    BTCUSDT: { min: 16400, max: 17000 },
    ETHUSDT: { min: 900, max: 1 },
    XRPUSDT: { min: 1, max: 2 },
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
      // viewWindow: {
      //   min: tokenBoundaries[usedToken].min,
      //   max: tokenBoundaries[usedToken].max,
      // }, //todo fix this
    },
    colors: ["#ff6600"],
    title: "Trade Volume",
    legend: { position: "none" },
    height: 400,
  };

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
