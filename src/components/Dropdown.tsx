import { FC, useState } from "react";
import Down from "./icons/chevron-down";
import Up from "./icons/chevron-up";

interface props {
  tokens: string[];
  state: string;
  setState: (newValue: string) => void;
}

const Dropdown: FC<props> = ({ tokens, state, setState }) => {
  const [expanded, setExpanded] = useState(false);

  const handleOption = (option: string) => {
    setState(option);
    setExpanded(false);
  };

  return (
    <div className="grid gap-2 relative">
      {/* position: absolute;
    transform: translate(0,80px);
    z-index: 100; */}
      <div
        className={`p-6 w-80 h-max flex justify-between 
        rounded-lg bg-slate-800 hover:bg-slate-600 cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <p className="text-white font-medium">{state}</p>
        {expanded ? <Up /> : <Down />}
      </div>
      {expanded && (
        <div className="p-2 w-80 grid grid-cols-1 rounded-lg bg-slate-700 absolute translate-y-[80px] z-10">
          {tokens.map((token) => (
            <div
              key={token}
              className="p-4 rounded-lg hover:bg-gray-200/60 text-white hover:text-black hover:font-semibold cursor-pointer"
              onClick={() => {
                handleOption(token);
              }}
            >
              {token}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
