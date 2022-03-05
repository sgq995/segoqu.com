import { NextComponentType } from "next";

import Grid, { GridProps } from "@mui/material/Grid";

const Container: NextComponentType = (props: GridProps) => {
  return <Grid container {...props} />;
};

export default Container;
