import React, { useState } from "react";
import { Column, Grid } from "carbon-components-react";
import styles from "./Shared.module.scss";
import Link from "next/link";
import { Favorite, FavoriteFilled } from "@carbon/icons-react";
import useLikePokemon from "../../utils/hooks/useLikePokemon";
import { LayoutType } from "./PokemonList";

interface CardProps {
  image: string;
  name: string;
  types: string[];
  id: string;
  isFavorite: boolean;
  layoutType?: LayoutType;
}

const PokemonCard: React.FC<CardProps> = ({
  image,
  name,
  types,
  id: pokemonId,
  isFavorite: isFavoriteFromServer,
  layoutType,
}) => {
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
