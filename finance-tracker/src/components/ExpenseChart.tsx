// src/components/ExpenseChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Expense {
  category: string;
  amount: number;
}

interface ExpenseChartProps {
  data: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Clear existing content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create pie chart
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Data processing
    const pie = d3.pie<Expense>().value((d) => d.amount);
    const dataReady = pie(data);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Append slices
    svg
      .selectAll('slice')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', (d: any) => arc(d) as string)
      .attr('fill', (d, i) => color(i.toString()))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    // Add labels
    svg
      .selectAll('text')
      .data(dataReady)
      .enter()
      .append('text')
      .text((d) => d.data.category)
      .attr('transform', (d: d3.PieArcDatum<Expense>) => {
        const centroid = arc.centroid(d as unknown as d3.DefaultArcObject);
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .style('text-anchor', 'middle')
      .style('font-size', '14px');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ExpenseChart;
