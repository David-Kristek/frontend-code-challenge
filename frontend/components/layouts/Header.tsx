import { ContentSwitcher, Switch, Grid, Column } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import styles from "./layouts.module.scss";
import FullRow from "./FullRow";
import { useRouter } from "next/router";

const NAV_ROUTES = ["/", "/favorites"];

const Header: React.FC = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(NAV_ROUTES.indexOf(router.pathname));
  }, [router]);
  return (
    <Grid as="header">
      <FullRow>
        <Column lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 4 }}>
          <ContentSwitcher
            selectionMode="manual"
            onChange={({ index }) => {
              if (index !== undefined) {
                router.push(NAV_ROUTES[index]);
                setActive(index);
              }
            }}
            size="lg"
            className={styles.gridItem}
            selectedIndex={active}
          >
            <Switch name="one" text="All" />
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
