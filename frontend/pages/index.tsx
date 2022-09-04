import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Loading } from "carbon-components-react";
import { gql, useQuery } from "@apollo/client";
import { Pokemon, useGetPokemonsQuery } from "../utils/graphql/generated/schema";
import styles from "../components/layouts/layouts.module.scss";
import Filters from "../components/shared/Filters";
import PokemonList from "../components/shared/PokemonList";

const Home: NextPage = () => {
  const { data, loading } = useGetPokemonsQuery({ variables: { query: {} } });
  if (loading) return <Loading />;
  if (!data?.pokemons.edges) return <p>No pokemons in pokedex</p>;
  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      <Filters />
      <PokemonList pokemons={data.pokemons.edges} />
    </div>
  );
};

export default Home;
