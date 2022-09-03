import React from "react";
import PropTypes from "prop-types";
import { Column, Dropdown, Grid, Search } from "carbon-components-react";
import styles from "../layouts/layouts.module.scss";
import { Thumbnail_2, Table } from "@carbon/icons-react";

const Filters: React.FC<{}> = () => {
  return (
    <Grid style={{ margin: "2rem 0" }}>
      <Column xlg={{ span: 7 }} lg={{ span: 6 }} md={{ span: 4 }} sm={{ span: 4 }}>
        <Search
          closeButtonLabelText="Clear search input"
          labelText="Search"
          placeholder="Search pokemon"
          onChange={function noRefCheck() {}}
          onKeyDown={function noRefCheck() {}}
          className={styles.gridItem}
        />
      </Column>
      <Column xlg={{ span: 2, offset: 8 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }}>
        <Dropdown
          id="dropdown-1"
          items={[
            { id: "option-0", text: "Option 0" },
            { id: "option-1", text: "Option 1" },
            { id: "option-2", text: "Option 2" },
          ]}
          label="Type"
          itemToString={(item) => item.text}
          className={styles.gridItem}
        />
        {/* <DropdownSkeleton /> */}
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
  );
};

export default Filters;
