import React, { useState } from "react";
import { Column, Grid, InlineLoading, Search } from "carbon-components-react";
import styles from "../../components/shared/Shared.module.scss";
import { Thumbnail_2, Table } from "@carbon/icons-react";
import PokemonTypesDropdown from "../../components/shared/PokemonTypesDropdown";
import useDebounceValue from "./useDebounceValue";
import useLayoutContext, { LayoutType } from "../context/LayoutContext";
import FullRow from "../../components/layouts/FullRow";

interface usePokemonFiltersProps {
  filterFavorite?: boolean;
}

const usePokemonFilters = ({ filterFavorite }: usePokemonFiltersProps) => {
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounceValue(searchValue, 400);
  const { layoutType, setGridLayout, setListLayout } = useLayoutContext();
  
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    startLoading();
  };
  const activeIconClass = (layout: LayoutType) => {
    const iconClass = layoutType == layout ? styles.activeIcon : "";
    return iconClass;
  };
  const loadingComplete = () => {
    setLoadingFilters(false);

  };
  const startLoading = () => {
    setLoadingFilters(true);
  };
  return {
    queryParams: {
      filter: { type: selectedType, isFavorite: !!filterFavorite },
      search: debouncedSearch,
    },
    loadingComplete,

    Filters: (
      <Grid style={{ margin: "2rem 0", position: "relative" }}>
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
            setLoading={startLoading}
          />
        </Column>
        <Column
          lg={{ span: 2 }}
          md={{ span: 1 }}
          sm={{ span: 1 }}
          className={styles.iconBox}
        >
          <Thumbnail_2
            className={`${styles.icon} ${activeIconClass(LayoutType.GRID)}`}
            onClick={setGridLayout}
          />
          <Table
            className={`${styles.icon} ${activeIconClass(LayoutType.LIST)}`}
            onClick={setListLayout}
          />
        </Column>
        <FullRow>
          <Column>
            {loadingFilters && (searchValue || selectedType) && (
              <InlineLoading
                style={{ position: "absolute", marginLeft: "auto" }}
                description="Loading filters"
              />
            )}
          </Column>
        </FullRow>
      </Grid>
    ),
  };
};

export default usePokemonFilters;
