import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import worldData from './world-110m.json'; // GeoJSON data
import './MapChart.css'; // Import CSS file

const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Projection
    const projection = d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    // Path generator
    const pathGenerator = d3.geoPath().projection(projection);

    // Draw map
    svg.selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', 'lightgray')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        setTooltipContent(d.properties.name);
      })
      .on('mouseout', () => {
        setTooltipContent('');
      });

    // Tooltip
    svg.append('text')
      .attr('id', 'tooltip')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', 'black')
      .text(tooltipContent);
  }, [tooltipContent]);

  return (
    <div className="map-container" >
      <svg ref={svgRef} style={{ height: "100%", width:"100%" }}></svg>
      <div id="tooltip">{tooltipContent}</div>
    </div>
  );
};

export default MapChart;
