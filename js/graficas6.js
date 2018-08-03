//Gráfica de linea

//Se filtra por cliente su respectivo valor de ocup, aht, con y aus
var filtro3="ocup";
var filtro4="campana1_1";

$(window).resize(function(){Update_1(filtro4)});

function campanas(obj){
    var t2 = $(obj).text();
    filtro4=t2; 
    console.log(t2);
    Update_1(t2);
    Updatecolab(t2);
}

function ocup2(){
    filtro3="ocup"; 
    Update_1(filtro4);
}
function aht2(){
    filtro3="aht";
    Update_1(filtro4);
}
function con2(){
    filtro3="con";
    Update_1(filtro4);
}
function aus2(){
    filtro3="aus";
    Update_1(filtro4);
}

function Update(filtrocliente){
    
d3.json("/jsonfiles/datosscatter.json", function (data) {
    
        var j;
        var aux2="Hola";
        var segundodropdown=[];
        for (j = 0; j < data.length; j++) { 
            if(data[j].cliente==filtrocliente){
                if(aux2!=data[j].campana){ 
                    segundodropdown.push(data[j].campana);
                    aux2=data[j].campana; 
                }
            }
		}
        $('#opciones2').empty();
        $.each(segundodropdown, function(i, p) {
            $('#opciones2').append($('<a href="#a" onclick="campanas(this)"></a>').val(p).html(p));
        });
    filtro4=segundodropdown[0];
    Update_1(segundodropdown[0]);
    Updatecolab(segundodropdown[0]);
});
}
 
function Update_1(filtrocampana){

$( ".remove2" ).remove();    
    
var width3=$('.container-p1').width();
var height3=$('.container-p1').height();
    
var svg16 = dimple.newSvg("#lineas1", width3, height3*1.2);
    
svg16.attr("class", "remove2");
    
d3.json("/jsonfiles/datosscatter.json", function (data2) {

//El filtro cambia dependiendo de la campana seleccionada
var changedData2 =dimple.filterData(data2, "campana", filtrocampana);  
    
var cont=0;
    
for (var i = 0 ; i < changedData2.length; i++) {
    
    if(changedData2[i].mes=="Enero"){
        cont++;
    }
}   
    
for (var i = 0 ; i < changedData2.length; i++) {    
    
    changedData2[i].ocup=(parseInt(changedData2[i].ocup, 10))/cont;
    changedData2[i].aht=(parseInt(changedData2[i].aht, 10))/cont;
    changedData2[i].con=(parseInt(changedData2[i].con, 10))/cont;
    changedData2[i].aus=(parseInt(changedData2[i].aus, 10))/cont;
    changedData2[i].meta=(parseInt(changedData2[i].meta, 10))/cont;
}
    
//Se grafican los puntos de cada mes
var chart = new dimple.chart(svg16, changedData2);				
			chart.setMargins(50,20,50,120);
		    var xAxis = chart.addCategoryAxis("x","mes");
            xAxis.addOrderRule(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiem", "Octubre", "Noviemb", "Diciemb"]); 
		    var yAxis = chart.addMeasureAxis("y",filtro3);
		    yAxis.overrideMax = 100;
            yAxis.showGridlines = false;
            yAxis.hidden=true;
		    var chartSeries = chart.addSeries("Campana1", dimple.plot.bubble);

chart.draw(0, false);

//Se grafican las lineas
var chart2 = new dimple.chart(svg16, changedData2);				
			chart2.setMargins(50,20,50,120);
		    var xAxis = chart2.addCategoryAxis("x","mes");
            xAxis.addOrderRule(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiem", "Octubre", "Noviemb", "Diciemb"]);
            xAxis.hidden=true;
            xAxis.showGridlines = false;
		    var yAxis = chart2.addMeasureAxis("y",filtro3);
		    yAxis.overrideMax = 100;
            yAxis.showGridlines = false;
            yAxis.hidden=true;
		    var chartSeries = chart2.addSeries("Campaña", dimple.plot.line);

chart2.draw(0, false);
});
}

document.getElementById("f-option").checked = true;
