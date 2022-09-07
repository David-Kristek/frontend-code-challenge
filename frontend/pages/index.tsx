import type { NextPage } from "next";
import Head from "next/head";

import { useGetPokemonsQuery } from "../utils/graphql/generated/schema";
import PokemonList from "../components/shared/PokemonList";
import usePokemonFilters from "../utils/hooks/usePokemonFilters";
import useDataWithoutLosing from "../utils/hooks/useDataWithoutLosing";

import _ from "loadsh";
import { useEffect, useState } from "react";
import usePokemonInfiniteScroll from "../utils/hooks/usePokemonInfiniteScroll";
const Home: NextPage = () => {
  const { Filters, queryParams, loadingComplete } = usePokemonFilters({});
  const { data, previousData, fetchMore } = useGetPokemonsQuery({
    variables: { query: { ...queryParams, offset: 0, limit: 16 } },
    onCompleted: loadingComplete,
    onError: loadingComplete,
    fetchPolicy: "cache-and-network",
  });
  const { InfiniteScroll } = usePokemonInfiniteScroll({
    limit: 16,
    fetchMore,
    data,
    queryParams,
  });
  const { definedData, firstLoading } = useDataWithoutLosing(
    data,
    previousData
  );
  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      {Filters}
      <InfiniteScroll>
        <PokemonList
          pokemons={definedData?.pokemons.edges}
          loading={firstLoading}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Home;
