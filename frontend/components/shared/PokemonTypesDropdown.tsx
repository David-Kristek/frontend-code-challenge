import {
  Dropdown,
  DropdownSkeleton,
  OnChangeData,
} from "carbon-components-react";
import React from "react";
import { useGetPokemonTypesQuery } from "../../utils/graphql/generated/schema";
import styles from "./Shared.module.scss";

interface PokemonTypesDropdownProps {
  setSelected: (type: string) => void;
  selected: string;
}

const PokemonTypesDropdown: React.FC<PokemonTypesDropdownProps> = ({
  setSelected,
  selected,
}) => {
  const { data: pokemonTypes, loading } = useGetPokemonTypesQuery();
  if (loading) return <DropdownSkeleton className={styles.gridItem} />;
  if (!pokemonTypes?.pokemonTypes) return null;
  const onDropdownChange = (item: OnChangeData<string>) => {
    setSelected(item.selectedItem === "All" ? "" : item.selectedItem ?? "");
  };

  return (
    <Dropdown
      id="dropdown-1"
      items={["All", ...pokemonTypes?.pokemonTypes]}
      label="Type"
      className={styles.gridItem}
      onChange={onDropdownChange}
    />
  );
};

export default PokemonTypesDropdown;
