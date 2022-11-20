import type { FC } from "react";
import LineChartIcon from "./icons/line-chart";
import BubblesIcon from "./icons/bubbles-icon";
import Rook from "./icons/rook-icon";

let Header: FC = () => {
  return (
    <div className='py-6 px-16 w-full flex flex-row gap-10 justify-start items-center shadow-md text-xl font-bold'>
      <div className='-mt-1'>
        <Rook />
      </div>
      <a href='/' className='-ml-3 hover:underline'>
        <div>Home</div>
      </a>
      <a
        href='/line'
        className='hover:underline flex flex-row gap-2 items-center'
      >
        <div className='w-6 h-6'>
          <LineChartIcon />
        </div>
        <div>Lines</div>
      </a>
      <a
        href='/bubble'
        className='hover:underline  flex flex-row gap-2 items-centers'
      >
        <div className='w-6 h-6 -rotate-45'>
          <BubblesIcon />
        </div>
        <div>Bubbles</div>
      </a>
    </div>
  );
};

export default Header;
