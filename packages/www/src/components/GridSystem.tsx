import { HTMLProps } from "react";

import { NextComponentType } from "next";

import type { BoxProps } from "@mui/material/Box";
import type { GridProps } from "@mui/material/Grid";

import { Box, Grid } from "./Material";

const GridSystem: NextComponentType = ({
  className,
  ...props
}: GridProps | BoxProps) => {
  if (className?.includes("wp-block-columns")) {
    return <Grid container {...(props as GridProps)} />;
  } else if (className?.includes("wp-block-column")) {
    return <Grid xs item {...(props as GridProps)} />;
  } else if (className?.includes("wp-block-image")) {
    return (
      <Box
        className={className}
        display="flex"
        justifyContent="center"
        {...(props as BoxProps)}
      />
    );
  }

  return (
    <div className={className} {...(props as HTMLProps<HTMLDivElement>)} />
  );
};

export default GridSystem;
