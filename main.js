window.onload = function() {
  d3.csv("cleaner_data.csv",
    function(error, rows) {
      var multiplier = 3;
      var color = d3.scale.category10();
      var bar_width = 10;
      var current_offset = 0;
      var nested_data = d3.nest()
                   .key(function(d) { return d.category} )
                   .entries(rows);

      // SVG Viewport selection
      var employment = d3.select("#employment");

      // Create the scale that we'll use for the axis
      var axisScale = d3.scale.linear().domain([0, 10]).range([0, 100]);

      // Create the axis
      var yAxis = d3.svg.axis().orient(['left']).scale(axisScale);

      employment.selectAll('g')
        .data(nested_data)
        .enter()
          .append('g')
          .attr('transform', function(d, i) {
              if (i > 0) {
                current_offset += bar_width * nested_data[i - 1].values.length;
              }
              return "translate(" + current_offset + ", 0)"})
          .selectAll('rect') // These 3 seem to like each other
          .data(function(category) { return category.values; })
          .enter()
            .append('rect')
              .attr('width', bar_width - 4 )
              .attr('x', function(d, i) { return i * (bar_width) })
              .attr('height', function(d) { return d.percent_employed * multiplier })
              .attr('y', function(d) { return (100 - +d.percent_employed) * multiplier })
              .style('fill', function(d) { return color(d.category) });

      // Create an SVG group Element for the Axis elements and call the xAxis function
      var yAxisGroup = employment.append('g')
                      .attr('class', 'y axis')
                      .attr('transform', 'translate(20, 0)')
                      .call(yAxis);

    });
};
