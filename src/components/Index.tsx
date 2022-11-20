import type { FC } from "react";
import BarChart from "./charts/BarChart";
import MasterController from "./controllers/MasterController";

let Index: FC = () => {
  return (
    <>
      <div className="p-100 w-screen">
        <MasterController />
      </div>
      <div className="flex justify-center">
        <BarChart tokens={["BTCUSDT", "ETHUSDT"]} />
      </div>
    </>
  );
};

export default Index;
