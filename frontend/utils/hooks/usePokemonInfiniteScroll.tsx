import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InlineLoading } from "carbon-components-react";
import { GetPokemonsQuery } from "../graphql/generated/schema";
import _ from "loadsh";

interface Props {
  limit: number;
  fetchMore: (pr: any) => Promise<any>;
  data: GetPokemonsQuery | undefined;
  queryParams: {
    filter: {
      type: string;
      isFavorite: boolean;
    };
    search: string;
  };
}

const usePokemonInfiniteScroll = ({
  limit,
  fetchMore,
  data,
  queryParams,
}: Props) => {
  const [moreItemsToLoad, setMoreItemsToLoad] = useState(true);
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
    console.log("fetching more");
    const newVariables = {
      ...queryParams,
      offset: data.pokemons.edges.length,
    };
    await fetchMore({
      variables: { query: newVariables },
      updateQuery: (
        previousResult: GetPokemonsQuery,
        { fetchMoreResult }: { fetchMoreResult: GetPokemonsQuery }
      ) => {
        if (fetchMoreResult.pokemons.edges.length < 1) {
          setMoreItemsToLoad(false);
        }
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
        hasMore={moreItemsToLoad}
      >
        {children}
      </InfiniteScroll>
    ),
  };
};

export default usePokemonInfiniteScroll;
