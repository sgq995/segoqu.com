import React from "react";
import type { ReactElement } from "react";

import { NextComponentType } from "next";

import { Box, Paper } from "./Material";

function instanceofReactElement(object: any): object is ReactElement {
  return "type" in object && "props" in object;
}

const Code: NextComponentType = ({ children }: React.PropsWithChildren<{}>) => {
  const code = React.Children.toArray(children)[0];

  if (instanceofReactElement(code)) {
    const { children: codeChildren, ...props } = code.props;

    return (
      <Paper component="pre" variant="outlined">
        <Box
          sx={{ p: 2, display: "inline-block" }}
          component={code.type}
          {...props}
        >
          {codeChildren}
        </Box>
      </Paper>
    );
  }

  return <></>;
};

export default Code;
