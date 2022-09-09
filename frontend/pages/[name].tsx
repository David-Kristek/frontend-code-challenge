import { Column, Grid, ProgressIndicator } from "carbon-components-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useGetPokemonByNameQuery } from "../utils/graphql/generated/schema";
import styles from "../styles/pokemonDetail.module.scss";
import { formatPokemonTypes } from "../utils/func/formating";
import { unstable_ProgressBar } from "carbon-components-react";
import Head from "next/head";
import ProgressBar from "../components/shared/ProgressBar";
import FullRow from "../components/layouts/FullRow";
import PokemonCard from "../components/shared/PokemonCard";
import { LayoutType } from "../utils/context/GlobalContext";
import { VolumeUpFilled } from "@carbon/icons-react";
import useAudio from "../utils/hooks/useAudio";
import useLikePokemon from "../utils/hooks/useLikePokemon";

const MAX_POKEMON_CP = 3904;
const MAX_POKEMON_HP = 4144;

const PokemonDetail: NextPage = () => {
  const {
    query: { name: pokemonName },
  } = useRouter();
  const { data, loading } = useGetPokemonByNameQuery({
    variables: { name: String(pokemonName) },
  });
  if (loading || !data || !data.pokemonByName) return null;
  const { pokemonByName: pokemon } = data;
  const toggleSound = useAudio(pokemon.sound);
  return (
    <>
      <Head>
        <link rel="icon" href={pokemon.image} />
        <title>{pokemon.name}</title>
      </Head>
      <Grid className={styles.container}>
        <Column lg={{ span: 6 }} md={{ span: 4 }} sm={{ span: 4 }}>
          <h1 className={styles.heading}>{pokemon.name}</h1>
          <p>Grass , poison</p>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={styles.image}
          />
        </Column>
        <Column
          lg={{ span: 6 }}
          md={{ span: 4 }}
          sm={{ span: 4 }}
          className={styles.pokemonInfo}
        >
          <div className={styles.around}>
            <div>
              <h4 className={styles.mHeading}>Weight</h4>
              <p>
                {pokemon.weight.minimum} - {pokemon.weight.maximum}
              </p>
            </div>
            <div>
              <h4 className={styles.mHeading}>Height</h4>
              <p>
                {pokemon.height.minimum} - {pokemon.height.maximum}
              </p>
            </div>
          </div>
          <div>
            <ProgressBar
              value={(pokemon.maxCP / MAX_POKEMON_CP) * 100}
              label="Max CP"
              color="#5596E6"
              actulValue={pokemon.maxCP}
            />
            <ProgressBar
              value={(pokemon.maxHP / MAX_POKEMON_HP) * 100}
              label="Max HP"
              color="#5AA700"
              actulValue={pokemon.maxHP}
            />
          </div>
          <VolumeUpFilled
            size={24}
            color="blue"
            style={{ cursor: "pointer" }}
            onClick={toggleSound}
          />
        </Column>
        <FullRow noGrid>
          {pokemon.evolutions.length > 0 ? (
            <h3 style={{ padding: "2rem 0rem" }}>Evolutions: </h3>
          ) : (
            <h4>No evolutions</h4>
          )}
        </FullRow>
        {pokemon.evolutions.map((evolution, index) => (
          <PokemonCard
            pokemon={evolution}
            collumnWidth={{
              xlg: { span: 3 },
              lg: {
                span: 4,
              },
              md: {
                span: 4,
              },
              sm: {
                span: 4,
              },
            }}
            layoutType={LayoutType.GRID}
            key={index}
          />
        ))}
      </Grid>
    </>
  );
};
export default PokemonDetail;
