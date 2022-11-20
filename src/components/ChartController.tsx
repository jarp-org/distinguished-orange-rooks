import LineChart from "./LineChart";
import SampleBubbles from "./BubbleChart44";
import Dropdown from "./Dropdown";
import useQueryParam from "../hooks/useQueryParams";

const ChartController = () => {
  const [option, setOption] = useQueryParam("token", "Select a token");

  return (
    <>
      <div className='mt-10'>
        {option !== "Select a token" && <LineChart tokens={[option]} />}
        {/* {option !== "Select a token" && <SampleBubbles tokens={[option]} />} */}
      </div>
      <div className='mt-10 mx-24'>
        <Dropdown
          state={option}
          setState={setOption}
          tokens={["BTCUSDT", "ETHUSDT"]}
        />
      </div>
    </>
  );
};

export default ChartController;
