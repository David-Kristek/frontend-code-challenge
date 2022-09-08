import React, { useEffect, useState } from "react";
import {
  GetPokemonsDocument,
  GetPokemonsQuery,
  GetPokemonsQueryVariables,
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from "../graphql/generated/schema";
import client from "../apollo-client";
import _ from "lodash";
import useGlobalContext from "../context/GlobalContext";
import { useRouter } from "next/router";

interface LikePokemonProps {
  pokemonId: string;
  isFavoriteFromServer: boolean;
  queryParams?: GetPokemonsQueryVariables;
}
const useLikePokemon = ({
  pokemonId,
  isFavoriteFromServer,
}: LikePokemonProps) => {
  const router = useRouter();
  // this is caused becaused of problems with direct caching 
  const isOnFavoritePage = router.pathname === "/favorites";
  const [isFavorite, setIsFavorite] = useState(isFavoriteFromServer || isOnFavoritePage);
  const onError = (error: any) => {
    console.log(error, "error");
    setIsFavorite((curr) => !curr);
    // TODO: display toast notification
  };
  const { limit } = useGlobalContext();
  const [likePokemon] = useFavoritePokemonMutation({
    variables: { pokemonId },
    onError,
    onCompleted: (data) => {
      const pokemonName = data.favoritePokemon?.name;
      const pokemon = client
        .readQuery({
          query: GetPokemonsDocument,
          variables: {
            query: {
              filter: { isFavorite: false, type: "" },
              limit,
              offset: 0,
              search: "",
            },
          },
        })
        .pokemons.edges.find(
          (cachedPokemon: any) => cachedPokemon.name === pokemonName
        );
      client.cache.updateQuery(
        {
          query: GetPokemonsDocument,
          variables: {
            query: {
              filter: { isFavorite: true, type: "" },
              limit: 16,
              offset: 0,
              search: "",
            },
          },
        },
        (data: GetPokemonsQuery | null) => {
          if (!data) return data;
          const newData = _.cloneDeep(data);
          newData.pokemons.edges = [pokemon, ...data.pokemons.edges];
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
      client.cache.updateQuery(
        {
          query: GetPokemonsDocument,
          variables: {
            query: {
              filter: { isFavorite: true, type: "" },
              limit: 16,
              offset: 0,
              search: "",
            },
          },
        },
        (data: GetPokemonsQuery | null) => {
          if (!data) return data;
          const newData = _.cloneDeep(data);
          newData.pokemons.edges = data.pokemons.edges.filter(
            (cachedPokemon) => cachedPokemon.name !== pokemon?.name
          );
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

      console.log("pokemonLiked");
      return "Pokemon liked";
    }
    unLikePokemon();
    setIsFavorite(false);
  };
  const endAnimation = () => setAnimate(false);
  return {
    isFavorite,
    toggleFavorite,
    animate,
    endAnimation,
  };
};

export default useLikePokemon;
