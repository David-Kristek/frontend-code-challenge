import React from "react";
import PropTypes from "prop-types";
import { ClickableTile, Column, Grid } from "carbon-components-react";
import {
  GetPokemonsQuery,
  Pokemon,
} from "../../utils/graphql/generated/schema";
import styles from "./Home.module.scss";
import Image from "next/image";

const PokemonList: React.FC<{
  pokemons: GetPokemonsQuery["pokemons"]["edges"];
}> = ({ pokemons }) => {
  return (
    <Grid>
      {pokemons.map((pokemon) => (
        <Column
          as={'article'}
          className={styles.card}
          xlg={{ span: 3 }}
          lg={{ span: 4 }}
          md={{ span: 4 }}
          sm={{ span: 4 }}
        >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className={styles.pokemonImage}
            />
          <div className={styles.cardContent}>
            <h3>{pokemon.name} </h3>
            <p>
              {pokemon.types.map((type, index) => {
                const isLast = pokemon.types.length === index + 1;
                const isFirst = index === 0;
                return (
                  <React.Fragment key={index}>
                    {/* lowercase first letter*/}
                    {isFirst ? type : type[0].toLowerCase() + type.slice(1)}
                    {!isLast && ", "}
                  </React.Fragment>
                );
              })}
            </p>
          </div>
        </Column>
      ))}
    </Grid>
  );
};

export default PokemonList;
