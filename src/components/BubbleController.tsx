import type { FC } from "react";
import toBubble from "../hooks/toBubble";
import useExchange from "../hooks/useExchange";
import BubbleChart from "./charts/PBCFun";

let controller: FC = () => {
  let rawData: tokenSubscription = useExchange(["ETHUSDT", "ETCUSDT"]);

  let data: bubbleData[] = toBubble(rawData);
  let min = data
    .map((each) => each.size)
    .reduce((acc, cur) => (cur < acc ? cur : acc));
  let max = data
    .map((each) => each.size)
    .reduce((acc, cur) => (cur > acc ? cur : acc));

  const selectedKeyHandler = (key: string) => {};

  return data ? (
    <BubbleChart
      bubblesData={data}
      width={800}
      height={600}
      textFillColor="drakgrey"
      backgroundColor="white"
      minValue={min}
      maxValue={max}
      selectedCircle={selectedKeyHandler}
    />
  ) : (
    <p>no data</p>
  );
};

export default controller;
