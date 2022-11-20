import { useEffect, useState } from "react";

type feedState = [
  (string | number)[][],
  React.Dispatch<React.SetStateAction<(string | number)[][]>>
];

const useLiveFeed = (
  initial: (string | number)[][],
  maxViewSize: number
): feedState => {
  //create state
  const [liveData, setLiveData] = useState<(string | number)[][]>(initial);

  useEffect(() => {
    if (liveData.length > maxViewSize) {
      setLiveData((prev) => {
        prev.splice(0, liveData.length - maxViewSize);
        return prev;
      });
    }
  }, [maxViewSize]);

  return [liveData, setLiveData];
};

export default useLiveFeed;
