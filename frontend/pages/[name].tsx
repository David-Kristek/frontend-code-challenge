import { Grid } from "carbon-components-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useGetPokemonByNameQuery } from "../utils/graphql/generated/schema";

const PokemonDetail: NextPage = () => {
  const {
    query: { name: pokemonName },
  } = useRouter();
  const { data, loading } = useGetPokemonByNameQuery({
    variables: { name: String(pokemonName) },
  });
  if (loading) return null;
  return (
    <Grid>
      <h3>{data?.pokemonByName?.name}</h3>
    </Grid>
  );
};
export default PokemonDetail;
