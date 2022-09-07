import type { NextPage } from "next";
import Head from "next/head";
import {
  GetPokemonsDocument,
  useGetPokemonsQuery,
} from "../utils/graphql/generated/schema";
import PokemonList from "../components/shared/PokemonList";
import usePokemonFilters from "../utils/hooks/usePokemonFilters";
import client from "../utils/apollo-client";
import useDataWithoutLosing from "../utils/hooks/useDataWithoutLosing";
import { useState } from "react";
import usePokemonInfiniteScroll from "../utils/hooks/usePokemonInfiniteScroll";

const Home: NextPage = () => {
  const { Filters, queryParams, loadingComplete } = usePokemonFilters({
    filterFavorite: true,
  });
  const { data, previousData, fetchMore } = useGetPokemonsQuery({
    variables: { query: queryParams },
    onCompleted: loadingComplete,
    onError: loadingComplete,
    fetchPolicy: "cache-and-network",
  });
  const { definedData, firstLoading } = useDataWithoutLosing(
    data,
    previousData
  );
  const { InfiniteScroll } = usePokemonInfiniteScroll({
    limit: 16,
    fetchMore,
    data,
    queryParams,
  });
  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      {Filters}
      <div>
        <InfiniteScroll>
          <PokemonList
            pokemons={definedData?.pokemons.edges}
            loading={firstLoading}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
