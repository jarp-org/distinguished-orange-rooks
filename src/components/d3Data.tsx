import d3Data from "../hooks/d3Data";
import { FC, useEffect, useRef } from "react";
import useExchange from "../hooks/useExchange";
import BubbleChart from "./BarChart";

const D3Chart: FC = () => {
  let data = useExchange(["BTCUSDT"]);
  let d3edData = d3Data(data);
  //   const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  //   const width = 300;
  //   const height = 100;

  let svg = <svg></svg>;

  useEffect(() => {
    svg = BubbleChart(d3edData, {
      width: 1152,
    } as bubbleOptions);
  }, []);

  return svg;
};

export default D3Chart;
