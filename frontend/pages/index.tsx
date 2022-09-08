import type { NextPage } from "next";
import Head from "next/head";

import { useGetPokemonsQuery } from "../utils/graphql/generated/schema";
import PokemonList from "../components/shared/PokemonList";
import usePokemonFilters from "../utils/hooks/usePokemonFilters";
import useDataWithoutLosing from "../utils/hooks/useDataWithoutLosing";

import _ from "loadsh";
import { useEffect, useState } from "react";
import usePokemonInfiniteScroll from "../utils/hooks/usePokemonInfiniteScroll";
import useGlobalContext from "../utils/context/GlobalContext";
const Home: NextPage = () => {
  const { Filters, filterValues, loadingComplete } = usePokemonFilters({});
  const { limit } = useGlobalContext();
  const queryParams = { query: { ...filterValues, offset: 0, limit } };
  const { data, previousData, fetchMore } = useGetPokemonsQuery({
    variables: queryParams,
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
          queryParams={queryParams}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Home;
