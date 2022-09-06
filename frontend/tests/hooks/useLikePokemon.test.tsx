import { act, renderHook, RenderResult } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import useLikePokemon from "../../utils/hooks/useLikePokemon";
import {
  FavoritePokemonDocument,
  UnFavoritePokemonDocument,
} from "../../utils/graphql/generated/schema";
import { expect } from "@jest/globals";
let favoritePokemonMutationCalled = false;
let result: RenderResult<{
  isFavorite: boolean;
  toggleFavorite: () => void;
  animate: boolean;
  endAnimation: () => void;
}>;
const mocks = [
  {
    request: {
      query: FavoritePokemonDocument,
      variables: { pokemonId: "001" },
    },
    result: () => {
      favoritePokemonMutationCalled = true;
      return {
        data: {
          favoritePokemon: {
            name: "Bulbasaur",
            isFavorite: true,
          },
        },
      };
    },
  },
  {
    request: {
      query: UnFavoritePokemonDocument,
      variables: { pokemonId: "001" },
    },
    result: () => {
      favoritePokemonMutationCalled = false;
      return {
        data: {
          unFavoritePokemon: {
            name: "Bulbasaur",
            isFavorite: false,
          },
        },
      };
    },
  },
];
let rerender: (
  props?:
    | {
        pokemonId: string;
        isFavoriteFromServer: boolean;
      }
    | undefined
) => void;

const wrapper = ({ children }: any) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

beforeEach(() => {
  const hookRendered = renderHook(
    ({ pokemonId, isFavoriteFromServer }) =>
      useLikePokemon({ pokemonId, isFavoriteFromServer }),
    {
      initialProps: { pokemonId: "001", isFavoriteFromServer: false },
      wrapper,
    }
  );
  result = hookRendered.result as typeof result;
  rerender = hookRendered.rerender;
});

test.only("should like pokemon and stop animation", () => {
  act(() => {
    result.current.toggleFavorite();
  });
  expect(result.current.isFavorite).toBe(true);
  expect(result.current.animate).toBe(true);
  act(() => {
    result.current.endAnimation();
  });
  expect(result.current.animate).toBe(false);
});

test.only("should like and unlike pokemon", () => {
  expect(result.current.isFavorite).toBe(false);
  act(() => {
    result.current.toggleFavorite();
  });
  act(() => {
    result.current.toggleFavorite();
  });
  expect(result.current.isFavorite).toBe(false);
});
