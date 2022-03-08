import { NextComponentType } from "next";

import Typography, { TypographyProps } from "@mui/material/Typography";

const FigCaption: NextComponentType = ({
  className,
  ...props
}: TypographyProps) => {
  const align: TypographyProps["align"] =
    ((className?.includes("has-text-align-") &&
      className?.replace("has-text-align-", "")) as TypographyProps["align"]) ||
    "inherit";

  return (
    <Typography
      component="figcaption"
      variant="caption"
      className={className}
      align={align}
      {...props}
    />
  );
};

export default FigCaption;
