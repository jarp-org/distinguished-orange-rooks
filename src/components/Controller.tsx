import { createContext, FC, ReactNode, useMemo } from "react";
import useExchange from "../hooks/useExchange";
import useQueryParam from "../hooks/useQueryParams";
import Dropdown from "./Dropdown";

interface TokenContext {
  tokens: string[];
  subscription: tokenSubscription;
}

export let tokenContext = createContext<TokenContext>({
  tokens: [],
  subscription: {},
});

interface props {
  children: ReactNode[] | ReactNode;
}
let Controller: FC<props> = ({ children }) => {
  let [token, setToken] = useQueryParam("token", "BTCUSDT");

  let tokens = useMemo(() => [token], [token]);

  let data = useExchange(tokens);

  return (
    <h3>
      <div className="mx-24 my-6">
        <Dropdown
          state={token}
          setState={setToken}
          tokens={["BTCUSDT", "ETHUSDT", "XRPUSDT"]}
        />
      </div>

      <tokenContext.Provider value={{ tokens: tokens, subscription: data }}>
        {children}
      </tokenContext.Provider>
    </h3>
  );
};

export default Controller;
