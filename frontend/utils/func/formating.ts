import React from "react";
export const formatPokemonTypes = (types?: string[]) => {
  if (!types) return null;
  let text = "";
  types.forEach((type, index) => {
    const isLast = types.length === index + 1;
    const isFirst = index === 0;
    text += `${isFirst ? type : type[0].toLowerCase() + type.slice(1)} ${
      !isLast ? ", " : ""
    }`;
  });
  return text;
};
