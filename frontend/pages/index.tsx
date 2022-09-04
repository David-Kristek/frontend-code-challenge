import type { NextPage } from "next";
import Head from "next/head";
import { Loading } from "carbon-components-react";
import { useGetPokemonsQuery } from "../utils/graphql/generated/schema";
import PokemonList from "../components/shared/PokemonList";
import usePokemonFilters from "../utils/hooks/usePokemonFilters";

const Home: NextPage = () => {
  const { Filters, queryParams } = usePokemonFilters({});
  const { data, loading } = useGetPokemonsQuery({
    variables: { query: queryParams },
  });
  // if (loading) return <Loading />;
  // if (!data?.pokemons.edges) return <p>No pokemons in pokedex</p>;

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      {Filters}

      {data?.pokemons.edges && <PokemonList pokemons={data.pokemons.edges} />}
    </div>
  );
};

export default Home;
