import Dropdown from "./Dropdown";
import useQueryParam from "../hooks/useQueryParams";
import LineChart from "./charts/LineChart";

const ChartController = () => {
  const [option, setOption] = useQueryParam("token", "Select a token");

  return (
    <>
      <div className='mt-10 mx-24'>
        <Dropdown
          state={option}
          setState={setOption}
          tokens={["BTCUSDT", "ETHUSDT", "XRPUSDT"]}
        />
      </div>
      <div className='mt-10'>
        {/* {option !== "Select a token" && <LineChart tokens={[option]} />} */}
        {option !== "Select a token" && <LineChart tokens={[option]} />}
      </div>
    </>
  );
};

export default ChartController;
