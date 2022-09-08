import React from "react";
import PropTypes from "prop-types";
import { Column, Grid } from "carbon-components-react";

const FullRow: React.FC<{ children: React.ReactNode; noGrid?: boolean }> = ({
  children,
  noGrid,
}) => {
  return (
    <Column lg={{ span: 16 }} md={{ span: 8 }} sm={{ span: 4 }}>
      {noGrid ? children : <Grid>{children}</Grid>}
    </Column>
  );
};

export default FullRow;
