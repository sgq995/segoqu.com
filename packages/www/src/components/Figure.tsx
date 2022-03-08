import { NextComponentType } from "next";

import Box, { BoxProps } from "@mui/material/Box";

const Figure: NextComponentType = ({ className, ...props }: BoxProps) => {
  return (
    <Box
      className={className}
      component="figure"
      display="flex"
      flexDirection="column"
      {...props}
    />
  );
};

export default Figure;
