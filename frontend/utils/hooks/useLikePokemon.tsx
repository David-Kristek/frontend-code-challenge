import React, { useState } from "react";
import {
  GetPokemonsDocument,
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
    onCompleted: () => {
      client.refetchQueries({ include: [GetPokemonsDocument] });
    },
  });
  const [unLikePokemon] = useUnFavoritePokemonMutation({
    variables: { pokemonId },
    onError,
    onCompleted: () => {
      client.refetchQueries({ include: [GetPokemonsDocument] });
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
