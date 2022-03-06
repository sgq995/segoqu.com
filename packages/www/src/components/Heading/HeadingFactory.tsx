import Typography, { TypographyProps } from "@mui/material/Typography";

function HeadingFactory(variant: TypographyProps["variant"]) {
  function Heading(props: TypographyProps) {
    return <Typography variant={variant} {...props} />;
  }

  return Heading;
}

export default HeadingFactory;
