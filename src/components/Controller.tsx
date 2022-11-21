import { createContext, FC, useState, ReactNode, useMemo } from "react";
import useExchange from "../hooks/useExchange";
import useQueryParam from "../hooks/useQueryParams";
import Dropdown from "./Dropdown";
import Slider from "./Slider";

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
        <Slider state={sliderVal} setState={setSliderVal} />
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
