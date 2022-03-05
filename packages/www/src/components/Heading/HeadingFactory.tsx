import Typography, { TypographyProps } from "@mui/material/Typography";

function HeadingFactory(variant: TypographyProps["variant"]) {
  return (props: TypographyProps) => {
    return <Typography variant={variant} {...props} />;
  };
}

export default HeadingFactory;
