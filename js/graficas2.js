//Gráfica de Donut

//Se crean las dimensiones del donut
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 210 - margin.right - margin.left,
    height = 210 - margin.top - margin.bottom,
    radius = width/2;

// Se crea el svg dentro de pie1 que contendrá la gráfica con las dimensiones especificadas, se le otorga una clase donutsel
var svg2 = d3.select("#pie1").append("svg")
    .attr("width", width)
    .attr("height", height)   
    .attr("class","donutsel")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//Se actualiza la gráfica cuando el cliente cambia, la variable que recibe hace referencia al porcentaje sacado en el script de la gráfica scatter  sobre ocupación
function Update3(graph1){
    
//Se borra todo lo que estaba dentro se svg2    
svg2.selectAll("*").remove();

//Colores
var color = d3.scaleOrdinal()
    .range(["#99C0DB","#E2E2E2"]);

//Dimensiones de los arcos
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 35);

//Texto de en medio de los donuts, se actualiza dependiendo de los valores del JSON obtenidos en el primer script
  svg2.append("text")
   .attr("text-anchor", "middle")
	.attr("dy", "0em")
   .text(graph1+"%")
	.style("font-family","Roboto")	
    .attr("class","letritas")
	.style("font-size", "36px");
    
	svg2.append("text")
   .attr("text-anchor", "middle")
	.attr("dy", "1em")
   .text("Ocup")
.attr("class","letritas")
	.style("font-family","Roboto")	
	.style("font-size", "20px");

//Se crea una clase rotate para añadir rotaciones a la gráfica sin afectar el texto
var layer= svg2.append("g")
.attr("class","rotate");
   
//Se crean los datos que se pondrán en la gráfica dependiendo del porcentaje obtenido en el primer script    
var data = [
	{ name: 'Ocup', percent: graph1 },
	{ name: 'Non-Ocup', percent: (100-graph1) }
];
    
data.forEach(function(d) {
        d.percent = +d.percent;
        d.name = d.name;
    })
  
//Se crea la gráfica con los datos seleccionados
var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.percent; });
  var g2 = layer.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");   

//Se hace un path y se anima su entrada
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
