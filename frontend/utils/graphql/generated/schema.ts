import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Attack = {
  __typename?: 'Attack';
  damage: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Mutation = {
  __typename?: 'Mutation';
  favoritePokemon?: Maybe<Pokemon>;
  unFavoritePokemon?: Maybe<Pokemon>;
};


export type MutationFavoritePokemonArgs = {
  id: Scalars['ID'];
};


export type MutationUnFavoritePokemonArgs = {
  id: Scalars['ID'];
};

export type Pokemon = {
  __typename?: 'Pokemon';
  attacks: PokemonAttack;
  classification: Scalars['String'];
  evolutionRequirements?: Maybe<PokemonEvolutionRequirement>;
  evolutions: Array<Pokemon>;
  fleeRate: Scalars['Float'];
  height: PokemonDimension;
  id: Scalars['ID'];
  image: Scalars['String'];
  isFavorite: Scalars['Boolean'];
  maxCP: Scalars['Int'];
  maxHP: Scalars['Int'];
  name: Scalars['String'];
  number: Scalars['Int'];
  resistant: Array<Scalars['String']>;
  sound: Scalars['String'];
  types: Array<Scalars['String']>;
  weaknesses: Array<Scalars['String']>;
  weight: PokemonDimension;
};

export type PokemonAttack = {
  __typename?: 'PokemonAttack';
  fast: Array<Attack>;
  special: Array<Attack>;
};

export type PokemonConnection = {
  __typename?: 'PokemonConnection';
  count: Scalars['Int'];
  edges: Array<Pokemon>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type PokemonDimension = {
  __typename?: 'PokemonDimension';
  maximum: Scalars['String'];
  minimum: Scalars['String'];
};

export type PokemonEvolutionRequirement = {
  __typename?: 'PokemonEvolutionRequirement';
  amount: Scalars['Int'];
  name: Scalars['String'];
};

export type PokemonFilterInput = {
  isFavorite?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PokemonsQueryInput = {
  filter?: InputMaybe<PokemonFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  pokemonById?: Maybe<Pokemon>;
  pokemonByName?: Maybe<Pokemon>;
  pokemonTypes: Array<Scalars['String']>;
  pokemons: PokemonConnection;
};


export type QueryPokemonByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPokemonByNameArgs = {
  name: Scalars['String'];
};


export type QueryPokemonsArgs = {
  query: PokemonsQueryInput;
};

export type Root = {
  __typename?: 'Root';
  query: Query;
};

export type FavoritePokemonMutationVariables = Exact<{
  pokemonId: Scalars['ID'];
}>;


export type FavoritePokemonMutation = { __typename?: 'Mutation', favoritePokemon?: { __typename?: 'Pokemon', name: string, isFavorite: boolean } | null };

export type UnFavoritePokemonMutationVariables = Exact<{
  pokemonId: Scalars['ID'];
}>;


export type UnFavoritePokemonMutation = { __typename?: 'Mutation', unFavoritePokemon?: { __typename?: 'Pokemon', name: string, isFavorite: boolean } | null };

export type GetPokemonByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetPokemonByNameQuery = { __typename?: 'Query', pokemonByName?: { __typename?: 'Pokemon', id: string, name: string, maxCP: number, maxHP: number, sound: string, image: string, isFavorite: boolean, height: { __typename?: 'PokemonDimension', minimum: string, maximum: string }, weight: { __typename?: 'PokemonDimension', minimum: string, maximum: string }, evolutions: Array<{ __typename?: 'Pokemon', id: string, name: string, image: string, isFavorite: boolean }> } | null };

export type GetPokemonTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPokemonTypesQuery = { __typename?: 'Query', pokemonTypes: Array<string> };

export type GetPokemonsQueryVariables = Exact<{
  query: PokemonsQueryInput;
}>;


export type GetPokemonsQuery = { __typename?: 'Query', pokemons: { __typename?: 'PokemonConnection', edges: Array<{ __typename?: 'Pokemon', id: string, name: string, image: string, types: Array<string>, isFavorite: boolean }> } };


export const FavoritePokemonDocument = gql`
    mutation favoritePokemon($pokemonId: ID!) {
  favoritePokemon(id: $pokemonId) {
    name
    isFavorite
  }
}
    `;
export type FavoritePokemonMutationFn = Apollo.MutationFunction<FavoritePokemonMutation, FavoritePokemonMutationVariables>;

/**
 * __useFavoritePokemonMutation__
 *
 * To run a mutation, you first call `useFavoritePokemonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoritePokemonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoritePokemonMutation, { data, loading, error }] = useFavoritePokemonMutation({
 *   variables: {
 *      pokemonId: // value for 'pokemonId'
 *   },
 * });
 */
export function useFavoritePokemonMutation(baseOptions?: Apollo.MutationHookOptions<FavoritePokemonMutation, FavoritePokemonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavoritePokemonMutation, FavoritePokemonMutationVariables>(FavoritePokemonDocument, options);
      }
export type FavoritePokemonMutationHookResult = ReturnType<typeof useFavoritePokemonMutation>;
export type FavoritePokemonMutationResult = Apollo.MutationResult<FavoritePokemonMutation>;
export type FavoritePokemonMutationOptions = Apollo.BaseMutationOptions<FavoritePokemonMutation, FavoritePokemonMutationVariables>;
export const UnFavoritePokemonDocument = gql`
    mutation unFavoritePokemon($pokemonId: ID!) {
  unFavoritePokemon(id: $pokemonId) {
    name
    isFavorite
  }
}
    `;
export type UnFavoritePokemonMutationFn = Apollo.MutationFunction<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>;

/**
 * __useUnFavoritePokemonMutation__
 *
 * To run a mutation, you first call `useUnFavoritePokemonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFavoritePokemonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFavoritePokemonMutation, { data, loading, error }] = useUnFavoritePokemonMutation({
 *   variables: {
 *      pokemonId: // value for 'pokemonId'
 *   },
 * });
 */
export function useUnFavoritePokemonMutation(baseOptions?: Apollo.MutationHookOptions<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>(UnFavoritePokemonDocument, options);
      }
export type UnFavoritePokemonMutationHookResult = ReturnType<typeof useUnFavoritePokemonMutation>;
export type UnFavoritePokemonMutationResult = Apollo.MutationResult<UnFavoritePokemonMutation>;
export type UnFavoritePokemonMutationOptions = Apollo.BaseMutationOptions<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>;
export const GetPokemonByNameDocument = gql`
    query getPokemonByName($name: String!) {
  pokemonByName(name: $name) {
    id
    name
    maxCP
    maxHP
    height {
      minimum
      maximum
    }
    weight {
      minimum
      maximum
    }
    sound
    image
    isFavorite
    evolutions {
      id
      name
      image
      isFavorite
    }
  }
}
    `;

/**
 * __useGetPokemonByNameQuery__
 *
 * To run a query within a React component, call `useGetPokemonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPokemonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokemonByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetPokemonByNameQuery(baseOptions: Apollo.QueryHookOptions<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>(GetPokemonByNameDocument, options);
      }
export function useGetPokemonByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>(GetPokemonByNameDocument, options);
        }
export type GetPokemonByNameQueryHookResult = ReturnType<typeof useGetPokemonByNameQuery>;
export type GetPokemonByNameLazyQueryHookResult = ReturnType<typeof useGetPokemonByNameLazyQuery>;
export type GetPokemonByNameQueryResult = Apollo.QueryResult<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>;
export const GetPokemonTypesDocument = gql`
    query getPokemonTypes {
  pokemonTypes
}
    `;

/**
 * __useGetPokemonTypesQuery__
 *
 * To run a query within a React component, call `useGetPokemonTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPokemonTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokemonTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPokemonTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetPokemonTypesQuery, GetPokemonTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPokemonTypesQuery, GetPokemonTypesQueryVariables>(GetPokemonTypesDocument, options);
      }
export function useGetPokemonTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPokemonTypesQuery, GetPokemonTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPokemonTypesQuery, GetPokemonTypesQueryVariables>(GetPokemonTypesDocument, options);
        }
export type GetPokemonTypesQueryHookResult = ReturnType<typeof useGetPokemonTypesQuery>;
export type GetPokemonTypesLazyQueryHookResult = ReturnType<typeof useGetPokemonTypesLazyQuery>;
export type GetPokemonTypesQueryResult = Apollo.QueryResult<GetPokemonTypesQuery, GetPokemonTypesQueryVariables>;
export const GetPokemonsDocument = gql`
    query getPokemons($query: PokemonsQueryInput!) {
  pokemons(query: $query) {
    edges {
      id
      name
      image
      types
      isFavorite
    }
  }
}
    `;

/**
 * __useGetPokemonsQuery__
 *
 * To run a query within a React component, call `useGetPokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokemonsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetPokemonsQuery(baseOptions: Apollo.QueryHookOptions<GetPokemonsQuery, GetPokemonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPokemonsQuery, GetPokemonsQueryVariables>(GetPokemonsDocument, options);
      }
export function useGetPokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPokemonsQuery, GetPokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPokemonsQuery, GetPokemonsQueryVariables>(GetPokemonsDocument, options);
        }
export type GetPokemonsQueryHookResult = ReturnType<typeof useGetPokemonsQuery>;
export type GetPokemonsLazyQueryHookResult = ReturnType<typeof useGetPokemonsLazyQuery>;
export type GetPokemonsQueryResult = Apollo.QueryResult<GetPokemonsQuery, GetPokemonsQueryVariables>;