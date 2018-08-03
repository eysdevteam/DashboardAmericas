// margin
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 210 - margin.right - margin.left,
    height = 210 - margin.top - margin.bottom,
    radius = width/2;

// define the svg for pie chart
var svg3 = d3.select("#pie2").append("svg")
    .attr("width", width)
    .attr("height", height)   
    .attr("class","donutsel")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

function Update4(graph1,graph2,graph3,graph4){
    
svg3.selectAll("*").remove();

var color = d3.scaleOrdinal()
    .range(["#99C0DB","#E2E2E2"]);

// pie chart arc. Need to create arcs before generating pie
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 35);

 // append text
  svg3.append("text")
   .attr("text-anchor", "middle")
	.attr("dy", "0em")
   .text(graph1+"%")
	.style("font-family","Roboto")	
    .attr("class","letritas")
	.style("font-size", "36px");
    
	svg3.append("text")
   .attr("text-anchor", "middle")
	.attr("dy", "1em")
   .text("AHT")
.attr("class","letritas")
	.style("font-family","Roboto")	
	.style("font-size", "20px");

var layer= svg3.append("g")
.attr("class","rotate");
    
var data = [
	{ name: 'Ocup', percent: graph1 },
	{ name: 'Non-Ocup', percent: (100-graph1) }
];
    
data.forEach(function(d) {
        d.percent = +d.percent;
        d.name = d.name;
    })
    
var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.percent; });
// GRAFICO 1
  // "g element is a container used to group other SVG elements"
  var g2 = layer.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");   

  // append path 
  g2.append("path")
      .attr("d", arc)      
      .style("fill", function(d) { return color(d.data.name); })
    // transition 
    .transition()
      .ease(d3.easeLinear)
      .duration(1000)
      .attrTween("d", tweenDonut1);
    
function tweenDonut1(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

}
