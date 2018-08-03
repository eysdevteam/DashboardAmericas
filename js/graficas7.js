//Se filtra por cliente, campaña y mes
var filtro5="Colaborador1_1_1";
var filtro6="Enero";
var filtro7="Campana1_1"

$(window).resize(function(){Update7(filtro5,filtro6,filtro7)});

function colaboradores(obj){
    var t3 = $(obj).text();
    filtro5=t3; 
    console.log(t3);
    Update7(t3,"Enero",filtro7);
}

function fechas(obj){
    var t4 = $(obj).text();
    filtro6=t4; 
    console.log(t4);
    Update7(filtro5,t4,filtro7);
}

function Updatecolab(filtrocolab){
    
d3.json("/jsonfiles/datosscatter.json", function (data) {
    
        var z;
        var aux3="Hola";
        var tercerdropdown=[];
        var cuartodropdown=[];
        for (z = 0; z < data.length; z++) { 
            if(data[z].campana==filtrocolab){
                if(aux3!=data[z].colaborador){ 
                    tercerdropdown.push(data[z].colaborador);
                    aux3=data[z].colaborador; 
                }
            }
		}      
        for (u = 0; u < data.length; u++) { 
            if(data[u].colaborador==tercerdropdown[0] && data[u].campana==filtrocolab){                
                    cuartodropdown.push(data[u].mes);  
            }
		} 
        console.log(tercerdropdown);
        $('#opciones3').empty();
        $.each(tercerdropdown, function(i, p) {
            $('#opciones3').append($('<a href="#a" onclick="colaboradores(this)"></a>').val(p).html(p));
        });
        $('#opciones4').empty();
        $.each(cuartodropdown, function(i, p) {
            $('#opciones4').append($('<a href="#a" onclick="fechas(this)"></a>').val(p).html(p));
        });
    filtro5=tercerdropdown[0];
    filtro6=cuartodropdown[0];
    filtro7=filtrocolab;
    Update7(filtro5,filtro6,filtro7);
});
}

function Update7(colaborador,mes,campana){

$( ".remove3" ).remove();  
    
var margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 95
};

var width4=$('.container-p1').width();
var height4=$('.container-p1').height()*1.2;

var width = width4 - margin.left - margin.right,
    height = height4 - margin.top - margin.bottom;

var x = d3.scaleLinear().rangeRound([0, width-30]);
var y = d3.scaleBand().rangeRound([height, 0]).padding(0.2);
     
   
var svg17 = d3.select("#barras1").append("svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr("class", "remove3")  
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
d3.json('/jsonfiles/datosscatter.json', function(err, data){  
        if(err) throw err; 
    
//Se hace una nueva lista de datos por cada mes     
var sales=[];
var salesperson=[];
    
    for(l=0;l<data.length;l++){
        if(data[l].campana==campana){            
            if(data[l].colaborador==colaborador){
                if(data[l].mes==mes){
                    data=[{
    "salesperson": "Coaching",
    "sales": data[l].coaching,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "Otros",
    "sales": data[l].otros,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "Retro",
    "sales": data[l].retro,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "PA",
    "sales": data[l].pa,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "Break",
    "sales": data[l].break,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "ACW",
    "sales": data[l].acw,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "Disp",
    "sales": data[l].disp,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "ACD",
    "sales": data[l].acd,
    "colab": "Colaborador1"
  },
  {
    "salesperson": "Hold",
    "sales": data[l].hold,
    "colab": "Colaborador1"
  }];
                }  
            }
        }
    } 
     
    data.forEach(function(d){
            d.sale = +d.sale;
        });
        
        x.domain([0, d3.max(data, function(d) { return d.sales; })]);
        y.domain(data.map(function(d) { return d.salesperson; })); 
    
//Crea los rectangulos para cada barra
      svg17.selectAll("#barras1")
          .data(data) 
        .enter()
          .append("rect") 
          .attr("class","bar")
          .attr("y", function(d) { return y(d.salesperson); })
          .attr("height", y.bandwidth()-4)
          .transition()
        .delay(function (d,i){ return i * 40;})
        .duration(200) 
    .attr("x", 0)
          .attr("width", function(d) { return x(d.sales*0.11);});  
        
// Añade la Axis de Y        

         svg17.append("g")
            .call(d3.axisLeft(y));
    
//Añade el texto y la animación de entrada
        svg17.selectAll("#barras1")  		
	  .data(data)
	  .enter()
	  .append("text")
	  .attr("class","label")
    .transition()
    .delay(500)
      .duration(220)
	  .attr("x", function(d) { return x(d.sales*0.11)+5;} )
      .attr("y", function(d) { return y(d.salesperson)+2; })
	  .attr("dy", ".75em")
	  .text(function(d) { return d.sales+"%"; });
 
    });
}