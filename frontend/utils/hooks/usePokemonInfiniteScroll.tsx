import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InlineLoading } from "carbon-components-react";
import {
  GetPokemonsQuery,
  GetPokemonsQueryVariables,
} from "../graphql/generated/schema";
import _ from "loadsh";
import useGlobalContext from "../context/GlobalContext";

interface Props {
  limit: number;
  fetchMore: (pr: any) => Promise<any>;
  data: GetPokemonsQuery | undefined;
  queryParams: GetPokemonsQueryVariables;
}

const usePokemonInfiniteScroll = ({
  limit,
  fetchMore,
  data,
  queryParams,
}: Props) => {
  const [moreItemsToLoad, setMoreItemsToLoad] = useState(true);
  const { setLimit } = useGlobalContext();
  const firstRender = useRef(true);
  useEffect(() => {
    if (data && firstRender) {
      setMoreItemsToLoad(data?.pokemons.edges.length >= limit);
      firstRender.current = false;
    }
  }, [data]);
  const loadMore = async () => {
    if (
      !data?.pokemons.edges.length ||
      Number(data?.pokemons.edges.length) < limit
    )
      return;

    const newVariables = {
      query: {
        ...queryParams.query,
        offset: data.pokemons.edges.length,
        limit: 16,
      },
    };
    setLimit(data.pokemons.edges.length + 16);
    await fetchMore({
      variables: newVariables,
      updateQuery: (
        previousResult: GetPokemonsQuery,
        { fetchMoreResult }: { fetchMoreResult: GetPokemonsQuery }
      ) => {
        if (fetchMoreResult.pokemons.edges.length < 1) {
          setMoreItemsToLoad(false);
        }
        if (!previousResult.pokemons) return null;
        if (
          previousResult.pokemons &&
          previousResult.pokemons.edges.some(
            (pokemon) =>
              fetchMoreResult.pokemons.edges[
                fetchMoreResult.pokemons.edges.length - 1
              ]?.id === pokemon.id
          )
        )
          return null;
        const newData = _.cloneDeep(previousResult);

        if (!newData.pokemons) return previousResult;

        newData.pokemons.edges = [
          ...previousResult.pokemons.edges,
          ...fetchMoreResult.pokemons.edges,
        ];

        return newData;
      },
    });
  };
  return {
    InfiniteScroll: ({ children }: { children: React.ReactNode }) => (
      <InfiniteScroll
        dataLength={data?.pokemons.edges.length ?? 0}
        next={loadMore}
        loader={<InlineLoading style={{ justifyContent: "center" }} />}
        endMessage={<div style={{height: "50px"}}/>}
        hasMore={moreItemsToLoad}
      >
        {children}
      </InfiniteScroll>
    ),
  };
};

export default usePokemonInfiniteScroll;
