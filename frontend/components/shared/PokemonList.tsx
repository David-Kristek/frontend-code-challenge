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

const PokemonList: React.FC<{
  pokemons: GetPokemonsQuery["pokemons"]["edges"];
}> = ({ pokemons }) => {
  return (
    <Grid>
      {pokemons.map((pokemon) => (
        <Column
          as="article"
          className={styles.card}
          xlg={{ span: 3 }}
          lg={{ span: 4 }}
          md={{ span: 4 }}
          sm={{ span: 4 }}
          key={pokemon.id}
        >
          <PokemonCard {...pokemon} />
        </Column>
      ))}
    </Grid>
  );
};

export default PokemonList;
