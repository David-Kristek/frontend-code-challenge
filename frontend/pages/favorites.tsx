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

const Home: NextPage = () => {
  const { Filters, queryParams } = usePokemonFilters({ filterFavorite: true });
  const { data, loading, previousData } = useGetPokemonsQuery({
    variables: { query: queryParams },
    
  });
  const definedData = useDataWithoutLosing(data, previousData); 
  
  // if (loading) return <Loading />;
  // if (!data?.pokemons.edges) return <p>No pokemons in pokedex</p>;
  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      {Filters}

      <PokemonList pokemons={definedData?.pokemons.edges} loading={loading} />
    </div>
  );
};

export default Home;
