import { NextComponentType } from "next";

import type { TypographyProps } from "@mui/material/Typography";

import { Typography } from "./Material";

const Paragraph: NextComponentType = ({
  className,
  ...props
}: TypographyProps) => {
  const align: TypographyProps["align"] =
    ((className?.includes("has-text-align-") &&
      className?.replace("has-text-align-", "")) as TypographyProps["align"]) ||
    "inherit";

  return (
    <Typography paragraph className={className} align={align} {...props} />
  );
};

export default Paragraph;
