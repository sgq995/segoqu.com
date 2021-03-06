import { createElement, ElementType, ReactNode } from "react";

const mapAttrToReact: { [attr: string]: string } = {
  class: "className",
  style: "data-style",
};

interface HTMLElementWithClass {
  tag: string;
  classList: string[];
}

interface MapHTMLToReact {
  [tag: string]: ElementType;
}

export interface HTMLParser {
  (html: string): ReactNode[];
}

const CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9-]+$/;
const HYPHEN_REGEX = /-([a-z])/g;
const NO_HYPHEN_REGEX = /^[^-]+$/;
const VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;

function styleToObject(style: string) {
  return style
    .replace(HYPHEN_REGEX, (_, initial) => initial.toUpperCase())
    .split(";")
    .reduce<Record<string, string>>((style, statement) => {
      const [property, value]: string[] = statement.split(":");
      style[property] = value;
      return style;
    }, {});
}

export function HTMLParserFactory(mapHTMLToReact: MapHTMLToReact): HTMLParser {
  if (typeof window === "undefined") {
    const { JSDOM } = require("jsdom");
    const dom = new JSDOM();
    global.Node = dom.window.Node;
    global.document = dom.window.document;
  }

  const nodeMap = {
    [Node.ELEMENT_NODE]: ElementMap,
    [Node.TEXT_NODE]: TextMap,
  };

  function getType(element: Element) {
    const tagName = element.tagName.toLowerCase();
    return mapHTMLToReact[tagName] ?? tagName;
  }

  function getProps(element: Element, index: number) {
    const attributes = Array.from(element.attributes);
    return attributes.reduce<Record<string, any>>(
      (props, attribute) => {
        if (attribute.nodeName === "style" && attribute.nodeValue) {
          props["style"] = styleToObject(attribute.nodeValue);
        }

        const propName =
          mapAttrToReact[attribute.nodeName] ?? attribute.nodeName;
        props[propName] = attribute.nodeValue;
        return props;
      },
      { key: index }
    );
  }

  function getChildren(element: Element) {
    const children = convertChildren(Array.from(element.childNodes));
    if (children.length === 0) {
      return undefined;
    }
    return children;
  }

  function ElementMap(node: ChildNode, index: number) {
    const element = <Element>node;
    const type = getType(element);
    const props = getProps(element, index);
    const children = getChildren(element);

    return createElement(type, props, children);
  }

  function TextMap(node: ChildNode, index: number) {
    if (node.nodeValue && /^[\s]+$/.test(node.nodeValue)) {
      return null;
    }

    return node.nodeValue;
  }

  function convertElement(node: ChildNode, index: number) {
    return nodeMap[node.nodeType]?.(node, index);
  }

  function convertChildren(children: ChildNode[]): ReactNode[] {
    return children
      .map((node, index) => convertElement(node, index))
      .filter((node) => node);
  }

  return function (html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const children = Array.from(div.childNodes);

    return convertChildren(children);
  };
}
