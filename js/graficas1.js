//GRÁFICA SCATTER PRINCIPAL

//Si se cambia el tamaño de la ventana se redibujan las gráficas
$(window).resize(function(){Update2(true)});

//Al clickear una opción en modo tablet, si está scrolleada la pantalla de alguna forma, se guarda la posisión para que quede en el mismo lugar

$(window).scroll(function() {
  sessionStorage.scrollTop = $(this).scrollTop();
});

$(document).ready(function() {
  if (sessionStorage.scrollTop != "undefined") {
    $(window).scrollTop(sessionStorage.scrollTop);
  }
});

//Se inicializan las vaiables que servirán de filtros para el JSON
var filtro1="ocup";
var filtro2="Cliente1";
var barrasfechas="Campana1_1";

//Se lee el archivo JSON
d3.json('/jsonfiles/datosscatter.json', function(err, datap1){  
        if(err) throw err;

        var i;
        var aux="Hola";
        //Se genera un arreglo que se llenará con todos los clientes existentes en el archivo JSON para añadirlos al dropdown
        var primerdropdown=[];
        for (i = 0; i < datap1.length; i++) { 
            if(aux!=datap1[i].cliente){
                primerdropdown.push(datap1[i].cliente);
                aux=datap1[i].cliente; 
            }
		}
        //Se añade el arreglo creado como opciones en el html, cada uno con la función clientes que recibe el nombre del cliente
        $('#opciones1').empty();
        $.each(primerdropdown, function(i, p) {
            $('#opciones1').append($('<a href="#" onclick="clientes(this)"></a>').val(p).html(p));
        });
    //Cuando el usuario entra a la página por primera vez, se muestra todo sobre el primer cliente de la lista
    filtro2=primerdropdown[0];
    Update(primerdropdown[0]);
});

//Cada que se selecciona un cliente del dropdown, se genera un filtro nuevo para las otras gráficas y la actual
function clientes(obj){
    var t = $(obj).text();
    filtro2=t; 
    Update2(true);
    Update(t);
}

//Si se selecciona ocup, aht, con o aus cambia el filtro1 y actualiza la gráfica
function ocup(){
    filtro1="ocup"; 
    Update2(false);
}
function aht(){
    filtro1="aht";
    Update2(false);
}
function con(){
    filtro1="con";
    Update2(false);
}
function aus(){
    filtro1="aus";
    Update2(false);
}

Update2(true);

//Función que graficará el Scatter
function Update2(cambio){
    
//Borra todo lo que esté bajo la clase remove1 que posteriormente añadiremos a la gráfica, es decir, borra todo antes de gráficar de nuevo
$( ".remove1" ).remove();

//Da valores de anchura y altura dependiendo del tamaño del contenedor, de manera que si se cambia el tamaño de la ventana las gráficas se actualizan y cambian de dimensión
var width1=$('.container-p1').width();
var height1=$('.container-p1').height();
//Crea la gráfica con las dimensiones dadas
var svg11 = dimple.newSvg("#scatter1", width1*0.7, height1*1.05);

//Asigna la clase remove1    
svg11.attr("class", "remove1");

d3.json("/jsonfiles/datosscatter.json", function (data) {

//Filtra los datos por filtro2, ésta función de dimple busca todos los valores de cliente en el JSON que tengan como valor filtro2
var changedData =dimple.filterData(data, "cliente", filtro2);
 
//Sumatoria de todos los elementos existentes, el promedio se saca diviendo por la cantidad de veces que se repite Enero    
var totalcump=0;  
var totalocup=0;  
var totalaht=0;  
var totalcon=0;  
var totalaus=0;  
var totalmeta=0;
var cont=0;
    
for (var i = 0 ; i < changedData.length; i++) {
    totalocup += parseInt(changedData[i].ocup, 10);
    totalaht += parseInt(changedData[i].aht, 10);
    totalcon += parseInt(changedData[i].con, 10);
    totalaus += parseInt(changedData[i].aus, 10);  
    totalmeta += parseInt(changedData[i].meta, 10);
    
    if(changedData[i].mes=="Enero"){
        cont++;
    }
}   
    
for (var i = 0 ; i < changedData.length; i++) {
    
    
    changedData[i].ocup=(parseInt(changedData[i].ocup, 10))/cont;
    changedData[i].aht=(parseInt(changedData[i].aht, 10))/cont;
    changedData[i].con=(parseInt(changedData[i].con, 10))/cont;
    changedData[i].aus=(parseInt(changedData[i].aus, 10))/cont;
    changedData[i].meta=(parseInt(changedData[i].meta, 10))/cont;
}
    
    if(filtro1=="ocup"){
        totalcump =totalocup;
    }   
    else if(filtro1=="aht"){
        totalcump =totalaht;
    }   
    else if(filtro1=="con"){
        totalcump =totalcon;
    }   
    else if(filtro1=="aus"){
        totalcump =totalaus;
    }   

//Si se cambia de cliente, se asegura de actualizar las gráficas de donut
if(cambio){
var promedioocup= Math.round(totalocup/changedData.length);  
var promedioaht= Math.round(totalaht/changedData.length);      
var promediocon= Math.round(totalcon/changedData.length);      
var promedioaus= Math.round(totalaus/changedData.length); 
    
Update3(promedioocup);
Update4(promedioaht);
Update5(promediocon);
Update6(promedioaus);
}
    
//Estos dos promedios son los que se muestran al lado izquierdo de la gráfica, se actualiza el texto del html    
var promediocump= (totalcump/changedData.length);  
var promediometa=(totalmeta/changedData.length); 
    
document.getElementById("letra1").innerHTML = Math.round(promediometa)+"%";    
document.getElementById("letra2").innerHTML = Math.round(promediocump)+"%";  
    
//Se gráfican los puntos de meta    
var chart1 = new dimple.chart(svg11, changedData);	    
			chart1.setMargins(0,20,0,100);
		    var xAxis = chart1.addCategoryAxis("x","mes");              
		    var yAxis = chart1.addMeasureAxis("y","meta");
            xAxis.addOrderRule(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiem", "Octubre", "Noviemb", "Diciemb"]);
            chart1.defaultColors = [
            new dimple.color("#E2E2E2")
            ];  
		    var chartSeries = chart1.addSeries("Meta", dimple.plot.bubble);           
chart1.draw(0, false);
    
//Se gráfican los puntos de cumplimiento    
var chart2 = new dimple.chart(svg11, changedData);				
			chart2.setMargins(0,20,0,100);
		    var xAxis = chart2.addCategoryAxis("x","mes");
            xAxis.addOrderRule(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiem", "Octubre", "Noviemb", "Diciemb"]);
            chart2.defaultColors = [
                new dimple.color("#99C0DB")                
            ];            
            xAxis.hidden=true;
		    var yAxis = chart2.addMeasureAxis("y",filtro1);
            yAxis.hidden=true;
		    var chartSeries = chart2.addSeries("Cumplimiento", dimple.plot.bubble);

chart2.draw();
});

//Se seleccionan todos los elementos que sean circle, es decir los puntos y se les da un radio y una opacidad

svg11.selectAll("circle")
    .attr("opacity", 0.8)
    .attr("r", 7);   
}

//Selecciona la primera opción entre ocup, aht, con y aus como valor por defecto
document.getElementById("v-option").checked = true;

//Cuando se pasa el mouse por encima de los elementos de meta y cumplimiento al lado izquierdo de la gráfica, se cambia la opacidad dependiendo de cuál se seleccione para mostrar solo los puntos de ese
$(document).ready(function(){
    $("#leyenda1").hover(function(){
        $(".dimple-cumplimiento").css("opacity", "0");
        }, function(){
        $(".dimple-cumplimiento").css("opacity", "1");
    });
});

$(document).ready(function(){
    $("#leyenda2").hover(function(){
        $(".dimple-meta").css("opacity", "0");
        }, function(){
        $(".dimple-meta").css("opacity", "1");
    });
});
