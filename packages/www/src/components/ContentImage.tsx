import { ComponentType } from "react";

import Image, { ImageProps } from "next/image";

const ContentImage: ComponentType<ImageProps> = ({
  src,
  alt,
  ...props
}: ImageProps) => {
  const layout: ImageProps["layout"] =
    props.width && props.height
      ? props.layout
        ? props.layout
        : "fixed"
      : "fill";

  return (
    <Image
      objectFit="cover"
      src={src}
      alt={alt ?? ""}
      layout={layout}
      {...props}
    />
  );
};

export default ContentImage;
