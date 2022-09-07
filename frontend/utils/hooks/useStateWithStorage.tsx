import React, { useDebugValue, useEffect, useRef, useState } from "react";

const useStateWithStorage = <S extends unknown>(
  key: string,
  initialState?: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState as S);
  useDebugValue(state);
  const firstRender = useRef(true); 
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item && item !== "undefined" && firstRender.current) {
      setState(parse(item));
      firstRender.current = false; 
      console.log("setting as", item);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export default useStateWithStorage;
