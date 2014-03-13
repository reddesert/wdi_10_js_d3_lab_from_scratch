window.onload = function() {
  d3.csv("cleaner_data.csv",
    function(error, rows) {
      var color = d3.scale.category10();
      var nested_data = d3.nest()
                   .key(function(d) { return d.category} )
                   .entries(rows);

      d3.select("#employment")
        .selectAll('g')
        .data(nested_data)
        .enter()
          .append('g')
          .attr('transform', function(d, i) { return "translate(" + i * 40 + ", 0)"})
          .selectAll('rect') // These 3 seem to like each other
          .data(function(group) { return group.values; })
          .enter()
            .append('rect')
              .attr('width', 12 )
              .attr('x', function(d, i) { return i * 13 })
              .attr('height', function(d) { return d.percent_employed })
              .attr('y', function(d) { return (100 - +d.percent_employed) })
              .style('fill', function(d) { return color(d.category) });

    });
};
