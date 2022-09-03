import React from "react";
import PropTypes from "prop-types";
import { Column, Grid } from "carbon-components-react";
import {
  GetPokemonsQuery,
  Pokemon,
} from "../../utils/graphql/generated/schema";
import styles from "./Home.module.scss"



const PokemonList: React.FC<{
  pokemons: GetPokemonsQuery["pokemons"]["edges"];
}> = ({ pokemons }) => {
  return (
    <>
      {pokemons.map((pokemon) => (
        <article>
          <p>{pokemon.name} </p>
          <img src={pokemon.image} alt={pokemon.name} />
        </article>
      ))}
    </>
  );
};

export default PokemonList;
