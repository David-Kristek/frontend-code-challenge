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
import { LayoutType } from "../../utils/context/LayoutContext";

interface CardProps {
  pokemon?: {
    image: string;
    name: string;
    types: string[];
    id: string;
    isFavorite: boolean;
  };
  layoutType?: LayoutType;
  loading?: boolean;
}

const PokemonCard: React.FC<CardProps> = ({ pokemon, layoutType, loading }) => {
  const layoutClass =
    layoutType === LayoutType.GRID ? styles.gridContent : styles.listContent;
  if (loading)
    return (
      <div className={`${styles.content} ${layoutClass}`}>
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
  const { isFavorite, toggleFavorite, animate, endAnimation } = useLikePokemon({
    pokemonId,
    isFavoriteFromServer,
  });
  return (
    <>
      <div
        className={`${styles.content} ${
          layoutType === LayoutType.GRID
            ? styles.gridContent
            : styles.listContent
        }`}
      >
        <Link href={name}>
          <img src={image} alt={name} className={styles.pokemonImage} />
        </Link>
        <h3>{name} </h3>
        {isFavorite ? (
          <FavoriteFilled
            className={`${styles.icon} ${animate ? styles.animate : ""}`}
            onClick={toggleFavorite}
            onAnimationEnd={endAnimation}
          />
        ) : (
          <Favorite className={styles.icon} onClick={toggleFavorite} />
        )}

        <p>
          {types.map((type, index) => {
            const isLast = types.length === index + 1;
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
    </>
  );
};

export default PokemonCard;
