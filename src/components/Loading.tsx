import type { FC } from "react";

let Loading: FC = () => {
  return (
    <div className='flex justify-center'>
      <img src='/DORloading.gif' />
    </div>
  );
};

export default Loading;
