import { ReactNode, useEffect, useRef, useState } from "react";

import Link from "@mui/material/Link";
import Typography, { TypographyProps } from "@mui/material/Typography";

import Paragraph from "../components/Paragraph";

import { HTMLParser, HTMLParserFactory } from "../utils/react-html";

function HeadingFactory(variant: TypographyProps["variant"]) {
  return (props: TypographyProps) => {
    return <Typography variant={variant} {...props} />;
  };
}

const mapHTMLToReact = {
  p: Paragraph,
  a: Link,
  h1: HeadingFactory("h1"),
  h2: HeadingFactory("h2"),
  h3: HeadingFactory("h3"),
  h4: HeadingFactory("h4"),
  h5: HeadingFactory("h5"),
  h6: HeadingFactory("h6"),
};

const useHtmlParser = (content: string) => {
  const parserRef = useRef<HTMLParser>();
  const [rendered, setRendered] = useState<ReactNode[]>();

  useEffect(() => {
    parserRef.current = HTMLParserFactory(mapHTMLToReact);
    setRendered(parserRef.current(content));
  }, [content]);

  return rendered;
};

export default useHtmlParser;
