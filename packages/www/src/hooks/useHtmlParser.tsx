import { ReactNode, useEffect, useRef, useState } from "react";
import { HTMLParser, HTMLParserFactory } from "../utils/react-html";

const useHtmlParser = (content: string) => {
  const parserRef = useRef<HTMLParser>();
  const [rendered, setRendered] = useState<ReactNode[]>();

  useEffect(() => {
    parserRef.current = HTMLParserFactory({});
    setRendered(parserRef.current(content));
  }, [content]);

  return rendered;
};

export default useHtmlParser;
