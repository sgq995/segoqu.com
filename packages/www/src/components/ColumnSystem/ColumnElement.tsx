import { NextComponentType } from "next";

import { HTMLProps } from "react";

import { GridProps } from "@mui/material/Grid";

import Container from "./Container";
import Column from "./Column";

const ColumnElement: NextComponentType = ({
  className,
  ...props
}: GridProps) => {
  if (className?.includes("wp-block-columns")) {
    return <Container {...props} />;
  } else if (className?.includes("wp-block-column")) {
    return <Column {...props} />;
  }

  return (
    <div className={className} {...(props as HTMLProps<HTMLDivElement>)} />
  );
};

export default ColumnElement;
