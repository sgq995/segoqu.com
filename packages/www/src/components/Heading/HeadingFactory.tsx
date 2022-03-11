import type { TypographyProps } from "@mui/material/Typography";

import { Typography } from "../Material";

function HeadingFactory(variant: TypographyProps["variant"]) {
  function Heading(props: TypographyProps) {
    return <Typography variant={variant} {...props} />;
  }

  return Heading;
}

export default HeadingFactory;
