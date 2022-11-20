const Slider = (
  state: number,
  setState: React.Dispatch<React.SetStateAction<number>>
) => {
  return (
    <div className='w-1/2'>
      <label
        htmlFor='steps-range'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      />
      <input
        id='steps-range'
        type='range'
        min='10'
        max='60'
        step='1'
        value={state}
        onChange={(e) => setState(parseInt(e.target.value))}
        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
      />
    </div>
  );
};

export default Slider;
