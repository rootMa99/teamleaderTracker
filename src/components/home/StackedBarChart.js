import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const keys = Object.keys(data[0]).filter(key => key !== 'label');

    const stack = d3.stack().keys(keys);

    const stackedData = stack(data);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, width + margin.left])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))])
      .nice()
      .range([height, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeCategory10);

    svg.selectAll('*').remove(); // Clear previous drawings

    svg.append('g')
      .selectAll('g')
      .data(stackedData)
      .join('g')
        .attr('fill', d => color(d.key))
      .selectAll('rect')
      .data(d => d)
      .join('rect')
        .attr('x', (d, i) => xScale(data[i].label))
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth());

    svg.selectAll('.text-label')
      .data(stackedData)
      .join('g')
      .selectAll('text')
      .data(d => d)
      .join('text')
        .attr('class', 'text-label')
        .attr('x', (d, i) => xScale(data[i].label) + xScale.bandwidth() / 2)
        .attr('y', d => (yScale(d[0]) + yScale(d[1])) / 2) // Center vertically
        .attr('text-anchor', 'middle')
        .attr('fill', 'white') // Adjust the color of the text
        .attr('font-size', '12px') // Adjust font size
        .text(d => d[1] - d[0]); // Display the difference between the upper and lower values of each bar

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={svgRef} style={{ height: "100%", width:"100%" }}></svg>;
};

export default StackedBarChart;
