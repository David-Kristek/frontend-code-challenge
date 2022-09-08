import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { Column, Grid } from "carbon-components-react";
import styles from "./layouts.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.headerWrapper}>
        <Grid>
          <Column
            lg={{ span: 12, offset: 2 }}
            md={{ span: 8 }}
            sm={{ span: 4 }}
          >
            <Header />
          </Column>
        </Grid>
      </div>
      <Grid>
        <Column xlg={{ span: 12, offset: 2 }} lg={{ span: 14, offset: 1 }} md={{ span: 8 }} sm={{ span: 4 }}>
          <main>{children}</main>
        </Column>
      </Grid>
    </div>
  );
};

export default Layout;
