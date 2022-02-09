import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import * as d3 from "d3";

function App() {
  const [data] = useState([200, 250, 60, 50, 120, 100, 175]);
  const svgRef = useRef();

  useEffect(() => {
    //svg container
    const w = 800;
    const h = 600;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "75px");

    //scaling
    const xScale = d3
      .scaleBand()
      .domain(data.map((val, i) => i))
      .range([0, w])
      .padding(0.5);
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

    //setting the axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    //setting the svg
    svg.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("x", (v, i) => xScale(i))
    .attr("y", yScale)
    .attr("width", xScale.bandwidth)
    .attr("height", val => h - yScale(val));

    //adding axes labels
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w )
    .attr("y", h + 40)
    .text("Number of items in set (data.length)");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Numbers in set");


  }, [data]);

  return (
    <div className="App">
      <div className="border">
      <div className="container">
      <h1>Basic React Bar Chart Template</h1>
      <svg ref={svgRef}></svg>{" "}
      </div>
      </div>
    </div>
  );
}

export default App;
