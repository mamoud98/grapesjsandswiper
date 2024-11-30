const DefultSectors = [
  {
    id: "general",
    name: "General",
    open: false,
    properties: [
      "display",
      "float",
      "position",
      "top",
      "right",
      "left",
      "bottom",
    ],
  },
  {
    id: "flex",
    name: "Flex",
    open: false,
    properties: [
      "flex-direction",
      "flex-wrap",
      "justify-content",
      "align-items",
      "align-content",
      "order",
      "flex-basis",
      "flex-grow",
      "flex-shrink",
      "align-self",
    ],
  },
  {
    id: "dimension",
    name: "Dimension",
    open: false,
    properties: [
      "width",
      "height",
      "max-width",
      "min-height",
      "margin",
      "padding",
    ],
  },
  {
    id: "typography",
    name: "Typography",
    open: false,
    properties: [
      "font-family",
      "font-size",
      "font-weight",
      "letter-spacing",
      "color",
      "line-height",
      "text-align",
      "text-shadow",
    ],
  },
  {
    id: "decorations",
    name: "Decorations",
    open: false,
    properties: [
      "background-color",
      "border-radius",
      "border",
      "box-shadow",
      "background",
    ],
  },
  {
    id: "extra",
    name: "Extra",
    open: false,
    properties: ["opacity", "transition", "transform"],
  },
];
const backgroundSlid = [
  {
    id: "sild Selected",
    name: "Decorations",
    open: false,
    properties: ["background-color", "background"],
  },
];
export { DefultSectors, backgroundSlid };
