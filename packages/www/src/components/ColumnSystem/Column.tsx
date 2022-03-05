import { NextComponentType } from "next";

import Grid, { GridProps } from "@mui/material/Grid";

const Column: NextComponentType = (props: GridProps) => {
  return <Grid xs item {...props} />;
};

export default Column;
