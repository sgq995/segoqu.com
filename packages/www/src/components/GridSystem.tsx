import { NextComponentType } from "next";

import { HTMLProps } from "react";

import Box, { BoxProps } from "@mui/material/Box";
import Grid, { GridProps } from "@mui/material/Grid";

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
