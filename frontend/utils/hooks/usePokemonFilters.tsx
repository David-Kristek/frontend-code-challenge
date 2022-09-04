import React, { useState } from "react";
import { Column, Grid, Search } from "carbon-components-react";
import styles from "../../components/shared/Shared.module.scss";
import { Thumbnail_2, Table } from "@carbon/icons-react";
import PokemonTypesDropdown from "../../components/shared/PokemonTypesDropdown";
import useDebounceValue from "./useDebounceValue";

interface usePokemonFiltersProps {
  filterFavorite?: boolean;
}

const usePokemonFilters = ({ filterFavorite }: usePokemonFiltersProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounceValue(searchValue, 400);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);
  return {
    queryParams: {
      filter: { type: selectedType, isFavorite: !!filterFavorite },
      search: debouncedSearch,
    },

    Filters: (
      <Grid style={{ margin: "2rem 0" }}>
        <Column
          xlg={{ span: 7 }}
          lg={{ span: 6 }}
          md={{ span: 4 }}
          sm={{ span: 4 }}
        >
          <Search
            closeButtonLabelText="Clear search input"
            labelText="Search"
            placeholder="Search pokemon"
            onChange={onSearchChange}
            onKeyDown={function noRefCheck() {}}
            className={styles.gridItem}
          />
        </Column>
        <Column
          xlg={{ span: 2, offset: 8 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 3 }}
        >
          <PokemonTypesDropdown
            setSelected={setSelectedType}
            selected={selectedType}
          />
        </Column>
        <Column
          lg={{ span: 2 }}
          md={{ span: 1 }}
          sm={{ span: 1 }}
          className={styles.iconBox}
        >
          <Thumbnail_2 className={styles.icon} />
          <Table className={styles.icon} />
        </Column>
      </Grid>
    ),
  };
};

export default usePokemonFilters;