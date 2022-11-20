interface bubbleOptions<T> {
  name?: (n: T) => string; // alias for label
  label: (n: T) => string; // given d in data, returns text to display on the bubble
  value: (n: T) => number; // given d in data, returns a quantitative size
  group: (n: T) => string; // given d in data, returns a categorical value for color
  title: (n: T) => string; // given d in data, returns text to show on hover
  link: (n: T) => string; // given a node d, its link (if any)
  linkTarget: string; // the target attribute for links, if any
  width: number; // outer width, in pixels
  height: number; // outer height, in pixels
  padding: number; // padding between circles
  margin: number; // default margins
  marginTop: number; // top margin, in pixels
  marginRight: number; // right margin, in pixels
  marginBottom: number; // bottom margin, in pixels
  marginLeft: number; // left margin, in pixels
  groups?: string[]; // array of group names (the domain of the color scale)
  colors: readonly string[]; // an array of colors (for groups)
  fill: string; // a static fill color, if no group channel is specified
  fillOpacity: number; // the fill opacity of the bubbles
  stroke?: any; // a static stroke around the bubbles
  strokeWidth?: any; // the stroke width around the bubbles, if any
  strokeOpacity?: any; // the stroke opacity around the bubbles, if any
}
