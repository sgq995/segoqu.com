import { NextComponentType } from "next";

import type { BoxProps } from "@mui/material/Box";

import { Box } from "./Material";

const Figure: NextComponentType = ({ className, ...props }: BoxProps) => {
  let alignItems = undefined;
  let flexGrow = undefined;

  if (className?.includes("aligncenter")) {
    alignItems = "center";
    flexGrow = 0;
  } else if (className?.includes("alignleft")) {
    alignItems = "left";
    flexGrow = 0;
  } else if (className?.includes("alignright")) {
    alignItems = "end";
    flexGrow = 0;
  }

  return (
    <Box
      className={className}
      component="figure"
      display="flex"
      flexDirection="column"
      alignItems={alignItems}
      flexGrow={flexGrow}
      {...props}
    />
  );
};

export default Figure;
