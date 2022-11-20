import { createContext, FC, useState, ReactNode, useMemo } from "react";
import useExchange from "../hooks/useExchange";
import useQueryParam from "../hooks/useQueryParams";
import Dropdown from "./Dropdown";

interface TokenContext {
  tokens: string[];
  subscription: tokenSubscription;
  maxFeedSize: number;
}

export let tokenContext = createContext<TokenContext>({
  tokens: [],
  subscription: {},
  maxFeedSize: 35,
});

interface props {
  children: ReactNode[] | ReactNode;
}
let Controller: FC<props> = ({ children }) => {
  const [sliderVal, setSliderVal] = useState(35);

  let [token, setToken] = useQueryParam("token", "BTCUSDT");

  let tokens = useMemo(() => [token], [token]);

  let data = useExchange(tokens);

  return (
    <div>
      <div className="ml-24 my-6 flex flex-row gap-20 items-center">
        <Dropdown
          state={token}
          setState={setToken}
          tokens={["BTCUSDT", "ETHUSDT", "XRPUSDT"]}
        />
        {/* <Slider/> */}
        <div className="my-12 w-1/3">
          <label
            htmlFor="steps-range"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          />
          <input
            id="steps-range"
            type="range"
            min="10"
            max="60"
            step="1"
            value={sliderVal}
            onChange={(e) => setSliderVal(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>

      <tokenContext.Provider
        value={{ tokens: tokens, subscription: data, maxFeedSize: sliderVal }}
      >
        {children}
      </tokenContext.Provider>
    </div>
  );
};

export default Controller;
