import * as d3 from "d3";
import type { Simulation, SimulationNodeDatum } from "d3-force";
import { FC, useEffect, useState } from "react";
import uuid from "react-uuid";

interface props {
  bubblesData: bubbleData[];
  width: number;
  height: number;
  backgroundColor: string;
  textFillColor: string;
  minValue: number;
  maxValue: number;
  selectedCircle: (content: string) => void;
}

function setupForceData(bubblesData: bubbleData[]): ForceData[] {
  return bubblesData.map((each) => {
    return { size: each.size };
  });
}

let BubbleChart: FC<props> = ({
  bubblesData,
  minValue,
  maxValue,
  width,
  height,
  selectedCircle,
  textFillColor,
  backgroundColor,
}) => {
  let [data, setData] = useState<ForceData[]>([]);
  let forceData = setupForceData(bubblesData);

  let radiusScale = (value: d3.NumberValue) => {
    const fx = d3.scaleSqrt().range([1, 50]).domain([minValue, maxValue]);
    return fx(value);
  };

  let applyForce = (copy: ForceData[]) => {
    d3.forceSimulation()
      .nodes(copy as SimulationNodeDatum[])
      .velocityDecay(0.05)
      .force("x", d3.forceX().strength(0.2))
      .force("y", d3.forceY().strength(0.2))
      .force(
        "collide",
        d3.forceCollide((d: SimulationNodeDatum) => {
          return radiusScale((d as ForceData).size) + 2;
        })
      )
      .on("tick", () => {
        setData(copy);
      });
  };

  let renderBubbles = (data: any[]) => {
    return data.map((item: { v: number; x: number; y: number }, index) => {
      let bubble = bubblesData[index];
      let fontSize = radiusScale((item as unknown as ForceData).size) / 4;
      let content = bubble.name;
      let color = bubble.fillColor;

      return (
        <g
          key={`g-${uuid()}`}
          transform={`translate(${width / 2 + item.x - 70}, 
          ${height / 2 + item.y})`}
        >
          <circle
            style={{ cursor: "pointer" }}
            onClick={() => {
              selectedCircle(content);
            }}
            id="circleSvg"
            r={radiusScale((item as unknown as ForceData).size)}
            fill={color}
          />
          <text
            onClick={() => {
              selectedCircle(content);
            }}
            dy="6"
            fill={textFillColor}
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

  useEffect(() => {
    if (bubblesData[0]) {
      applyForce(forceData);
    }
  }, []);

  return (
    <div>
      <div
        aria-hidden="true"
        id="chart"
        style={{ background: backgroundColor }}
      >
        <svg width={width} height={height}>
          {renderBubbles(data)}
        </svg>
      </div>
    </div>
  );
};

export default BubbleChart;
