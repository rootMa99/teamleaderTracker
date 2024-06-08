import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    console.log(data); // Add this line to check if data is received correctly

    if (!data) return;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.sum(d.crews, c => c.ratio))]).nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(data[0].crews.map(d => d.crew))
      .range(d3.schemeCategory10);

    svg.selectAll("*").remove();

    svg.append("g")
      .selectAll("g")
      .data(d3.stack().keys(data[0].crews.map(d => d.crew))(data.map(d => d.crews)))
      .enter().append("g")
      .attr("fill", (d, i) => color(i))
      .selectAll("rect")
      .data(d => d)
      .enter().append("rect")
      .attr("x", (d, i) => x(data[i].month))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [data]);

  return (
    <svg ref={svgRef} width="600" height="400"></svg>
  );
};

export default StackedBarChart;
