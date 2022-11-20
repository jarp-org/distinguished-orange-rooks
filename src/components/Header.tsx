import type { FC } from "react";
import Rook from "./icons/rook-icon";

let Header: FC = () => {
  return (
    <div className="py-6 px-16 w-full flex flex-row gap-6 justify-start items-center shadow-md text-xl font-bold">
      <div className="-mt-1">
        <Rook />
      </div>
      <a href="/" className="hover:underline">
        <div>Home</div>
      </a>
      <a href="/line" className="hover:underline">
        <div>Lines</div>
      </a>
      <a href="/bubble" className="hover:underline">
        <div>Bubbles</div>
      </a>
    </div>
  );
};

export default Header;
