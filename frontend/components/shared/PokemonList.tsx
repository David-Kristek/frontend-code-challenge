import React from "react";
import { Column, Grid } from "carbon-components-react";
import {
  GetPokemonsQuery,
  GetPokemonsQueryVariables,
  Pokemon,
} from "../../utils/graphql/generated/schema";
import Image from "next/image";
import PokemonCard from "../shared/PokemonCard";
import styles from "./Shared.module.scss";
import useGlobalContext, {
  LayoutType,
} from "../../utils/context/GlobalContext";

interface PokemonListProps {
  pokemons?: GetPokemonsQuery["pokemons"]["edges"];
  loading: boolean;
  queryParams: GetPokemonsQueryVariables;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, loading, queryParams }) => {
  const { layoutType } = useGlobalContext();
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
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          pokemon={pokemon}
          layoutType={layoutType}
          loading={loading}
          key={index}
          collumnWidth={collumnWidth}
          queryParams={queryParams}
        />
      ))}
    </Grid>
  );
};

export default PokemonList;
