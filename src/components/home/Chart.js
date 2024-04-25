import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;

    // Define scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    // Draw bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.label))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.value))
      .attr('fill', 'steelblue');

    // Draw axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <svg ref={svgRef} style={{ height: "100%", width:"100%" }}></svg>
  );
};

export default Chart;
