import { createContext, useContext, useState } from "react";
import useStateWithStorage from "../hooks/useStateWithStorage";

export enum LayoutType {
  GRID = "grid",
  LIST = "list",
}

interface GlobalContextInterface {
  layoutType: LayoutType;
  setGridLayout: () => void;
  setListLayout: () => void;
  limit: number;
  setLimit: (pr: number) => void;
}

const GlobalContext = createContext<GlobalContextInterface>({
  layoutType: LayoutType.GRID,
  setGridLayout: () => {},
  setListLayout: () => {},
  limit: 16,
  setLimit: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({ children }: ProviderProps) => {
  const [layout, setLayout] = useStateWithStorage<LayoutType>(
    "layouttype",
    LayoutType.GRID
  );
  const [limit, setLimit] = useState(16);
  const setGridLayout = () => {
    setLayout(LayoutType.GRID);
  };
  const setListLayout = () => {
    setLayout(LayoutType.LIST);
  };
  return (
    <GlobalContext.Provider
      value={{ layoutType: layout, setGridLayout, setListLayout, limit, setLimit }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export default useGlobalContext;
