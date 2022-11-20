import * as Highcharts from "highcharts";
import HC_more from "highcharts/highcharts-more";

import useExchange from "../hooks/useExchange";
import bubbleData from "../hooks/bubbleData";
import { FC, useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";

const BubbleChart: FC = () => {
  useEffect(() => {
    HC_more(Highcharts);
  }, []);
  let [options, setOptions] = useState({
    chart: {
      type: "packedbubble",
      height: "100%",
    },
    title: {
      text: "my bubble chart",
    },
    tooltip: {
      useHTML: false,
    },
    plotOptions: {
      packedbubble: {
        minSize: "30%",
        maxSize: "120%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: {},
  });

  let data = useExchange(["BTCUSDT", "ETHUSDT"]);
  let bubbles = bubbleData(data);

  useEffect(() => {
    console.log("yabadabadoo");
    setOptions({
      ...options,
      series: bubbles,
    });
  }, [data]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BubbleChart;
