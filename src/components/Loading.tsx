import type { FC } from "react";

let Loading: FC = () => {
  return (
    <div className='flex justify-center'>
      <div className='p-6 bg-black w-max rounded-3xl'>
        <img src='/DORloading.gif' />
      </div>
    </div>
  );
};

export default Loading;
