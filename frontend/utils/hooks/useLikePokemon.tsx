import React, { useState } from "react";
import PropTypes from "prop-types";
import { Column, Grid } from "carbon-components-react";
import {
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from "../graphql/generated/schema";

interface LikePokemonProps {
  pokemonId: string;
  isFavoriteFromServer: boolean;
}

const useLikePokemon = ({ pokemonId, isFavoriteFromServer }: LikePokemonProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteFromServer);

  const onError = () => {
    setIsFavorite((curr) => !curr);
    // TODO: display toast notification
  };
  const [likePokemon] = useFavoritePokemonMutation({
    variables: { pokemonId },
    onError,
  });
  const [unLikePokemon] = useUnFavoritePokemonMutation({
    variables: { pokemonId },
    onError,
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
