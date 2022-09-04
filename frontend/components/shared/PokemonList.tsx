import React from "react";
import PropTypes from "prop-types";
import { ClickableTile, Column, Grid } from "carbon-components-react";
import {
  GetPokemonsQuery,
  Pokemon,
} from "../../utils/graphql/generated/schema";
import Image from "next/image";
import PokemonCard from "../shared/PokemonCard";
import styles from "./Shared.module.scss";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum LayoutType {
  GRID = "grid",
  LIST = "list",
}

export const PokemonListLayoutAtom = atomWithStorage<LayoutType>(
  "pokemonLayoutType",
  LayoutType.LIST
);

const PokemonList: React.FC<{
  pokemons: GetPokemonsQuery["pokemons"]["edges"];
}> = ({ pokemons }) => {
  const [layoutType] = useAtom(PokemonListLayoutAtom);
  const collumnWidth =
    layoutType === LayoutType.GRID
      ? {
          xlg: { span: 3 },
          lg: { span: 4 },
          md: { span: 4 },
          sm: { span: 4 },
        }
      : {
          xlg: { span: 6 },
          lg: { span: 6 },
          md: { span: 8 },
          sm: { span: 4 },
        };
  return (
    <Grid>
      {pokemons.map((pokemon) => (
        <Column
          as="article"
          className={styles.card}
          {...collumnWidth}
          key={pokemon.id}
        >
          <PokemonCard {...pokemon} layoutType={layoutType}/>
        </Column>
      ))}
    </Grid>
  );
};

export default PokemonList;
