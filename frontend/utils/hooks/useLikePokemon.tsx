import React, { useState } from "react";
import PropTypes from "prop-types";
import { Column, Grid } from "carbon-components-react";
import {
  GetPokemonsDocument,
  GetPokemonsQuery,
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from "../graphql/generated/schema";
import client from "../apollo-client";

interface LikePokemonProps {
  pokemonId: string;
  isFavoriteFromServer: boolean;
}
import _ from "loadsh";
const useLikePokemon = ({
  pokemonId,
  isFavoriteFromServer,
}: LikePokemonProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteFromServer);

  const onError = (error: any) => {
    console.log(error);
    setIsFavorite((curr) => !curr);
    // TODO: display toast notification
  };
  const [likePokemon] = useFavoritePokemonMutation({
    variables: { pokemonId },
    onError,
    onCompleted: (data) => {
      // gets favorite pokemon and adds favorite to cache
      const pokemonName = data.favoritePokemon?.name;
      const pokemon = client
        .readQuery({ query: GetPokemonsDocument, variables: { query: {} } })
        .pokemons.edges.find(
          (cachedPokemon: any) => cachedPokemon.name === pokemonName
        );
      client.cache.updateQuery(
        {
          query: GetPokemonsDocument,
          variables: { query: { filter: { isFavorite: true } } },
        },

        (data: GetPokemonsQuery | null) => {
          if (!data || !pokemon) return data;
          console.log(data.pokemons.edges);
          const newData = _.cloneDeep(data);
          newData.pokemons.edges.push({ ...pokemon, isFavorite: true });
          return newData;
        }
      );
    },
  });
  const [unLikePokemon] = useUnFavoritePokemonMutation({
    variables: { pokemonId },
    onError,
    onCompleted: (data) => {
      const pokemon = data.unFavoritePokemon;
      // updates cache in filtered
      client.cache.updateQuery(
        {
          query: GetPokemonsDocument,
          variables: { query: { filter: { isFavorite: true } } },
        },

        (data: GetPokemonsQuery | null) => {
          if (!data) return data;
          const newData = _.cloneDeep(data);
          newData.pokemons.edges = data.pokemons.edges.filter(
            (cachedPokemon) => cachedPokemon.name !== pokemon?.name
          );
          console.log(newData);
          return newData;
        }
      );
    },
  });

  const [animate, setAnimate] = useState(false);
  const toggleFavorite = () => {
    if (!isFavorite) {
      setAnimate(true);
      likePokemon();
      //   optimistic update
      setIsFavorite(true);
      return;
    }
    unLikePokemon();
    setIsFavorite(false);
  };

  const endAnimation = () => setAnimate(false);
  return { isFavorite, toggleFavorite, animate, endAnimation };
};

export default useLikePokemon;
