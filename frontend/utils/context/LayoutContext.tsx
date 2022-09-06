import { createContext, useContext, useState } from "react";
import useStateWithStorage from "../hooks/useStateWithStorage";

export enum LayoutType {
  GRID = "grid",
  LIST = "list",
}

interface LayoutContextInterface {
  layoutType: LayoutType;
  setGridLayout: () => void;
  setListLayout: () => void;
}

const LayoutContext = createContext<LayoutContextInterface>({
  layoutType: LayoutType.GRID,
  setGridLayout: () => {},
  setListLayout: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export const LayoutContextProvider = ({ children }: ProviderProps) => {
  const [layout, setLayout] = useStateWithStorage<LayoutType>("layouttype");
  const setGridLayout = () => {
    setLayout(LayoutType.GRID);
  };
  const setListLayout = () => {
    setLayout(LayoutType.LIST);
  };
  return (
    <LayoutContext.Provider
      value={{ layoutType: layout, setGridLayout, setListLayout }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
const useLayoutContext = () => {
  return useContext(LayoutContext);
};
export default useLayoutContext;
