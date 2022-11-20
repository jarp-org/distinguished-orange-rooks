import BubbleChart from "../charts/BubbleChart";
import LineChart from "../charts/LineChart";
import Controller from "../Controller";

const MasterController = () => {
  return (
    <div className="w-screen justify-center flex">
      <Controller>
        <div className="w-screen my-10 mx-10 flex gap-100 justify-around">
          <LineChart />

          <BubbleChart />
        </div>
      </Controller>
    </div>
  );
};

export default MasterController;
