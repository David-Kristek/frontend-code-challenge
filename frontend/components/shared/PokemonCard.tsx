import React, { useState } from "react";
import {
  Column,
  Grid,
  SkeletonIcon,
  SkeletonPlaceholder,
  SkeletonText,
} from "carbon-components-react";
import styles from "./Shared.module.scss";
import Link from "next/link";
import { Favorite, FavoriteFilled } from "@carbon/icons-react";
import useLikePokemon from "../../utils/hooks/useLikePokemon";
import { LayoutType } from "../../utils/context/GlobalContext";
import { useRouter } from "next/router";
import client from "../../utils/apollo-client";
import {
  GetPokemonByNameDocument,
  GetPokemonsQueryVariables,
} from "../../utils/graphql/generated/schema";
import { formatPokemonTypes } from "../../utils/func/formating";

interface CardProps {
  pokemon?: {
    image: string;
    name: string;
    types?: string[];
    id: string;
    isFavorite: boolean;
  };
  queryParams?: GetPokemonsQueryVariables;
  layoutType?: LayoutType;
  loading?: boolean;
  collumnWidth?: {
    xlg: {
      span: number;
    };
    lg: {
      span: number;
    };
    md: {
      span: number;
    };
    sm: {
      span: number;
    };
  };
}

const PokemonCard: React.FC<CardProps> = ({
  pokemon,
  layoutType,
  loading,
  collumnWidth,
}) => {
  const layoutClass =
    layoutType === LayoutType.GRID ? styles.gridContent : styles.listContent;

  if (loading)
    return (
      <div
        className={`${styles.content} ${layoutClass}`}
        data-testid={`skeletonLoading${layoutType}`}
      >
        <SkeletonPlaceholder className={styles.pokemonImage} />
        <SkeletonIcon className={styles.icon} />
        <SkeletonText className={styles.headingSkeleton} />
        <SkeletonText className={styles.paragraphSkeleton} />
      </div>
    );

  if (!pokemon) return null;
  const {
    image,
    name,
    types,
    id: pokemonId,
    isFavorite: isFavoriteFromServer,
  } = pokemon;
  const { isFavorite, toggleFavorite, animate, endAnimation } =
    useLikePokemon({
      pokemonId,
      isFavoriteFromServer,
    });
  const prefetchPokemon = () => {
    client.query({
      query: GetPokemonByNameDocument,
      variables: { name: pokemon.name.toLowerCase() },
    });
  };
  return (
    <Column
      as="article"
      className={styles.card}
      {...collumnWidth}
      onMouseOver={prefetchPokemon}
      style={{ position: "relative" }}
    >
      <div
        className={`${styles.content} ${
          layoutType === LayoutType.GRID
            ? styles.gridContent
            : styles.listContent
        }`}
        data-testid="card"
      >
        <Link href={name.toLowerCase()}>
          <img src={image} alt={name} className={styles.pokemonImage} />
        </Link>
        <Link href={name.toLowerCase()}>
          <h3 style={{ cursor: "pointer" }}>{name} </h3>
        </Link>
        {isFavorite ? (
          <FavoriteFilled
            className={`${styles.icon} ${animate ? styles.animate : ""}`}
            onClick={toggleFavorite}
            onAnimationEnd={endAnimation}
          />
        ) : (
          <Favorite className={styles.icon} onClick={toggleFavorite} />
        )}

        <p>{formatPokemonTypes(types)}</p>
      </div>
    </Column>
  );
};

export default PokemonCard;
