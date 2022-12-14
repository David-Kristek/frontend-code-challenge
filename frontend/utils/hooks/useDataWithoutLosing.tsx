import { useEffect, useRef, useState } from "react";

const useDataWithoutLosing = <T extends unknown>(data: T, previousData: T) => {
  const [definedData, setdefinedData] = useState(data);
  const [firstLoading, setFirstLoading] = useState(false);
  useEffect(() => {
    if (!data && previousData) {
      setdefinedData(previousData);
    }
    if (data) {
      setdefinedData(data);
    }
    if (previousData || data) {
      setFirstLoading(false);
      return;
    }
    setFirstLoading(true);
  }, [data, previousData]);

  return { definedData, firstLoading };
};

export default useDataWithoutLosing;
