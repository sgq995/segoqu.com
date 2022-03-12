import React from "react";
import type { ReactElement } from "react";

import { NextComponentType } from "next";

import { Box, Paper } from "./Material";

function instanceofReactElement(object: any): object is ReactElement {
  return "type" in object && "props" in object;
}

const Code: NextComponentType = ({ children }: React.PropsWithChildren<{}>) => {
  try {
    const code = React.Children.toArray(children)[0];

    if (instanceofReactElement(code)) {
      const { children: codeChildren, ...props } = code.props;

      const content = React.Children.toArray(codeChildren)
        .flatMap((child) => {
          console.group("map");
          console.log({ child });
          console.groupEnd();
          if (typeof child === "string") {
            return child.split("\n");
          } else {
            return null;
          }
        })
        .filter((child) => {
          console.group("filter");
          console.log({ child });
          console.groupEnd();
          return typeof child === "string";
        })
        .reduce<React.ReactNode[]>((contentChildren, child, index, array) => {
          console.group("reduce");
          console.log({ child });
          console.groupEnd();
          
          if (index > 0 && index < array.length) {
            return contentChildren.concat(
              React.createElement("br", { "data-rich-text-line-break": true }),
              React.createElement("span", {}, child as string)
            );
          } else {
            return contentChildren.concat(
              React.createElement("span", {}, child as string)
            );
          }
        }, []);

      console.log({ codeChildren, content });

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
  } catch (err) {
    console.error(err);
  }

  return <></>;
};

export default Code;
