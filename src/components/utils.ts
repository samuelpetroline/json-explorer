type NodeType = "object" | "array" | "value";

export function getNodeType(object: any): NodeType {
  return Array.isArray(object) ? "array" : "object";
}

type Tree = {
  nodes: [];
};

type Node = {
  level: number;
  key: string;
  value: any;
};

// export function buildTree(object: any): {
//   return Object.entries(object).map(([key, value], index) => {
//     const nodeType = getNodeType(value);

//     return nodeType === "object" ? buildTree(value) : value.map(buildTree);
//   });
// }

export function getValue(value: any) {
  if (value === null) {
    return "null";
  } else if (value === undefined) {
    return "undefined";
  } else if (typeof value === "string") {
    return JSON.stringify(value);
  } else if (typeof value === "boolean") {
    return value ? "true" : "false";
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "bigint") {
    return `${value.toString()}n`;
  } else if (value instanceof Date) {
    return value.toISOString();
  } else if (typeof value === "function") {
    return "function() { }";
  } else {
    return value.toString();
  }
}
