import { ComponentType } from "react";

import Image, { ImageProps } from "next/image";

import Box from "@mui/material/Box";

const ContentImage: ComponentType<ImageProps> = ({
  src,
  alt,
  ...props
}: ImageProps) => {
  const layout: ImageProps["layout"] =
    props.width && props.height ? props.layout : "fill";

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", position: "relative" }}>
      <Image src={src} alt={alt ?? ""} layout={layout} {...props} />
    </Box>
  );
};

export default ContentImage;
