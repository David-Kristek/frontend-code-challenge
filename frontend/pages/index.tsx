import type { NextPage } from "next";
import Head from "next/head";
import { Loading } from "carbon-components-react";
import { useGetPokemonsQuery } from "../utils/graphql/generated/schema";
import PokemonList from "../components/shared/PokemonList";
import usePokemonFilters from "../utils/hooks/usePokemonFilters";
import useDataWithoutLosing from "../utils/hooks/useDataWithoutLosing";

const Home: NextPage = () => {
  const { Filters, queryParams, loadingComplete } = usePokemonFilters({});
  const { data, loading, previousData } = useGetPokemonsQuery({
    variables: { query: queryParams },
    onCompleted: loadingComplete,
    onError: loadingComplete
  });
  const { definedData, firstLoading } = useDataWithoutLosing(
    data,
    previousData
  );
  // if (loading) return <Loading />;
  // if (!data?.pokemons.edges) return <p>No pokemons in pokedex</p>;

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      {Filters}

      <PokemonList
        pokemons={definedData?.pokemons.edges}
        loading={firstLoading}
      />
    </div>
  );
};

export default Home;
