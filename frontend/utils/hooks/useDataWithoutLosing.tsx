import { useEffect, useRef, useState } from "react";

const useDataWithoutLosing = <T extends unknown>(data: T, previousData: T) => {
  const [definedData, setdefinedData] = useState(data);

  useEffect(() => {
    if (!data && previousData) {
      setdefinedData(previousData);
    }
    if (data) {
      setdefinedData(data);
    }
  }, [data]);

  return definedData;
};

export default useDataWithoutLosing;
