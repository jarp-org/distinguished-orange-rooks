import type { FC } from "react";

let Header: FC = () => {
  return (
    <div className="flex flex-row w-full justify-between p-4 shadow-md mb-4 text-xl font-bold">
      <a href="/" className="">
        <h1>home</h1>
      </a>
    </div>
  );
};

export default Header;
