import Dropdown from "./Dropdown";
import useQueryParam from "../hooks/useQueryParams";
import LineChart from "./charts/LineChart";
import { useEffect, useState } from "react";

const ChartController = () => {
  const [option, setOption] = useQueryParam("token", "BTCUSDT");

  let [graph, setGraph] = useState(<div />);

  useEffect(() => {
    setGraph(<div />);
    setTimeout(() => {
      console.log(option);
      setGraph(<LineChart tokens={[option]} />);
    }, 400);
  }, [option]);
  return (
    <>
      <div className="mt-10 mx-24">
        <Dropdown
          state={option}
          setState={setOption}
          tokens={["BTCUSDT", "ETHUSDT"]}
        />
      </div>
      <div className="mt-10">
        {/* {option !== "Select a token" && <LineChart tokens={[option]} />} */}
        {option !== "Select a token" && graph}
      </div>
    </>
  );
};

export default ChartController;
