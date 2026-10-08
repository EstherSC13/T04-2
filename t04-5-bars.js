const createBarChart = (data) => {
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);
    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);

    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", displayW)
        .attr("height", displayH)
        .style("border", "1px solid #ccc");

    const xMax = d3.max(data, d => d.count);
    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    const labelX = 100;
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    barAndLabel
        .append("rect")
        .attr("x", labelX)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", labelX)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => labelX + xScale(d.count) + 4)
        .attr("y", 12)
        .style("font-family", "sans-serif")
        .style("font-size", "13px");
};