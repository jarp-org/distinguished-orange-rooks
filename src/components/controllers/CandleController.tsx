import Candlestick from "../charts/CandlestickChart";
import Controller from "../Controller";

const ChartController = () => {
  return (
    <Controller>
      <Candlestick candleSize={10000} />
    </Controller>
  );
};

export default ChartController;
