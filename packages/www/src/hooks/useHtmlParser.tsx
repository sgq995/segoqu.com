import { ReactNode, useEffect, useRef, useState } from "react";

import Link from "@mui/material/Link";

import Paragraph from "../components/Paragraph";

import { HTMLParser, HTMLParserFactory } from "../utils/react-html";

const mapHTMLToReact = {
  p: Paragraph,
  a: Link,
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
