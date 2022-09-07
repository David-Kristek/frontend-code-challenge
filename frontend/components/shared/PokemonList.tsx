import React from "react";
import { Column, Grid } from "carbon-components-react";
import {
  GetPokemonsQuery,
  Pokemon,
} from "../../utils/graphql/generated/schema";
import Image from "next/image";
import PokemonCard from "../shared/PokemonCard";
import styles from "./Shared.module.scss";
import useLayoutContext, {
  LayoutType,
} from "../../utils/context/LayoutContext";

interface PokemonListProps {
  pokemons?: GetPokemonsQuery["pokemons"]["edges"];
  loading: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, loading }) => {
  const { layoutType } = useLayoutContext();
  const collumnWidth =
    layoutType == LayoutType.GRID
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
  if (loading) {
    return (
      <Grid>
        {[...Array(12)].map((_, index) => (
          <Column
            as="article"
            className={styles.card}
            {...collumnWidth}
            key={index}
          >
            <PokemonCard layoutType={layoutType} loading={true} />
          </Column>
        ))}
      </Grid>
    );
  }
  if (!pokemons) return null;
  return (
    <Grid data-testid={`layout${layoutType}`}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          layoutType={layoutType}
          loading={loading}
          key={pokemon.id}
          collumnWidth={collumnWidth}
        />
      ))}
    </Grid>
  );
};

export default PokemonList;
