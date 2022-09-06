import type { NextPage } from "next";
import Head from "next/head";
import { Loading } from "carbon-components-react";
import {
  GetPokemonsDocument,
  useGetPokemonsQuery,
} from "../utils/graphql/generated/schema";
import PokemonList from "../components/shared/PokemonList";
import usePokemonFilters from "../utils/hooks/usePokemonFilters";
import client from "../utils/apollo-client";
import useDataWithoutLosing from "../utils/hooks/useDataWithoutLosing";
import { useState } from "react";

const Home: NextPage = () => {
  const { Filters, queryParams, loadingComplete } = usePokemonFilters({
    filterFavorite: true,
  });
  const { data, previousData } = useGetPokemonsQuery({
    variables: { query: queryParams },
    onCompleted: loadingComplete,
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
