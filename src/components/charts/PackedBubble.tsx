//taken shamelessly from
// https://medium.com/react-courses/who-doesnt-like-charts-draw-a-bubble-chart-with-react-d3-typescript-2faf998109e2

import * as d3 from "d3";
import type { Simulation, SimulationNodeDatum } from "d3-force";
import { PureComponent } from "react";
import uuid from "react-uuid";

interface IBubbleChartProps {
  bubblesData: bubbleData[];
  width: number;
  height: number;
  backgroundColor: string;
  textFillColor: string;
  minValue: number;
  maxValue: number;
  selectedCircle: (content: string) => void;
}

interface IBubbleChartState {
  data: ForceData[];
}

class BubbleChart extends PureComponent<IBubbleChartProps, IBubbleChartState> {
  public forceData: ForceData[];

  private simulation: Simulation<SimulationNodeDatum, undefined> | undefined;

  constructor(props: IBubbleChartProps) {
    super(props);
    this.state = {
      data: [],
    };
    this.forceData = this.setForceData(props);
  }

  componentDidMount() {
    this.animateBubbles();
  }
  setForceData = (props: IBubbleChartProps): ForceData[] => {
    return props.bubblesData.map((bubble) => {
      return { size: bubble.size };
    });
  };

  animateBubbles = () => {
    if (this.props.bubblesData.length > 0) {
      this.simulatePositions(this.forceData);
    }
  };

  radiusScale = (value: d3.NumberValue) => {
    const fx = d3
      .scaleSqrt()
      .range([1, 50])
      .domain([this.props.minValue, this.props.maxValue]);
    return fx(value);
  };

  simulatePositions = (data: ForceData[]) => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data as SimulationNodeDatum[])
      .velocityDecay(0.05)
      .force("x", d3.forceX().strength(0.2))
      .force("y", d3.forceY().strength(0.2))
      .force(
        "collide",
        d3.forceCollide((d: SimulationNodeDatum) => {
          return this.radiusScale((d as ForceData).size) + 2;
        })
      )
      .on("tick", () => {
        this.setState({ data });
      });
  };

  renderBubbles = (data: []) => {
    return data.map((item: { v: number; x: number; y: number }, index) => {
      const { props } = this;
      const fontSize =
        this.radiusScale((item as unknown as ForceData).size) / 4;
      const content =
        props.bubblesData.length > index ? props.bubblesData[index].name : "";
      const strokeColor =
        props.bubblesData.length > index
          ? "darkgrey"
          : this.props.backgroundColor;
      return (
        <g
          key={`g-${uuid()}`}
          transform={`translate(${props.width / 2 + item.x - 70}, ${
            props.height / 2 + item.y
          })`}
        >
          <circle
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.selectedCircle(content);
            }}
            id="circleSvg"
            r={this.radiusScale((item as unknown as ForceData).size)}
            fill="#e05a54"
            stroke={strokeColor}
            strokeWidth="2"
          />
          <text
            onClick={() => {
              this.props.selectedCircle(content);
            }}
            dy="6"
            className=""
            fill={this.props.textFillColor}
            textAnchor="middle"
            fontSize={`${fontSize}px`}
            fontWeight="normal"
          >
            {content}
          </text>
        </g>
      );
    });
  };

  render() {
    return (
      <div>
        <div
          aria-hidden="true"
          id="chart"
          style={{ background: this.props.backgroundColor, cursor: "pointer" }}
        >
          <svg width={this.props.width} height={this.props.height}>
            {this.renderBubbles(this.state.data as [])}
          </svg>
        </div>
      </div>
    );
  }
}

export default BubbleChart;
