import { ReactNode, useEffect, useRef, useState } from "react";

import Link from "@mui/material/Link";

import ContentImage from "../components/ContentImage";
import FigCaption from "../components/FigCaption";
import Figure from "../components/Figure";
import GridSystem from "../components/GridSystem";
import { H1, H2, H3, H4, H5, H6 } from "../components/Heading";
import Paragraph from "../components/Paragraph";

import { HTMLParser, HTMLParserFactory } from "../utils/react-html";

const mapHTMLToReact = {
  div: GridSystem,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  a: Link,
  img: ContentImage,
  figure: Figure,
  figcaption: FigCaption,
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
