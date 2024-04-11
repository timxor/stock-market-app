// Set dimensions and margins for the chart
const margin = { top: 30, right: 20, bottom: 60, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create our gradient  
const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#85bb65")
    .attr("stop-opacity", 1);

gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#85bb65")
    .attr("stop-opacity", 0);

// Load and process the data
d3.csv('Apple Inc Historical Price Data.csv').then(data => {
    // Parse the Date and convert the High to a number
    const parseDate = d3.timeParse("%m/%d/%Y");
    data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.High = Number(d.High.replace(/[^0-9\.-]+/g, ""));
    });

    // Set the domains for the x and y scales
    x.domain(d3.extent(data, d => d.Date));
    y.domain([0, d3.max(data, d => d.High)]);

    // Add the area path
    const area = d3.area()
        .x(d => x(d.Date))
        .y0(height)
        .y1(d => y(d.High));

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", "url(#gradient)")
        .style("opacity", .5);

    // Add the line path
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.High));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "#85bb65")
        .attr("stroke-width", 1)
        .attr("d", line);

    // Add circle element
    const circle = svg.append("circle")
        .attr("r", 0)
        .attr("fill", "red")
        .style("stroke", "white")
        .attr("opacity", 0.7)
        .style("pointer-events", "none");

    // Add red lines extending from the circle to the date and value
    const tooltipLineX = svg.append("line")
        .attr("class", "tooltip-line")
        .attr("id", "tooltip-line-x")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

    const tooltipLineY = svg.append("line")
        .attr("class", "tooltip-line")
        .attr("id", "tooltip-line-y")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

    // Create a listening rectangle
    /*const listeningRect = svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("opacity", 0)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);*/
    const listeningRect = svg.append("rect")
    .attr("width", width)
    .attr("height", height);

    // Tooltip
    const tooltip = d3.select("#chart-container")
        .append("div")
        .attr("class", "tooltip")
        .style("display", "none");

    function mousemove(event) {
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.Date).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
        const xPos = x(d.Date);
        const yPos = y(d.High);

        // Update the circle position
        circle.attr("cx", xPos).attr("cy", yPos);

        // Add transition for the circle radius
        circle.transition()
            .duration(50)
            .attr("r", 5);

        // Update the position of the red lines
        tooltipLineX.style("display", "block").attr("x1", xPos).attr("x2", xPos).attr("y1", 0).attr("y2", height);
        tooltipLineY.style("display", "block").attr("y1", yPos).attr("y2", yPos).attr("x1", 0).attr("x2", width);

        // Add tooltip content
        tooltip
            .style("display", "block")
            .html(`High: $${d.High.toFixed(2)}<br>Date: ${d.Date.toISOString().slice(0, 10)}`)
            .style("left", `${xPos + margin.left}px`)
            .style("top", `${yPos + margin.top - 20}px`);
    }

    function mouseleave() {
        circle.transition().duration(50).attr("r", 0);
        tooltip.style("display", "none");
        tooltipLineX.style("display", "none");
        tooltipLineY.style("display", "none");
    }
});
