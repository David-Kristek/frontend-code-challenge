import {
  ContentSwitcher,
  Switch,
  Search,
  Grid,
  Column,
  Row,
  Dropdown,
  DropdownSkeleton,
} from "carbon-components-react";
import React from "react";
import styles from "./layouts.module.scss";
import { green } from "@carbon/colors";
import FullRow from "./FullRow";
import { Thumbnail_2, Table } from "@carbon/icons-react";

const Header: React.FC = () => {
  return (
    <Grid as="header" className={styles.headerWrapper}>
      <FullRow>
        <Column lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 4 }}>
          <ContentSwitcher
            selectionMode="manual"
            onChange={() => {
              console.log("change");
            }}
            size="lg"
            className={styles.gridItem}
            light={true}
          >
            <Switch name="one" text="All" className={styles.active} />
            <Switch name="two" text="Favorites" />
          </ContentSwitcher>
        </Column>
      </FullRow>
    </Grid>
  );
};

export default Header;

// const Nav = () => (

// );
