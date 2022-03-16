import type { ReactElement } from "react";

export function instanceofReactElement(object: any): object is ReactElement {
  return "type" in object && "props" in object;
}
