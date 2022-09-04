import type { NextPage } from "next";
import Head from "next/head";
import { Loading } from "carbon-components-react";
import { useGetPokemonsQuery } from "../utils/graphql/generated/schema";
import Filters from "../components/shared/Filters";
import PokemonList from "../components/shared/PokemonList";

const Home: NextPage = () => {
  const { data, loading } = useGetPokemonsQuery({
    variables: { query: { filter: { isFavorite: true } } },
  });
  if (loading) return <Loading />;
  if (!data?.pokemons.edges) return <p>No pokemons in pokedex</p>;
  return (
    <div>
      <Head>
        <title>Favorites</title>
      </Head>
      <Filters />
      <PokemonList pokemons={data.pokemons.edges} />
    </div>
  );
};

export default Home;
