var contenidoTxt= new Array();
var archivoTxt= new XMLHttpRequest();
var fileRuta= 'datos.txt';
archivoTxt.open("GET",fileRuta,false);
archivoTxt.send(null);
var txt= parseInt(archivoTxt.responseText);
console.log("texto");
console.log(txt);
console.log("texto");
var sesionId= parseInt(localStorage.getItem("idSesion"))+1;
var tarea= localStorage.getItem("xd");
console.log("tarea")
console.log(tarea)
var idUsuario= localStorage.getItem("idUsuario");
console.log("idUsuario")
console.log(idUsuario)
/*d3.json("json/G1.json", function(data){
  flora=data.children[0];
  superficie=data.children[1];
  maniobras=data.children[2];
  responsabilidades=data.children[3];
  console.log("flora")
  console.log(flora)
  }
);
*/

if (tarea==0) {
    tarea=1;
}
else if (tarea==1) {
    tarea=2;
}
else if (tarea==2) {
    tarea=3;
}
else if (tarea==3) {
    tarea=4;
}


var visitados=[],//Aqui se guardan las ids de las paginas visitadas 
    guardados=[],//Aqui se guardan las ids de las paginas agregadas a flora
    guardados2=[],//Aqui se guardan las ids de las paginas agregadas a superficie
    guardados3=[],//Aqui se guardan las ids de las paginas agregadas a maniobras
    guardados4=[],//Aqui se guardan las ids de las paginas agregadas a responsabilidades
    marcador=1,
    idActual=0,
    //sesionId=parseInt(txt)+1,
    floraSuma=0,//variable para contar las paginas agregadas al grupo de flora
    superficieSuma=0,//variable para contar las paginas agregadas al grupo de superficie
    maniobrasSuma=0,//variable para contar las paginas agregadas al grupo de maniobras
    responsabilidadesSuma=0,//variable para contar las paginas agregadas al grupo de responsabilidades
    rankingorder = true,//booleano para generar el ordenamiento por ranking(mayor o menor si es falso o verdadero)
    dateOrder = false,//booleano para generar el ordenamiento por fecha
    scoreOrder = false,//booleano para generar el ordenamiento por legibilidad
    reputationOrder = false;
//variables de rangos de colores utilizados en el fill y stroke de los circulos
var color = d3.scale.ordinal()
        .range(["#0A0B3D", "#090D3F", "#091042", "#091345", "#091648", "#09184B", "#091B4E", "#081E51", "#082154", "#082357", "#08265A", "#08295D", "#082C60", "#082F63", "#073166", "#073469", "#07376C", "#073A6F", "#073C72", "#073F75", "#064278", "#06457B", "#06477E", "#064A81", "#064D84", "#065087", "#06538A", "#05558D", "#055890", "#055B93", "#055E96", "#056099", "#05639C", "#04669F", "#0469A2", "#046BA5", "#046EA8", "#0471AB", "#0474AE", "#0477B1", "#0379B4", "#037CB7", "#037FBA", "#0382BD", "#0384C0", "#0387C3", "#028AC6", "#028DC9", "#028FCC", "#0292CF", "#0295D2", "#0298D5", "#019BD8", "#019DDB", "#01A0DE", "#01A3E1", "#01A6E4", "#01A8E7", "#01ABEA", "#00AEED", "#00B1F0", "#00B3F3", "#00B6F6", "#00B9F9", "#00BCFC", "#00BFFF"])
        .domain(d3.range(0, 66));

var colorRscore = d3.scale.ordinal()
        .range(["#FF0000", "#FF5500", "#FFAA00", "#FFFF00", "#AAFF00", "#55FF00", "#00FF00"])
        .domain(d3.range(0, 6));

var colorRanking = d3.scale.ordinal()
        .range(["#FFFFFF", "#FCFCFC", "#F9F9F9", "#F7F7F7", "#F4F4F4", "#F2F2F2", "#EFEFEF", "#ECECEC", "#EAEAEA", "#E7E7E7", "#E5E5E5", "#E2E2E2", "#E0E0E0", "#DDDDDD", "#DADADA", "#D8D8D8", "#D5D5D5", "#D3D3D3", "#D0D0D0", "#CECECE", "#CBCBCB", "#C8C8C8", "#C6C6C6", "#C3C3C3", "#C1C1C1", "#BEBEBE", "#BCBCBC", "#B9B9B9", "#B6B6B6", "#B4B4B4", "#B1B1B1", "#AFAFAF", "#ACACAC", "#AAAAAA", "#A7A7A7", "#A4A4A4", "#A2A2A2", "#9F9F9F", "#9D9D9D", "#9A9A9A", "#979797", "#959595", "#929292", "#909090", "#8D8D8D", "#8B8B8B", "#888888", "#858585", "#838383", "#808080", "#7E7E7E", "#7B7B7B", "#797979", "#767676", "#737373", "#717171", "#6E6E6E", "#6C6C6C", "#696969", "#676767", "#646464", "#616161", "#5F5F5F", "#5C5C5C", "#5A5A5A", "#575757", "#555555", "#525252", "#4F4F4F", "#4D4D4D", "#4A4A4A", "#484848", "#454545", "#424242", "#404040", "#3D3D3D", "#3B3B3B", "#383838", "#363636", "#333333", "#303030", "#2E2E2E", "#2B2B2B", "#292929", "#262626", "#242424", "#212121", "#1E1E1E", "#1C1C1C", "#191919", "#171717", "#141414", "#121212", "#0F0F0F", "#0C0C0C", "#0A0A0A", "#070707", "#050505", "#020202", "#000000"])
        .domain(d3.range(0, 100));
var diameter = 720,
    format = d3.format(",d"),
    dataSource = 0;
var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .value(function(d) { return d.size; });
//dejo un espacio para que queden los botones un poco mas abajo 
var espacio=d3.select("#contenedor2").append("svg")
  .attr("width",diameter)
  .attr("height",100);
var buttonData = ["Ranking", "Fecha", "Legibilidad", "Reputación"];
var buttonDiv = d3.select("#contenedor2").append("svg")
    .attr("width", diameter)
    .attr("height", 50);
var buttons = buttonDiv.selectAll(".updateButton")
  .data(buttonData)
   .enter()
  .append('g')
  .attr("class", "updateButton")
  .on("click", function(d, i) {
    dataSource = i;
    updateVis();
    tooltip.style("visibility", "hidden");
    tooltip2.style("visibility", "hidden");
    tooltip3.style("visibility", "hidden");
    tooltip4.style("visibility", "hidden");
    cambiarBoton();
    labelDivText.style("fill", function (d) {
              return sortingColor(d);});
    labelDivText.text(function (d) {
              return sortingLabel(d);});
    if (dataSource==0){
          if (rankingorder){
              $.post("insertaraccion.php",{accion:'7',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
          else{
              $.post("insertaraccion.php",{accion:'8',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
      }
      if (dataSource==1){
          if (dateOrder){
              $.post("insertaraccion.php",{accion:'9',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
          else{
              $.post("insertaraccion.php",{accion:'10',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
      }
      if (dataSource==2){
          if (scoreOrder){
              $.post("insertaraccion.php",{accion:'11',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
          else{
              $.post("insertaraccion.php",{accion:'12',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
      }
      if (dataSource==3){
          if (reputationOrder){
              $.post("insertaraccion.php",{accion:'13',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
          else{
              $.post("insertaraccion.php",{accion:'14',idAsociado:'NULL',queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          }
      }    
  });
var rectB=buttons.append("rect")
  .attr("x", function(d, i) { return (i * 200); })
    .attr("width", 98)
    .attr("height", 25)
    .attr("ry", 5)
    .style("stroke", "#557985")
    .style("stroke-width", "2px")
    .style("cursor","pointer")
    .style("fill", function (d, i) {
            return dataSource == i ? "#488397" : "white";
        });
var rectT=buttons.append("text")
    .attr("x", function(d, i) { return (i * 200) + (100 / 2); }) 
    .attr("y", 12)
    .attr("dy", "0.35em")
    .style("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .style("cursor","pointer")
    .style("fill", function (d, i) {
                return dataSource == i ? "white" : "black";
            })
    .text(function(d) { return d; });
//creacion de label para indicar el tipo de ordenamiento
var labelDiv = d3.select("#contenedor2").append("svg")
        .attr("width", diameter)
        .attr("height", 40)
        .append("g");

var labelDivText = labelDiv.append("text")
        .attr("x", 200)
        .attr("y", 20)
        .attr("dy", "0.35em")
        .style("text-anchor", "start")
        .style("font-size", "15px")
        .style("font-family", "sans-serif")
        .style("font-weight", "bold")
        .style("fill", function (d) {
            return sortingColor(d);
        })
        .text(function (d) {
            return sortingLabel(d);
        });
//Función con los Valores para el tipo de ordenamiento
function sortingLabel(d){
    var result;
    if (dataSource==0){
        if (rankingorder){
            result = "Ordenado de mejor a peor ranking";
        }
        else{
            result = "Ordenado de peor a mejor ranking";
        }
    }
    if (dataSource==1){
        if (dateOrder){
            result = "Ordenado de más reciente a más antiguo";
        }
        else{
            result = "Ordenado de más antiguo a más reciente";
        }
    }
    if (dataSource==2){
        if (scoreOrder){
            result = "Ordenado de más facil a más difícil de leer";
        }
        else{
            result = "Ordenado de más difícil a más fácil de leer";
        }
    }
    if (dataSource==3){
        if (reputationOrder){
            result = "Ordenado de mayor a menor reputación";
        }
        else{
            result = "Ordenado de menor a mayor reputación";
        }
    }
    return result;
}
//Función que varía el color del texto del label que indica el tipo de ordenamiento
function sortingColor(d){
    var result;
    if (dataSource==0){
        if (!rankingorder){
            result = "red";
        }
        else{
            result = "blue";
        }
    }
    if (dataSource==1){
        if (!dateOrder){
            result = "red";
        }
        else{
            result = "blue";
        }
    }
    if (dataSource==2){
        if (!scoreOrder){
            result = "red";
        }
        else{
            result = "blue";
        }
    }
    if (dataSource==3){
        if (!reputationOrder){
            result = "red";
        }
        else{
            result = "blue";
        }
    }
    return result;
}
//Función para cambiar el color del botón de filtro que está activo
function cambiarBoton(){
    rectB
        .attr("x", function (d, i) {
            return (i * 200);
        })
        .attr("width", 98)
        .attr("height", 25)
        .attr("ry", 3)
        .style("stroke", "#557985")
        .style("stroke-width", "2px")
        .style("fill", function (d, i) {
            return dataSource == i ? "#488397" : "white";
        }
        );
    rectT
            .attr("x", function (d, i) {
                return (i * 200) + (100 / 2);
            })
            .attr("y", 12)
            .attr("dy", "0.35em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-family", "sans-serif")
            .style("font-weight", "bold")
            .style("fill", function (d, i) {
                return dataSource == i ? "white" : "black";
         });
}

var svg = d3.select("#contenedor2").append("svg")
    .attr("id","vista")
    .attr("width", diameter)
    .attr("height", diameter);
var flora=getData1();
var superficie=getData2();
var maniobras=getData3();
var responsabilidades=getData4();
var data = flora;
var vis = svg.datum(data).selectAll(".node")
    .data(pack.nodes)
   .enter()
    .append("g");
var vista = d3.select("#contenedor2").append("vis");
var titles;
var circles; 
var text; 
///////////////////////////////////////////////////////////////////////////////////////            
function generaVista(datos){
  console.log("gurdados cuando se genera la vista")
  console.log(guardados)
  //tooltip.style("visibility", "hidden");
  data=datos;
  console.log("datos de la vista")
  console.log(data)
  d3.selectAll("circle").remove();
  d3.select("#vista").selectAll("text").remove();
  vis = svg.datum(datos).selectAll(".node")
    .data(pack.nodes)
    .enter()
    .append("g");
  vista = d3.select("#contenedor2").append("vis");
  titles = vis.append("title")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .text(function(d) { return d.name +
        (!d.children ? "" : ": " + d.snippet); });

  circles = 
    vis.append("circle")
    .attr("stroke", "black")
    .style("fill", function(d) { return !d.children ? "tan" : "beige"; })
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d.r; })
    .attr("id",function(d){return d.id;})
        .style("fill",function (d) {
            return !d.children ? color(d.colour) : "white";})
        .style("fill-opacity",function(d){
          var verifica=visitados.indexOf(d.id);
          if (verifica==-1) {
            return "1";
          }
          else{
            return "0.1";
          };
        })
        .style("stroke", function(d){return !d.children ? colorStroke(d) : "#4682B4";})
        .attr("stroke-width", function(d){
            return !d.children ? "3px" : "2px";})
        .style("cursor", function (d) {
                return !d.children ? "pointer" : "auto";
            })
       .on("mouseover", function(d){
          var xPosition = parseFloat(d3.select(this).attr("cx"))+215;
          var yPosition = parseFloat(d3.select(this).attr("cy"))+205;
          
          
          if(d.id>=100){
            if((d.id>1000)&&(d.id<2000)){
              tooltip.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
            if((d.id>2000)&&(d.id<3000)){
              tooltip2.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
            if((d.id>3000)&&(d.id<4000)){
              tooltip3.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
            if(d.id>4000){
              tooltip4.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
          }
          $.post("insertaraccion.php",{accion:'25',idAsociado:d.id,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
          return (restoreCheckbox(d))
        })
        .on("click", function(d){
          d3.select(this).style("fill-opacity", "0.1");
          return (mostrarPagina(d))
        });
    text=
      vis.append("text")
      .attr("class", function (d) {
                return d.children ? "parent" : "child";
            })
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("pointer-events", "none")
            .style("font-family", function (d) {
                return "adelle,sans-serif";
            })
            .style("font-size", function (d) {
                var len = 3;
                var size = d.r / 3;
                size *= 10 / len;
                size += 1;
                return Math.round(size) + 'px';
            })
            .style("font-weight", "bold")
            .style("cursor", function (d) {
                return !d.children ? "pointer" : "auto";
            })
            .style("fill", function (d){
                var aux = guardados.includes(d.id);
                var aux2 = guardados2.includes(d.id);
                var aux3 = guardados3.includes(d.id);
                var aux4 = guardados4.includes(d.id);
                if (aux && aux2 && aux3 && aux4) {
                  return "url(#grad)";
                }
                if (aux && aux2 && aux3) {
                  return "url(#grad2)";
                }
                if (aux && aux2 && aux4) {
                  return "url(#grad3)";
                }
                if (aux2 && aux3 && aux4) {
                  return "url(#grad4)";
                }
                if (aux && aux3 && aux4) {
                  return "url(#grad5)";
                }
                if (aux && aux2) {
                  return "url(#grad6)";
                }
                if (aux && aux3) {
                  return "url(#grad7)";
                }
                if (aux && aux4) {
                  return "url(#grad8)";
                }
                if (aux2 && aux3) {
                  return "url(#grad9)";
                }
                if (aux2 && aux4) {
                  return "url(#grad10)";
                }
                if (aux3 && aux4) {
                  return "url(#grad11)";
                }
                if(aux){
                  return "red";
                }
                if (aux2){
                  return "yellow";
                }
                if (aux3){
                  return "blue";
                }
                if (aux4){
                  return "green";
                }
                else{
                  return !d.children ? colorRanking(d.ranking): "white";
                }
            })
            .text(function (d) {
                if (!d.children) {
                  var aux = guardados.includes(d.id);
                  var aux2 = guardados2.includes(d.id);
                  var aux3 = guardados3.includes(d.id);
                  var aux4 = guardados4.includes(d.id);
                  if (aux && aux2 && aux3 && aux4) {
                    return "...."
                  }
                  if (aux && aux2 && aux3) {
                    return "..."
                  }
                  if (aux && aux2 && aux4) {
                    return "..."
                  }
                  if (aux2 && aux3 && aux4) {
                    return "..."
                  }
                  if (aux && aux3 && aux4) {
                    return "..."
                  }
                  if (aux && aux2) {
                    return ".."
                  }
                  if (aux && aux3) {
                    return ".."
                  }
                  if (aux && aux4) {
                    return ".."
                  }
                  if (aux2 && aux3) {
                    return ".."
                  }
                  if (aux2 && aux4) {
                    return ".."
                  }
                  if (aux3 && aux4) {
                    return ".."
                  }
                  if (aux) {
                    return "."
                  }
                  if (aux2) {
                    return "."
                  }
                  if (aux3) {
                    return "."
                  }
                  if (aux4) {
                    return "."
                  }
                  else{
                    return d.re_nor;
                  }
                }
            })
            .on("click", function(d){
          var xPosition = parseFloat(d3.select(this).attr("x"))+215;
          var yPosition = parseFloat(d3.select(this).attr("y"))+205;
          d3.select(this).style("fill-opacity", "0.1");
          //tooltip.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
          if((d.id>1000)&&(d.id<2000)){
              tooltip.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
            if((d.id>2000)&&(d.id<3000)){
              tooltip2.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
            if((d.id>3000)&&(d.id<4000)){
              tooltip3.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
            if(d.id>4000){
              tooltip4.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
              console.log("entre aqui hola")  
            }
          return (mostrarPagina(d))
        });    

};
//updateVis();

function updateVis() {
    if (dataSource == 0) {
          rankingorder = !rankingorder;   
          pack.value(function (d) {
              return rankingorder ? d.size : 100 * d.size / (101 * d.size - 100);
          });
      }
      if (dataSource == 1) {
          dateOrder = !dateOrder;
          pack.value(function (d) {
              return dateOrder ? 100/(101-d.fecha) : 100/(d.fecha + 1);
          });
      }
      if (dataSource == 2) {
          scoreOrder = !scoreOrder;
          pack.value(function (d) {
              return scoreOrder ?  100/(100 - d.rscore + 1) : 100/(d.rscore + 1) ;
          });
      }
      if (dataSource == 3) {
          reputationOrder = !reputationOrder;
          pack.value(function (d) {
              return reputationOrder ? 100/(101-d.repu) : 100/(d.repu + 1);
          });
      }

    var data1 = pack.nodes(data);

    titles.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .text(function(d) { return d.name +
            (!d.children ? "" : ": " + d.snippet); });

    circles.transition()
        .duration(5000)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; });
    text.transition()
      .duration(5000)
      .attr("x", function (d) { return d.x; })
      .attr("y", function (d) { return d.y; })
       .style("font-size", function (d) {
                var len = 3;
                var size = d.r / 3;
                size *= 10 / len;
                size += 1;
                return Math.round(size) + 'px';
            })
            .style("font-weight", "bold")
      .attr("dy", "0.35em");

};

//Función para mostrar la página
function mostrarPagina(d){
  console.log("click");
  if(!d.children){
    console.log("Mostrando pagina")
    document.getElementById('page-container').src = d.url_local;
        document.getElementById("i1-ranking").innerHTML = rankingFix(d);
        document.getElementById("i2-date").innerHTML = d.date;
        document.getElementById("i3-rscore").innerHTML = scoreDiscretization(d);
        document.getElementById("i4-reputation").innerHTML = d.re_nor;
        document.getElementById("page-container").style.height = "919px";
        document.getElementById("botonMostrarOcultar").value="Ocultar Página";
        document.getElementById("Check1").checked=0;
        document.getElementById("Check2").checked=0;
        document.getElementById("Check3").checked=0;
        document.getElementById("Check4").checked=0;
        clic=1;
        idActual=d.id;
        console.log(idActual)
        var xyz=idActual;
        $.post("insertaraccion.php",{accion:'19',idAsociado:xyz,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
        var comprobar=visitados.indexOf(idActual);
        if (comprobar==-1) {
          visitados.push(idActual); 
        }
        else{
          var aux = guardados.includes(idActual);
          var aux2 = guardados2.includes(idActual);
          var aux3 = guardados3.includes(idActual);
          var aux4 = guardados4.includes(idActual);
          console.log(guardados)
          console.log(guardados2)
          console.log(guardados3)
          console.log(guardados4)
          if (aux && aux2 && aux3 && aux4) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
          }

          else if (aux && aux2 && aux3) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux && aux2 && aux4) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
              }
          else if (aux2 && aux3 && aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
          }
          else if (aux && aux3 && aux4) {
          document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
        }
          else if (aux && aux2) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=0;
          }
          else if (aux && aux3) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux && aux4) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
          }
          else if (aux2 && aux3) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux2 && aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
          }
          else if (aux3 && aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
          }
          else if (aux) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=0;
          }
          else if (aux2) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=0;
          }
          else if (aux3) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
          }
        }
        console.log(visitados)

  }
}

function restoreCheckbox(d){
  console.log("click");
  if(!d.children){
   
        document.getElementById("Check1").checked=0;
        document.getElementById("Check2").checked=0;
        document.getElementById("Check3").checked=0;
        document.getElementById("Check4").checked=0;

        clic=1;
        idActual=d.id;
        console.log(idActual)
        var xyz=idActual;
        
          var aux = guardados.includes(idActual);
          var aux2 = guardados2.includes(idActual);
          var aux3 = guardados3.includes(idActual);
          var aux4 = guardados4.includes(idActual);
          console.log(guardados)
          console.log(guardados2)
          console.log(guardados3)
          console.log(guardados4)
          if (aux && aux2 && aux3 && aux4) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
          }

          else if (aux && aux2 && aux3) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux && aux2 && aux4) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
              }
          else if (aux2 && aux3 && aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
          }
          else if (aux && aux3 && aux4) {
          document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
        }
          else if (aux && aux2) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=0;
          }
          else if (aux && aux3) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux && aux4) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
          }
          else if (aux2 && aux3) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux2 && aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
          }
          else if (aux3 && aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=1;
          }
          else if (aux) {
            document.getElementById("Check1").checked=1;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=0;
          }
          else if (aux2) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=1;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=0;
          }
          else if (aux3) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=1;
            document.getElementById("Check4").checked=0;
          }
          else if (aux4) {
            document.getElementById("Check1").checked=0;
            document.getElementById("Check2").checked=0;
            document.getElementById("Check3").checked=0;
            document.getElementById("Check4").checked=1;
          }
        //}
        console.log(visitados)

  }
}

//Función para poder cambiar el color de los botones y generar la vista
function union(datos){
  generaVista(datos);
  if (datos==flora) {
    if (marcador==0||marcador==2||marcador==3||marcador==4){
      $.post("insertaraccion.php",{accion:'3',idAsociado:null,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    marcador=1;
    tooltip.style("visibility", "hidden");
    tooltip2.style("visibility", "hidden");
    tooltip3.style("visibility", "hidden");
    tooltip4.style("visibility", "hidden");
    document.getElementById("c1").style.background="#c8787a";
    document.getElementById("c2").style.background="#D9D9D9";
    document.getElementById("c3").style.background="#D9D9D9";
    document.getElementById("c4").style.background="#D9D9D9";
  };
  if (datos==superficie) {
    if (marcador==0||marcador==1||marcador==3||marcador==4){
      $.post("insertaraccion.php",{accion:'4',idAsociado:null,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    marcador=2;
    tooltip.style("visibility", "hidden");
    tooltip2.style("visibility", "hidden");
    tooltip3.style("visibility", "hidden");
    tooltip4.style("visibility", "hidden");
    document.getElementById("c1").style.background="#D9D9D9";
    document.getElementById("c2").style.background="#C6E746";
    document.getElementById("c3").style.background="#D9D9D9";
    document.getElementById("c4").style.background="#D9D9D9";
  };
  if (datos==maniobras) {
    if (marcador==0||marcador==1||marcador==2||marcador==4){
      $.post("insertaraccion.php",{accion:'5',idAsociado:null,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    marcador=3;
    tooltip.style("visibility", "hidden");
    tooltip2.style("visibility", "hidden");
    tooltip3.style("visibility", "hidden");
    tooltip4.style("visibility", "hidden");
    document.getElementById("c1").style.background="#D9D9D9";
    document.getElementById("c2").style.background="#D9D9D9";
    document.getElementById("c3").style.background="#4d90fe";
    document.getElementById("c4").style.background="#D9D9D9";
  };
  if (datos==responsabilidades) {
    if (marcador==0||marcador==1||marcador==2||marcador==3){
      $.post("insertaraccion.php",{accion:'6',idAsociado:null,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    marcador=4;
    tooltip.style("visibility", "hidden");
    tooltip2.style("visibility", "hidden");
    tooltip3.style("visibility", "hidden");
    tooltip4.style("visibility", "hidden");
    document.getElementById("c1").style.background="#D9D9D9";
    document.getElementById("c2").style.background="#D9D9D9";
    document.getElementById("c3").style.background="#D9D9D9";
    document.getElementById("c4").style.background="#10a54a";
  };
}
//Función que calcula el color del borde del circulo
function colorStroke(d){
    var c;
    if (d.rscore >= 90){
        c = 6;
  }
    if (d.rscore < 90 && d.rscore >= 80){
        c = 5;
    }
    if (d.rscore < 80 && d.rscore >= 70){
        c = 4;
    }
    if (d.rscore < 70 && d.rscore >= 60){
        c = 3;
    }
    if (d.rscore < 60 && d.rscore >= 50){
        c = 2;
    }
    if (d.rscore < 50 && d.rscore >= 30){
        c = 1;
    }
    if (d.rscore < 30 && d.rscore >= 0){
        c = 0;
    }
    return colorRscore(c);
}
//Función que suma el contador al contenedor de páginas guardadas
function guardarPagina(){
  var index = guardados.indexOf(idActual);
  console.log(index)
  if (index==-1) {
    floraSuma++;
    document.getElementById("a1-fauna").innerHTML = floraSuma;
    guardados.push(idActual);
    console.log("guardados fauna")
    console.log(guardados)
    tooltip.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //updateVis();
    //actualizaPuntos(idActual);
    $.post("insertaraccion.php",{accion:'15',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }
  
  else{
    var x = document.getElementById("Check1").checked;
    console.log("holaaaaa")
    floraSuma--;
    document.getElementById("a1-fauna").innerHTML = floraSuma;
    guardados.splice(index,1);
    tooltip.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //updateVis();
    //actualizaPuntos(idActual);
    $.post("insertaraccion.php",{accion:'21',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }
  
}
//funcion para agregar una pagina al grupo de supeficie
function guardarPagina2(){
  var index2 = guardados2.indexOf(idActual);
  if (index2==-1) {
    superficieSuma++;
    document.getElementById("a2-superficie").innerHTML = superficieSuma;
    guardados2.push(idActual);
    tooltip2.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //updateVis();
    //actualizaPuntos(idActual);
    $.post("insertaraccion.php",{accion:'16',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }
  else{
    var x2 = document.getElementById("Check2").checked;
    console.log("holaaaaa2")
    superficieSuma--;
    document.getElementById("a2-superficie").innerHTML = superficieSuma;
    guardados2.splice(index2,1);
    tooltip2.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //updateVis();
    //actualizaPuntos(idActual);
    $.post("insertaraccion.php",{accion:'22',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }

}
//funcion para agregar una pagina al grupo de maniobras
function guardarPagina3(){
  var index3 = guardados3.indexOf(idActual);
  if (index3==-1) {
    maniobrasSuma++;
    document.getElementById("a3-maniobras").innerHTML = maniobrasSuma;
    guardados3.push(idActual);
    tooltip3.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //updateVis();
    //actualizaPuntos(idActual);
    $.post("insertaraccion.php",{accion:'17',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }
  else{
    var x3 = document.getElementById("Check3").checked;
    console.log("holaaaaa3")
    maniobrasSuma--;
    document.getElementById("a3-maniobras").innerHTML = maniobrasSuma;
    guardados3.splice(index3,1);
    tooltip3.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //updateVis();
    //actualizaPuntos(idActual);
    $.post("insertaraccion.php",{accion:'23',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }
}
//funcion para agregar una pagina al grupo de responsabilidades
function guardarPagina4(){
  var index4 = guardados4.indexOf(idActual);
  if (index4==-1) {
    responsabilidadesSuma++;
    document.getElementById("a4-responsabilidades").innerHTML = responsabilidadesSuma;
    guardados4.push(idActual);
    tooltip4.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //updateVis();
    //actualizaPuntos(idActual);
    $.post("insertaraccion.php",{accion:'18',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }
  else{
    var x4 = document.getElementById("Check4").checked;
    console.log("holaaaaa4")
    responsabilidadesSuma--;
    document.getElementById("a4-responsabilidades").innerHTML = responsabilidadesSuma;
    guardados4.splice(index4,1);
    tooltip4.style("visibility", "hidden");
    if(idActual<2000){
    generaVista(flora);   
  }
  if((idActual>=2000)&&(idActual<3000)){
    generaVista(superficie);
  }
  if((idActual>=3000)&&(idActual<4000)){
    generaVista(maniobras);   
  }
  if(idActual>=4000){
    generaVista(responsabilidades);   
  }
    //actualizaPuntos(idActual);
    //updateVis();
    $.post("insertaraccion.php",{accion:'24',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
  }
}

//Función que arregla el ranking de la página    
function rankingFix(d){
    var rank = parseInt(d.ranking) + 1;
    return rank;
}
//Función para mostrar la legibilidad de la página
function scoreDiscretization(d){
    if (d.rscore >= 90){
        return "Muy fácil";
    }
    if (d.rscore < 90 && d.rscore >= 80){
        return "Fácil";
    }
    if (d.rscore < 80 && d.rscore >= 70){
        return "Bastante fácil";
    }
    if (d.rscore < 70 && d.rscore >= 60){
        return "Normal";
    }
    if (d.rscore < 60 && d.rscore >= 50){
        return "Bastante difícil";
    }
    if (d.rscore < 50 && d.rscore >= 30){
        return "Difícil";
    }
    if (d.rscore < 30 && d.rscore >= 0){
        return "Muy difícil";
    }
}
//Gradiente de colores para los indicadores de si una pagina fue agregada o no a una categoria
var grad = svg.append("defs")
        .append("linearGradient")
              .attr("id", "grad");
grad.selectAll("stop") 
    .data([                             
        {offset: "0%", color: "red"}, 
        {offset: "38%", color: "yellow"},  
        {offset: "70%", color: "blue"}, 
        {offset: "80%", color: "green"}
      ])                  
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })   
    .attr("stop-color", function(d) { return d.color; });

var grad2 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad2");
grad2.selectAll("stop") 
    .data([                             
        {offset: "0%", color: "red"}, 
        {offset: "53%", color: "yellow"},   
        {offset: "87%", color: "blue"}
      ])                  
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })   
    .attr("stop-color", function(d) { return d.color; });
var grad3 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad3");
grad3.selectAll("stop") 
    .data([                             
        {offset: "0%", color: "red"}, 
        {offset: "53%", color: "yellow"},  
        {offset: "87%", color: "green"}
      ])                  
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })   
    .attr("stop-color", function(d) { return d.color; });
var grad4 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad4");
grad4.selectAll("stop") 
    .data([                             
        {offset: "0%", color: "yellow"}, 
        {offset: "75%", color: "blue"},   
        {offset: "75%", color: "green"}
      ])                  
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })   
    .attr("stop-color", function(d) { return d.color; });
var grad5 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad5");
grad5.selectAll("stop") 
    .data([                             
        {offset: "0%", color: "red"}, 
        {offset: "53%", color: "blue"},   
        {offset: "87%", color: "green"}
      ])                  
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })   
    .attr("stop-color", function(d) { return d.color; });
var grad6 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad6");
grad6.append("stop").attr("offset", "50%").style("stop-color", "red");
grad6.append("stop").attr("offset", "50%").style("stop-color", "yellow");
var grad7 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad7");
grad7.append("stop").attr("offset", "50%").style("stop-color", "red");
grad7.append("stop").attr("offset", "50%").style("stop-color", "blue");
var grad8 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad8");
grad8.append("stop").attr("offset", "50%").style("stop-color", "red");
grad8.append("stop").attr("offset", "50%").style("stop-color", "green");
var grad9 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad9");
grad9.append("stop").attr("offset", "50%").style("stop-color", "yellow");
grad9.append("stop").attr("offset", "50%").style("stop-color", "blue");
var grad10 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad10");
grad10.append("stop").attr("offset", "50%").style("stop-color", "yellow");
grad10.append("stop").attr("offset", "50%").style("stop-color", "green");
var grad11 = svg.append("defs")
        .append("linearGradient")
        .attr("id","grad11");
grad11.append("stop").attr("offset", "50%").style("stop-color", "blue");
grad11.append("stop").attr("offset", "50%").style("stop-color", "green");

//Función para desplegar y ocultar el contendor de la página seleccionada
var clic = 1;
function divLogin(){ 
   if(clic==1){
   document.getElementById("page-container").style.height = "0px";
   document.getElementById("botonMostrarOcultar").value="Mostrar Página";
   clic = clic + 1;
   $.post("insertaraccion.php",{accion:'2',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
   } else{
       document.getElementById("page-container").style.height = "919px";
       document.getElementById("botonMostrarOcultar").value="Ocultar Página";
    clic = 1;
    $.post("insertaraccion.php",{accion:'1',idAsociado:idActual,queryGroup:marcador,tipoAccion:'visual',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
   }   
}
//tooltip para los checkbox de las páginas que se muestra al pichar un circulo
var tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden");
tooltip.append("foreignObject")
  .append("xhtml:body")
  .html("<form><input type=checkbox name=Check1 id=Check1 onclick=guardarPagina()><label for=Check1></label></form>")
        .on("click", function(d, i){
            //console.log(svg.select("#Check1").node().checked);
        });
var tooltip2 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden");
tooltip2.append("foreignObject")
  .append("xhtml:body")
  .html("<form><input type=checkbox name=Check2 id=Check2 onclick=guardarPagina2()><label for=Check2></label></form>")
        .on("click", function(d, i){
            //console.log(svg.select("#Check1").node().checked);
        });
var tooltip3 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden");
tooltip3.append("foreignObject")
  .append("xhtml:body")
  .html("<form><input type=checkbox name=Check3 id=Check3 onclick=guardarPagina3()><label for=Check3></label></form>")
        .on("click", function(d, i){
            //console.log(svg.select("#Check1").node().checked);
        });
var tooltip4 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden");
tooltip4.append("foreignObject")
  .append("xhtml:body")
  .html("<form><input type=checkbox name=Check4 id=Check4 onclick=guardarPagina4()><label for=Check4></label></form>")
        .on("click", function(d, i){
            //console.log(svg.select("#Check1").node().checked);
        });
//reloj
var minutos= localStorage.getItem("xd");
function generaMinutos(){
    if (minutos==0) {
        minutos=3;
        return 3;
    }
    if (minutos==1) {
        minutos=6;
        return 6;
    }
    if (minutos==2) {
        minutos=8;
        return 8;
    }
    if (minutos==3) {
        minutos=10;
        return 10;
    }
}
generaMinutos();
var segundos = 0;
var llamada;
var ceromin='';
var ceroseg='';

function cuentaAtras(){ 
    devolvercero(minutos,segundos);
    segundos = segundos % 60;
    document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
     if (minutos ===0 && segundos ===0){
        alert ("Muchas Gracias por tu colaboración. Sigamos con lo siguiente.");
        window.location.href = "http://localhost/ProyectoTesis/index.php";
        clearTimeOut(llamada);
    }
    if (segundos ==0){
        minutos --;
        segundos+=60;   
    }    
    segundos --;
    var llamada = setTimeout(cuentaAtras,1000);
}

function devolvercero(minutos,segundos){
    if (minutos<10){
        ceromin='0';
       
    }
    if (segundos<10){
        ceroseg='0';
        
    }else {
        ceroseg='';
    }
     return ceroseg;return ceromin;
}
function getData1() {
return {
"id" : "1",
"name": "Flora y fauna en el derrame de petróleo del Golfo de México",
"children": 
[
{ "id": "1100","repu": 1,"re_nor": 0,"fecha": 74,"url": "http://ecoguiaemporda.com/ecodenuncia-a-ecoguiaemporda/67-denuncies-i-opinions/1939-derrame-de-petroleo-sin-precedentes-en-el-rio-guarapiche-de-maturin-estado-monagas-venezuela.html","name": "Derrame de petróleo sin precedentes en el Río Guarapiche ...","snippet": "Después del derrame de petróleo acontecido en el Golfo de México, en el  ...  de su flora y fauna, y de la armoniosa relación de los humanos y el resto de la  ...","ranking": 97,"size": 1.020408163,"rscore": 7.20787,"reputation": 0,"repu_normalizada": 1,"date": "29-06-2012","colour": 27,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/ecoguiaemporda.com/ecodenuncia-a-ecoguiaemporda/67-denuncies-i-opinions/1939-derrame-de-petroleo-sin-precedentes-en-el-rio-guarapiche-de-maturin-estado-monagas-venezuela.html"}, 
{ "id": "1101","repu": 2,"re_nor": 0,"fecha": 39,"url": "http://www.marketingworld.tv/derrame-de-petroleo-amenaza-vida-marina/","name": "Derrame De Petróleo Amenaza Vida Marina - marketing world","snippet": "El derrame de petróleo en el Golfo de México es considerado el más  ...  Muchos de los animales han ingerido sustancias tóxicas que son  ...","ranking": 95,"size": 1.041666667,"rscore": 94.755615,"reputation": 0,"repu_normalizada": 3,"date": "22-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.marketingworld.tv/derrame-de-petroleo-amenaza-vida-marina/index.html"}, 
{ "id": "1102","repu": 65,"re_nor": 7,"fecha": 85,"url": "http://noticias-ambientales-internacionales.blogspot.com/2014/04/china-castiga-con-carcel-el-consumo-de.html","name": "China castiga con carcel el consumo de animales exóticos","snippet": "China: Hasta 10 años de cárcel para quienes coman animales exóticos  ....  Caribe · Caso Derrame de Petróleo de BP en el Golfo de México  ...","ranking": 98,"size": 1.01010101,"rscore": 6.17891,"reputation": 1,"repu_normalizada": 5,"date": "25-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/noticias-ambientales-internacionales.blogspot.cl/2014/04/china-castiga-con-carcel-el-consumo-de.html"}, 
{ "id": "1103","repu": 3,"re_nor": 0,"fecha": 23,"url": "http://fotografiainteligente2j.blogspot.com/2010/05/mueren-189-animales-por-derrame-de.html","name": "Mueren 189 animales por derrame de crudo en el Golfo de ...","snippet": "Mueren 189 animales por derrame de crudo en el Golfo de México  ...  explicó que no se han detectado restos de petróleo en las tortugas  ...","ranking": 94,"size": 1.052631579,"rscore": 3.892105,"reputation": 0,"repu_normalizada": 7,"date": "19-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/fotografiainteligente2j.blogspot.cl/2010/05/mueren-189-animales-por-derrame-de.html"}, 
{ "id": "1104","repu": 4,"re_nor": 0,"fecha": 27,"url": "http://bloglemu.blogspot.com/2010/05/derrame-de-petroleo-en-el-golfo-de_21.html","name": "Derrame de petróleo en el golfo de México: la marea negra ...","snippet": "Derrame de petróleo en el golfo de México: la marea negra ha llegado a las costas  ...  Fotografía | Ryan Hagerty U.S. Fish and Wildlife Service","ranking": 93,"size": 1.063829787,"rscore": 8.006,"reputation": 0,"repu_normalizada": 9,"date": "21-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/bloglemu.blogspot.cl/2010/05/derrame-de-petroleo-en-el-golfo-de_21.html"}, 
{ "id": "1105","repu": 5,"re_nor": 0,"fecha": 78,"url": "http://suite101.net/article/situacion-actual-del-golfo-de-mexico-tras-el-derrame-de-petroleo-a42128","name": "Situación actual del Golfo de México tras el derrame de ...","snippet": "Situación actual del Golfo de México tras el derrame de petróleo  ...  fotografías de animales que habitan en el fondo marino asfixiados por el petróleo, evidencia  ...","ranking": 91,"size": 1.086956522,"rscore": 8.78551,"reputation": 0,"repu_normalizada": 2,"date": "03-07-2013","colour": 40,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/suite101.net/article/situacion-actual-del-golfo-de-mexico-tras-el-derrame-de-petroleo-a42128.html"}, 
{ "id": "1106","repu": 6,"re_nor": 0,"fecha": 75,"url": "https://www.sadm.gob.mx/PortalSadm/jsp/prensa.jsp?id=406","name": "Derrames petroleros: Fuga irreparable - Servicios de Agua y ...","snippet": "La marea negra afecta el agua, los animales, las plantas y los seres humanos,  ...  El derrame de petróleo desencadena una serie de sucesos que pueden llegar a  ...  Este pozo petrolero ubicado en el Golfo de México a 965 kilómetros al sur de  ...","ranking": 90,"size": 1.098901099,"rscore": 2.604034,"reputation": 0,"repu_normalizada": 4,"date": "02-11-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.sadm.gob.mx/PortalSadm/jsp/prensa2455.html"}, 
{ "id": "1107","repu": 72,"re_nor": 8,"fecha": 92,"url": "http://noticias-ambientales-internacionales.blogspot.com/2014/12/mexico-prohibe-animales-silvestres-en.html","name": "México prohíbe animales silvestres en los circos - Noticias ...","snippet": "El Congreso prohíbe el uso de animales silvestres en los circos  ....  de Ozono · Caribe · Caso Derrame de Petróleo de BP en el Golfo de México  ...","ranking": 99,"size": 1,"rscore": 90.638718,"reputation": 2,"repu_normalizada": 6,"date": "16-12-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/noticias-ambientales-internacionales.blogspot.cl/2014/12/mexico-prohibe-animales-silvestres-en.html"}, 
{ "id": "1108","repu": 7,"re_nor": 0,"fecha": 18,"url": "http://spanish.china.org.cn/science/txt/2010-05/14/content_20042321.htm","name": "La fuga de petróleo en el golfo de México amenaza la vida ...","snippet": "La fuga de petróleo en el golfo de México amenaza la vida del cachalote y  ...  El accidente amenaza la subsistencia de los siguientes diez animales:  ...  que han ingerido petróleo derramado, ellos mismos tendrán problemas.","ranking": 88,"size": 1.123595506,"rscore": 6.232994,"reputation": 0,"repu_normalizada": 8,"date": "14-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/spanish.china.org.cn/science/txt/2010-05/14/content_20042321.html"}, 
{ "id": "1109","repu": 8,"re_nor": 0,"fecha": 64,"url": "http://amadosanimales-estrellaanamaria.blogspot.com/2011/05/muerte-de-delfines-en-golfo-de-mexico.html","name": "Muerte de delfines en Golfo de México sería causada por ...","snippet": "ESTRELLA ANA MARIA - AMADOS ANIMALES  ...  Muerte de delfines en Golfo de México sería causada por derrame de crudo.  ...  el Golfo de México, habrían sufrido los efectos del gigantesco derrame de petróleo ocurrido en  ...","ranking": 87,"size": 1.136363636,"rscore": 2.4821,"reputation": 0,"repu_normalizada": 0,"date": "28-05-2011","colour": 14,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/amadosanimales-estrellaanamaria.blogspot.cl/2011/05/muerte-de-delfines-en-golfo-de-mexico.html"}, 
{ "id": "1110","repu": 9,"re_nor": 0,"fecha": 5,"url": "http://es.bab.la/diccionario/ingles-espanol/land-animal","name": "'land animal' en español - Bab.la","snippet": "Hasta ahora, se han derramado en el Golfo de México cientos de millones de litros de petróleo crudo causando pérdidas masivas de flora marina, así como de  ...","ranking": 89,"size": 1.111111111,"rscore": 15.04755,"reputation": 0,"repu_normalizada": 1,"date": "22-04-2008","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/es.bab.la/diccionario/ingles-espanol/land-animal.html"}, 
{ "id": "1111","repu": 10,"re_nor": 0,"fecha": 66,"url": "http://polucionupc2011i.blogspot.com/2011/06/caso-british-petroleum-derrame-en-el.html","name": "Caso British Petroleum - Derrame en el Golfo de México","snippet": "Caso British Petroleum - Derrame en el Golfo de México: Un dilema Supra  ...  analizará el caso del derrame de petróleo en el Golfo de México por  ...  Este derrame incontrolable afectó a comunidades, negocios, animales y el  ...","ranking": 85,"size": 1.162790698,"rscore": 15.38286,"reputation": 0,"repu_normalizada": 3,"date": "21-06-2011","colour": 15,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/polucionupc2011i.blogspot.cl/2011/06/caso-british-petroleum-derrame-en-el.html"}, 
{ "id": "1112","repu": 11,"re_nor": 0,"fecha": 65,"url": "http://polucionupc2011i.blogspot.com/2011/05/caso-british-petroleum-derrame-de.html","name": "Polución: CASO BRITISH PETROLEUM - DERRAME DE ...","snippet": "...  DERRAME DE PETR??LEO EN EL GOLFO DE M??XICO  ...  de extinción) según el Departamento de Fauna, Flora y Vida Marina de Luisiana.","ranking": 86,"size": 1.149425287,"rscore": 10.71085,"reputation": 0,"repu_normalizada": 5,"date": "30-05-2011","colour": 14,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/polucionupc2011i.blogspot.cl/2011/05/caso-british-petroleum-derrame-de.html"}, 
{ "id": "1113","repu": 12,"re_nor": 0,"fecha": 21,"url": "http://sustentator.com/blog-es/blog/2010/05/17/derrame-de-petroleo-en-el-golfo-de-mexico/","name": "Derrame de petroleo en el Golfo de Mexico: la situacion actual","snippet": "Derrame de petroleo en el Golfo de Mexico: la situacion actual  ...  Lamentablemente, todo indica que el derrame de petróleo no se puede  ....  de origen animal https://t.co/iDcIpoqWXm #alimentación #vegan @sustentator","ranking": 82,"size": 1.204819277,"rscore": 12.67354,"reputation": 0,"repu_normalizada": 7,"date": "17-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/sustentator.com/blog-es/blog/2010/05/17/derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "1114","repu": 13,"re_nor": 0,"fecha": 30,"url": "http://www.juventudrebelde.cu/internacionales/2010-05-26/derrame-de-petroleo-es-ya-mayor-desastre-ecologico-/","name": "Derrame de petróleo es ya mayor desastre ecológico ...","snippet": "_ El derrame de petróleo en el Golfo de México que afecta a las  ...  el momento han aparecido 316 ejemplares de animales sin vida en los  ...","ranking": 84,"size": 1.176470588,"rscore": 16.663185,"reputation": 0,"repu_normalizada": 9,"date": "26-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.juventudrebelde.cu/internacionales/2010-05-26/derrame-de-petroleo-es-ya-mayor-desastre-ecologico-/index.html"}, 
{ "id": "1115","repu": 14,"re_nor": 0,"fecha": 100,"url": "http://www.urgente24.com/197703-otra-gigantesca-mancha-de-crudo-en-el-golfo-de-mexico","name": "Otra gigantesca mancha de crudo en el Golfo de México ...","snippet": "La Royal Dutch Shell se desentendió de la responsabilidad del derrame aunque tiene  ...  Mancha de petróleo en el Golfo de México (2010)  ....  de Buenos Aires, Argentina, el 15 de enero de 1999, contaminando el agua, la flora y la fauna.","ranking": 81,"size": 1.219512195,"rscore": 12.811424,"reputation": 0,"repu_normalizada": 2,"date": "26-12-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.urgente24.com/197703-otra-gigantesca-mancha-de-crudo-en-el-golfo-de-mexico.html"}, 
{ "id": "1116","repu": 15,"re_nor": 0,"fecha": 42,"url": "http://animalnaturaleza.blogspot.com/2010/07/como-se-limpian-los-animales-del-golfo.html","name": "Mundo animal: Como se limpian los animales del Golfo","snippet": "No se si todos somos conscientes de la catástrofe que produce este derrame de petróleo en el Golfo de México. En este año dedicado a la  ...","ranking": 79,"size": 1.25,"rscore": 10.47226,"reputation": 0,"repu_normalizada": 4,"date": "04-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/animalnaturaleza.blogspot.cl/2010/07/como-se-limpian-los-animales-del-golfo.html"}, 
{ "id": "1117","repu": 16,"re_nor": 1,"fecha": 6,"url": "http://www.lanacion.com.ar/1259760-eeuu-alerta-por-un-derrame-de-crudo","name": "EE.UU.: alerta por un derrame de crudo - La Nación","snippet": "alerta por un derrame de crudo | Una marea negra avanza hacia la costa de  ...  de crudo de su historia en el golfo de México, donde una mancha de petróleo del  ...  amenazando la vida de cientos de especies de flora y fauna.","ranking": 76,"size": 1.298701299,"rscore": 18.18731,"reputation": 0,"repu_normalizada": 6,"date": "30-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.lanacion.com.ar/1259760-eeuu-alerta-por-un-derrame-de-crudo.html"}, 
{ "id": "1118","repu": 17,"re_nor": 1,"fecha": 52,"url": "http://www.ebah.com.br/content/ABAAABcd4AC/tcc-manoel","name": "TCC Manoel - DERRAME DE PETROLEO EM AMBIENTE ...","snippet": "Figura 6 - Ave marinha coberta pelo petróleo Golfo do México Fonte estadão (2010)  ...  Além da ameaça da fauna e a flora marinha, também afeta o ser humano,  ...","ranking": 72,"size": 1.369863014,"rscore": 15.761826,"reputation": 0,"repu_normalizada": 8,"date": "01-09-2010","colour": 6,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.ebah.com.br/content/ABAAABcd4AC/tcc-manoel.html"}, 
{ "id": "1119","repu": 18,"re_nor": 1,"fecha": 40,"url": "http://www.teleaire.com/derrame-de-petroleo-en-el-golfo-de-mexico-a-71-dias-del-desastre/","name": "Derrame de petróleo en el Golfo de México - Teleaire.com","snippet": "El derrame de petróleo ocurrido el pasado 20 de abril en el Golfo mexicano se  ...  Son incalculables las pérdidas en flora y fauna marítima: el  ...","ranking": 77,"size": 1.282051282,"rscore": 13.64046,"reputation": 0,"repu_normalizada": 0,"date": "01-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.teleaire.com/derrame-de-petroleo-en-el-golfo-de-mexico-a-71-dias-del-desastre/index.html"}, 
{ "id": "1120","repu": 19,"re_nor": 1,"fecha": 2,"url": "http://html.rincondelvago.com/efectos-de-los-derrames-de-crudos-en-aguas-marinas_metodos-de-prevencion-y-plan-de-contingencia.html","name": "Efectos de los derrames de crudos en aguas marinas ...","snippet": "Para definir el comportamiento de un derrame de petróleo en el mar, se puede  ....  de numerosas especies de animales entre de las cuales se encuentran aves,  ...","ranking": 70,"size": 1.408450704,"rscore": 29.57046,"reputation": 0,"repu_normalizada": 9,"date": "26-04-2004","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/html.rincondelvago.com/efectos-de-los-derrames-de-crudos-en-aguas-marinas_metodos-de-prevencion-y-plan-de-contingencia.html"}, 
{ "id": "1121","repu": 20,"re_nor": 1,"fecha": 45,"url": "http://abrazode4patas.blogspot.com/2010/07/contener-derrame-de-petroleo-en-el.html","name": "Contener derrame de petróleo en el Golfo de México es ...","snippet": "Contener derrame de petróleo en el Golfo de México es más difícil que ir a la Luna. Foto: Reuters. Son cientos los animales, como los  ...","ranking": 78,"size": 1.265822785,"rscore": 23.997284,"reputation": 0,"repu_normalizada": 7,"date": "06-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/abrazode4patas.blogspot.cl/2010/07/contener-derrame-de-petroleo-en-el.html"}, 
{ "id": "1122","repu": 21,"re_nor": 1,"fecha": 83,"url": "http://www.noticiasambientales.com.ar/index.php?modulo=13&id=2521","name": "Golfo de México: peces sufren afecciones cardíacas por el ...","snippet": "Golfo de México: peces sufren afecciones cardíacas por el derrame de  ...  dejó el derrame petrolero de la plataforma operada por British Petroleum en 2010,  ...  conducir a paros cardíacos y la muerte repentina de los animales.","ranking": 68,"size": 1.449275362,"rscore": 29.92099,"reputation": 0,"repu_normalizada": 5,"date": "19-02-2014","colour": 47,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.noticiasambientales.com.ar/index64f2.html"}, 
{ "id": "1123","repu": 22,"re_nor": 1,"fecha": 16,"url": "http://www.futuroverderd.com/desastre-ambiental-amenaza-golfo-de-mexico/","name": "DESASTRE AMBIENTAL AMENAZA GOLFO DE MEXICO ...","snippet": "DESASTRE AMBIENTAL AMENAZA GOLFO DE MEXICO  ...  para contener un enorme derrame de petróleo en el Golfo de México.  ...  que además de ser reservas de fauna y flora silvestres son destinos turísticos y de pesca  ...","ranking": 69,"size": 1.428571429,"rscore": 24.52779,"reputation": 0,"repu_normalizada": 3,"date": "11-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.futuroverderd.com/desastre-ambiental-amenaza-golfo-de-mexico/index.html"}, 
{ "id": "1124","repu": 23,"re_nor": 1,"fecha": 68,"url": "http://lashojasverdes.com/tag/animales-muertos-por-petroleo/","name": "animales muertos por petroleo | Las Hojas Verdes","snippet": "Posts about animales muertos por petroleo written by lashojasverdes.  ...  más grave ocurrido en el Golfo de México, debido al accidente ocurrido el 20 de abril de 2010,  ...  El derrame produjo la muerte a más de 2.600 animales entre los que se  ...","ranking": 64,"size": 1.538461538,"rscore": 23.99917,"reputation": 0,"repu_normalizada": 1,"date": "15-09-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/lashojasverdes.com/tag/animales-muertos-por-petroleo/index.html"}, 
{ "id": "1125","repu": 24,"re_nor": 1,"fecha": 67,"url": "http://www.dw.com/es/derrame-petrolero-en-el-mar-del-norte-el-m%C3%A1s-grave-de-la-d%C3%A9cada/a-15318901","name": "Derrame petrolero en el Mar del Norte - Deutsche Welle","snippet": "La petrolera neerlandesa Royal Dutch Shell informó que el derrame de crudo  ...  en el Golfo de México en 2010 ???cuando un accidente en la plataforma  ...  El ???Rey de los animales??? está en peligro de extinción y sólo podrá  ...","ranking": 71,"size": 1.388888889,"rscore": 20.1546,"reputation": 0,"repu_normalizada": 0,"date": "16-08-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.dw.com/es/derrame-petrolero-en-el-mar-del-norte-el-m%C3%A1s-grave-de-la-d%C3%A9cada/a-15318901.html"}, 
{ "id": "1126","repu": 25,"re_nor": 1,"fecha": 47,"url": "http://www.vanguardia.com/historico/69879-bonnie-lleva-mas-petroleo-al-golfo-y-afectara-a-animales","name": "Bonnie lleva más petróleo al Golfo y afectará a animales ...","snippet": "El ciclón se desplazará sobre el derrame de crudo que se extiende sobre buena parte del Golfo de México desde hoy al medio día y en la noche se aproximará  ...","ranking": 67,"size": 1.470588235,"rscore": 27.17179,"reputation": 0,"repu_normalizada": 8,"date": "24-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.vanguardia.com/historico/69879-bonnie-lleva-mas-petroleo-al-golfo-y-afectara-a-animales.html"}, 
{ "id": "1127","repu": 26,"re_nor": 2,"fecha": 11,"url": "http://www.conscienciaolocura.net/category/noticias/","name": "Consciencia o Locura » Noticias","snippet": "Escrito por admin Publicado en Conciencia Ecológica, Cuida a los animales,  ....  Este derrame de petróleo en el Golfo de México, sin duda, representa un  ...","ranking": 66,"size": 1.492537313,"rscore": 27.93766,"reputation": 0,"repu_normalizada": 6,"date": "06-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.conscienciaolocura.net/category/noticias/index.html"}, 
{ "id": "1128","repu": 27,"re_nor": 2,"fecha": 57,"url": "http://www.lacomunidadpetrolera.com/sectores/energia-sectores/impacto-ambiental-que-origina-el-petroleo-y-los-entes-que-intervienen-en-el-momento-de-una-afectacion-de-este-tipo/","name": "Impacto ambiental que origina el petróleo y los entes que ...","snippet": "Afecta en forma directa al suelo, agua, aire, y a la fauna y la flora.  ...  Por otro lado los derrames de petróleo y los desechos producen una alteración del sustrato original  ...  ZONA 2 (Golfo de Venezuela y península de Paraguana).  ...  Ecuador · España · Estados Unidos · México · Perú · Venezuela · Resto de América · Mundo.","ranking": 57,"size": 1.724137931,"rscore": 22.88439,"reputation": 0,"repu_normalizada": 4,"date": "11-11-2010","colour": 8,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.lacomunidadpetrolera.com/sectores/energia-sectores/impacto-ambiental-que-origina-el-petroleo-y-los-entes-que-intervienen-en-el-momento-de-una-afectacion-de-este-tipo/index.html"}, 
{ "id": "1129","repu": 28,"re_nor": 2,"fecha": 31,"url": "http://cordis.europa.eu/news/rcn/32143_es.html","name": "Comisión Europea : CORDIS : Noticias y Eventos : Un ...","snippet": "...  los efectos en animales de la corticosterona, una hormona segregada  ...  por el enorme derrame de petróleo ocurrido en el Golfo de México.","ranking": 60,"size": 1.639344262,"rscore": 20.283875,"reputation": 0,"repu_normalizada": 2,"date": "27-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/cordis.europa.eu/news/rcn/32143_es.html"}, 
{ "id": "1130","repu": 29,"re_nor": 2,"fecha": 24,"url": "http://blog.fundacionmontemadrid.es/medio-ambiente/los-derrames-de-petroleo-mas-catastroficos-de-la-historia/","name": "Los derrames de petróleo más catastróficos de la historia ...","snippet": "El último derrame de petróleo ocurrido en la zona del Golfo de México  ...  daños en la flora y fauna siguen teniendo repercusión en estos días.","ranking": 56,"size": 1.754385965,"rscore": 30.162025,"reputation": 0,"repu_normalizada": 9,"date": "19-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/blog.fundacionmontemadrid.es/medio-ambiente/los-derrames-de-petroleo-mas-catastroficos-de-la-historia/index.html"}, 
{ "id": "1131","repu": 30,"re_nor": 2,"fecha": 14,"url": "http://planetabeta.com/derrame-petrolero-golfo-mexico-afecta-numerosos-especies-animales","name": "Derrame petrolero en el Golfo de México afecta a ...","snippet": "Derrame petrolero en el Golfo de México afecta a numerosos especies de animales ... Despertar del fotógrafo Jane Fulton Alt muestra lo que el derrame de petróleo BP ha hecho a las playas verdes a lo largo del Golfo de ...","ranking": 59,"size": 1.666666667,"rscore": 33.14258,"reputation": 0,"repu_normalizada": 7,"date": "07-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/planetabeta.com/derrame-petrolero-golfo-mexico-afecta-numerosos-especies-animales.html"}, 
{ "id": "1132","repu": 31,"re_nor": 3,"fecha": 25,"url": "http://www.informador.com.mx/tecnologia/2010/202955/6/derrame-de-petroleo-pone-en-peligro-muchas-especies.htm","name": "Derrame de petróleo pone en peligro muchas especies :: El ...","snippet": "Derrame de petróleo pone en peligro muchas especies  ...  vertido de petróleo en el Golfo de México puede acabar 'colapsando' algunas especies.  ...  mayoría son devoradas por otros animales, se hunden o se descomponen.","ranking": 58,"size": 1.694915254,"rscore": 34.80887,"reputation": 0,"repu_normalizada": 5,"date": "20-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.informador.com.mx/tecnologia/2010/202955/6/derrame-de-petroleo-pone-en-peligro-muchas-especies.html"}, 
{ "id": "1133","repu": 32,"re_nor": 3,"fecha": 51,"url": "http://www.lavoz.com.ar/ciudadanos/ambiente/obama-se-bano-en-el-golfo-de-mexico-para-promover-el-turismo","name": "Obama se bañó en el golfo de México para promover el ...","snippet": "Luego del derrame de petróleo el presidente de Estados Unidos quiere  ...  del Golfo de México, en la fauna, la flora tanto marina como costera,  ...","ranking": 48,"size": 2.040816327,"rscore": 37.721954,"reputation": 0,"repu_normalizada": 3,"date": "15-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.lavoz.com.ar/ciudadanos/ambiente/obama-se-bano-en-el-golfo-de-mexico-para-promover-el-turismo.html"}, 
{ "id": "1134","repu": 33,"re_nor": 3,"fecha": 84,"url": "http://www.cromo.com.uy/el-ecosistema-marino-del-golfo-mexico-no-se-ha-recuperado-n566660","name": "El ecosistema marino del Golfo de México no se ha ... - Cromo","snippet": "El ecosistema marino del Golfo de México no se ha recuperado  ...  la explosión de la plataforma petrolera siguen afectando a delfines, tortugas y peces  ...  el derrame de 4,9 millones de barriles de crudo en las aguas del Golfo de México.  ...  de la restauración de una especie animal en el Golfo de México.","ranking": 51,"size": 1.923076923,"rscore": 32.62451,"reputation": 0,"repu_normalizada": 1,"date": "11-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.cromo.com.uy/el-ecosistema-marino-del-golfo-mexico-no-se-ha-recuperado-n566660.html"}, 
{ "id": "1135","repu": 34,"re_nor": 3,"fecha": 3,"url": "http://www.scielo.org.ve/scielo.php?pid=S0378-18442004000600006&script=sci_arttext","name": "Interciencia - Impacto ecológico de la industria petrolera en ...","snippet": "La Sonda de Campeche se localiza en la parte sur del Golfo de México, entre dos  ....  Cuando se presenta la eventualidad de un derrame, el tipo de petróleo y su  ....  y los últimos presentan diversos efectos sobre flora y fauna (NOAA, 1992b","ranking": 50,"size": 1.960784314,"rscore": 33.13031,"reputation": 0,"repu_normalizada": 0,"date": "06-06-2004","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.scielo.org.ve/scielof05c.html"}, 
{ "id": "1136","repu": 35,"re_nor": 3,"fecha": 12,"url": "http://noticias.emisorasunidas.com/noticias/salud/usan-cabello-humano-y-animal-para-limpiar-derrame-de-petroleo","name": "Usan cabello humano y animal para limpiar derrame de ...","snippet": "Usan cabello humano y animal para limpiar derrame de petróleo  ...  de pelo animal y humano y fibras de nailon para limpiar el Golfo de México  ...","ranking": 43,"size": 2.272727273,"rscore": 35.86162,"reputation": 0,"repu_normalizada": 8,"date": "06-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/noticias.emisorasunidas.com/noticias/salud/usan-cabello-humano-y-animal-para-limpiar-derrame-de-petroleo.html"}, 
{ "id": "1137","repu": 36,"re_nor": 3,"fecha": 60,"url": "http://entrerayas.com/2012/03/contaminacion-ambiental-de-la-industria-petrolera/","name": "Contaminación ambiental de la industria petrolera - Entre ...","snippet": "...  de la industria petrolera fue el derrame de crudo en el Golfo de México  ...  Los animales y ecosistemas mas afectados por los derrames de  ...","ranking": 49,"size": 2,"rscore": 36.19946,"reputation": 0,"repu_normalizada": 6,"date": "06-03-2011","colour": 12,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/entrerayas.com/2012/03/contaminacion-ambiental-de-la-industria-petrolera/index.html"}, 
{ "id": "1138","repu": 37,"re_nor": 4,"fecha": 1,"url": "http://www.ambientum.com/revista/2003_01/FCTVRTD.htm","name": "Efectos ecológicos del vertido de petróleo - Ambientum","snippet": "El vertido del petrolero Prestige nos hace preguntarnos sobre los efectos reales  ...  En algunos accidentes se han llegado a derramar más de 400.000 toneladas, como en la rotura de una plataforma marina en el Golfo de México, en 1979.  ...  causar extraordinarias mortandades en pájaros, focas y todo tipo de fauna y flora.","ranking": 47,"size": 2.083333333,"rscore": 35.40999,"reputation": 0,"repu_normalizada": 4,"date": "01-12-2003","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.ambientum.com/revista/2003_01/FCTVRTD.html"}, 
{ "id": "1139","repu": 38,"re_nor": 4,"fecha": 72,"url": "http://pobrezaambiente.typepad.com/blog/2012/03/el-petroleo-derramado-en-el-accidente-del-golfo-de-mexico-entro-a-la-cadena-alimenticia-del-ecosiste.html","name": "El petroleo derramado en el accidente del Golfo de Mexico ...","snippet": "El petroleo derramado en el accidente del Golfo de Mexico penetró la  ...  El zooplancton son pequeños animales a la deriva presentes en el  ...","ranking": 42,"size": 2.325581395,"rscore": 39.44748,"reputation": 0,"repu_normalizada": 2,"date": "21-03-2012","colour": 24,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/pobrezaambiente.typepad.com/blog/2012/03/el-petroleo-derramado-en-el-accidente-del-golfo-de-mexico-entro-a-la-cadena-alimenticia-del-ecosiste.html"}, 
{ "id": "1140","repu": 39,"re_nor": 4,"fecha": 22,"url": "http://www.emol.com/noticias/internacional/2010/05/18/413846/casi-200-animales-han-sido-hallados-muertos-desde-inicio-de-derrame-de-crudo-en-eeuu.html","name": "Casi 200 animales han sido hallados muertos desde inicio ...","snippet": "Aunque no se han encontrado restos de petróleo en las tortugas, éstas  ...  hoy que desde el comienzo del derrame de crudo en el Golfo de México han  ...  de la Fauna y Flora Contaminados por Derrames de la Universidad de  ...","ranking": 46,"size": 2.127659574,"rscore": 46.654976,"reputation": 0,"repu_normalizada": 9,"date": "18-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.emol.com/noticias/internacional/2010/05/18/413846/casi-200-animales-han-sido-hallados-muertos-desde-inicio-de-derrame-de-crudo-en-eeuu.html"}, 
{ "id": "1141","repu": 80,"re_nor": 8,"fecha": 26,"url": "http://www.elmundo.es/america/2010/05/20/estados_unidos/1274316306.html","name": "En Florida nadie tiene la más mínima idea por dónde va la ...","snippet": "Un mes después del derrame de la plataforma 'Deepwater Horizon' lo único  ...  vertido al Golfo de México, cuál es el impacto en la flora y la fauna marina,  ...  Para mí todo ese petróleo va acabar por desaparecer en el mar y  ...","ranking": 92,"size": 1.075268817,"rscore": 41.068886,"reputation": 3,"repu_normalizada": 6,"date": "20-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.elmundo.es/america/2010/05/20/estados_unidos/1274316306.html"}, 
{ "id": "1142","repu": 66,"re_nor": 7,"fecha": 71,"url": "http://noticias.masverdedigital.com/posicion-de-azul-ambientalistas-ante-el-derrame-de-petrolero-sin-precedentes-en-el-rio-guarapiche-de-maturin-estado-monagas-venezuela/","name": "Posición de Azul Ambientalistas ante el derrame de ...","snippet": "Después del derrame de petróleo acontecido en el Golfo de México, en  ...  mamíferos y demás especies de la flora y fauna, también deben ser  ...","ranking": 73,"size": 1.351351351,"rscore": 46.98398,"reputation": 1,"repu_normalizada": 3,"date": "11-02-2012","colour": 23,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/noticias.masverdedigital.com/posicion-de-azul-ambientalistas-ante-el-derrame-de-petrolero-sin-precedentes-en-el-rio-guarapiche-de-maturin-estado-monagas-venezuela/index.html"}, 
{ "id": "1143","repu": 40,"re_nor": 4,"fecha": 43,"url": "http://m.cnnmexico.com/mundo/2010/07/04/mas-aves-acuaticas-peligran-por-el-derrame-de-petroleo-en-el-golfo","name": "Más aves acuáticas peligran por el derrame de petróleo en ...","snippet": "Muchas más aves y animales que anidan, se alimentan y se  ...  la cifra de aves muertas producto del derrame en el Golfo de México es menor a  ...","ranking": 41,"size": 2.380952381,"rscore": 41.74697,"reputation": 0,"repu_normalizada": 8,"date": "04-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/m.cnnmexico.com/mundo/2010/07/04/mas-aves-acuaticas-peligran-por-el-derrame-de-petroleo-en-el-golfo.html"}, 
{ "id": "1144","repu": 67,"re_nor": 7,"fecha": 13,"url": "http://www.actualidadambiental.pe/?p=5442","name": "Ensayan nueva técnica para controlar derrame de petróleo ...","snippet": "Sostuvo que una gran cantidad del petróleo derramado en el Golfo de México desde el punto donde la plataforma de BP se hundió no saldrá a  ...","ranking": 74,"size": 1.333333333,"rscore": 43.33736,"reputation": 1,"repu_normalizada": 4,"date": "06-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.actualidadambiental.pe/index0a63.html"}, 
{ "id": "1145","repu": 41,"re_nor": 4,"fecha": 63,"url": "http://www.americaeconomia.com/negocios-industrias/un-ano-del-desastre-petrolero-en-el-golfo-de-mexico-siguen-los-efectos-del-derra","name": "A un año del desastre petrolero en el Golfo de México ...","snippet": "Un año después, el petróleo del peor derrame en la historia de  ...  los pantanos, contaminó el océano y puso en peligro la flora y la fauna, sin  ...","ranking": 44,"size": 2.222222222,"rscore": 49.561424,"reputation": 0,"repu_normalizada": 7,"date": "20-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.americaeconomia.com/negocios-industrias/un-ano-del-desastre-petrolero-en-el-golfo-de-mexico-siguen-los-efectos-del-derra.html"}, 
{ "id": "1146","repu": 42,"re_nor": 4,"fecha": 55,"url": "http://www.oceanos.com.mx/html/golfopeligroext.html","name": "continua leyendo - Océanos - Expediciones y Buceo","snippet": "El Golfo de México en peligro de Extinción  ...  del país(2) por el derrame de petróleo acontecido el pasado 20 de abril en el Golfo de México (3).  ....  Así mismo, el Golfo de México es un área de gran diversidad de flora y fauna y una zona  ...","ranking": 39,"size": 2.5,"rscore": 44.22161,"reputation": 0,"repu_normalizada": 5,"date": "09-10-2010","colour": 7,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.oceanos.com.mx/html/golfopeligroext.html"}, 
{ "id": "1147","repu": 43,"re_nor": 4,"fecha": 46,"url": "http://www.animanaturalis.org/n/11112","name": "¡Donando cabello ayudas a los animales del Golfo de México!","snippet": "¡Donando cabello ayudas a los animales del Golfo de México!  ...  El derrame de petróleo ocurrido el pasado 20 de Abril en el Golfo de México  ...","ranking": 32,"size": 3.03030303,"rscore": 40.93594,"reputation": 0,"repu_normalizada": 2,"date": "22-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.animanaturalis.org/n/11112.html"}, 
{ "id": "1148","repu": 44,"re_nor": 4,"fecha": 41,"url": "http://www.bioblogia.com/2010/07/derrames-de-petroleo-incrementarian-los-niveles-de-arsenico-en-los-oceanos/","name": "Los derrames de petróleo incrementarían los niveles de ...","snippet": "También puede matar a los animales como las aves que se alimentan  ...  amenaza tóxica luego del derrame de petroleo del Golfo de México.","ranking": 35,"size": 2.777777778,"rscore": 45.39434,"reputation": 0,"repu_normalizada": 0,"date": "03-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.bioblogia.com/2010/07/derrames-de-petroleo-incrementarian-los-niveles-de-arsenico-en-los-oceanos/index.html"}, 
{ "id": "1149","repu": 45,"re_nor": 4,"fecha": 62,"url": "http://worldcantwait-la.com/desastre-de-petroleo-en-el-gulfo.htm","name": "DESASTRE DEL PETR??LEO EN EL GOLFO Página 01","snippet": "Para entonces, ya se habían derramado casi cinco millones de barriles de petróleo de  ...  NUEVA ORLEANS, Estados Unidos - Los habitantes del Golfo de México  ...  Según ella, hay cada menos animales silvestres y, muchos días, el olor a  ...","ranking": 38,"size": 2.564102564,"rscore": 41.032265,"reputation": 0,"repu_normalizada": 0,"date": "19-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/worldcantwait-la.com/desastre-de-petroleo-en-el-gulfo.html"}, 
{ "id": "1150","repu": 46,"re_nor": 5,"fecha": 35,"url": "http://eju.tv/2010/06/cmo-se-alivian-los-efectos-del-derrame-de-petrleo-en-la-flora-y-fauna-del-golfo-de-mxico/","name": "Cómo aliviar los efectos del derrame de petróleo en la flora ...","snippet": "Entrevista al director de la fundación World Wildlife, Roberto Troya.  ...  efectos del derrame de petróleo en la flora y fauna del Golfo de México?","ranking": 36,"size": 2.702702703,"rscore": 40.361435,"reputation": 0,"repu_normalizada": 0,"date": "07-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/eju.tv/2010/06/cmo-se-alivian-los-efectos-del-derrame-de-petrleo-en-la-flora-y-fauna-del-golfo-de-mxico/index.html"}, 
{ "id": "1151","repu": 47,"re_nor": 5,"fecha": 81,"url": "http://www.emol.com/noticias/internacional/2014/02/01/642719/detectan-delfines-enfermos-en-el-golfo-de-mexico.html","name": "Detectan delfines enfermos en el Golfo de México - Emol.com","snippet": "La empresa responsable del derrame de 2010 afirmó que el estudio  ...  hallados en el Golfo de México, que en 2010 sufrió un derrame de petróleo.  ...  'Nunca he visto un nivel tan alto de animales tan enfermos', señaló la  ...","ranking": 15,"size": 6.25,"rscore": 55.87703,"reputation": 0,"repu_normalizada": 1,"date": "01-02-2014","colour": 47,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.emol.com/noticias/internacional/2014/02/01/642719/detectan-delfines-enfermos-en-el-golfo-de-mexico.html"}, 
{ "id": "1152","repu": 48,"re_nor": 5,"fecha": 53,"url": "http://www.pucp.edu.pe/climadecambios/index.php?tmpl=articulo&id=868","name": "El derrame de petróleo en el Golfo de México :: PUCP ...","snippet": "La mancha de petróleo que se originó en el golfo de México por la  ...  y costero, y un derrame del mismo afecta de manera grave al ecosistema, daño  ...  hagan algo por todos esos animales que no les importe el dinero... asi  ...","ranking": 31,"size": 3.125,"rscore": 56.94012,"reputation": 0,"repu_normalizada": 10,"date": "07-09-2010","colour": 6,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.pucp.edu.pe/climadecambios/index7606.html"}, 
{ "id": "1153","repu": 49,"re_nor": 5,"fecha": 28,"url": "http://mardechile.cl/wordpress/?p=2844","name": "Aves, delfines y moluscos comienzan a morir intoxicados ...","snippet": "Hoy, la fauna y flora está comenzando a resentir la extensa  ...  cree que los esfuerzos por detener el derrame de petróleo no tendrán éxito y tan sólo  ...  sobre los efectos del derrame en la vida marina del Golfo de México, para  ...","ranking": 29,"size": 3.333333333,"rscore": 55.969406,"reputation": 0,"repu_normalizada": 10,"date": "25-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/mardechile.cl/wordpress/index77cc.html"}, 
{ "id": "1154","repu": 50,"re_nor": 5,"fecha": 8,"url": "http://www.dw.com/es/ecocidio-petrolero-en-el-golfo-de-m%C3%A9xico-c%C3%B3mo-detenerlo/a-5530556","name": "Ecocidio petrolero en el Golfo de México: ¿Cómo detenerlo ...","snippet": "La fauna y flora silvestres, así como la piscicultura están amenazadas. El actual derrame de crudo en el Golfo de México puede convertirse en  ...","ranking": 27,"size": 3.571428571,"rscore": 56.25614,"reputation": 0,"repu_normalizada": 1,"date": "02-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.dw.com/es/ecocidio-petrolero-en-el-golfo-de-m%C3%A9xico-c%C3%B3mo-detenerlo/a-5530556.html"}, 
{ "id": "1155","repu": 51,"re_nor": 5,"fecha": 48,"url": "http://natura-lee.blogspot.com/2010/07/donando-cabello-ayudas-los-animales-del.html","name": "Donando cabello ayudas a los animales del Golfo de México!","snippet": "El derrame de petróleo ocurrido el pasado 20 de Abril en el Golfo de México ha desatado una de las catástrofes ambientales más graves a  ...","ranking": 20,"size": 4.761904762,"rscore": 52.54042,"reputation": 0,"repu_normalizada": 4,"date": "31-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/natura-lee.blogspot.cl/2010/07/donando-cabello-ayudas-los-animales-del.html"}, 
{ "id": "1156","repu": 52,"re_nor": 5,"fecha": 4,"url": "http://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0188-49992007000300004","name": "Revista internacional de contaminación ambiental ...","snippet": "Uno de los impactos más negativos lo genera el derrame de petróleo con su  ...  principalmente por vegetación arbórea, la fauna y la flora interrelacionadas, así  ....  lo que representa un 14 % de los manglares del Golfo de México (Moreno et al.","ranking": 23,"size": 4.166666667,"rscore": 54.72293,"reputation": 0,"repu_normalizada": 7,"date": "08-08-2007","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.scielo.org.mx/scielo7b07.html"}, 
{ "id": "1157","repu": 53,"re_nor": 6,"fecha": 70,"url": "http://elclima-enelmundo.blogspot.com/2012/01/mexico-derrame-de-petroleo-provoca.html","name": "México, derrame de petróleo provoca graves daños en flora ...","snippet": "México, derrame de petróleo provoca graves daños en flora y fauna de  ...  río Coatzacoalcos que está desembocando hacia el Golfo de México,  ...","ranking": 16,"size": 5.882352941,"rscore": 51.369415,"reputation": 0,"repu_normalizada": 10,"date": "04-01-2012","colour": 22,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/elclima-enelmundo.blogspot.cl/2012/01/mexico-derrame-de-petroleo-provoca.html"}, 
{ "id": "1158","repu": 54,"re_nor": 6,"fecha": 59,"url": "http://www.buenastareas.com/ensayos/Derrame-De-Petroleo-En-El-Golfo/1523160.html","name": "Derrame de petroleo en el golfo de mexico - Ensayos ...","snippet": "El derrame de crudo en el Golfo de México traerá graves consecuencias a la fauna y flora pertenecientes al área, ya que afecta el aire y el  ...","ranking": 18,"size": 5.263157895,"rscore": 53.790665,"reputation": 0,"repu_normalizada": 2,"date": "09-02-2011","colour": 11,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.buenastareas.com/ensayos/Derrame-De-Petroleo-En-El-Golfo/1523160.html"}, 
{ "id": "1159","repu": 55,"re_nor": 6,"fecha": 80,"url": "http://ar.selecciones.com/contenido/a1044_el-derrame-de-petroleo-en-el-golfo-de-mexico","name": "El derrame de petroleo en el Golfo de Mexico - Selecciones","snippet": "El derrame de petroleo en el Golfo de Mexico se hace casi incontenible.  ...  Conoce de la contaminación en el agua, la que sufren los animales y la que se  ...","ranking": 25,"size": 3.846153846,"rscore": 59.4415,"reputation": 0,"repu_normalizada": 5,"date": "01-12-2013","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/ar.selecciones.com/contenido/a1044_el-derrame-de-petroleo-en-el-golfo-de-mexico.html"}, 
{ "id": "1160","repu": 56,"re_nor": 6,"fecha": 20,"url": "http://revcom.us/a/201/oil_spill-es.html","name": "El desastre del derrame de petróleo??? y un sistema que NO ...","snippet": "El desastre del derrame de petróleo??? y un sistema que NO merece ser el  ...  Un enorme derrame de petróleo está ocurriendo en el Golfo de México ??? un  ....  daño que este derrame está haciendo a todo tipo de fauna y flora  ...","ranking": 21,"size": 4.545454545,"rscore": 57.24169,"reputation": 0,"repu_normalizada": 8,"date": "16-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/revcom.us/a/201/oil_spill-es.html"}, 
{ "id": "1161","repu": 57,"re_nor": 6,"fecha": 33,"url": "https://sembradoresdelsaber.wordpress.com/derrame-de-petroleo-en-el-golfo-de-mexico/","name": "DERRAME DE PETR??LEO EN EL GOLFO DE M??XICO ...","snippet": "Se trata de el derrame de Petróleo en el Golfo de México, un acontecimiento ???  ...  ya que algunos estan en peligro de extinción tanto como flora y fauna.","ranking": 1,"size": 50,"rscore": 67.32223,"reputation": 0,"repu_normalizada": 10,"date": "28-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/sembradoresdelsaber.wordpress.com/derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "1162","repu": 58,"re_nor": 6,"fecha": 58,"url": "http://www.ocio.net/estilo-de-vida/ecologismo/derrame-de-petroleo-en-el-golfo-de-mexico/","name": "Derrame de petróleo en el Golfo de México - Ocio","snippet": "Derrame de petróleo en el Golfo de México, crecen día a día los daños causados por la explosión de una plataforma estadounidense y su posterior ...","ranking": 13,"size": 7.142857143,"rscore": 65.30197,"reputation": 0,"repu_normalizada": 0,"date": "01-12-2010","colour": 9,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.ocio.net/estilo-de-vida/ecologismo/derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "1163","repu": 59,"re_nor": 6,"fecha": 95,"url": "http://www.unotv.com/noticias/internacional/detalle/alertan-por-secuelas-de-derrame-de-petroleo-en-golfo-de-mexico-263872/","name": "Alertan por secuelas de derrame de petróleo en Golfo de ...","snippet": "Alertan por secuelas de derrame de petróleo en Golfo de México. AP México 18-04-2015 10:  ...  Animales resultaron con diversas afectaciones.","ranking": 24,"size": 4,"rscore": 66.990616,"reputation": 0,"repu_normalizada": 1,"date": "18-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/blogs.funiber.org/medio-ambiente/2010/05/27/especies-en-peligro-de-extincion-afectadas-por-derrame-de-petroleo.html"}, 
{ "id": "1164","repu": 60,"re_nor": 6,"fecha": 56,"url": "http://sosoceanos.blogspot.com/2010/11/numero-estimado-de-animales-muertos-en.html","name": "número estimado de animales muertos en el derrame de ...","snippet": "La web oficial del gobierno federal ha publicado su último informe sobre el derrame de petróleo en el golfo de México. En el informe han  ...","ranking": 19,"size": 5,"rscore": 66.87502,"reputation": 0,"repu_normalizada": 1,"date": "04-11-2010","colour": 8,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/sosoceanos.blogspot.cl/2010/11/numero-estimado-de-animales-muertos-en.html"}, 
{ "id": "1165","repu": 61,"re_nor": 6,"fecha": 38,"url": "http://www.corporacionraya.org/index.php/18-actualidad/1604-los-animales-mas-afectados-por-el-derrame-de-petroleo-del-golfo-de-mexico","name": "Los animales más afectados por el derrame de petróleo del ...","snippet": "Cuales son los animales más amenazados y afectados por el derrame de petroleo en el golfo de Mexico?. La verdad es que todo ser vivo expuesto a los ...","ranking": 2,"size": 33.33333333,"rscore": 64.67116,"reputation": 0,"repu_normalizada": 1,"date": "20-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.corporacionraya.org/index.php/18-actualidad/1604-los-animales-mas-afectados-por-el-derrame-de-petroleo-del-golfo-de-mexico.html"}, 
{ "id": "1166","repu": 62,"re_nor": 7,"fecha": 94,"url": "http://sipse.com/mundo/golfo-de-mexico-con-signos-alentadores-de-recuperacion-147076.html","name": "Golfo de México se recupera del mayor derrame de petróleo ...","snippet": "El Golfo de México se recupera de histórico derrame de crudo  ...  animales marinos que viven en las profundidades del Golfo de México.","ranking": 14,"size": 6.666666667,"rscore": 63.29037,"reputation": 0,"repu_normalizada": 0,"date": "16-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/sipse.com/mundo/golfo-de-mexico-con-signos-alentadores-de-recuperacion-147076.html"}, 
{ "id": "1167","repu": 68,"re_nor": 7,"fecha": 69,"url": "http://ibugueno.bligoo.cl/content/view/841006/Derrame-petrolero-del-Golfo-de-Mexico-causa-incalculable-impacto-ambiental.html","name": "Derrame petrolero del Golfo de México causa incalculable ...","snippet": "Derrame petrolero del Golfo de México causa incalculable impacto ambiental  ...  la vida marina y costera en la zona, tanto de flora y fauna, por varios años.","ranking": 53,"size": 1.851851852,"rscore": 62.28755,"reputation": 1,"repu_normalizada": 0,"date": "01-12-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/ibugueno.bligoo.cl/content/view/841006/Derrame-petrolero-del-Golfo-de-Mexico-causa-incalculable-impacto-ambiental.html"}, 
{ "id": "1168","repu": 63,"re_nor": 7,"fecha": 87,"url": "http://wiki.salahumanitaria.co/index.php/Derrame_de_petr%C3%B3leo","name": "Derrame de petróleo - Wiki.SalaHumanitaria.co","snippet": "2.1 Derrames de petróleo con gran incidencia en la fauna y la flora  ...  consumen transmiten el envenenamiento petrolero de un animal a otro  ...","ranking": 8,"size": 11.11111111,"rscore": 66.57046,"reputation": 0,"repu_normalizada": 1,"date": "19-06-2014","colour": 51,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/wiki.salahumanitaria.co/index.php/Derrame_de_petr%C3%B3leo.html"}, 
{ "id": "1169","repu": 64,"re_nor": 7,"fecha": 98,"url": "https://es.wikipedia.org/wiki/Deepwater_Horizon","name": "Deepwater Horizon - Wikipedia, la enciclopedia libre","snippet": "Destino, Hundida a 1500 m en el Golfo de México el 22 de abril de 2010  ...  2 Historia","ranking": 6,"size": 14.28571429,"rscore": 65.74962,"reputation": 0,"repu_normalizada": 2,"date": "29-11-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/es.wikipedia.org/wiki/Deepwater_Horizon.html"}, 
{ "id": "1170","repu": 73,"re_nor": 8,"fecha": 82,"url": "http://www.lr21.com.uy/mundo/1159332-derrames-de-petroleo-intoxican-atunes-y-cardumenes-mueren-de-paro-cardiaco","name": "Derrames de petróleo intoxican atunes y cardúmenes ...","snippet": "Los técnicos descubrieron que el petróleo crudo es capaz de interrumpir una  ...  tanto en estos animales como en mamíferos, inclusive los humanos.  ...  la investigación del derrame petrolero en el Golfo de México hasta fecha  ...","ranking": 65,"size": 1.515151515,"rscore": 69.944,"reputation": 2,"repu_normalizada": 3,"date": "15-02-2014","colour": 47,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.lr21.com.uy/mundo/1159332-derrames-de-petroleo-intoxican-atunes-y-cardumenes-mueren-de-paro-cardiaco.html"}, 
{ "id": "1171","repu": 74,"re_nor": 8,"fecha": 93,"url": "http://erenovable.com/derrame-de-petroleo-en-golfo-de-mexico-marea-negra-en-luisiana/","name": "Recordamos | Derrame de petróleo en Golfo de México ...","snippet": "El derrame de petróleo en el Golfo de México de 2010 fue uno de los peores de la historia suscitado verdadera preocupación en Estados ...","ranking": 62,"size": 1.587301587,"rscore": 72.52025,"reputation": 2,"repu_normalizada": 4,"date": "14-01-2015","colour": 58,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/erenovable.com/derrame-de-petroleo-en-golfo-de-mexico-marea-negra-en-luisiana/index.html"}, 
{ "id": "1172","repu": 69,"re_nor": 7,"fecha": 37,"url": "http://www.brookings.edu/es/research/testimony/2010/06/09-oil-spill-greenstone","name": "Responsabilidades económicas por los derrames de ...","snippet": "Tras el derrame de petróleo de la plataforma Deepwater Horizon,  ...  para disponer de hábitats saludables para la fauna y la flora, para  ....  El Golfo de México representa sólo el 2,3% de la producción de petróleo mundial.","ranking": 26,"size": 3.703703704,"rscore": 70.46785,"reputation": 1,"repu_normalizada": 5,"date": "09-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.brookings.edu/es/research/testimony/2010/06/09-oil-spill-greenstone.html"}, 
{ "id": "1173","repu": 82,"re_nor": 8,"fecha": 7,"url": "http://universitam.com/academicos/?p=1570","name": "tejidos de bioingenieria una alternativa a la ... - Universitam","snippet": "UU. sin pruebas en animales ??? una situación que tiene graves implicaciones  ...  GOLFO DE MEXICO: DESASTRE ECOLOGICO POR DERRAME DE PETROLEO  ...  DEL DERRAME DE PETROLEO EN EL GOLFO DE MEXICO.","ranking": 75,"size": 1.315789474,"rscore": 71.19829,"reputation": 4,"repu_normalizada": 1,"date": "01-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/universitam.com/academicos/index2bee.html"}, 
{ "id": "1174","repu": 70,"re_nor": 8,"fecha": 77,"url": "http://lasaludfamiliar.com/contenido/articulos-de-salud-1767.htm","name": "Los impactos negativos del derrame de petróleo de BP en ...","snippet": "Los impactos negativos del derrame de petróleo de BP en los Animales, Los  ...  El derrame de petróleo de BP ocurrido en el Golfo de México el 20 de abril de  ...","ranking": 12,"size": 7.692307692,"rscore": 70.65385,"reputation": 1,"repu_normalizada": 6,"date": "09-05-2013","colour": 38,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/lasaludfamiliar.com/contenido/articulos-de-salud-1767.html"}, 
{ "id": "1175","repu": 75,"re_nor": 8,"fecha": 10,"url": "http://eleconomista.com.mx/internacional/2010/05/05/cronologia-derrame-crudo-golfo","name": "Cronología del derrame de crudo en el Golfo | El Economista","snippet": "...  cronología del derrame y su impacto económico, así como en la flora y la fauna  ...  Una explosión en una plataforma de perforación petrolera dejó 11  ...  fuga submarina esparce petróleo por todo el norte del Golfo de México  ...","ranking": 40,"size": 2.43902439,"rscore": 78.24351,"reputation": 2,"repu_normalizada": 7,"date": "05-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/eleconomista.com.mx/internacional/2010/05/05/cronologia-derrame-crudo-golfo.html"}, 
{ "id": "1176","repu": 86,"re_nor": 9,"fecha": 91,"url": "http://www.ultimasnoticias.com.ve/noticias/actualidad/regiones/fotos--pdvsa-confirma-derrame-de-petroleo-en-la-ba.aspx","name": "Fotos| Pdvsa confirma derrame de petróleo en la bahía de ...","snippet": "Derrame petrolero en Amuay (Créditos: @VanessaFlores_1)  ...  podrán revivir las especies de fauna y flora marina que padecieron el derrame.  ...  por pequeña que sea, y recuerdo la fuga en el golfo de Mexico, y creo que BP  ...","ranking": 61,"size": 1.612903226,"rscore": 70.49385,"reputation": 5,"repu_normalizada": 1,"date": "27-10-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.ultimasnoticias.com.ve/noticias/actualidad/regiones/fotos--pdvsa-confirma-derrame-de-petroleo-en-la-ba.html"}, 
{ "id": "1177","repu": 76,"re_nor": 8,"fecha": 96,"url": "http://hipertextual.com/2015/04/historia-de-los-derrames-de-petroleo","name": "Historia de los derrames de petróleo - Hipertextual","snippet": "Los derrames de petróleo desde barcos y estaciones de extracción de  ...  de las marismas del Misisipi, hogar de 400 especies animales protegidas, de  ...  También en el Golfo de México, el pozo exploratorio de petróleo Ixtoc I  ...","ranking": 33,"size": 2.941176471,"rscore": 76.840004,"reputation": 2,"repu_normalizada": 0,"date": "22-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/hipertextual.com/2015/04/historia-de-los-derrames-de-petroleo.html"}, 
{ "id": "1178","repu": 77,"re_nor": 8,"fecha": 90,"url": "http://www.ecoosfera.com/tag/animales-afectados-derrame-petroleo-golfo-mexico/","name": "animales afectados derrame petroleo golfo mexico | Ecoosfera","snippet": "De acuerdo con Greenpeace, tanto la contaminación como el cambio climático han disminuido la disponibilidad del agua en México per cápita de 11 mil 500m3 ...","ranking": 0,"size": 100,"rscore": 74.463936,"reputation": 2,"repu_normalizada": 8,"date": "15-09-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.ecoosfera.com/tag/animales-afectados-derrame-petroleo-golfo-mexico/index.html"}, 
{ "id": "1179","repu": 78,"re_nor": 8,"fecha": 9,"url": "http://www.greenpeace.org/mexico/es/Noticias/2010/Mayo/biodiversidad-del-golfo-de-mex/","name": "Biodiversidad del Golfo de México en riesgo por derrame ...","snippet": "Desafortunadamente, el Golfo de México no es ajeno a los derrames de petróleo. Después de los huracanes Katrina y Rita, en 2005, varias  ...","ranking": 10,"size": 9.090909091,"rscore": 70.00667,"reputation": 2,"repu_normalizada": 9,"date": "03-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.greenpeace.org/mexico/es/Noticias/2010/Mayo/biodiversidad-del-golfo-de-mex/index.html"}, 
{ "id": "1180","repu": 79,"re_nor": 8,"fecha": 50,"url": "http://www.taringa.net/posts/info/6492216/Derrame-de-petroleo-en-el-golfo-de-Mexico.html","name": "Derrame de petroleo en el golfo de Mexico - Taringa!","snippet": "Derrame de petróleo en el Golfo de México:crecen diadía los daños  ...  y animales mamíferos, siguen sufriendo la amenaza del petróleo.","ranking": 9,"size": 10,"rscore": 74.352486,"reputation": 2,"repu_normalizada": 10,"date": "07-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.taringa.net/posts/info/6492216/Derrame-de-petroleo-en-el-golfo-de-Mexico.html"}, 
{ "id": "1181","repu": 91,"re_nor": 9,"fecha": 86,"url": "http://www.consumer.es/web/es/medio_ambiente/naturaleza/2014/05/29/219972.php","name": "Los doce peores desastres ecológicos del mundo - Consumer","snippet": "Derrame de crudo en el golfo de México  ...  Se considera el mayor derrame de petróleo accidental marino en la historia de  ...  proliferación de algas que asfixian la flora y la fauna o reducción de la cantidad de sus aguas.","ranking": 80,"size": 1.234567901,"rscore": 86.62468,"reputation": 10,"repu_normalizada": 2,"date": "29-05-2014","colour": 50,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.consumer.es/web/es/medio_ambiente/naturaleza/2014/05/29/219972.html"}, 
{ "id": "1182","repu": 83,"re_nor": 9,"fecha": 19,"url": "http://www.madrimasd.org/blogs/ciencia_marina/2010/05/15/131494","name": "Vertido de petróleo en el Golfo de México. Incontrolado.","snippet": "Se calcula que en la actualidad hay flotando en el golfo de México unas 31.000  ...  La propia petrolera ha admitido que el derrame está fuera de control y es  ....  Los pobres animales atrapados,el medio ambiente en peligro???","ranking": 45,"size": 2.173913043,"rscore": 82.46376,"reputation": 4,"repu_normalizada": 1,"date": "15-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.madrimasd.org/blogs/ciencia_marina/2010/05/15/131494.html"}, 
{ "id": "1183","repu": 71,"re_nor": 8,"fecha": 49,"url": "http://www.carbonoybosques.org/ultimas_noticias/el_derrame_de_petroleo_en_el_golfo_de_mexico_cual_es_su_impacto_sobre_la_biodiversidad.html","name": "Derrame de petróleo en el Golfo de México ¿cuál es su ...","snippet": "Derrame de petróleo en el Golfo de México ¿cuál es su impacto sobre la  ...  algas y las praderas marinas, de las cuales dependen miles de especies animales.","ranking": 4,"size": 20,"rscore": 87.487,"reputation": 1,"repu_normalizada": 0,"date": "06-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.carbonoybosques.org/ultimas_noticias/el_derrame_de_petroleo_en_el_golfo_de_mexico_cual_es_su_impacto_sobre_la_biodiversidad.html"}, 
{ "id": "1184","repu": 81,"re_nor": 8,"fecha": 32,"url": "http://blogs.funiber.org/medio-ambiente/2010/05/27/especies-en-peligro-de-extincion-afectadas-por-derrame-de-petroleo","name": "Especies en peligro de extinción afectadas por derrame de ...","snippet": "El derrame de petróleo originado por la transnacional British Petroleum  ...  La comunidad está preocupada por animales como los pelícanos o los  ...  que el 97% de las especies marinas del golfo de México dependen de los  ...","ranking": 22,"size": 4.347826087,"rscore": 84.72769,"reputation": 3,"repu_normalizada": 1,"date": "27-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/blogs.funiber.org/medio-ambiente/2010/05/27/especies-en-peligro-de-extincion-afectadas-por-derrame-de-petroleo.html"}, 
{ "id": "1185","repu": 98,"re_nor": 10,"fecha": 36,"url": "http://www.universitario.com.br/noticias/n.php?i=10095","name": "Consequências do vazamento de petróleo no Golfo do México","snippet": "Desde então, o óleo vem prejudicando a fauna marinha, o turismo e a pesca  ...  o vazamento falharam e o derrame deve continuar por mais um mês.  ...  O vazamento de petróleo cru e de gás no Golfo do México causou, além  ...","ranking": 96,"size": 1.030927835,"rscore": 80.82231,"reputation": 32,"repu_normalizada": 5,"date": "07-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.universitario.com.br/noticias/n8667.html"}, 
{ "id": "1186","repu": 88,"re_nor": 9,"fecha": 73,"url": "http://www.guia-urbana.com/contaminacion/contaminacion-por-petroleo.php","name": "Contaminación por petróleo - Guia urbana","snippet": "El petróleo es altamente contaminante, y su derrame en las aguas  ...  En 1979 en el Golfo de México, ocurrió el mayor escape de petróleo al mar, en el pozo  ...  y las branquias de los animales acuáticos, provocándoles la muerte por asfixia.","ranking": 52,"size": 1.886792453,"rscore": 84.272064,"reputation": 6,"repu_normalizada": 1,"date": "31-05-2012","colour": 26,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.guia-urbana.com/contaminacion/contaminacion-por-petroleo.html"}, 
{ "id": "1187","repu": 87,"re_nor": 9,"fecha": 79,"url": "http://www.elmundo.es/elmundo/2013/09/25/natura/1380102362.html","name": "La huella del desastre petrolero en el Golfo de México ...","snippet": "La explosión que causó el vertido en el Golfo de México en 2010.  ...  El derrame de petróleo del pozo Macondo de British Petroleum (BP) tuvo su  ...  pequeños animales marinos e invertebrados de agua dulce, dijo en el sitio a  ...","ranking": 37,"size": 2.631578947,"rscore": 83.844505,"reputation": 5,"repu_normalizada": 1,"date": "25-09-2013","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.elmundo.es/elmundo/2013/09/25/natura/1380102362.html"}, 
{ "id": "1188","repu": 84,"re_nor": 9,"fecha": 29,"url": "http://www.madrimasd.org/blogs/ciencia_marina/2010/05/25/131506","name": "Vertido en el Golfo de México: ¿la historia interminable?","snippet": "Pero lo que está sucediendo en el desastre del Golfo de México es  ....  al petróleo derramado a la cadena alimenticia de la flora y la fauna  ...","ranking": 11,"size": 8.333333333,"rscore": 82.542854,"reputation": 4,"repu_normalizada": 1,"date": "25-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.madrimasd.org/blogs/ciencia_marina/2010/05/25/131506.html"}, 
{ "id": "1189","repu": 85,"re_nor": 9,"fecha": 61,"url": "http://www.taringa.net/posts/apuntes-y-monografias/9643249/Monografia-Derrame-de-petroleo-del-Golfo-de-Mexico-propio.html","name": "Monografía Derrame de petróleo del Golfo de Mexico (propio","snippet": "Decidimos elegir el derrame de petróleo en el golfo de México por el  ....  Estos animales huyen de la marea negra que avanza en el sur de  ...","ranking": 7,"size": 12.5,"rscore": 87.85073,"reputation": 4,"repu_normalizada": 1,"date": "21-03-2011","colour": 12,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.taringa.net/post/apuntes-y-monografias/9643249/Monografia-Derrame-de-petroleo-del-Golfo-de-Mexico-propio.html"}, 
{ "id": "1190","repu": 93,"re_nor": 9,"fecha": 88,"url": "http://www.humanecapture.com/intl/spanish.html","name": "Equipo para la captura de animales | Cañón lanza-redes ...","snippet": "Ofrecemos equipos para la captura de animales, armas para el control de animales y  ...  como ocurrió durante el derrame de petróleo en el Golfo de México.","ranking": 55,"size": 1.785714286,"rscore": 84.68752,"reputation": 13,"repu_normalizada": 2,"date": "28-07-2014","colour": 52,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.humanecapture.com/intl/spanish.html"}, 
{ "id": "1191","repu": 89,"re_nor": 9,"fecha": 76,"url": "http://www.ecologiaverde.com/los-animales-siguen-intoxicandose-con-petroleo-en-el-golfo-de-mexico/","name": "Los animales siguen intoxicándose con petróleo en el golfo ...","snippet": "¿Cómo se encuentra el golfo de México después del vertido de petróleo causado por la petrolera BP? Los científicos advierten que, a pesar de ...","ranking": 17,"size": 5.555555556,"rscore": 93.080956,"reputation": 7,"repu_normalizada": 1,"date": "18-04-2013","colour": 37,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.ecologiaverde.com/los-animales-siguen-intoxicandose-con-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "1192","repu": 90,"re_nor": 9,"fecha": 44,"url": "http://portal.educ.ar/debates/eid/ciencia/cronica-de-un-desastre-anuncia.php","name": "Crónica de un desastre anunciado: derrame de petróleo en ...","snippet": "El desastre ambiental que está ocurriendo en el Golfo de México  ...  ambiental y sus consecuencias catastróficas para la fauna, la flora y la vida  ...","ranking": 3,"size": 25,"rscore": 98.88975,"reputation": 7,"repu_normalizada": 1,"date": "05-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/portal.educ.ar/debates/eid/ciencia/cronica-de-un-desastre-anuncia.html"}, 
{ "id": "1193","repu": 99,"re_nor": 10,"fecha": 97,"url": "http://www.lavanguardia.com/natural/20150521/54431367094/deepwater-horizon-vertido-petroleo-2010-sigue-matando-delfines.html","name": "El petróleo vertido en 2010 en Golfo de México aún mata ...","snippet": "El petróleo vertido en 2010 en el Golfo de México sigue matando delfines  ...  en el norte del Golfo de México después del derrame de petróleo de la  ...  'Los animales con insuficiencia suprarrenal son menos capaces de hacer  ...","ranking": 83,"size": 1.19047619,"rscore": 94.21684,"reputation": 38,"repu_normalizada": 6,"date": "21-05-2015","colour": 62,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.lavanguardia.com/natural/20150521/54431367094/deepwater-horizon-vertido-petroleo-2010-sigue-matando-delfines.html"}, 
{ "id": "1194","repu": 92,"re_nor": 9,"fecha": 34,"url": "http://www.20minutos.es/noticia/728547/0/vertidos/petroleo/claves/","name": "La lista más negra: Más de 130 desastres por vertidos de ...","snippet": "La catástrofe ecológica en el Golfo de México se suma a una larga serie de  ...  La lista más negra: Más de 130 desastres por vertidos de petróleo desde 1960  ...  sino también uno de los derrames de crudo más graves de la historia,  ...  en el Delta del Misisipi, donde viven 400 especies animales protegidas.","ranking": 30,"size": 3.225806452,"rscore": 99.6068,"reputation": 10,"repu_normalizada": 2,"date": "06-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.20minutos.es/noticia/728547/0/vertidos/petroleo/claves/index.html"}, 
{ "id": "1195","repu": 97,"re_nor": 10,"fecha": 89,"url": "http://www.quo.es/ciencia/petroleo-en-el-paraiso/y-que-dicen-las-especies-marinas-de-las-prospecciones-petroliferas","name": "¿Y qué dicen las especies marinas de las prospecciones ...","snippet": "Cómo limpian el petróleo - El vertido del Golfo de México  ...  Tags: animales, canarias, cetáceos, derrame, petróleo, sondeos sísmicos y  ...","ranking": 63,"size": 1.5625,"rscore": 90.6583,"reputation": 27,"repu_normalizada": 5,"date": "11-08-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/www.quo.es/ciencia/petroleo-en-el-paraiso/y-que-dicen-las-especies-marinas-de-las-prospecciones-petroliferas.html"}, 
{ "id": "1196","repu": 94,"re_nor": 10,"fecha": 15,"url": "http://tuverde.com/2010/05/se-teme-desastre-ambiental-por-derrame-de-petroleo-en-el-golfo-de-mexico/","name": "derrame de petróleo en el Golfo de México - TuVerde.com","snippet": "Desastre ambiental por derrame de petróleo en el Golfo de México  ...  puesto que estan muriendo muchos animales por causa de este mismo.","ranking": 28,"size": 3.448275862,"rscore": 97.67472,"reputation": 15,"repu_normalizada": 3,"date": "07-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/tuverde.com/2010/05/se-teme-desastre-ambiental-por-derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "1197","repu": 96,"re_nor": 10,"fecha": 17,"url": "http://espiritualidadypolitica.blogspot.com/2010/05/atencion-al-derrame-de-petroleo-del.html","name": "Atención al derrame de petróleo del Golfo de México","snippet": "Atención al derrame de petróleo del Golfo de México  ...  de motor para convertir 250.000 galones de agua en un tóxico para la fauna y la flora.","ranking": 34,"size": 2.857142857,"rscore": 95.03542,"reputation": 21,"repu_normalizada": 4,"date": "11-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/espiritualidadypolitica.blogspot.cl/2010/05/atencion-al-derrame-de-petroleo-del.html"}, 
{ "id": "1198","repu": 95,"re_nor": 10,"fecha": 99,"url": "https://es.wikipedia.org/wiki/Derrame_de_petr%C3%B3leo","name": "Derrame de petróleo - Wikipedia, la enciclopedia libre","snippet": "Tareas de limpieza del derrame de petróleo provocado por el buque 'Prestige'.  ...  el envenenamiento petrolero de un animal a otro por la cadena alimenticia,  ...  provocando un derrame de petróleo incontrolado en el golfo de México que  ...","ranking": 5,"size": 16.66666667,"rscore": 97.65315,"reputation": 20,"repu_normalizada": 3,"date": "29-11-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/es.wikipedia.org/wiki/Derrame_de_petr%C3%B3leo.html"}, 
{ "id": "1199","repu": 100,"re_nor": 10,"fecha": 54,"url": "http://revistaescola.abril.com.br/ciencias/fundamentos/impactos-vazamento-petroleo-como-golfo-mexico-pode-causar-fauna-flora-regiao-594556.shtml","name": "Que impactos um vazamento de petróleo, como o do golfo ...","snippet": "Meio ambiente. Que impactos um vazamento de petróleo, como o do golfo do México, pode causar à fauna e à flora de uma região? Bruna Nicolielo ...","ranking": 54,"size": 1.818181818,"rscore": 97.78068,"reputation": 59,"repu_normalizada": 10,"date": "09-09-2010","colour": 6,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo1/revistaescola.abril.com.br/ciencias/fundamentos/impactos-vazamento-petroleo-como-golfo-mexico-pode-causar-fauna-flora-regiao-594556.html"}
]
};
};
function getData2() {
return {
"id" : "2",
"name": "Superficie afectada por el derrame de petróleo en el Golfo de México",
"children": 
[
{ "id": "2100","repu": 1,"re_nor": 0,"fecha": 61,"url": "http://www.iade.org.ar/modules/noticias/article.php?storyid=3141","name": "Se muere el mar. El derrame de petróleo en el golfo de ...","snippet": "A mil quinientos metros bajo la superficie del mar se intenta contener un  ...  Derrame de petróleo en el Golfo de México: Un agujero en el mundo / Naomi Klein  ...  grandes pérdidas en las economías de las zonas afectadas.","ranking": 99,"size": 1,"rscore": 91.390945,"reputation": 0,"repu_normalizada": 0,"date": "28-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.iade.org.ar/modules/noticias/article66e8.html"}, 
{ "id": "2101","repu": 2,"re_nor": 0,"fecha": 62,"url": "http://www.laprensa.hn/vivir/494732-97/sandra-bullock-no-quiere-ya-aparecer-en-video","name": "Sandra Bullock no quiere ya aparecer en video - Diario La ...","snippet": "30 Jul 2010 / 05:20 PM / Golfo de México 2010-07-30  ...  dinero de los contribuyentes para reparar los daños causados en los humedales por el derrame  ...  de México Sandra Bullock,derrame de petróleo,Women of the Storm,Golfo de México,  ...","ranking": 97,"size": 1.020408163,"rscore": 92.33312,"reputation": 0,"repu_normalizada": 0,"date": "30-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.laprensa.hn/vivir/494732-97/sandra-bullock-no-quiere-ya-aparecer-en-video.html"}, 
{ "id": "2102","repu": 3,"re_nor": 0,"fecha": 21,"url": "http://indepth.buenosairesherald.com/noticia.asp?id=524474","name": "Frustración íntima de Obama por el derrame de petróleo ...","snippet": "El viernes visitará el área afectada para evaluar los daños. Frustración íntima de Obama por el derrame de petróleo: 'Tapen ese maldito agujero'  ...  a representantes de su gobierno por la pérdida de petróleo en el Golfo de México.  ...  de perforación al pozo que se encuentra a 1,6 kilómetros bajo la superficie, una maniobra  ...","ranking": 98,"size": 1.01010101,"rscore": 94.26678,"reputation": 0,"repu_normalizada": 0,"date": "26-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/indepth.buenosairesherald.com/noticiaf728.html"}, 
{ "id": "2103","repu": 4,"re_nor": 0,"fecha": 96,"url": "http://www.impactomercedes.com/notix/noticia/38071_argentina_manifesta%EF%BF%BD_su_preocupacia%EF%BF%BDn_por_fallas_en_una_plataforma_petrolera_en_malvinas-1.htm","name": "Impacto Mercedes.com.ar - Argentina manifestó su ...","snippet": "POLITICA  ...  provocó la tristemente célebre catástrofe ambiental en el Golfo de México'.  ...  A su vez, el comunicado señala que 'un derrame de petróleo de  ...  de derrames ensayados por las propias empresas involucradas,  ...","ranking": 95,"size": 1.041666667,"rscore": 96.14851,"reputation": 0,"repu_normalizada": 0,"date": "26-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.impactomercedes.com/notix/noticia/38071_argentina_manifesta%EF%BF%BD_su_preocupacia%EF%BF%BDn_por_fallas_en_una_plataforma_petrolera_en_malvinas-1.html"}, 
{ "id": "2104","repu": 5,"re_nor": 0,"fecha": 4,"url": "http://www.ametse.es/foro/index.php?topic=564.5","name": "Alerta medioambiental en el Golfo de México - AMETSE","snippet": "Alerta medioambiental en el Golfo de México - AMETSE","ranking": 96,"size": 1.030927835,"rscore": 90.48324,"reputation": 0,"repu_normalizada": 0,"date": "26-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.ametse.es/foro/indexfce9.html"}, 
{ "id": "2105","repu": 6,"re_nor": 0,"fecha": 58,"url": "http://diversidaddecontaminacion.obolog.es/derrame-petroleo-772004","name": "Derrame de petróleo","snippet": "Derrame de petróleo en el Golfo de México, crecen día a día los  ...  Hace unos pocos días, la superficie del Golfo afectada por el derrame era  ...","ranking": 93,"size": 1.063829787,"rscore": 95.861946,"reputation": 0,"repu_normalizada": 0,"date": "20-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/diversidaddecontaminacion.obolog.es/derrame-petroleo-772004.html"}, 
{ "id": "2106","repu": 7,"re_nor": 0,"fecha": 19,"url": "http://islamiacu.blogspot.com/2010/05/todo-el-golfo-de-mexico-y-territorios.html","name": "ISLAs: Todo el Golfo de México y territorios costeros sufrirán ...","snippet": "Según Telesur, unos 40 mil barriles de petróleo diarios siguen  ...  La magnitud del derrame petrolero en el Golfo de México, que es  ...","ranking": 92,"size": 1.075268817,"rscore": 93.247536,"reputation": 0,"repu_normalizada": 0,"date": "13-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/islamiacu.blogspot.cl/2010/05/todo-el-golfo-de-mexico-y-territorios.html"}, 
{ "id": "2107","repu": 8,"re_nor": 0,"fecha": 25,"url": "http://www.lacartadelabolsa.com/leer/articulo/bp_se_desploma_en_bolsa_se_extiende_el_derrame_de_petroleo_en_eeuu/","name": "BP se desploma en Bolsa, se extiende el derrame de ...","snippet": "BP se desploma en Bolsa, se extiende el derrame de petróleo en EEUU  ...  de un pozo de BP en el Golfo de México pondría en riesgo esta semana las costas de  ...  evaluando el desastre como la mayor catástrofe ambiental que ha afectado al país.  ...  que está sobre el pozo, a 1,6 kilómetros de la superficie.","ranking": 91,"size": 1.086956522,"rscore": 95.80261,"reputation": 0,"repu_normalizada": 0,"date": "01-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.lacartadelabolsa.com/leer/articulo/bp_se_desploma_en_bolsa_se_extiende_el_derrame_de_petroleo_en_eeuu/index.html"}, 
{ "id": "2108","repu": 9,"re_nor": 0,"fecha": 31,"url": "http://www.aguasdigital.com/actualidad/leer.php?idnota=23413","name": "Obama afirma derrame petróleo Golfo 'será contenido ...","snippet": "Obama afirma derrame petróleo Golfo 'será contenido'  ...  afirmando que el derrame de petróleo en el Golfo de México será detenido,  ...  El viernes viajó a Luisiana para reunirse con propietarios de empresas locales afectadas por el desastre.  ...  Fuerte evidencia de que Marte alberga agua en su superficie.","ranking": 87,"size": 1.136363636,"rscore": 93.28325,"reputation": 0,"repu_normalizada": 0,"date": "07-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.aguasdigital.com/actualidad/leer89a1.html"}, 
{ "id": "2109","repu": 10,"re_nor": 0,"fecha": 89,"url": "http://daaannnyfd.blogspot.com/2014_02_01_archive.html","name": "danos de chevron: febrero 2014","snippet": "Una vez cerrado el Pozo Aguarico 4, la piscina en la que Texaco vertió el petróleo fue abandonada, sin pasar por un proceso de remediación.","ranking": 88,"size": 1.123595506,"rscore": 98.184425,"reputation": 0,"repu_normalizada": 0,"date": "21-02-2014","colour": 47,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/daaannnyfd.blogspot.cl/2014_02_01_archive.html"}, 
{ "id": "2110","repu": 11,"re_nor": 0,"fecha": 30,"url": "http://www.diariollanquihue.cl/prontus4_nots/site/artic/20100605/pags/20100605165813.html","name": "BP logra controlar parte mínima del derrame de petróleo ...","snippet": "BP logra controlar parte mínima del derrame de petróleo con embudo  ...  sábado sobre la costa del Golfo de México mientras el petróleo del derrame  ...  lo más posible de petróleo y dirigirlo a un barco en la superficie.  ...  El mandatario habló de las personas que conoció y han sido afectadas por el derrame.","ranking": 90,"size": 1.098901099,"rscore": 94.71992,"reputation": 0,"repu_normalizada": 0,"date": "05-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.diariollanquihue.cl/prontus4_nots/site/artic/20100605/pags/20100605165813.html"}, 
{ "id": "2111","repu": 12,"re_nor": 0,"fecha": 86,"url": "http://article.wn.com/view/2013/02/26/Golfo_de_Mexico_donde_quedo_el_petroleo/","name": "Golfo de México: ¿dónde quedó el petróleo? - WorldNews","snippet": "Discovery Channel derrame de petroleo del golfo de México 1 de 4. 11:07  ....  girls married. Stars and Stripes · Burkina Faso - Politics - Protests  ...","ranking": 89,"size": 1.111111111,"rscore": 81.892624,"reputation": 0,"repu_normalizada": 0,"date": "26-02-2013","colour": 35,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/article.wn.com/view/2013/02/26/Golfo_de_Mexico_donde_quedo_el_petroleo/index.html"}, 
{ "id": "2112","repu": 13,"re_nor": 1,"fecha": 7,"url": "http://www.diariosur.es/rc/20100502/sociedad/obama-visita-golfo-mexico-201005020402.html","name": "Obama asegura que «BP pagará» por el vertido. SUR.es","snippet": "...  a la zona afectada por el vertido de crudo en el Golfo de México.  ...  Asimismo, ha afirmado que la petrolera BP 'es responsable de este vertido', y que 'pagará la factura'.  ...  mano las repercusiones del derrame que comenzó el pasado 20 de  ...  La mancha, con una superficie de casi 10.000 kilómetros  ...","ranking": 86,"size": 1.149425287,"rscore": 87.05367,"reputation": 0,"repu_normalizada": 0,"date": "02-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.diariosur.es/rc/20100502/sociedad/obama-visita-golfo-mexico-201005020402.html"}, 
{ "id": "2113","repu": 84,"re_nor": 8,"fecha": 32,"url": "http://www.elnortedecastilla.es/rc/20100607/mas-actualidad/vida-ocio/dice-coste-para-contener-201006071024.html","name": "El vertido de crudo le ha costado a BP más de 1.800 ...","snippet": "La petrolera británica British Petroleum (BP) ha informado de que el coste de limpieza y contención del vertido de crudo en el golfo de México supera ya  ...  dos pozos alternativos que perfora BP , la petrolera responsable del derrame.  ...  en las marismas de Luisiana, la superficie afectada es mucho mayor.","ranking": 94,"size": 1.052631579,"rscore": 87.26678,"reputation": 2,"repu_normalizada": 0,"date": "07-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.elnortedecastilla.es/rc/20100607/mas-actualidad/vida-ocio/dice-coste-para-contener-201006071024.html"}, 
{ "id": "2114","repu": 14,"re_nor": 1,"fecha": 51,"url": "http://www.seguridadydefensa.com/noticias/el-desastre-en-el-golfo-de-mexico-es-irremediable-21702.html","name": "El desastre en el Golfo de Mexico es irremediable - Editorial ...","snippet": "Aunque en este momento la fuga de petróleo en el Golfo de México haya sido  ...  5 o 10 por ciento del total del crudo derramando llegue a la superficie.  ...  que se realizará en Cancún, Quintana Roo, zona ya muy afectada por  ...","ranking": 83,"size": 1.19047619,"rscore": 87.613434,"reputation": 0,"repu_normalizada": 0,"date": "08-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.seguridadydefensa.com/noticias/el-desastre-en-el-golfo-de-mexico-es-irremediable-21702.html"}, 
{ "id": "2115","repu": 15,"re_nor": 1,"fecha": 72,"url": "http://blogs.sierraclub.org/ecocentro/2011/02/el-sierra-club-se-involucra-en-la-querella-federal-contra-bp-.html","name": "Ecocentro: Un recurso en defensa de la salud de su familia","snippet": "...  BP en torno al derrame petrolero del año pasado en el Golfo de México  ...  y daños por medio de la Ley de Contaminación Petrolera de 1990,  ...","ranking": 81,"size": 1.219512195,"rscore": 82.43519,"reputation": 0,"repu_normalizada": 0,"date": "07-02-2011","colour": 11,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/blogs.sierraclub.org/ecocentro/2011/02/el-sierra-club-se-involucra-en-la-querella-federal-contra-bp-.html"}, 
{ "id": "2116","repu": 16,"re_nor": 1,"fecha": 55,"url": "http://www.andina.com.pe/agencia/noticia-ceso-derrame-crudo-el-golfo-mexico-despues-87-dias-306499.aspx","name": "Cesó derrame de crudo en el golfo de México después de ...","snippet": "Costa de EEUU afectada por derrame de crudo.  ...  petróleo instalada sobre el pozo averiado en el golfo de México responde bien a las pruebas que  ...  a almacenar el crudo derramado en los cuatro buques que se encuentran en la superficie,  ...","ranking": 82,"size": 1.204819277,"rscore": 84.57647,"reputation": 0,"repu_normalizada": 0,"date": "15-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.andina.com.pe/agencia/noticia-ceso-derrame-crudo-el-golfo-mexico-despues-87-dias-306499.html"}, 
{ "id": "2117","repu": 17,"re_nor": 1,"fecha": 93,"url": "http://dof.gob.mx/nota_detalle.php?codigo=5342824&fecha=30/04/2014","name": "Programa para la Seguridad Nacional 2014-2018 - DOF ...","snippet": "Una política multidimensional para México en el siglo XXI  ...  Una política de Estado en materia de Seguridad Nacional requiere que todos los  ......  México es el noveno productor mundial de petróleo, alcanzado 2,936 millones  ......  incendios forestales, los derrames químicos y las emergencias radiológicas.","ranking": 80,"size": 1.234567901,"rscore": 81.973785,"reputation": 0,"repu_normalizada": 0,"date": "30-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/dof.gob.mx/nota_detallece07.html"}, 
{ "id": "2118","repu": 18,"re_nor": 1,"fecha": 94,"url": "http://www.diariovasco.com/rc/20100614/mas-actualidad/sociedad/presidente-obama-vuelve-costa-201006140852.html","name": "Obama vuelve a la zona afectada por el vertido. diariovasco ...","snippet": "El vertido afecta a la costa del Golfo de México. / Ap  ...  en el Golfo de México, donde hoy se cumple el día 56 del derrame petrolero en la zona.","ranking": 78,"size": 1.265822785,"rscore": 86.15878,"reputation": 0,"repu_normalizada": 0,"date": "22-10-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.diariovasco.com/rc/20100614/mas-actualidad/sociedad/presidente-obama-vuelve-costa-201006140852.html"}, 
{ "id": "2119","repu": 19,"re_nor": 1,"fecha": 17,"url": "http://www.elnuevodiario.com.ni/internacionales/74006-bp-arroja-dispersante-detener-derrame-golfo-mexico/","name": "4. BP arroja dispersante para detener derrame en Golfo de ...","snippet": "BP arroja dispersante para detener derrame en Golfo de México  ...  más de una milla de la superficie, arrojando petróleo a un ritmo de 5.000 barriles,  ...  La vida marina está siendo afectada en una región de tierras bajas que  ...","ranking": 77,"size": 1.282051282,"rscore": 82.03485,"reputation": 0,"repu_normalizada": 0,"date": "10-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.elnuevodiario.com.ni/internacionales/74006-bp-arroja-dispersante-detener-derrame-golfo-mexico/index.html"}, 
{ "id": "2120","repu": 20,"re_nor": 2,"fecha": 33,"url": "http://m.cnnmexico.com/mundo/2010/06/09/un-santuario-ayuda-a-los-pelicanos-y-aves-manchados-de-petroleo","name": "Un santuario ayuda a los pelícanos y aves manchados de ...","snippet": "400 aves afectadas por el derrame han sido llevadas a un centro de  ...  de petróleo, una docena de pelícanos serán atendidos y limpiados luego de  ...  con las enormes albercas de crudo en la superficie del Golfo de México.","ranking": 75,"size": 1.315789474,"rscore": 80.48143,"reputation": 0,"repu_normalizada": 0,"date": "09-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/m.cnnmexico.com/mundo/2010/06/09/un-santuario-ayuda-a-los-pelicanos-y-aves-manchados-de-petroleo.html"}, 
{ "id": "2121","repu": 21,"re_nor": 2,"fecha": 88,"url": "http://politicainternacionalargentina.blogspot.com/2013/12/armas-quimicas-consecuencias.html","name": "ARMAS QUÍMICAS. CONSECUENCIAS - Politica ...","snippet": "Publicado por Política Internacional en 12:49 · Enviar por correo  ...  IRAN. NUEVA ERA NUCLEAR EN EL GOLFO P??RSICO. 2013  ....  CONTROLARON UN DERRAME DE PETR??LEO.2011 · ¿ENERGÍA NUCLEAR? NO GRACIAS  ...  MEXICO.","ranking": 67,"size": 1.470588235,"rscore": 70.494553,"reputation": 0,"repu_normalizada": 0,"date": "12-12-2013","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/politicainternacionalargentina.blogspot.cl/2013/12/armas-quimicas-consecuencias.html"}, 
{ "id": "2122","repu": 22,"re_nor": 2,"fecha": 20,"url": "http://www.europapress.es/epsocial/politica-social/noticia-eeuu-multara-bp-responsabilidad-vertido-golfo-mexico-20100525081344.html","name": "EEUU multará a BP por su responsabilidad en el vertido del ...","snippet": "EEUU multará a BP por su responsabilidad en el vertido del golfo de México  ...  del 'desastre ecológico masivo' causado en el Golfo de México, y la  ...  lo que podría suponer el mayor derrame de petróleo de la historia de Estados Unidos.  ...  Sixto (IU) tacha la política de asilo del Gobierno de 'muy cicatera'  ...","ranking": 73,"size": 1.351351351,"rscore": 79.02618,"reputation": 0,"repu_normalizada": 0,"date": "25-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.europapress.es/epsocial/politica-social/noticia-eeuu-multara-bp-responsabilidad-vertido-golfo-mexico-20100525081344.html"}, 
{ "id": "2123","repu": 23,"re_nor": 2,"fecha": 37,"url": "http://www.montevideo.com.uy/auc.aspx?112208","name": "Obama comparó derrame con atentados - Montevideo COMM","snippet": "Obama comparó derrame con atentados  ...  Barack Obama, visitó este lunes la zona afectada por la marea negra en el Golfo de México,  ...  nuestras vulnerabilidades y nuestra política exterior, creo que este desastre va a modificar  ...  desatada por el hundimiento de una plataforma petrolera del grupo británico BP en abril.","ranking": 76,"size": 1.298701299,"rscore": 76.54981,"reputation": 0,"repu_normalizada": 0,"date": "14-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.montevideo.com.uy/aucb060.html"}, 
{ "id": "2124","repu": 24,"re_nor": 2,"fecha": 59,"url": "http://www.elperiodicodesaltillo.com/2010/2010%20julio/derrame.html","name": "Derrame en el Golfo de México, un llamado a BP y al ...","snippet": "El día 3 de junio del 2010, escribí el artículo Derrame de Petróleo en el Golfo,  ...  que BP (British Petroleum) ha suspendido tapar el pozo desde la superficie,  ...  que se coloca exactamente sobre la válvula del pozo petrolero afectado, una vez  ...","ranking": 74,"size": 1.333333333,"rscore": 74.23401,"reputation": 0,"repu_normalizada": 0,"date": "20-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.elperiodicodesaltillo.com/2010/2010%20julio/derrame.html"}, 
{ "id": "2125","repu": 25,"re_nor": 2,"fecha": 18,"url": "http://lahora.gt/hemeroteca-lh/buscan-solucionar-derrame-de-crudo-en-golfo-de-mexico/","name": "Buscan solucionar derrame de crudo en Golfo de México ...","snippet": "Buscan solucionar derrame de crudo en Golfo de México  ...  de una milla de la superficie, arrojando petróleo a un ritmo de 5.000 barriles, u 800.000  ...  La vida marina está siendo afectada en una región de tierras bajas que  ...","ranking": 72,"size": 1.369863014,"rscore": 76.87184,"reputation": 0,"repu_normalizada": 0,"date": "10-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/lahora.gt/hemeroteca-lh/buscan-solucionar-derrame-de-crudo-en-golfo-de-mexico/index.html"}, 
{ "id": "2126","repu": 26,"re_nor": 3,"fecha": 23,"url": "http://www.planbnoticias.com.ar/index.php?option=com_content&view=article&id=1627:1626&catid=58:el-mundo&Itemid=112","name": "La mancha de petróleo se expande por el Golfo de México","snippet": "El vertido de petróleo en el Golfo de México comenzó el pasado día 20 de abril tras  ...  han calificado como la mayor catástrofe ambiental que ha afectado al país. El derrame de crudo que fluye descontroladamente de un pozo de BP en el Golfo de  ...  que está sobre el pozo, a 1,6 kilómetros de la superficie.","ranking": 71,"size": 1.388888889,"rscore": 71.068375,"reputation": 0,"repu_normalizada": 0,"date": "31-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.planbnoticias.com.ar/index758b.html"}, 
{ "id": "2127","repu": 27,"re_nor": 3,"fecha": 39,"url": "http://www.solucionpolitica.net/el-derrame-en-el-golfo-le-costara-a-mexico-241-9-millones-de-pesos/","name": "El derrame en el Golfo le costará a México 241.9 millones ...","snippet": "México, DF., 21 de junio.- El plan de acción del gobierno federal para atender las consecuencias ambientales por el derrame de petróleo en el  ...","ranking": 68,"size": 1.449275362,"rscore": 79.382195,"reputation": 0,"repu_normalizada": 0,"date": "21-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.solucionpolitica.net/el-derrame-en-el-golfo-le-costara-a-mexico-241-9-millones-de-pesos/index.html"}, 
{ "id": "2128","repu": 28,"re_nor": 3,"fecha": 27,"url": "http://www.diariodecadiz.es/article/sociedad/716485/bp/logra/cortar/la/tuberia/vertido/golfo/mexico.html","name": "BP logra cortar la tubería del vertido del Golfo de México","snippet": "BP logra cortar la tubería del vertido del Golfo de México. . La petrolera intentará ahora acoplar una caja para intentar trasladar el crudo a la superficie.  ...  el sistema funcione no se detendrá por completo el derrame de petróleo.  ...  mañana a la costa de Luisiana, la zona más afectada por el derrame.","ranking": 70,"size": 1.408450704,"rscore": 70.57469,"reputation": 0,"repu_normalizada": 0,"date": "03-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.diariodecadiz.es/article/sociedad/716485/bp/logra/cortar/la/tuberia/vertido/golfo/mexico.html"}, 
{ "id": "2129","repu": 29,"re_nor": 3,"fecha": 8,"url": "http://noticias.terra.es/2010/espana/0502/actualidad/obama-visita-la-zona-afectada-por-vertido-de-petroleo-en-el-golfo-de-mexico.aspx","name": "Obama visita la zona afectada por vertido de petróleo en el ...","snippet": "...  vertido de crudo en el golfo de México, que amenaza con convertirse en la  ...  ha reaccionado con suficiente celeridad ante el derrame de crudo, que se  ...  de tapón e impediría que el crudo siguiera fluyendo a la superficie.","ranking": 69,"size": 1.428571429,"rscore": 78.65966,"reputation": 0,"repu_normalizada": 0,"date": "02-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/noticias.terra.es/2010/espana/0502/actualidad/obama-visita-la-zona-afectada-por-vertido-de-petroleo-en-el-golfo-de-mexico.html"}, 
{ "id": "2130","repu": 30,"re_nor": 3,"fecha": 16,"url": "http://spanish.news.cn/deportes/2010-05/08/c_13282887.htm","name": "Burbuja de gas metano provocó explosión en plataforma ...","snippet": "Burbuja de gas metano provocó explosión en plataforma petrolera en Golfo de México  ...  provocada por una burbuja de gas metano que salió a la superficie, según  ...  que no estalló continúa derramando petróleo en el Golfo de México.  ...  con destino al pozo petrolero afectado, en donde el contendor será  ...","ranking": 66,"size": 1.492537313,"rscore": 78.55242,"reputation": 0,"repu_normalizada": 0,"date": "08-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/spanish.news.cn/deportes/2010-05/08/c_13282887.html"}, 
{ "id": "2131","repu": 31,"re_nor": 3,"fecha": 34,"url": "http://www.cuatro.com/noticias/Obama-visitara-cuarta-afectada-vertido_0_1042125033.html","name": "Obama visitará por cuarta vez la costa afectada por el vertido","snippet": "La compañía petrolera ha comunicado, por otro lado, que todos los  ...  del crudo derramado, ha permitido rescatar una cantidad de petróleo  ...  en las zonas del golfo de México afectadas por el vertido de la plataforma petrolífera de BP.  ...  concentraciones muy bajas de petróleo procedente de la superficie',  ...","ranking": 65,"size": 1.515151515,"rscore": 61.371284,"reputation": 0,"repu_normalizada": 0,"date": "09-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.cuatro.com/noticias/Obama-visitara-cuarta-afectada-vertido_0_1042125033.html"}, 
{ "id": "2132","repu": 32,"re_nor": 4,"fecha": 66,"url": "http://prohumana.cl/2010/08/xavier-pastor-el-impacto-del-vertido-de-bp-en-golfo-mexico-puede-durar-cien-anos/","name": "Xavier Pastor: El impacto del vertido de BP en Golfo México ...","snippet": "Xavier Pastor: El impacto del vertido de BP en Golfo México puede durar cien años  ...  Las especies más afectadas han sido los cetáceos, las tortugas y las aves,  ...  el suroeste, a una profundidad de casi un kilómetro bajo la superficie.  ...  Dada la cantidad de petróleo derramado -unos cinco millones de  ...","ranking": 64,"size": 1.538461538,"rscore": 64.23338,"reputation": 0,"repu_normalizada": 0,"date": "27-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/prohumana.cl/2010/08/xavier-pastor-el-impacto-del-vertido-de-bp-en-golfo-mexico-puede-durar-cien-anos/index.html"}, 
{ "id": "2133","repu": 75,"re_nor": 8,"fecha": 52,"url": "http://www.losandes.com.ar/notas/2010/7/8/opinion-501196.asp","name": "La sociedad del riesgo - Diario Los Andes","snippet": "...  de las consecuencias del derrame de petróleo en el Golfo de México y de las  ...  'top kill' nunca aplicada a 1,6 kilómetros bajo la superficie del mar,  ...  del Golfo, por lo que se teme que desaparezcan especies afectadas que  ...","ranking": 79,"size": 1.25,"rscore": 66.00105,"reputation": 1,"repu_normalizada": 0,"date": "08-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/archivo.losandes.com.ar/notas/2010/7/8/opinion-501196.html"}, 
{ "id": "2134","repu": 33,"re_nor": 4,"fecha": 9,"url": "http://www.elnuevodiario.com.do/mobile/article.aspx?id=197402","name": "Obama rumbo a Nueva Orleans para visitar zona afectada ...","snippet": "Obama rumbo a Nueva Orleans para visitar zona afectada por derrame petróleo  ...  una visita a la zona afectada por el vertido de crudo en el Golfo de México.  ...  La mancha, con una superficie de casi 10.000 kilómetros cuadrados, como la  ...","ranking": 63,"size": 1.5625,"rscore": 63.50129,"reputation": 0,"repu_normalizada": 0,"date": "02-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.elnuevodiario.com.do/mobile/article4209.html"}, 
{ "id": "2135","repu": 34,"re_nor": 4,"fecha": 64,"url": "http://www.gabitos.com/httpwwwgabitogruposcomcaminodelaterceraedad/template.php?nm=1316712287","name": "Posible Fractura en el Fondo del Golfo de Mexico ... - Gabitos","snippet": "Científicos analizan riesgo existente en el Golfo de Mexico.  ...  encinta, debe evitar las áreas afectadas por el petróleo y el derrame???.  ....  Según el reporte de Sagalevich, el derrame petrolero hacia el Golfo de México no está  ...  para apagar exitosamente pozos de gas y petróleo en la superficie (hubo un solo  ...","ranking": 62,"size": 1.587301587,"rscore": 60.00042,"reputation": 0,"repu_normalizada": 0,"date": "21-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.gabitos.com/httpwwwgabitogruposcomcaminodelaterceraedad/templatec9ad.html"}, 
{ "id": "2136","repu": 85,"re_nor": 8,"fecha": 57,"url": "http://iipdigital.usembassy.gov/st/spanish/article/2010/07/20100719135619fjnoeled0.3040842.html","name": "Contención del escape de petróleo es positiva, pero hay ...","snippet": "...  que tiene un escape en el Golfo de México, como una señal de progreso ante  ...  de contención para que podamos llevar más petróleo a la superficie,  ...  Todavía hay mucho petróleo derramado, y es por eso que tenemos  ...  sino también compensar a la gente que se ha visto afectada???, dijo el presidente.","ranking": 84,"size": 1.176470588,"rscore": 68.025505,"reputation": 2,"repu_normalizada": 0,"date": "19-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/iipdigital.usembassy.gov/st/spanish/article/2010/07/20100719135619fjnoeled0.3040842.html"}, 
{ "id": "2137","repu": 35,"re_nor": 4,"fecha": 99,"url": "http://www.sembrandoelpetroleo.com/tag/medio-ambiente/","name": "Medio Ambiente | Sembrando el petróleo","snippet": "México y el Golfo Pérsico lideran con los derrames de crudo más  ...  La descomposición del petróleo en el medio ambiente es muy lenta, puede durar cientos de años.  ...  Cuando la marea negra se hace presente sobre la superficie del  ...  todas aquellas poblaciones que vivan cerca a las costas afectadas,  ...","ranking": 60,"size": 1.639344262,"rscore": 69.49808,"reputation": 0,"repu_normalizada": 0,"date": "07-09-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.sembrandoelpetroleo.com/tag/medio-ambiente/index.html"}, 
{ "id": "2138","repu": 36,"re_nor": 4,"fecha": 87,"url": "http://lahistoriamundial.es.tl/","name": "sean encontrado tuneles subterraneos","snippet": "Derrame de petróleo en el Golfo de México, crecen día a día los daños ... Hace unos pocos días, la superficie del Golfo afectada por el derrame era de cerca de ...","ranking": 58,"size": 1.694915254,"rscore": 65.13278,"reputation": 0,"repu_normalizada": 0,"date": "29-08-2013","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/lahistoriamundial.es.tl/index.html"}, 
{ "id": "2139","repu": 37,"re_nor": 4,"fecha": 95,"url": "http://www.elcorreo.com/agencias/20100608/mas-actualidad/mundo/bombea-175-millones-litros-dia-pozo_201006080221.html","name": "BP bombea 1,75 millones de litros-día del pozo averiado en ...","snippet": "La petrolera BP bombea 1,75 millones de litros diarios de crudo de la campana sobre el pozo averiado en el golfo de México, dij.  ...  hoy la Casa Blanca, que advirtió que los efectos del derrame se sentirán 'durante años'.  ...  en especial en las marismas de Luisiana, la superficie afectada es mucho mayor.","ranking": 59,"size": 1.666666667,"rscore": 61.12804,"reputation": 0,"repu_normalizada": 0,"date": "22-10-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.elcorreo.com/agencias/20100608/mas-actualidad/mundo/bombea-175-millones-litros-dia-pozo_201006080221.html"}, 
{ "id": "2140","repu": 38,"re_nor": 4,"fecha": 70,"url": "http://www.nacion.com/archivo/Derrame-Mexico-matado-tiburones-ballena_0_1156484406.html","name": "Derrame en golfo de México pudo haber matado a ...","snippet": "[OBJECT_PESO_1]]El derrame petrolero del golfo de México contaminó una  ...  Contaminación en una franja vital de alimentación los habría afectado  ...  en un área donde hubo petróleo en la superficie, y si lo ingirieron, hay  ...","ranking": 57,"size": 1.724137931,"rscore": 69.66247,"reputation": 0,"repu_normalizada": 0,"date": "01-11-2010","colour": 8,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.nacion.com/archivo/Derrame-Mexico-matado-tiburones-ballena_0_1156484406.html"}, 
{ "id": "2141","repu": 39,"re_nor": 4,"fecha": 80,"url": "http://entrerayas.com/2012/03/contaminacion-ambiental-de-la-industria-petrolera/","name": "Contaminación ambiental de la industria petrolera - Entre ...","snippet": "La contaminación por petróleo es uno de los problemas  ...  Uno de los últimos grandes desastres de la industria petrolera fue el derrame de crudo en el Golfo de México siendo el peor  ...  Las praderas marinas suelen verse muy afectadas.  ...  y ballenas que tienen que salir a la superficie para poder respirar.","ranking": 55,"size": 1.785714286,"rscore": 56.19946,"reputation": 0,"repu_normalizada": 0,"date": "06-03-2012","colour": 24,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/entrerayas.com/2012/03/contaminacion-ambiental-de-la-industria-petrolera/index.html"}, 
{ "id": "2142","repu": 40,"re_nor": 4,"fecha": 13,"url": "http://www.eluniverso.com/2010/05/07/1/1361/derrame-petroleo-ya-llego-tierra-firme.html","name": "Derrame de petróleo ya llegó a tierra firme - El Universo","snippet": "El derrame formó una mancha con una superficie similar a Puerto Rico, que flota en el Golfo de México desde hace más de dos semanas.  ...  Las hembras de los cachalotes ya han sido afectadas, pues crian a su progenie en  ...","ranking": 49,"size": 2,"rscore": 51.12825,"reputation": 0,"repu_normalizada": 0,"date": "07-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.eluniverso.com/2010/05/07/1/1361/derrame-petroleo-ya-llego-tierra-firme.html"}, 
{ "id": "2143","repu": 41,"re_nor": 4,"fecha": 67,"url": "http://www.elpuente.org.mx/papelytinta/el-derrame-petrolero-provoco-un-severo-dano-ambiental/","name": "El Puente » El derrame petrolero provocó un severo daño ...","snippet": "El derrame petrolero provocó un severo daño ambiental  ...  colapsó, iniciando un derrame de petróleo en el Golfo de México que tomó meses controlar.  ...  Además de los daños ambientales, la fuga ha afectado la economía de la  ...  que lleva parte del petróleo a la superficie en donde dos barcos lo reciben,  ...","ranking": 50,"size": 1.960784314,"rscore": 55.335526,"reputation": 0,"repu_normalizada": 0,"date": "28-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.elpuente.org.mx/papelytinta/el-derrame-petrolero-provoco-un-severo-dano-ambiental/index.html"}, 
{ "id": "2144","repu": 42,"re_nor": 5,"fecha": 54,"url": "http://www.dw.com/es/nueva-c%C3%BApula-busca-parar-derrame-de-hasta-60000-barriles-diarios-de-petr%C3%B3leo/a-5782960","name": "Nueva cúpula busca parar derrame de hasta 60.000 ...","snippet": "El buque Discoverer Enterprise en el Golfo de México.  ...  la superficie, dijo Chuck Wolf, del centro de coordinación nacional y limpieza  ...  penal y civil por el derrame de petróleo que afecta al Golfo de México, dijo  ...  por el derrame, que ha afectado las costas de cada uno de los estados del Golfo de México.","ranking": 51,"size": 1.923076923,"rscore": 56.92051,"reputation": 0,"repu_normalizada": 0,"date": "11-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.dw.com/es/nueva-c%C3%BApula-busca-parar-derrame-de-hasta-60000-barriles-diarios-de-petr%C3%B3leo/a-5782960.html"}, 
{ "id": "2145","repu": 43,"re_nor": 5,"fecha": 90,"url": "https://www.greenpeace.org.ar/blog/10-grandes-lecciones-que-nos-dejo-el-derrame-de-exxon-valdez-a-25-anos-del-desastre-en-las-costas-de-alaska/11678/","name": "A 25 años del derrame del Exxon Valdez en Alaska ...","snippet": "Hoy en el 25 aniversario del derrame de petróleo del Exxon Valdez en Alaska,  ...  siguen afectadas por el derrame y el petróleo de Exxon Valdez aún  ...  sólo el 3 por ciento del petróleo derramado sobre la superficie del mar y las playas.  ...  Aleutianas, Puget Sound, el Golfo de México o la Costa Atlántica. 6.","ranking": 52,"size": 1.886792453,"rscore": 59.54558,"reputation": 0,"repu_normalizada": 0,"date": "24-03-2014","colour": 48,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.greenpeace.org.ar/blog/10-grandes-lecciones-que-nos-dejo-el-derrame-de-exxon-valdez-a-25-anos-del-desastre-en-las-costas-de-alaska/11678/index.html"}, 
{ "id": "2146","repu": 44,"re_nor": 5,"fecha": 3,"url": "http://www.eltesorodelajumentud.info/mareaneg.html","name": "Mareas negras - El Tesoro de la Jumentud","snippet": "El plancton es la población que se ve afectada de una forma más directa.  ...  Los efectos del derrame de petróleo de 2010 en el Golfo de México todavía se sienten, y 2  ......  El pozo Deepwater Horizon está a unos 5,000 pies bajo la superficie.","ranking": 47,"size": 2.083333333,"rscore": 59.259224,"reputation": 0,"repu_normalizada": 0,"date": "27-12-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.eltesorodelajumentud.info/mareaneg.html"}, 
{ "id": "2147","repu": 45,"re_nor": 5,"fecha": 74,"url": "http://www.lapatriaenlinea.com/?nota=66324","name": "A un año del derrame de petróleo en el Golfo de México","snippet": "Mapa de los efectos del derrame de petróleo en el Golfo de México  ...  Miles de aves de más de 120 especies fueron afectadas y más de la mitad  ...  el equivalente a 265.000 barriles fueron quemados en la superficie marina y  ...","ranking": 43,"size": 2.272727273,"rscore": 52.66949,"reputation": 0,"repu_normalizada": 0,"date": "24-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.lapatriaenlinea.com/index4ed2.html"}, 
{ "id": "2148","repu": 46,"re_nor": 5,"fecha": 14,"url": "http://elpolvorin.over-blog.es/article-jugarretas-legales-de-british-petroleum-y-derrame-en-golfo-de-mexico-49953075.html","name": "Jugarretas legales de British Petroleum y derrame en Golfo ...","snippet": "...  DEL DERRAME DE PETROLEO EN GOLFO DE MEXICO CON COIMAS Y  ...  ambientales que genera el vertido de crudo en la superficie marina.  ...  afectadas por el derrame para la pesca por un período inicial de 10 días.","ranking": 46,"size": 2.127659574,"rscore": 51.452156,"reputation": 0,"repu_normalizada": 0,"date": "07-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/elpolvorin.over-blog.es/article-jugarretas-legales-de-british-petroleum-y-derrame-en-golfo-de-mexico-49953075.html"}, 
{ "id": "2149","repu": 47,"re_nor": 5,"fecha": 6,"url": "http://www.emol.com/noticias/internacional/2010/04/29/410418/derrame-de-crudo-en-golfo-de-mexico-amenaza-un-ecosistema-que-hierve-de-vida.html","name": "Derrame de crudo en Golfo de México amenaza un ...","snippet": "Todo derrame de petróleo en el mar es destructor, pero la geografía del delta  ...  de una plataforma petrolera en el Golfo de México se ignora cuándo se podrá  ...  El simple hecho de llegar hasta las zonas afectadas puede llevar horas y,  ...  Aunque el petróleo flota en la superficie, algunos hidrocarburos se  ...","ranking": 38,"size": 2.564102564,"rscore": 50.078766,"reputation": 0,"repu_normalizada": 0,"date": "29-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.emol.com/noticias/internacional/2010/04/29/410418/derrame-de-crudo-en-golfo-de-mexico-amenaza-un-ecosistema-que-hierve-de-vida.html"}, 
{ "id": "2150","repu": 48,"re_nor": 5,"fecha": 49,"url": "http://bolsonweb.com.ar/diariobolson/detalle.php?id_noticia=24922","name": "BP confia en John Wright para detener el derrame de petroleo","snippet": "La responsable del derrame de petroleo que amenaza el oceano es British  ...  grande de la historia en el golfo de México, de acuerdo con las estimaciones  ...  desde un pozo submarino destruido a 1.6 kilómetros de la superficie del mar,  ...  Estos derrames afectan a la fauna y la pesca de la zona marítima o litoral afectado,  ...","ranking": 42,"size": 2.325581395,"rscore": 56.92155,"reputation": 0,"repu_normalizada": 0,"date": "06-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/bolsonweb.com.ar/diariobolson/detallea0e0.html"}, 
{ "id": "2151","repu": 49,"re_nor": 5,"fecha": 53,"url": "http://biogeomundo.blogspot.com/2010/07/estados-unidos-continua-crisis.html","name": "Biogeomundo: Estados Unidos: Continua crisis ecológica","snippet": "Derrame de petróleo en el Golfo de México, crece mes a mes por  ...  Hace cuatro meses atrás, la superficie del Golfo afectada por el derrame  ...","ranking": 35,"size": 2.777777778,"rscore": 41.95111,"reputation": 0,"repu_normalizada": 0,"date": "10-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/biogeomundo.blogspot.cl/2010/07/estados-unidos-continua-crisis.html"}, 
{ "id": "2152","repu": 50,"re_nor": 5,"fecha": 43,"url": "http://conversandoconelseruno.blogspot.com/2010/06/el-ser-uno-tragedia-del-petroleo-en.html","name": "tragedia del petróleo en méxico... - conversando con el ser ...","snippet": "'Lo que está ocurriendo en el Golfo de México es como una patada en el trasero'  ...  Se mudó a Santa Bárbara, un año antes del derrame de petróleo que  ...  que el dispersante, porque acelera la subida del petróleo a la superficie,  ...  con una consideración de categoría 2 por la zona afectada del vertido,  ...","ranking": 41,"size": 2.380952381,"rscore": 40.11731,"reputation": 0,"repu_normalizada": 0,"date": "25-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/conversandoconelseruno.blogspot.cl/2010/06/el-ser-uno-tragedia-del-petroleo-en.html"}, 
{ "id": "2153","repu": 51,"re_nor": 5,"fecha": 41,"url": "http://www.diarioelpeso.com/anteriores/2010/22062010/US_220610_DiscursoObama.php","name": "Dramático discurso sobre derrame de petróleo de BP","snippet": "Y esta noche, he regresado de una visita al Golfo de México para hablar  ...  debajo la superficie del océano, el petróleo comenzó a esparcirse en el agua.  ...  incluso en áreas donde las playas no han todavía sido afectadas.","ranking": 39,"size": 2.5,"rscore": 49.49271,"reputation": 0,"repu_normalizada": 0,"date": "22-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.diarioelpeso.com/anteriores/2010/22062010/US_220610_DiscursoObama.html"}, 
{ "id": "2154","repu": 52,"re_nor": 5,"fecha": 65,"url": "http://misionambiental.blogspot.com/2010/08/el-derrame-en-el-golfo-de-mejicoun.html","name": "el derrame de petróleo en el golfo de méjico...un atentado ...","snippet": "EL DERRAME DE PETR??LEO EN EL GOLFO DE M??JICO.  ...  en la zona afectada por el derrame de crudo en el Golfo de México para  ...  el ecosistema en general, desde el plancton en la superficie hasta la barrera coralina.","ranking": 36,"size": 2.702702703,"rscore": 49.554665,"reputation": 0,"repu_normalizada": 0,"date": "23-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/misionambiental.blogspot.cl/2010/08/el-derrame-en-el-golfo-de-mejicoun.html"}, 
{ "id": "2155","repu": 53,"re_nor": 6,"fecha": 10,"url": "http://www.informador.com.mx/internacional/2010/198225/6/eu-presiona-a-bp-por-derrame-petroleo-en-golfo-mexico.htm","name": "EU presiona a BP por derrame petróleo en Golfo México - El ...","snippet": "EU presiona a BP por derrame petróleo en Golfo México  ...  y sobrevoló las zonas pesqueras costeras que podrían ser la más afectada por la situación. Los esfuerzos desesperados sobre y debajo de la superficie del océano,  ...","ranking": 30,"size": 3.225806452,"rscore": 43.59968,"reputation": 0,"repu_normalizada": 0,"date": "02-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.informador.com.mx/internacional/2010/198225/6/eu-presiona-a-bp-por-derrame-petroleo-en-golfo-mexico.html"}, 
{ "id": "2156","repu": 54,"re_nor": 6,"fecha": 50,"url": "http://consciencia-global.blogspot.com/2010/07/desastre-ambiental-en-el-golfo-de.html","name": "Desastre Ambiental en el Golfo de México - Generando ...","snippet": "El derrame de crudo de la petrolera BP se encuentra HOY  ...  tras el derrame de petróleo del Golfo de México, se jugaría su última carta.  ....  Destacando que una cosa es utilizar una bomba atómica en la superficie terrestre y otra cosa es  ...  del pozo petrolero afectado por los mismos ingenieros y científicos,  ...","ranking": 33,"size": 2.941176471,"rscore": 41.65168,"reputation": 0,"repu_normalizada": 0,"date": "07-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/consciencia-global.blogspot.cl/2010/07/desastre-ambiental-en-el-golfo-de.html"}, 
{ "id": "2157","repu": 55,"re_nor": 6,"fecha": 46,"url": "http://www.bioblogia.com/2010/07/derrames-de-petroleo-incrementarian-los-niveles-de-arsenico-en-los-oceanos/","name": "Los derrames de petróleo incrementarían los niveles de ...","snippet": "Los derrames de petróleo pueden incrementar los niveles de arsénico tóxico  ...  en el Golfo de México podría verse afectada por la fuga de petroleo en curso.  ...  pH en el agua crean un cambio positivo en la superficie de los sedimentos  ...  ¿A donde fue a parar el petroleo derramado en el Golfo de México?","ranking": 27,"size": 3.571428571,"rscore": 45.39434,"reputation": 0,"repu_normalizada": 0,"date": "03-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.bioblogia.com/2010/07/derrames-de-petroleo-incrementarian-los-niveles-de-arsenico-en-los-oceanos/index.html"}, 
{ "id": "2158","repu": 56,"re_nor": 6,"fecha": 68,"url": "http://www.oceanos.com.mx/html/golfopeligroext.html","name": "continua leyendo - Océanos - Expediciones y Buceo","snippet": "INTERVALO en superficie  ...  El Golfo de México en peligro de Extinción  ...  el derrame de petróleo acontecido el pasado 20 de abril en el Golfo de México (3).  ...  ballena y los bosques de manglares resultan como las especies afectadas, y la  ...","ranking": 26,"size": 3.703703704,"rscore": 44.22161,"reputation": 0,"repu_normalizada": 0,"date": "09-10-2010","colour": 7,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.oceanos.com.mx/html/golfopeligroext.html"}, 
{ "id": "2159","repu": 57,"re_nor": 6,"fecha": 28,"url": "http://www.espanol.rfi.fr/americas/20100603-el-petroleo-se-acerca-florida","name": "El petróleo se acerca a Florida - Marea negra - RFI","snippet": "La mancha de crudo procedente del Golfo de México ha triplicado su tamaño en  ...  La mancha de aceite tien una superficie de 24.000 km2.  ...  y podría verse seriamente afectada si el petróleo se expande en la zona y alcanza las costas.  ...  Para contener el derrame, los ingenieros de British Petroleum (BP)  ...","ranking": 29,"size": 3.333333333,"rscore": 40.50883,"reputation": 0,"repu_normalizada": 0,"date": "03-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.espanol.rfi.fr/americas/20100603-el-petroleo-se-acerca-florida.html"}, 
{ "id": "2160","repu": 58,"re_nor": 6,"fecha": 82,"url": "http://ladefensa-cazarabet.blogspot.com/2012/03/cuando-el-petroleo-se-derrama-no-conoce.html","name": "La Defensa: CUANDO EL PETR??LEO SE DERRAMA, NO ...","snippet": "DERRAME DE PETR??LEO EN EL GOLFO DE M??XICO  ....  ellos el vertido ocupará más o menos superficie, y así se verá afectada la velocidad  ...","ranking": 31,"size": 3.125,"rscore": 42.225845,"reputation": 0,"repu_normalizada": 0,"date": "28-03-2012","colour": 24,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/ladefensa-cazarabet.blogspot.cl/2012/03/cuando-el-petroleo-se-derrama-no-conoce.html"}, 
{ "id": "2161","repu": 59,"re_nor": 6,"fecha": 75,"url": "http://www.clarin.com/ieco/economia/efectos-derrame-Golfo-industria-petroleo_0_468553499.html","name": "Los efectos del derrame en el Golfo sobre la industria del ...","snippet": "El derrame de petróleo en el Golfo de México, el 20 de abril del 2010, fue  ...  Debido a que éste se produjo una milla por debajo de la superficie,  ...  Luego del derrame, la industria petrolera y de gas se vio afectada por un  ...","ranking": 21,"size": 4.545454545,"rscore": 34.39227,"reputation": 0,"repu_normalizada": 0,"date": "24-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.ieco.clarin.com/economia/efectos-derrame-Golfo-industria-petroleo_0_468553499.html"}, 
{ "id": "2162","repu": 60,"re_nor": 6,"fecha": 45,"url": "http://conspiracionesilluminatis.blogspot.com/2010/07/el-derrame-de-petroleo-en-el-golfo-de.html","name": "el derrame de petroleo en el golfo de mexico - illuminati y el ...","snippet": "El derrame petrolero en el Golfo de México es una catástrofe para el  ...  Obama, cuya popularidad se ha visto afectada por el derrame, evitó el  ...","ranking": 20,"size": 4.761904762,"rscore": 33.13795,"reputation": 0,"repu_normalizada": 0,"date": "02-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/conspiracionesilluminatis.blogspot.cl/2010/07/el-derrame-de-petroleo-en-el-golfo-de.html"}, 
{ "id": "2163","repu": 61,"re_nor": 6,"fecha": 76,"url": "http://revcom.us/a/231/oil_spill-es.html","name": "Primer aniversario del desastre del petróleo en el golfo de ...","snippet": "UN DERRAME DE PETR??LEO CAPITALISTA, Y EL SISTEMA SIGUE DÁNDOLE  ...  a fin de desintegrar el petróleo e impedir que se viera desde la superficie.  ...  En el desastre del golfo de México, el reventón del Deepwater Horizon  ...  que se alimentan de las especies perdidas también resultan afectadas.","ranking": 18,"size": 5.263157895,"rscore": 33.951744,"reputation": 0,"repu_normalizada": 0,"date": "01-05-2011","colour": 14,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/revcom.us/a/231/oil_spill-es.html"}, 
{ "id": "2164","repu": 62,"re_nor": 6,"fecha": 1,"url": "http://html.rincondelvago.com/efectos-de-los-derrames-de-crudos-en-aguas-marinas_metodos-de-prevencion-y-plan-de-contingencia.html","name": "Efectos de los derrames de crudos en aguas marinas ...","snippet": "Para definir el comportamiento de un derrame de petróleo en el mar,  ...  Los efectos que los derrames provocan a los organismos que habitan sobre la superficie  ...  los derrames de petróleo varían de acuerdo al área que pueda ser afectada y  ...","ranking": 15,"size": 6.25,"rscore": 39.57046,"reputation": 0,"repu_normalizada": 0,"date": "26-04-2004","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/html.rincondelvago.com/efectos-de-los-derrames-de-crudos-en-aguas-marinas_metodos-de-prevencion-y-plan-de-contingencia.html"}, 
{ "id": "2165","repu": 63,"re_nor": 6,"fecha": 63,"url": "http://juanchosierrar.blogspot.com/2010/08/seguimiento-geoespacial-del-derrame-de.html","name": "Seguimiento Geoespacial del derrame de petróleo en el Golfo","snippet": "...  económica y política del derrame de petroleo en el Golfo de Méjico,  ...  a la gran cantidad de fuel que se encuentra flotando en la superficie del golfo.  ...  afectadas y un historial de la distribución del derrame por medio del  ...","ranking": 25,"size": 3.846153846,"rscore": 34.88738,"reputation": 0,"repu_normalizada": 0,"date": "10-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/juanchosierrar.blogspot.cl/2010/08/seguimiento-geoespacial-del-derrame-de.html"}, 
{ "id": "2166","repu": 64,"re_nor": 7,"fecha": 77,"url": "http://www.scielo.org.mx/scielo.php?pid=S1870-35502011000100009&script=sci_arttext","name": "Norteamérica - ¿Cuál fue la visión oficial estadunidense del ...","snippet": "Más de medio año ha pasado desde la explosión de la plataforma petrolera Deepwater  ...  de los daños ocasionados por la explosión y el derrame petrolero en Macondo.  ...  La importancia del Golfo de México radica en la cantidad y diversidad de  ...  que llevan el crudo por debajo de la superficie hacia la orilla y en las olas.","ranking": 19,"size": 5,"rscore": 37.6927,"reputation": 0,"repu_normalizada": 0,"date": "01-06-2011","colour": 15,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.scielo.org.mx/scielo50cb.html"}, 
{ "id": "2167","repu": 65,"re_nor": 7,"fecha": 71,"url": "http://www.scielosp.org/scielo.php?script=sci_arttext&pid=S0036-36342011000100011","name": "Entre dos fuegos: los dispersantes en el Golfo de México","snippet": "El petróleo superficial (a la derecha, fotografiado el 7 de junio de 2010 cerca de la  ....  controlar los derrames de petróleo en la superficie son preferibles al uso de  .....  'El plancton en la base de la cadena alimentaria podría verse afectado, y se  ...","ranking": 17,"size": 5.555555556,"rscore": 36.818436,"reputation": 0,"repu_normalizada": 0,"date": "01-02-2011","colour": 11,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.scielosp.org/scielo36cb.html"}, 
{ "id": "2168","repu": 76,"re_nor": 8,"fecha": 35,"url": "http://www.caribbeannewsdigital.com/noticia/estados-unidos-confirma-obama-que-impacto-econ%C3%B3mico-por-derrame-de-petr%C3%B3leo-ser%C3%A1-%E2%80%9Cduradero%E2%80%9D","name": "Confirma Obama que impacto económico por derrame de ...","snippet": "El impacto económico del derrame de petróleo en el Golfo de México será 'duradero  ...  a las costas afectadas su condición original???, aunque este empeño demore.  ...  se ha conseguido trasvasar a los petroleros que aguardan en la superficie.","ranking": 53,"size": 1.851851852,"rscore": 30.677605,"reputation": 1,"repu_normalizada": 0,"date": "09-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.caribbeannewsdigital.com/noticia/estados-unidos-confirma-obama-que-impacto-econ%C3%B3mico-por-derrame-de-petr%C3%B3leo-ser%C3%A1-%E2%80%9Cduradero%E2%80%9D.html"}, 
{ "id": "2169","repu": 77,"re_nor": 8,"fecha": 85,"url": "https://www.ted.com/talks/cesar_harada_a_novel_idea_for_cleaning_up_oil_spills/transcript?language=es","name": "Cesar Harada: Una idea novedosa para limpiar derrames ...","snippet": "...  devastadores del derrame de petróleo de BP en el golfo de México en 2010,  ...  de la superficie y la salud de los limpiadores resultó seriamente afectada.","ranking": 61,"size": 1.612903226,"rscore": 39.21281,"reputation": 1,"repu_normalizada": 0,"date": "07-07-2012","colour": 28,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.ted.com/talks/cesar_harada_a_novel_idea_for_cleaning_up_oil_spills/transcript9d3b.html"}, 
{ "id": "2170","repu": 66,"re_nor": 7,"fecha": 81,"url": "http://elclima-enelmundo.blogspot.com/2012/03/el-gran-derrame-de-petroleo-del-golfo.html","name": "El gran derrame de petróleo del Golfo de México alcanzó a ...","snippet": "El gran derrame de petróleo del Golfo de México alcanzó a corales profundos  ...  el derrame de petróleo del Deepwater Horizon ha afectado a los corales  ...  de México están separadas de la actividad humana, en la superficie,  ...","ranking": 14,"size": 6.666666667,"rscore": 32.73817,"reputation": 0,"repu_normalizada": 0,"date": "27-03-2012","colour": 24,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/elclima-enelmundo.blogspot.cl/2012/03/el-gran-derrame-de-petroleo-del-golfo.html"}, 
{ "id": "2171","repu": 67,"re_nor": 7,"fecha": 12,"url": "http://www.ecoportal.net/Eco-Noticias/derrame_de_petroleo_en_el_golfo_de_mexico_los_responsables_intelectuales_y_el_verdadero_impacto","name": "Derrame de petróleo en el Golfo de México, los ...","snippet": "Lo del vertido en el Golfo de Mexico deja al Exxon Valdes, al incendio de los  ...  ¿Cuál es el verdadero impacto de un derrame de petróleo?  ...  Center para que fuese fabricado y utilizado en el control del pozo petrolero afectado,  ...  del agujero, para evitar la filtración o fuga de petróleo hacia la superficie.","ranking": 10,"size": 9.090909091,"rscore": 23.923416,"reputation": 0,"repu_normalizada": 0,"date": "05-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.ecoportal.net/Eco-Noticias/derrame_de_petroleo_en_el_golfo_de_mexico_los_responsables_intelectuales_y_el_verdadero_impacto.html"}, 
{ "id": "2172","repu": 68,"re_nor": 7,"fecha": 60,"url": "http://pfea.org/desastresmarinos/?tag=derrame-de-petroleo","name": "Desastres Marinos / Marine Disasters » derrame de petróleo","snippet": "De este modo el derrame asciende a la superficie siendo afectado por estos  ...  del derrame de petroleo del Golfo de México, es un sentimiento que muchos de  ...","ranking": 13,"size": 7.142857143,"rscore": 27.22147,"reputation": 0,"repu_normalizada": 0,"date": "23-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/pfea.org/desastresmarinos/index5551.html"}, 
{ "id": "2173","repu": 78,"re_nor": 8,"fecha": 48,"url": "http://axxon.com.ar/noticias/2010/07/posible-fractura-en-el-fondo-del-golfo-de-mexico-y-advertencia-de-obama/","name": "Posible fractura en el fondo del Golfo de México y ... - Axxón","snippet": "Posible fractura en el fondo del Golfo de México y advertencia de Obama  ...  encinta, debe evitar las áreas afectadas por el petróleo y el derrame???.  ...  de petróleo debajo de la superficie a más de 3,600 pies por debajo, alrededor de  ...  Según el reporte de Sagalevich, el derrame petrolero hacia el Golfo de  ...","ranking": 54,"size": 1.818181818,"rscore": 29.56766,"reputation": 1,"repu_normalizada": 0,"date": "04-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/axxon.com.ar/noticias/2010/07/posible-fractura-en-el-fondo-del-golfo-de-mexico-y-advertencia-de-obama/index.html"}, 
{ "id": "2174","repu": 69,"re_nor": 7,"fecha": 26,"url": "https://caracas1067.wordpress.com/ambiente/dossier-accidente-de-la-plataforma-deepwater-horizon/","name": "Dossier: Accidente de la plataforma Deepwater Horizon ...","snippet": "Libelula cubierta de petróleo del derrame de Deepwater Horizon tratando de  ....  que representa aproximadamente un cuarto de la superficie del Golfo de México. El área afectada se extiende entre la Bahía de Atchafalaya Bay en Louisiana a  ...","ranking": 7,"size": 12.5,"rscore": 24.3749,"reputation": 0,"repu_normalizada": 0,"date": "02-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/caracas1067.wordpress.com/ambiente/dossier-accidente-de-la-plataforma-deepwater-horizon/index.html"}, 
{ "id": "2175","repu": 70,"re_nor": 7,"fecha": 97,"url": "http://sipse.com/mexico/industria-pesquera-muere-tras-derrame-de-petroleo-british-petroleum-151249.html","name": "Derrame de British Petroleum afecta la industria pesquera ...","snippet": "Industria pesquera muere tras derrame de petróleo  ...  metros de profundidad, lejos de la detección de naves de superficie.  ...  Desde 2010, año del derrame, se han reportado pescas mediocres en todos los estados del Golfo de México.  ...  respectivas industrias pesqueras habían sido seriamente afectadas.","ranking": 9,"size": 10,"rscore": 20.3493,"reputation": 0,"repu_normalizada": 0,"date": "13-05-2015","colour": 62,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/sipse.com/mexico/industria-pesquera-muere-tras-derrame-de-petroleo-british-petroleum-151249.html"}, 
{ "id": "2176","repu": 71,"re_nor": 7,"fecha": 24,"url": "http://americaeconomia.com/negocios-industrias/crece-derrame-de-petroleo-en-golfo-de-mexico-y-afectados-planean-protestas","name": "Crece derrame de petróleo en Golfo de México y afectados ...","snippet": "Crece derrame de petróleo en Golfo de México y afectados planean protestas  ...  de Misisipi y Alabama, extendiendo el daño que ya ha afectado a varias ciudades.  ....  que está sobre el pozo, a 1,6 kilómetros de la superficie.","ranking": 6,"size": 14.28571429,"rscore": 29.895775,"reputation": 0,"repu_normalizada": 0,"date": "31-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/americaeconomia.com/negocios-industrias/crece-derrame-de-petroleo-en-golfo-de-mexico-y-afectados-planean-protestas.html"}, 
{ "id": "2177","repu": 72,"re_nor": 7,"fecha": 78,"url": "http://www.taringa.net/posts/info/11535533/El-desastre-del-Golfo-de-Mexico-un-ano-despues.html","name": "El desastre del Golfo de México, un año después - Taringa!","snippet": "Aceite flota en la superficie del Golfo de México cerca de la costa de  ...  afectada por el derrame de petróleo de BP en el Golfo de México,  ...","ranking": 2,"size": 33.33333333,"rscore": 25.44825,"reputation": 0,"repu_normalizada": 0,"date": "01-12-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.taringa.net/posts/info/11535533/El-desastre-del-Golfo-de-Mexico-un-ano-despues.html"}, 
{ "id": "2178","repu": 73,"re_nor": 7,"fecha": 5,"url": "http://www.bbc.com/mundo/internacional/2010/04/100428_derrame_petroleo_claves_lp.shtml","name": "Cuál es el verdadero impacto de un derrame de petróleo?","snippet": "¿Qué daños concretos causa un derrame de petróleo en el medio ambiente?  ...  Las praderas marinas suelen verse muy afectadas.  ...  profundidad del mar, como el del Golfo de México y un derrame en la superficie, como por  ...","ranking": 1,"size": 50,"rscore": 28.11261,"reputation": 0,"repu_normalizada": 0,"date": "28-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.bbc.com/mundo/internacional/2010/04/100428_derrame_petroleo_claves_lp.html"}, 
{ "id": "2179","repu": 79,"re_nor": 8,"fecha": 83,"url": "http://www.universalocean.es/el-derrame-de-crudo-de-bp-dano-los-corales-del-golfo-de-mexico/","name": "El derrame de crudo de BP dañó los corales del Golfo de ...","snippet": "En abril de 2010, la plataforma petrolera Deepwater Horizon, propiedad de  ...  El derrame de crudo de BP dañó los corales del Golfo de México  ...  a conocer los efectos del crudo en los ecosistemas profundos de la zona afectada.  ...  que viven a 1.300 metros de la superficie, como las colonias coralinas.","ranking": 37,"size": 2.631578947,"rscore": 26.41942,"reputation": 1,"repu_normalizada": 0,"date": "29-03-2012","colour": 24,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.universalocean.es/el-derrame-de-crudo-de-bp-dano-los-corales-del-golfo-de-mexico/index.html"}, 
{ "id": "2180","repu": 74,"re_nor": 7,"fecha": 100,"url": "https://es.wikipedia.org/wiki/Deepwater_Horizon","name": "Deepwater Horizon - Wikipedia, la enciclopedia libre","snippet": "Destino, Hundida a 1500 m en el Golfo de México el 22 de abril de 2010  ...  2 Historia","ranking": 0,"size": 100,"rscore": 25.75814,"reputation": 0,"repu_normalizada": 0,"date": "29-11-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/es.wikipedia.org/wiki/Deepwater_Horizon.html"}, 
{ "id": "2181","repu": 80,"re_nor": 8,"fecha": 56,"url": "http://www.guerreronegro.org/reportajes/derrame.html","name": "derrame de petróleo en el Golfo de México","snippet": "Aunque vivimos lejos, el desastre en el Golfo de México no debe  ...  controladas del petróleo que flota en la superficie del mar (datos de British Petroleum).  ...  de animales marinos están siendo afectadas, entre ellas tortugas,  ...","ranking": 28,"size": 3.448275862,"rscore": 1.86916,"reputation": 1,"repu_normalizada": 0,"date": "19-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.guerreronegro.org/reportajes/derrame.html"}, 
{ "id": "2182","repu": 81,"re_nor": 8,"fecha": 42,"url": "http://www.prensa.cl/eeuu-envio-tercera-factura-bp-derrame-petroleo-golfo-mexico/","name": "Tercera factura millonaria envió EEUU a BP por derrame de ...","snippet": "La petrolera británica ya pagó las dos primeras facturas.  ...  la lucha contra el derrame de petróleo en el Golfo de México, envió el gobierno  ...  Hace unos pocos días, la superficie del Golfo afectada por el derrame era de cerca  ...","ranking": 23,"size": 4.166666667,"rscore": 7.0859,"reputation": 1,"repu_normalizada": 0,"date": "24-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.prensa.cl/eeuu-envio-tercera-factura-bp-derrame-petroleo-golfo-mexico/index.html"}, 
{ "id": "2183","repu": 82,"re_nor": 8,"fecha": 47,"url": "http://www.ecologiablog.com/post/4136/los-tiburones-ballena-nuevas-victimas-del-derrame-de-petroleo-del-golfo-de-mexico","name": "Los tiburones ballena, nuevas víctimas del derrame de ...","snippet": "Los tiburones ballena, nuevas víctimas del derrame de petróleo del Golfo de México  ...  de la superficie - van a ingerir grandes cantidades de aceite tóxico,  ...  de la zona afectada por el crudo, en el sur de Grand Isle, Luisiana.","ranking": 12,"size": 7.692307692,"rscore": 5.22988,"reputation": 1,"repu_normalizada": 0,"date": "03-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.ecologiablog.com/post/4136/los-tiburones-ballena-nuevas-victimas-del-derrame-de-petroleo-del-golfo-de-mexico.html"}, 
{ "id": "2184","repu": 96,"re_nor": 9,"fecha": 29,"url": "http://www.elblogsalmon.com/entorno/nuevo-fracaso-de-bp-en-controlar-derrame","name": "Nuevo fracaso de BP en controlar derrame de petróleo","snippet": "Las playas a lo largo del Golfo de México no volverán a ser las  ...  De este modo Florida será el cuarto estado afectado por el desastre  ...  Puede que el dispersante sea para favorecer que todo el petróleo suba a la superficie.","ranking": 85,"size": 1.162790698,"rscore": 8.20232,"reputation": 16,"repu_normalizada": 2,"date": "03-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.elblogsalmon.com/entorno/nuevo-fracaso-de-bp-en-controlar-derrame.html"}, 
{ "id": "2185","repu": 83,"re_nor": 8,"fecha": 38,"url": "http://ecosofia.org/2010/06/los_animales_mas_amenazados_por_el_derrame_de_petroleo_del_golfo_de_mexico.html","name": "Los animales más amenazados por el derrame de petróleo ...","snippet": "Sólo una cosa está clara: el frágil ecosistema del Golfo de México enfrenta un grave riesgo.  ...  Las aves que bucean son muy susceptibles al derrame de petróleo  ...  es una de las amenazas para la especie más afectada por la extinción,  ...  Cuando los mamíferos marinos suben a la superficie a respirar,  ...","ranking": 3,"size": 25,"rscore": 9.72354,"reputation": 1,"repu_normalizada": 0,"date": "20-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/ecosofia.org/2010/06/los_animales_mas_amenazados_por_el_derrame_de_petroleo_del_golfo_de_mexico.html"}, 
{ "id": "2186","repu": 88,"re_nor": 9,"fecha": 2,"url": "http://www.cetmar.org/documentacion/mareas_negras_catastrofes.htm","name": "Mareas Negras Catástrofes","snippet": "La mancha de crudo cubría una superficie aproximada de unos 70 kilómetros de  ....  el derrame de 10.000 toneladas de crudo y petroleó a unos 500 pingüinos.  ...  El 19 de diciembre , el petrolero 'Sea Star' se hunde en el Golfo de Amán y  ....  en el golfo de México, durante los 280 días que se siguieron desde el inicio del  ...","ranking": 44,"size": 2.222222222,"rscore": 8.49764,"reputation": 4,"repu_normalizada": 0,"date": "27-01-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.cetmar.org/documentacion/mareas_negras_catastrofes.html"}, 
{ "id": "2187","repu": 86,"re_nor": 8,"fecha": 22,"url": "http://blogs.funiber.org/medio-ambiente/2010/05/27/especies-en-peligro-de-extincion-afectadas-por-derrame-de-petroleo","name": "Especies en peligro de extinción afectadas por derrame de ...","snippet": "El derrame de petróleo originado por la transnacional British Petroleum  ...  que el 97% de las especies marinas del golfo de México dependen de los  ...  creando una espesa capa en la superficie del estuario e impidiendo que  ...","ranking": 22,"size": 4.347826087,"rscore": 4.72769,"reputation": 3,"repu_normalizada": 0,"date": "27-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/blogs.funiber.org/medio-ambiente/2010/05/27/especies-en-peligro-de-extincion-afectadas-por-derrame-de-petroleo.html"}, 
{ "id": "2188","repu": 87,"re_nor": 9,"fecha": 92,"url": "http://www.ecoosfera.com/2014/03/a-solo-4-anos-del-catastrofico-derrame-petrolero-british-petroleum-vuelve-al-golfo-de-mexico/","name": "A sólo 4 años del catastrófico derrame petrolero, British ...","snippet": "A sólo 4 años del catastrófico derrame petrolero, British Petroleum vuelve al Golfo de México  ...  Greenpeace sospecha de un derrame petrolero en México: las  ....  a regresar a las zonas que habían sido afectadas por el derrame.  ...  ya no había residuos en la superficie porque el fondo del mar estaba  ...","ranking": 16,"size": 5.882352941,"rscore": 0.108665,"reputation": 3,"repu_normalizada": 0,"date": "25-03-2014","colour": 48,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.ecoosfera.com/2014/03/a-solo-4-anos-del-catastrofico-derrame-petrolero-british-petroleum-vuelve-al-golfo-de-mexico/index.html"}, 
{ "id": "2189","repu": 91,"re_nor": 9,"fecha": 44,"url": "http://www.tendencias21.net/Nueva-tecnica-para-purificar-agua-contaminada-por-petroleo_a4618.html","name": "Nueva técnica para purificar agua contaminada por petróleo","snippet": "Se está empleando con éxito en la zona del Golfo de México, luego del incidente  ...  con buenos resultados en la zona del Golfo de México, afectada por el  ...  para la limpieza del agua y para la preservación del petróleo derramado.  ...  hielo en superficies sólidas, empleando un tratamiento químico similar.","ranking": 45,"size": 2.173913043,"rscore": 5.11897,"reputation": 6,"repu_normalizada": 1,"date": "30-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.tendencias21.net/Nueva-tecnica-para-purificar-agua-contaminada-por-petroleo_a4618.html"}, 
{ "id": "2190","repu": 89,"re_nor": 9,"fecha": 36,"url": "http://sociedad.elpais.com/sociedad/2010/06/11/actualidad/1276207201_850215.html","name": "La cantidad de petróleo vertida en el golfo de México dobla ...","snippet": "La cantidad de petróleo vertida en el golfo de México dobla lo previsto.  ...  entre 1.000 y 5.000 los barriles diarios que estaban vertiéndose a la superficie.  ...  Será el cuarto viaje de Obama a la zona afectada por el derrame.","ranking": 11,"size": 8.333333333,"rscore": 4.51765,"reputation": 4,"repu_normalizada": 0,"date": "11-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/sociedad.elpais.com/sociedad/2010/06/11/actualidad/1276207201_850215.html"}, 
{ "id": "2191","repu": 92,"re_nor": 9,"fecha": 91,"url": "http://www.agenciasinc.es/Reportajes/Alaska-se-tino-de-negro-hace-un-cuarto-de-siglo","name": "Alaska se tiñó de negro hace un cuarto de siglo / Reportajes ...","snippet": "El petrolero Exxon Valdez encallaba el 24 de marzo de 1989 en el golfo de  ...  a Sinc: ???Estoy familiarizada también con el derrame de petróleo del Prestige.  ...  de petróleo de la plataforma Deepwater Horizon en el Golfo de México,  ...  contaminó 44.000 kilómetros cuadrados de superficie oceánica y más de  ...","ranking": 40,"size": 2.43902439,"rscore": 4.0579,"reputation": 7,"repu_normalizada": 1,"date": "24-03-2014","colour": 48,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.agenciasinc.es/Reportajes/Alaska-se-tino-de-negro-hace-un-cuarto-de-siglo.html"}, 
{ "id": "2192","repu": 90,"re_nor": 9,"fecha": 73,"url": "http://www.nationalgeographic.es/medio-ambiente/100915-gulf-oil-spill-bp-top-kill-science-environmen","name": "Por qué el vertido de petróleo del Golfo de México no ...","snippet": "Por qué el vertido de petróleo del Golfo de México no desaparece  ...  y las consecuencias finales del Derrame de crudo en el Golfo de México???en el  ....  nos encontraremos con poblaciones afectadas por tumores...son procesos a largo plazo'.  ...  están debilitando el campo magnético en algunas zonas de la superficie del.","ranking": 5,"size": 16.66666667,"rscore": 11.430595,"reputation": 4,"repu_normalizada": 0,"date": "24-03-2011","colour": 12,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.nationalgeographic.es/medio-ambiente/100915-gulf-oil-spill-bp-top-kill-science-environmen.html"}, 
{ "id": "2193","repu": 94,"re_nor": 9,"fecha": 98,"url": "http://www.publimetro.com.mx/noticias/pagaran-18-700-mdd-por-derrame-de-petroleo-en-el-golfo-de-mexico/mogc!c276zwxPH2SE/","name": "Pagarán 18,700 mdd por derrame de petróleo en el Golfo ...","snippet": "Pagarán 18,700 mdd por derrame de petróleo en el Golfo de México  ...  En esta foto del 4 de junio de 2010 se muestran los efectos del derrame, cerca del Golfo  ....  Un tornado, acompañado de una granizada, dejó 91 viviendas afectadas en este  ...  Plutón sorprende a la NASA con extraños 'puntos' en su superficie 19 Fotos.","ranking": 34,"size": 2.857142857,"rscore": 21.72994,"reputation": 14,"repu_normalizada": 2,"date": "03-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.publimetro.com.mx/noticias/pagaran-18-700-mdd-por-derrame-de-petroleo-en-el-golfo-de-mexico/mogc%21c276zwxPH2SE/index.html"}, 
{ "id": "2194","repu": 93,"re_nor": 9,"fecha": 40,"url": "http://www.cubadebate.cu/fotorreportajes/2010/06/21/desarrame-petroleo-golfo-mexico/","name": "Derrame de petróleo en el Golfo de México, 2 meses después","snippet": "Derrame de petróleo en el Golfo de México, 2 meses después  ...  Superficie del Golfo de México el Miércoles, 16 de junio 2010.  ....  hecho algo antes, el ecosistema ya esta siendo afectado, es una verdadera desgracia para el  ...","ranking": 4,"size": 20,"rscore": 34.503716,"reputation": 10,"repu_normalizada": 1,"date": "21-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.cubadebate.cu/fotorreportajes/2010/06/21/desarrame-petroleo-golfo-mexico/index.html"}, 
{ "id": "2195","repu": 97,"re_nor": 10,"fecha": 79,"url": "http://viajes.elpais.com.uy/2010/05/17/infierno-en-la-torre/","name": "Infierno en la torre | Viajes","snippet": "En 1979, en el Golfo de México ocurrió el mayor escape de petróleo al mar  ...  Fauna afectada por el derrame de petróleo en aguas profundas  ...","ranking": 56,"size": 1.754385965,"rscore": 40.369255,"reputation": 35,"repu_normalizada": 4,"date": "28-01-2012","colour": 22,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/viajes.elpais.com.uy/2010/05/17/infierno-en-la-torre/index.html"}, 
{ "id": "2196","repu": 95,"re_nor": 9,"fecha": 15,"url": "http://tuverde.com/2010/05/se-teme-desastre-ambiental-por-derrame-de-petroleo-en-el-golfo-de-mexico/","name": "derrame de petróleo en el Golfo de México - TuVerde.com","snippet": "Desastre ambiental por derrame de petróleo en el Golfo de México  ....  de lugar a quienes han sido victimas afectadas por este desastre petrolero.  ....  tapar un pozo de petróleo en la superficie marina, que llegaría a ser peor el  ...","ranking": 8,"size": 11.11111111,"rscore": 57.67472,"reputation": 15,"repu_normalizada": 2,"date": "07-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/tuverde.com/2010/05/se-teme-desastre-ambiental-por-derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "2197","repu": 99,"re_nor": 10,"fecha": 69,"url": "http://www.explorandomexico.com.mx/about-mexico/7/338/","name": "La British Petroleum y el derrame en el golfo de México","snippet": "Artículo sobre el derrame de petroleo y su afectación a México.","ranking": 48,"size": 2.040816327,"rscore": 60.864624,"reputation": 75,"repu_normalizada": 8,"date": "18-10-2010","colour": 7,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.explorandomexico.com.mx/about-mexico/7/338/index.html"}, 
{ "id": "2198","repu": 98,"re_nor": 10,"fecha": 11,"url": "http://www.biodisol.com/contaminacion-ambiental/derrame-de-petroleo-catastrofe-ecologica-efecto-sobre-los-seres-vivos-y-el-ecosistema-medio-ambiente-contaminacion-ambiental/","name": "Derrame de Petróleo. Catástrofe ecológica. Efecto sobre los ...","snippet": "La forma en que el petróleo derramado afecta a la fauna es variada y  ...  Los estudios, también, indican que las especies que pasan la noche en el mar son las más afectadas.  ....  son asfixiados por esta capa de crudo que cae desde la superficie.  .....  Anuncios gratis para todo México en Anunico.com.mx.","ranking": 32,"size": 3.03030303,"rscore": 75.2118,"reputation": 69,"repu_normalizada": 8,"date": "03-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/www.biodisol.com/contaminacion-ambiental/derrame-de-petroleo-catastrofe-ecologica-efecto-sobre-los-seres-vivos-y-el-ecosistema-medio-ambiente-contaminacion-ambiental/index.html"}, 
{ "id": "2199","repu": 100,"re_nor": 10,"fecha": 84,"url": "http://es.euronews.com/tag/derrame-de-petroleo/","name": "Derrame de petróleo | euronews","snippet": "euronews - Derrame de petróleo | la información internacional en vídeo.  ...  fue el origen de la marea negra en el Golfo de México, considerada como el peor  ...  de los costes de limpieza y el reembolso de los mismos al Estado federal afectado.  ...  la marea negra alcanza ya los 24.400 km2, es decir, la superficie de Cerdeña.","ranking": 24,"size": 4,"rscore": 87.96433,"reputation": 92,"repu_normalizada": 10,"date": "06-05-2012","colour": 26,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo2/es.euronews.com/tag/derrame-de-petroleo/index.html"}
]
};
};
function getData3() {
return {
"id" : "3",
"name": "Maniobras de mitigación en el derrame del Golfo de México",
"children": 
[
{ "id": "3100","repu": 1,"re_nor": 0,"fecha": 28,"url": "http://quechilero.com/blog/2010/07/05/desastre-ecologico-en-guatemala/","name": "Desastre ecológico en Guatemala","snippet": "El desastre ecológico del Golfo de México lo vemos muy lejano y casi no  ...  mi casa), prácticamente el derrame de petróleo, en este momento,  ...","ranking": 88,"size": 1.123595506,"rscore": 99.319,"reputation": 0,"repu_normalizada": 0,"date": "05-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/quechilero.com/blog/2010/07/05/desastre-ecologico-en-guatemala/index.html"}, 
{ "id": "3101","repu": 2,"re_nor": 0,"fecha": 41,"url": "http://www.everde.cl/2010/12/","name": "everde: diciembre 2010 | ERNC Energia Renovable ...","snippet": "...  también se plegaron a las seductoras y engañosas, maniobras financieras.  ....  La contaminación de las aguas por petróleo, mercurio y sustancias toxicas en  ...  El derrame en el Golfo de México, es señalado como la mayor  .....  y no solo están centrados los esfuerzos en mitigar la contaminación que se  ...","ranking": 87,"size": 1.136363636,"rscore": 86.83216,"reputation": 0,"repu_normalizada": 0,"date": "31-12-2010","colour": 9,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.everde.cl/2010/12/index.html"}, 
{ "id": "3102","repu": 3,"re_nor": 0,"fecha": 96,"url": "http://www.metropolitanoenlinea.com/2015/10/05/bp-paga-20-mil-mdd-por-derrame-en-el-golfo-de-mexico/","name": "BP paga 20 mil mdd por derrame en el Golfo de México ...","snippet": "Los cinco estados del Golfo de México que también demandaron de manera  ...  labores de reparación y restauración de los estados afectados en el Golfo.  ...  El anterior gran derrame de petróleo en EU fue el provocado por el  ...","ranking": 81,"size": 1.219512195,"rscore": 72.65083,"reputation": 0,"repu_normalizada": 0,"date": "11-10-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.metropolitanoenlinea.com/2015/10/05/bp-paga-20-mil-mdd-por-derrame-en-el-golfo-de-mexico/index.html"}, 
{ "id": "3103","repu": 4,"re_nor": 0,"fecha": 7,"url": "http://www.publimetro.com.mx/noticias/quieren-parar-fuga-petrolera-a-tientas/pjel!z9HOQk17Nlr2Ip@ZdLANWg/","name": "Quieren parar fuga petrolera a tientas ??? Publimetro","snippet": "El derrame de petróleo que dejó el hundimiento de la plataforma petrolera Deepwater Horizon en el Golfo de México, podría durar  ...  no funcionen las primeras maniobras, las acciones de contención del derrame  ...  en su caso, mitigar cualquier accidente o derrame de crudo en aguas y costas nacionales.","ranking": 82,"size": 1.204819277,"rscore": 64.126945,"reputation": 0,"repu_normalizada": 0,"date": "12-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.publimetro.com.mx/noticias/quieren-parar-fuga-petrolera-a-tientas/pjel%21z9HOQk17Nlr2Ip%40ZdLANWg/index.html"}, 
{ "id": "3104","repu": 61,"re_nor": 4,"fecha": 59,"url": "http://www.oilwatchsudamerica.org/petroleo-en-sudamerica/ecuador/4119-ecuador-audiencia-publica-en-ecuador-se-demanda-a-british-petroleum-por-derrame-en-el-golfo-de-mexico.html","name": "En Ecuador se demanda a British Petroleum por derrame ...","snippet": "...  Ecuador se demanda a British Petroleum por derrame en el Golfo de México  ...  hacer una petición de información a la petrolera British Petroleum BP para  ...  establecer cuáles pueden ser las medidas de reparación, en este  ...","ranking": 98,"size": 1.01010101,"rscore": 52.43086,"reputation": 1,"repu_normalizada": 0,"date": "28-08-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.oilwatchsudamerica.org/petroleo-en-sudamerica/ecuador/4119-ecuador-audiencia-publica-en-ecuador-se-demanda-a-british-petroleum-por-derrame-en-el-golfo-de-mexico.html"}, 
{ "id": "3105","repu": 5,"re_nor": 0,"fecha": 40,"url": "http://mensajesde-latierra.blogspot.com/2010/12/dgm3-tom-termotto-el-golfo-de-mexico.html","name": "DGM3- TOM TERMOTTO - EL GOLFO DE M??XICO ESTÁ ...","snippet": "Un Informe Especial sobre el Derrame de la BP en el Golfo  ...  de las masas - que el Golfo de México se está llenando poco a poco de petróleo y gas  ....  o equipo para reparar el daño que ha sido ocasionado por el proceso de  ...","ranking": 92,"size": 1.075268817,"rscore": 47.504414,"reputation": 0,"repu_normalizada": 0,"date": "20-12-2010","colour": 9,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/mensajesde-latierra.blogspot.cl/2010/12/dgm3-tom-termotto-el-golfo-de-mexico.html"}, 
{ "id": "3106","repu": 6,"re_nor": 0,"fecha": 2,"url": "http://www.bolpress.com/art.php?Cod=2005003415","name": "Bolpress:: Estados Unidos, el país que más contamina ...","snippet": "07-01-2012: El reacomodo del poder petrolero transnacional en Bolivia  ...  26-05-2010: El derrame de BP en el Golfo ya es el mayor de la historia  ...  prácticas de la industria petrolera","ranking": 79,"size": 1.25,"rscore": 34.34128,"reputation": 0,"repu_normalizada": 0,"date": "24-09-2005","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.bolpress.com/art6a02.html"}, 
{ "id": "3107","repu": 7,"re_nor": 0,"fecha": 57,"url": "http://www.impactmediard.com/category/mediasmart/page/6/","name": "Media Smart | MGPR In Media | Page 6","snippet": "En días pasados ocurrió una importante tragedia ecológica en Brasil por un derrame de petróleo en  ...  en una tragedia similar en el Golfo de México pocos años atrás,  ....  Debe avisar al timonel la ubicación de las boyas y estar atento a las maniobras de otros barcos.  ...  Como mitigar una crisis en Facebook.","ranking": 80,"size": 1.234567901,"rscore": 24.9274,"reputation": 0,"repu_normalizada": 0,"date": "19-04-2012","colour": 25,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.impactmediard.com/category/mediasmart/page/6/index.html"}, 
{ "id": "3108","repu": 8,"re_nor": 0,"fecha": 22,"url": "http://zonaforo.meristation.com/topic/1569641/","name": "[Mega-Galería] del derrame de petróleo (120 fotos) - Off ...","snippet": "En esta fotografía aérea tomada en el Golfo de México más de 50 millas al  ....  marcha para ayudar a mitigar los efectos de un derrame de petróleo causado  .....  Un maniobras del buque y el agua cerca de una plataforma de  ...","ranking": 83,"size": 1.19047619,"rscore": 19.5279,"reputation": 0,"repu_normalizada": 0,"date": "20-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/zonaforo.meristation.com/topic/1569641/index.html"}, 
{ "id": "3109","repu": 9,"re_nor": 0,"fecha": 6,"url": "http://www.extj.com/archive/index.php/t-16531-p-2.html","name": "??ltimas noticias de naturaleza y ciencia [Archivo] - Página 2 ...","snippet": "La norma también aliviaría las restricciones para perforar petróleo en las aguas  ...  del derrame de crudo producido en el Golfo de México -que amenaza con  ....  es al transbordador espacial Atlantis realizando maniobras para acoplarse a la  ...  si se van haciendo cosas positivas para mitigar algunas de sus causas y efectos.","ranking": 73,"size": 1.351351351,"rscore": 3.254814,"reputation": 0,"repu_normalizada": 0,"date": "11-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.extj.com/archive/index.php/t-16531-p-2.html"}, 
{ "id": "3110","repu": 10,"re_nor": 0,"fecha": 68,"url": "http://es.bab.la/diccionario/espanol-italiano/derrame","name": "derrame - traducción de italiano - Diccionario español ...","snippet": "Y yo creé un pequeño derrame de aceite en el Golfo de México.  ...  La gente se enojó mucho, y con buenas razones, cuando lo del derrame de petróleo de la BP.  ...  y en la vida, en general, se centra en limpiar el derrame sin reparar la fuga.","ranking": 70,"size": 1.408450704,"rscore": 91.02502,"reputation": 0,"repu_normalizada": 0,"date": "16-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/es.bab.la/diccionario/espanol-italiano/derrame.html"}, 
{ "id": "3111","repu": 11,"re_nor": 0,"fecha": 46,"url": "http://www.parlamento.gub.uy/indexdb/Distribuidos/ListarDistribuido.asp?URL=/distribuidos/contenido/camara/D20110601-0065-0567.htm&TIPO=CON","name": "Cámara de Representantes - Versión taquigráfica, 01/06/2011","snippet": "Ahí sí que hay que tomar medidas para mitigar los efectos medioambientales.  ...  A esa hora se hizo la maniobra de bombeo del crudo para esa manguera que  ...  La manguera se rompió y se produjo el derrame del petróleo, que  .....  British Petroleum que derramaba millones de litros en el golfo de México.","ranking": 75,"size": 1.315789474,"rscore": 89.58851,"reputation": 0,"repu_normalizada": 0,"date": "01-06-2011","colour": 15,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.parlamento.gub.uy/indexdb/Distribuidos/ListarDistribuido02db.html"}, 
{ "id": "3112","repu": 12,"re_nor": 0,"fecha": 38,"url": "http://www.taringa.net/posts/info/6443854/La-ultima-mentira-del-derrame-el-petroleo-se-disuelve-sol.html","name": "La última mentira del derrame: el petróleo se disuelve sol ...","snippet": "La última mentira en el Golfo: ???el petróleo vertido se disuelve por sí solo??? Esta serie  ...  ese que iba a llegar hasta la corriente del Golfo de Mexico y hacer desaparecer la  ...  Reparar paquetes rotos o mal instalados en Ubuntu  ...","ranking": 74,"size": 1.333333333,"rscore": 71.18152,"reputation": 0,"repu_normalizada": 0,"date": "01-12-2010","colour": 9,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.taringa.net/post/info/6443854/La-ultima-mentira-del-derrame-el-petroleo-se-disuelve-sol.html"}, 
{ "id": "3113","repu": 13,"re_nor": 0,"fecha": 27,"url": "http://despiertaalfuturo.blogspot.com/2010/06/el-gran-peligro-del-derrame-del-golfo.html","name": "El Gran Peligro del derrame del Golfo se llama Metano","snippet": "El Gran Peligro del derrame del Golfo se llama Metano  ...  las aguas del Golfo de México , algo mucho peor que el chorro de petróleo de BP .  ...  por robóts sumergibles que trabajan para reparar y contener la ruptura de bien.","ranking": 72,"size": 1.369863014,"rscore": 69.58246,"reputation": 0,"repu_normalizada": 0,"date": "28-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/despiertaalfuturo.blogspot.cl/2010/06/el-gran-peligro-del-derrame-del-golfo.html"}, 
{ "id": "3114","repu": 14,"re_nor": 0,"fecha": 54,"url": "http://alianzaliberal.blogspot.com/2012/01/la-exploracion-petrolera-cubana-menos.html","name": "La exploración petrolera cubana: ¿menos ... - alianza liberal","snippet": "La perspectiva de tener una plataforma petrolera en las costas cubanas  ...  costas de Florida el desastre de un derrame de crudo en el Golfo de México.  ...  política y técnica de algunas medidas de mitigación del riesgo ambiental en  .....  la proxima guerra maniobras militares ejercicios juegos de guerra siria.","ranking": 65,"size": 1.515151515,"rscore": 50.685356,"reputation": 0,"repu_normalizada": 0,"date": "26-01-2012","colour": 22,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/alianzaliberal.blogspot.cl/2012/01/la-exploracion-petrolera-cubana-menos.html"}, 
{ "id": "3115","repu": 15,"re_nor": 0,"fecha": 99,"url": "http://www.cigir.org/documentos/Tesis/TesisAnnieLobo.pdf","name": "TesisAnnieLobo - CIGIR","snippet": "Lineamientos para la prevención- mitigación ante eventos de tipo tecnológico  ......  derrame o explosión, ocasionarían una afectación significativa al medio ambiente, a la  ...  Instalaciones industriales destinadas a la refinación de petróleo y complejos  .....  Golfo de. México. Explosión de la torre petrolífera. Deepwater. Horizon.","ranking": 57,"size": 1.724137931,"rscore": 46.50397,"reputation": 0,"repu_normalizada": 0,"date": "08-12-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/cigir.org/index.html"}, 
{ "id": "3116","repu": 16,"re_nor": 0,"fecha": 32,"url": "http://www.aniq.org.mx/boletines/secciones/2010/Bolet%C3%ADn%20%20Agosto.asp","name": "Piden discutir agua en Cumbre - Asociación Nacional de la ...","snippet": "En México se trabaja con diversos sectores para homologar la identificación y  ....  viscosa derivada del petróleo que posteriormente recubre al pavimento.  ...  que el costo calculado por mitigar las afectaciones del cambio climático equivalen al  ......  seguridad, luego del derrame de crudo de BP en aguas del Golfo de México.","ranking": 71,"size": 1.388888889,"rscore": 31.84096,"reputation": 0,"repu_normalizada": 0,"date": "20-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.aniq.org.mx/boletines/secciones/2010/Bolet%C3%ADn%20%20Agosto.html"}, 
{ "id": "3117","repu": 17,"re_nor": 1,"fecha": 4,"url": "http://www.argenpress.info/2009_06_23_archive.html","name": "23 - Argenpress","snippet": "Chile y México apoyaron a las potencias que con gran propaganda  ...  de la OTAN en el Océano Índico., cuyas fuerzas ya están en el Golfo Pérsico.  .....  Por su parte, el presidente ya señala una maniobra para distraer a la mayoría.  ....  daño ambiental provocado por un gran derrame de petróleo en el 2000.","ranking": 64,"size": 1.538461538,"rscore": 24.61212,"reputation": 0,"repu_normalizada": 0,"date": "23-06-2009","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.argenpress.info/2009_06_23_archive.html"}, 
{ "id": "3118","repu": 18,"re_nor": 1,"fecha": 14,"url": "http://ernessto.blogspot.com/2010_05_01_archive.html","name": "Año 3 de la Restauración: mayo 2010","snippet": "Consecuencias del derrame de petroleo den el Golfo de México  .....  las maniobras para privatizar Teléfonos de México aventurábamos la  ...","ranking": 63,"size": 1.5625,"rscore": 4.846664,"reputation": 0,"repu_normalizada": 0,"date": "31-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/ernessto.blogspot.cl/2010_05_01_archive.html"}, 
{ "id": "3119","repu": 19,"re_nor": 1,"fecha": 50,"url": "http://tiempodeseguros.com/?page=&e=15428","name": "Tiempo de Seguros","snippet": "...  en el mercado asegurador, los mecanismos de mitigación de riesgo y reaseguro,  .....  no alcanzó a concretar la maniobra por la presencia del vehículo de carga.  ...  derivados del derrame de petróleo del año pasado en el Golfo de México.","ranking": 66,"size": 1.492537313,"rscore": 8.03394,"reputation": 0,"repu_normalizada": 0,"date": "19-11-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/tiempodeseguros.com/indexa4ff.html"}, 
{ "id": "3120","repu": 20,"re_nor": 1,"fecha": 80,"url": "http://www.scielo.cl/scielo.php?pid=S0719-367X2015000100006&script=sci_arttext","name": "Cuadernos.info - Desigualdad ambiental y ... - SciELO","snippet": "Las portadas de El Mercurio de Valparaíso sobre el derrame de petróleo en  ....  hundimiento de la plataforma de British Petroleum en el Golfo de México en 2010.  .....  el Gobierno y la empresa sobre las medidas para reparar el daño ambiental  ...","ranking": 59,"size": 1.666666667,"rscore": 26.155136,"reputation": 0,"repu_normalizada": 0,"date": "07-06-2015","colour": 63,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.scielo.cl/scielo2aef.html"}, 
{ "id": "3121","repu": 21,"re_nor": 1,"fecha": 5,"url": "http://www.escafandra.org/E-NOTICIAS-4-10.htm","name": "ESCAFANDRA Electronica, Rervista de Buceo y de Mar","snippet": "Desastre petrolero en EE.  .....  para frenar una maniobra de su Gobierno completamente descabellada.  ....  la plataforma petrolera en el Golfo de México, que -según confirmó la Guardia  ...  'Los equipos de emergencia ya se encuentran en el lugar para ayudar a controlar un posible derrame petrolero', informó la periodista  ...","ranking": 77,"size": 1.282051282,"rscore": 37.52864,"reputation": 0,"repu_normalizada": 0,"date": "23-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.escafandra.org/E-NOTICIAS-4-10.html"}, 
{ "id": "3122","repu": 22,"re_nor": 1,"fecha": 10,"url": "http://www.manualparadespabilarse.com/2010/05/comienzos-de-ano-obama-de-quien-tanto.html","name": "Manual para Despabilarse: El desastre y la desidia.","snippet": "El desastre del derrame de petróleo en el Golfo de México es uno de los  ...  llevar el petroleo a tierra y no existe una tecnología para reparar un  ...","ranking": 61,"size": 1.612903226,"rscore": 48.79334,"reputation": 0,"repu_normalizada": 0,"date": "29-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.manualparadespabilarse.com/2010/05/comienzos-de-ano-obama-de-quien-tanto.html"}, 
{ "id": "3123","repu": 23,"re_nor": 1,"fecha": 9,"url": "http://www.cnnexpansion.com/economia/2010/05/18/bp-derrame-petroleo-congreso-expansion","name": "El derrame sobrepasó a BP y al Gobierno - Economía ...","snippet": "El derrame sobrepasó a BP y al Gobierno  ...  que ahora libera miles de galones de petróleo crudo en el Golfo de México.  ...  Pero la capacidad del Gobierno para reparar infraestructura petrolera dañada debajo de la superficie  ...","ranking": 49,"size": 2,"rscore": 59.25576,"reputation": 0,"repu_normalizada": 0,"date": "19-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.cnnexpansion.com/economia/2010/05/18/bp-derrame-petroleo-congreso-expansion.html"}, 
{ "id": "3124","repu": 24,"re_nor": 1,"fecha": 18,"url": "http://ingenieriaycomputacion.blogspot.com/2010/06/derrame-de-petroleo-en-el-golfo-de.html","name": "Derrame de Petroleo en el Golfo de México, cronología del ...","snippet": "Derrame de Petroleo en el Golfo de México, cronología del desastre.  ...  BP dice tratará de frenar el derrame en el lecho marino inyectando a  ....  Amauri Pelaez Brambila","ranking": 54,"size": 1.818181818,"rscore": 65.31106,"reputation": 0,"repu_normalizada": 0,"date": "07-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/ingenieriaycomputacion.blogspot.cl/2010/06/derrame-de-petroleo-en-el-golfo-de.html"}, 
{ "id": "3125","repu": 25,"re_nor": 1,"fecha": 95,"url": "http://www.laguiapetrolera.com.ar/BP-acordo-pagar-u$s-20800-millones-por-vertido-de-petroleo-en-Golfo-de-Mexico-n-4140.html","name": "BP acordó pagar u$s 20.800 millones por vertido de ...","snippet": "...  con Florida, Alabama, Misisipi, Luisiana y Texas por el derrame de 2010.  ...  Los cinco estados del Golfo de México que también demandaron de manera  ...  a las labores de reparación y restauración de los estados afectados en el Golfo. Asimismo, la petrolera británica pagará a los cinco estados y al  ...","ranking": 44,"size": 2.222222222,"rscore": 77.768364,"reputation": 0,"repu_normalizada": 0,"date": "06-10-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.laguiapetrolera.com.ar/BP-acordo-pagar-u%24s-20800-millones-por-vertido-de-petroleo-en-Golfo-de-Mexico-n-4140.html"}, 
{ "id": "3126","repu": 26,"re_nor": 1,"fecha": 76,"url": "http://www.energia16.com/actualidad/empresas-petroleras/eeuu-acusa-a-bp-de-maltinterpretar-los-datos-sobre-el-derrame-del-golfo-de-mexico","name": "Energía16 ??? EEUU acusa a BP de maltinterpretar los datos ...","snippet": "EEUU acusa a BP de maltinterpretar los datos sobre el derrame del Golfo de México  ...  rápido de lo esperado después del derrame de petróleo de 2010.  ...  en un juicio por le pago de los costes de reparación del daño y para  ...","ranking": 60,"size": 1.639344262,"rscore": 82.12214,"reputation": 0,"repu_normalizada": 0,"date": "19-03-2015","colour": 60,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.energia16.com/actualidad/empresas-petroleras/eeuu-acusa-a-bp-de-maltinterpretar-los-datos-sobre-el-derrame-del-golfo-de-mexico.html"}, 
{ "id": "3127","repu": 27,"re_nor": 1,"fecha": 8,"url": "http://www.elgolfo.info/nota/25973-obama-anuncia-reformas-para-evitar-derrames/","name": "Obama anuncia reformas para evitar derrames - Elgolfo.info -","snippet": "Maniobra para sellar pozo petrolero falla  ...  para evitar futuros derrames de petróleo como el ocurrido en el Golfo de México en una  ...  legislación que proporcione recursos adicionales para mitigar el daño causado y asegure  ...","ranking": 39,"size": 2.5,"rscore": 99.77646,"reputation": 0,"repu_normalizada": 0,"date": "14-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.elgolfo.info/nota/25973-obama-anuncia-reformas-para-evitar-derrames/index.html"}, 
{ "id": "3128","repu": 28,"re_nor": 1,"fecha": 26,"url": "http://perucontaminada.blogspot.com/2010_06_01_archive.html","name": "PERU CONTAMINADA: junio 2010","snippet": "Derrame de petróleo causado por barcaza en Perú estaría controlado  ...  un monto muy pequeño comparado con lo ocurrido en el Golfo de México'.  ......  despreciada por las maniobras criollas del Congreso y que no se va a rendir  .....  para contribuir a la mitigación del cambio climático mediante el uso de  ...","ranking": 52,"size": 1.886792453,"rscore": 99.18321,"reputation": 0,"repu_normalizada": 0,"date": "26-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/perucontaminada.blogspot.cl/2010_06_01_archive.html"}, 
{ "id": "3129","repu": 29,"re_nor": 1,"fecha": 64,"url": "https://mx.answers.yahoo.com/question/index?qid=20120807172144AAsH2aS","name": "¿Como afectan los derrames de petroleo al agua? | Yahoo Respuestas","snippet": "Un derrame de petróleo o marea negra es un vertido que se produce debido a un  ...  2010 provocando un derrame de petróleo incontrolado en el golfo de México que causó enormes daños de complicada y lenta reparación.","ranking": 51,"size": 1.923076923,"rscore": 89.61377,"reputation": 0,"repu_normalizada": 0,"date": "02-03-2013","colour": 36,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/mx.answers.yahoo.com/question/index7849.html"}, 
{ "id": "3130","repu": 30,"re_nor": 1,"fecha": 33,"url": "http://www.conscienciaolocura.net/general/derrame-de-petroleo-serios-danos-ecologicos/","name": "Derrame de petróleo, serios daños ecológicos","snippet": "Este derrame de petróleo en el Golfo de México, sin duda,  ....  Y cree que con dinero puede reparar el daño que le hizo al medio ambiente?","ranking": 41,"size": 2.380952381,"rscore": 74.27881,"reputation": 0,"repu_normalizada": 0,"date": "29-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.conscienciaolocura.net/general/derrame-de-petroleo-serios-danos-ecologicos/index.html"}, 
{ "id": "3131","repu": 31,"re_nor": 2,"fecha": 92,"url": "http://www.voanoticias.com/content/bp-pagara--mas-de-20-mil-millones-por-derrame-en-el-golfo-de-mexico/2992526.html","name": "BP pagará más de $20 mil millones por derrame en el Golfo ...","snippet": "BP pagará casi 19.000 millones de dólares por derrame petrolero  ...  reparar el daño ambiental causado en la costa del Golfo de México indicó  ...","ranking": 32,"size": 3.03030303,"rscore": 68.39581,"reputation": 0,"repu_normalizada": 0,"date": "05-10-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.voanoticias.com/content/bp-pagara--mas-de-20-mil-millones-por-derrame-en-el-golfo-de-mexico/2992526.html"}, 
{ "id": "3132","repu": 32,"re_nor": 2,"fecha": 63,"url": "http://www.oilwatchsudamerica.org/ultimas-noticias/212-internacional.html?start=40","name": "Internacional","snippet": "INTERNACIONAL - Nigeria: Shell va a juicio por los vertidos de petróleo en el Delta  ....  como consecuencia del derrame petrolero, ocurrido en el Golfo de México en 2010.  ...  de medidas tendientes a mitigar los impactos de la crisis que se avecinaría.  ....  El crédito disponible es escaso y las capacidades de maniobra de los  ...","ranking": 38,"size": 2.564102564,"rscore": 55.65312,"reputation": 0,"repu_normalizada": 0,"date": "05-02-2013","colour": 35,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.oilwatchsudamerica.org/ultimas-noticias/212-internacional4abd.html"}, 
{ "id": "3133","repu": 33,"re_nor": 2,"fecha": 65,"url": "http://noosferaxxi.blogspot.com/2010_07_11_archive.html","name": "NOOSFERA -PRAXISXXI: 11/07/10 - 18/07/10","snippet": "El desastre es el peor derrame petrolero en el mar en la historia de Estados Unidos.  ...  que comenzó el derrame de petróleo en el Golfo de México ayer dejó de  .....  Lo que permitiría realizar con efectividad la maniobra de inyectar una  .....  podría ayudar a guiar la investigación y los esfuerzos de mitigación.","ranking": 46,"size": 2.127659574,"rscore": 49.27992,"reputation": 0,"repu_normalizada": 0,"date": "14-06-2013","colour": 39,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/noosferaxxi.blogspot.cl/2010_07_11_archive.html"}, 
{ "id": "3134","repu": 34,"re_nor": 2,"fecha": 77,"url": "http://www.laprensademn.com/golfo-de-mexico-muestra-signos-alentadores-de-recuperacion/","name": "Previous Story Golfo de México muestra signos alentadores ...","snippet": "Tasa de desempleo en Minnesota · Reparación de computadoras gratis  ...  Golfo de México muestra signos alentadores de recuperación  ...  Cinco años después del mayor derrame de petróleo en la historia de Estados Unidos  ...","ranking": 42,"size": 2.325581395,"rscore": 38.66696,"reputation": 0,"repu_normalizada": 0,"date": "15-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.laprensademn.com/golfo-de-mexico-muestra-signos-alentadores-de-recuperacion/index.html"}, 
{ "id": "3135","repu": 35,"re_nor": 2,"fecha": 30,"url": "http://vanubisxxi.blogspot.com/2010_07_11_archive.html","name": "vanubisxxi: 2010-07-11","snippet": "Lo que permitiría realizar con efectividad la maniobra de inyectar una  ....  El derrame de petróleo en el Golfo de México es considerado el más  ....  que podría ayudar a guiar la investigación y los esfuerzos de mitigación.","ranking": 43,"size": 2.272727273,"rscore": 29.39374,"reputation": 0,"repu_normalizada": 0,"date": "16-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/vanubisxxi.blogspot.cl/2010_07_11_archive.html"}, 
{ "id": "3136","repu": 36,"re_nor": 2,"fecha": 93,"url": "http://www.efe.com/efe/america/sociedad/bp-acuerda-pagar-20-800-millones-de-dolares-por-vertido-en-el-golfo-mexico/20000013-2730554","name": "BP acuerda pagar 20.800 millones de dólares por vertido ...","snippet": "...  por el derrame de petróleo en el Golfo de México en abril 2010.  ...  labores de reparación y restauración de los estados afectados en el Golfo.","ranking": 36,"size": 2.702702703,"rscore": 15.54816,"reputation": 0,"repu_normalizada": 0,"date": "05-10-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.efe.com/efe/america/sociedad/bp-acuerda-pagar-20-800-millones-de-dolares-por-vertido-en-el-golfo-mexico/20000013-2730554.html"}, 
{ "id": "3137","repu": 37,"re_nor": 2,"fecha": 66,"url": "https://es.scribd.com/doc/55009724/Derrame-de-petroleo","name": "Derrame de petróleo - Scribd","snippet": "Para el derrame en el Golfo de México de la plataforma Deepwater  ...  que está causando enormes daños de complicada y lenta reparación.","ranking": 28,"size": 3.448275862,"rscore": 8.1783,"reputation": 0,"repu_normalizada": 0,"date": "14-06-2013","colour": 39,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/es.scribd.com/doc/55009724/Derrame-de-petroleo.html"}, 
{ "id": "3138","repu": 38,"re_nor": 2,"fecha": 79,"url": "http://archivo.eluniversal.com.mx/estados/2015/impreso/aumentan-a-18-los-heridos-en-plataforma-98853.html","name": "Aumentan a 18 los heridos en plataforma - El Universal","snippet": "'No hay derrame porque hundimiento fue en una planta de mantenimiento'  ...  aseguró que no se produjo derrame de petróleo en el mar ya que no se  ...  de la plataforma al estar realizando las maniobras de posicionamiento, por lo que  ...  pues la plataforma Abaktún ???en el borde sur del Golfo de México???  ...","ranking": 37,"size": 2.631578947,"rscore": 7.39126,"reputation": 0,"repu_normalizada": 0,"date": "07-05-2015","colour": 62,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/archivo.eluniversal.com.mx/estados/2015/impreso/aumentan-a-18-los-heridos-en-plataforma-98853.html"}, 
{ "id": "3139","repu": 39,"re_nor": 2,"fecha": 94,"url": "http://www.elintransigente.com/mundo/internacionales/2015/10/5/la-mayor-indemnizacion-historia-us20800000000-derrame-petroleo-346257.html","name": "'La mayor indemnización de la Historia': US$20.800 ...","snippet": "La petrolera BP pagará una compensación récord por el derrame de petróleo de 2010 en el golfo de México.  ...  Limpia), que serán destinados a las labores de reparación y restauración de los estados afectados en el golfo.","ranking": 33,"size": 2.941176471,"rscore": 6.476364,"reputation": 0,"repu_normalizada": 0,"date": "05-10-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.elintransigente.com/mundo/internacionales/2015/10/5/la-mayor-indemnizacion-historia-us20800000000-derrame-petroleo-346257.html"}, 
{ "id": "3140","repu": 40,"re_nor": 2,"fecha": 97,"url": "http://www.espanol.rfi.fr/americas/20151016-multa-record-para-bp-responsable-del-derrame-en-golfo-de-mexico","name": "Multa récord para BP, por derrame de 2010 en Golfo ... - RFI","snippet": "Enfoque internacional -16/10/2015 : La petrolera British Petroleum ha  ...  Multa récord para BP, por derrame de 2010 en Golfo de México  ...  25.000 pescadores han ido ante la Justicia y siguen sin ninguna reparación.","ranking": 35,"size": 2.777777778,"rscore": 8.76921,"reputation": 0,"repu_normalizada": 0,"date": "16-10-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.espanol.rfi.fr/americas/20151016-multa-record-para-bp-responsable-del-derrame-en-golfo-de-mexico.html"}, 
{ "id": "3141","repu": 41,"re_nor": 2,"fecha": 49,"url": "http://www.biodiversidadla.org/layout/set/print/Autores/Alejandro_Nadal2/(offset)/15","name": "Autor | Alejandro Nadal - .:.:.:.:.:.: biodiversidad .:.:.:.:.:","snippet": "El derrame de petróleo en el golfo de México pasará a la historia como uno de los  ...  Por más que la empresa British Petroleum (BP) anuncia nuevas maniobras  ...  el sector agropecuario podría ser una plataforma para mitigar algunos de sus  ...","ranking": 21,"size": 4.545454545,"rscore": 17.26152,"reputation": 0,"repu_normalizada": 0,"date": "29-08-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.biodiversidadla.org/Autores/Alejandro_Nadal2/(offset)/15.html"}, 
{ "id": "3142","repu": 42,"re_nor": 2,"fecha": 90,"url": "http://www.petroleumworldve.com/titulares150030.htm","name": "Petroleumworld en Español - Petroleumworldve.com","snippet": "Petrolera ANCAP lograría recortar abultado déficit en 2015  ...  Pemex reporta accidente plataforma Golfo de México, sin lesionados. La plataforma Akal-H, registró una fuga de gas mientras realizaban maniobras de trabajo","ranking": 53,"size": 1.851851852,"rscore": 17.3485,"reputation": 0,"repu_normalizada": 0,"date": "10-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.petroleumworldve.com/titulares150030.html"}, 
{ "id": "3143","repu": 43,"re_nor": 3,"fecha": 37,"url": "http://concienciaradio.com/golfo_index.htm","name": "ataque en el golfo de méxico - Conciencia Radio","snippet": "GOLFO DE MEXICO: A SEIS MESES DESPUES DEL VERTIDO,  ...  PARA VÍCTIMAS DEL DERRAME DE PETROLEO EN EL GOLFO (¿SERÁ QUE CADA VEZ  ...  DEL GOLFO DE M??XICO NO TIENE REPARACION POSIBLE.","ranking": 30,"size": 3.225806452,"rscore": 16.30833,"reputation": 0,"repu_normalizada": 0,"date": "30-11-2010","colour": 8,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/concienciaradio.com/golfo_index.html"}, 
{ "id": "3144","repu": 44,"re_nor": 3,"fecha": 36,"url": "http://www.wapa.tv/noticias/internacionales/podria-tomar-meses-controlar-el-derrame_20100601151420.html","name": "Podría tomar meses controlar el derrame - WAPA.tv ...","snippet": "Abandonada la ambiciosa maniobra para taponar el pozo durante el fin de  ...  Obama ordena investigar las causas del derrame petrolero  ...  las causas del derrame en el Golfo de México para asegurarse de que Estados  ...  para prevenir y mitigar el impacto de futuros derrames provocados por la extracción  ...","ranking": 25,"size": 3.846153846,"rscore": 22.98527,"reputation": 0,"repu_normalizada": 0,"date": "21-11-2010","colour": 8,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.wapa.tv/noticias/internacionales/podria-tomar-meses-controlar-el-derrame_20100601151420.html"}, 
{ "id": "3145","repu": 45,"re_nor": 3,"fecha": 17,"url": "http://www.informador.com.mx/internacional/2010/206133/6/bp-intenta-nuevo-remedio-para-limpiar-crudo-obama-investiga-las-causas.htm","name": "BP intenta nuevo 'remedio' para limpiar crudo","snippet": "","ranking": 23,"size": 4.166666667,"rscore": 21.30111,"reputation": 0,"repu_normalizada": 0,"date": "06-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.informador.com.mx/internacional/2010/206133/6/bp-intenta-nuevo-remedio-para-limpiar-crudo-obama-investiga-las-causas.html"}, 
{ "id": "3146","repu": 46,"re_nor": 3,"fecha": 23,"url": "http://elcomentario.ucol.mx/Noticia.php?id=1277184716","name": "Gasta BP dos mil millones de dólares por derrame en el Golfo","snippet": "Los esfuerzos para contener el derrame petróleo en aguas del Golfo de México y reparar los daños ha costado hasta a la compañía British  ...","ranking": 48,"size": 2.040816327,"rscore": 27.52304,"reputation": 0,"repu_normalizada": 0,"date": "22-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/elcomentario.ucol.mx/Noticiab369.html"}, 
{ "id": "3147","repu": 47,"re_nor": 3,"fecha": 89,"url": "http://ar.whales.org/blog/2015/07/sinopsis-de-la-reunion-66a-del-comite-cientifico-de-la-cbi","name": "Sinopsis de la Reunión 66a del Comité Científico de la CBI ...","snippet": "...  cambio climático, derrames de petróleo y contaminación química, entre otras.  ...  y la eficacia de algunas medidas de mitigación, tales como evitar  ....  de los animales, maniobras y tener un número limitado de barcos.  ...  de la vaquita (marsopa endémica del Golfo de California, México) es preocupante.","ranking": 27,"size": 3.571428571,"rscore": 35.657394,"reputation": 0,"repu_normalizada": 0,"date": "09-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/ar.whales.org/blog/2015/07/sinopsis-de-la-reunion-66a-del-comite-cientifico-de-la-cbi.html"}, 
{ "id": "3148","repu": 48,"re_nor": 3,"fecha": 52,"url": "http://www.abc.es/20111220/natural-vivirenverde-media/abci-shell-mexico-petroleo-201112201056.html","name": "EE.UU. investiga un derrame de petróleo en el golfo de ...","snippet": "UU. investiga un derrame de petróleo en el golfo de México. abc  ...  abandonar temporalmente el pozo y realizar las reparaciones necesarias.","ranking": 29,"size": 3.333333333,"rscore": 37.964165,"reputation": 0,"repu_normalizada": 0,"date": "20-12-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.abc.es/20111220/natural-vivirenverde-media/abci-shell-mexico-petroleo-201112201056.html"}, 
{ "id": "3149","repu": 49,"re_nor": 3,"fecha": 44,"url": "http://www.excelsior.com.mx/node/731218","name": "Destinará BP mil mdd para reparar daños por derrame de ...","snippet": "La petrolera desarrollará proyectos en el Golfo de México, lo que es el primer ... para reparar los daños a los recursos naturales, tras el derrame.","ranking": 26,"size": 3.703703704,"rscore": 36.996254,"reputation": 0,"repu_normalizada": 0,"date": "21-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.excelsior.com.mx/node/731218.html"}, 
{ "id": "3150","repu": 50,"re_nor": 3,"fecha": 71,"url": "http://caracol.com.co/radio/2014/07/21/regional/1405973820_332452.html","name": "Emergencia por derrame de petróleo en Golfo de Morrosquillo","snippet": "Emergencia por derrame de petróleo en Golfo de Morrosquillo  ...  por fuertes vientos durante las maniobras de cargue a un buque tanque,  ...  la mancha de petróleo y tomar decisiones permitan mitigar el efecto sobre el medio ambiente  ...  EE UU · Colombia · México","ranking": 11,"size": 8.333333333,"rscore": 40.664314,"reputation": 0,"repu_normalizada": 0,"date": "22-07-2014","colour": 52,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/caracol.com.co/radio/2014/07/21/regional/1405973820_332452.html"}, 
{ "id": "3151","repu": 51,"re_nor": 3,"fecha": 11,"url": "http://www.elespectador.com/noticias/elmundo/fracasa-sellado-de-petroleo-golfo-de-mexico-articulo-205771","name": "Fracasa sellado de petróleo en Golfo de México ...","snippet": "Es la primera vez que se intenta una maniobra similar a una profundidad  ...  x Derrame de petróleo en el Golfo podría costar US$4.300 millones  ...","ranking": 20,"size": 4.761904762,"rscore": 45.273285,"reputation": 0,"repu_normalizada": 0,"date": "29-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.elespectador.com/noticias/elmundo/fracasa-sellado-de-petroleo-golfo-de-mexico-articulo-205771.html"}, 
{ "id": "3152","repu": 62,"re_nor": 4,"fecha": 24,"url": "http://yaleglobal.yale.edu/adnode/6415","name": "Los Crecientes Retos Energéticos Y El Medio Ambiente ...","snippet": "BP desató el desastroso derrame petrolero, pero todos los  ...  WASHINGTON:El incesante brote de petróleo en el Golfo de México, al cual no se le ve fin,  ...  autónomos que intentarían hacer reparaciones fue desarrollada por  ...","ranking": 85,"size": 1.162790698,"rscore": 43.063545,"reputation": 1,"repu_normalizada": 0,"date": "22-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/yaleglobal.yale.edu/adnode/6415.html"}, 
{ "id": "3153","repu": 52,"re_nor": 3,"fecha": 31,"url": "http://blogs.lanacion.com.ar/ecologico/econoticias/bp-culpable/","name": "BP, culpable - Blogs lanacion.com","snippet": "America Blog descubri??³ una maniobra realizada con Photoshop que s??³lo causa  ....  En el Golfo de Mexico, British Petroleum cabilde??³ con pol??ticos para  .....  responsabilidades es la mitigación de los derrames de petróleo.","ranking": 6,"size": 14.28571429,"rscore": 59.68195,"reputation": 0,"repu_normalizada": 0,"date": "20-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/blogs.lanacion.com.ar/ecologico/econoticias/bp-culpable/index.html"}, 
{ "id": "3154","repu": 63,"re_nor": 4,"fecha": 78,"url": "http://paginabierta.mx/sitio/documenta-grupo-re-evolucion-riqueza-natural-de-el-tambor/","name": "Documenta Grupo Re-evolución riqueza natural de ???El ...","snippet": "En el caso de México, existen diferentes modos de percibir y utilizar los  ...  Con el manejo sustentable del predio ???Tambor??? se busca mitigar los impactos  ...  una Isla en el Golfo de México, el predio comprende un área de 287,161.7 m2.  .....  Previo: Derrame en Tabasco confirma que la industria petrolera es  ...","ranking": 84,"size": 1.176470588,"rscore": 53.78405,"reputation": 1,"repu_normalizada": 0,"date": "16-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/paginabierta.mx/sitio/documenta-grupo-re-evolucion-riqueza-natural-de-el-tambor/index.html"}, 
{ "id": "3155","repu": 53,"re_nor": 3,"fecha": 25,"url": "http://www.info7.mx/a/noticia/202079/define_mexico_estrategia_ante_derrame_petrolero_de_eua_en_el_golfo","name": "Aumenta derrame de petróleo tras accidente en Golfo de ...","snippet": "Aumenta derrame de petróleo tras accidente en Golfo de México  ...  La reparación, que tomará varias horas, ha impedido la recuperación de  ...","ranking": 24,"size": 4,"rscore": 59.87045,"reputation": 0,"repu_normalizada": 0,"date": "23-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.info7.mx/a/noticia/202079/define_mexico_estrategia_ante_derrame_petrolero_de_eua_en_el_golfo.html"}, 
{ "id": "3156","repu": 54,"re_nor": 3,"fecha": 21,"url": "https://es-la.facebook.com/notes/la-hora-del-planeta/derrame-de-petroleo-en-el-golfo-de-mexico/403654771287","name": "DERRAME DE PETR??LEO EN EL GOLFO DE M??XICO","snippet": "Este derrame de petróleo ocurrido en el Golfo de México supone un  ...  no hacer nada por reparar la tubería con desperfectos, evitando así las posibles fugas.","ranking": 13,"size": 7.142857143,"rscore": 66.00825,"reputation": 0,"repu_normalizada": 0,"date": "15-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/es-la.facebook.com/notes/la-hora-del-planeta/derrame-de-petroleo-en-el-golfo-de-mexico/403654771287.html"}, 
{ "id": "3157","repu": 55,"re_nor": 4,"fecha": 47,"url": "http://www.scielo.org.mx/scielo.php?pid=S1870-35502011000100009&script=sci_arttext","name": "Norteamérica - ¿Cuál fue la visión oficial estadunidense del ...","snippet": "Más de medio año ha pasado desde la explosión de la plataforma petrolera  ...  de los daños ocasionados por la explosión y el derrame petrolero en Macondo.  ...  La importancia del Golfo de México radica en la cantidad y diversidad de  .....  fondo de 20 mil millones de dólares por reparación de daños que han reclamado las  ...","ranking": 15,"size": 6.25,"rscore": 67.6927,"reputation": 0,"repu_normalizada": 0,"date": "01-06-2011","colour": 15,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.scielo.org.mx/scielo50cb.html"}, 
{ "id": "3158","repu": 56,"re_nor": 4,"fecha": 15,"url": "http://www.razon.com.mx/spip.php?article34130","name": "Barack Obama crea comisión... 43 días después :: La Razón ...","snippet": "Promete enviar a la justicia a causantes del derrame","ranking": 8,"size": 11.11111111,"rscore": 63.55556,"reputation": 0,"repu_normalizada": 0,"date": "01-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.razon.com.mx/spip460b.html"}, 
{ "id": "3159","repu": 57,"re_nor": 4,"fecha": 42,"url": "http://worldcantwait-la.com/desastre-de-petroleo-en-el-gulfo.htm","name": "DESASTRE DEL PETR??LEO EN EL GOLFO Página 01","snippet": "Para entonces, ya se habían derramado casi cinco millones de barriles de petróleo de 159 litros  ...  Fondo de reparaciones de BP acusado de fraude  ...  NUEVA ORLEANS, Estados Unidos - Los habitantes del Golfo de México reclaman al  ...","ranking": 22,"size": 4.347826087,"rscore": 71.032265,"reputation": 0,"repu_normalizada": 0,"date": "19-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/worldcantwait-la.com/desastre-de-petroleo-en-el-gulfo.html"}, 
{ "id": "3160","repu": 58,"re_nor": 4,"fecha": 34,"url": "http://grupoecohuellas.blogspot.com/2010/09/ceso-derrame-de-petroleo-en-el-golfo-de.html","name": "Ceso Derrame de Petroleo en el Golfo de Mexico - Jovenes ...","snippet": "Segun el Presidente de los Estados Unidos el derrame de petroleo a cesado. Pero el gobierno seguiria trabajando para reparar los daños  ...","ranking": 14,"size": 6.666666667,"rscore": 70.118515,"reputation": 0,"repu_normalizada": 0,"date": "30-09-2010","colour": 6,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/grupoecohuellas.blogspot.cl/2010/09/ceso-derrame-de-petroleo-en-el-golfo-de.html"}, 
{ "id": "3161","repu": 59,"re_nor": 4,"fecha": 48,"url": "http://es.slideshare.net/gadc2012/acciones-de-mitigacin-ante-un-derrame-de-petrleo","name": "Acciones de mitigación ante un derrame de petróleo","snippet": "Nombre: Gilbert Antonio Delgado Claros Métodos de Mitigación al  ...  frágiles del derrame de crudo quese expande en el Golfo de México tras  ...","ranking": 2,"size": 33.33333333,"rscore": 73.818535,"reputation": 0,"repu_normalizada": 0,"date": "20-07-2011","colour": 16,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/es.slideshare.net/gadc2012/acciones-de-mitigacin-ante-un-derrame-de-petrleo.html"}, 
{ "id": "3162","repu": 73,"re_nor": 6,"fecha": 88,"url": "http://www.teorema.com.mx/contaminacion_/llegan-a-acuerdo-economico-para-resarcir-danos-de-la-marea-negra/","name": "Llegan a acuerdo económico para resarcir daños de la ...","snippet": "Ayudaría a reparar el daño causado a la economía del Golfo, la industria de la pesca, los pantanos y la fauna???.  ...  De igual manera, se dictaminó que el derrame de petróleo del Golfo de México en 2010 fue resultado de una  ...","ranking": 96,"size": 1.030927835,"rscore": 89.79792,"reputation": 3,"repu_normalizada": 0,"date": "06-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.teorema.com.mx/contaminacion_/llegan-a-acuerdo-economico-para-resarcir-danos-de-la-marea-negra/index.html"}, 
{ "id": "3163","repu": 60,"re_nor": 4,"fecha": 43,"url": "http://www.univision.com/noticias/noticias-de-eeuu/se-cumple-un-ano-del-derrame-de-petroleo-en-el-golfo-de-mexico","name": "Se cumple un año del derrame de petróleo en el Golfo de ...","snippet": "Una plataforma petrolera estalló en la oscuridad y sumió en el caos durante  ...  El derrame en el Golfo de México comenzó el 20 de abril de 2010 cuando  ....  estadounidense, y será responsable de reparar el daño ambiental.","ranking": 3,"size": 25,"rscore": 87.816734,"reputation": 0,"repu_normalizada": 0,"date": "20-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.univision.com/noticias/noticias-de-eeuu/se-cumple-un-ano-del-derrame-de-petroleo-en-el-golfo-de-mexico.html"}, 
{ "id": "3164","repu": 64,"re_nor": 5,"fecha": 51,"url": "http://apocalipticus.over-blog.es/tag/ecofascismo/2","name": "ecofascismo - El blog de skiper","snippet": "No hay duda que es urgente salir de la civilización petrolera, ¿pero  ....  Las opciones de mitigación favoritas por los compradores fueron  ....  Su ataque constante contra la integridad moral de científicos genuinos es una clásica maniobra  ....  que el actual derrame de petróleo en el Golfo de México está ahora  ...","ranking": 62,"size": 1.587301587,"rscore": 89.66534,"reputation": 1,"repu_normalizada": 0,"date": "12-12-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/apocalipticus.over-blog.es/tag/ecofascismo/2.html"}, 
{ "id": "3165","repu": 65,"re_nor": 5,"fecha": 53,"url": "http://www.lavanguardia.com/medio-ambiente/20111220/54242297912/investigado-derrame-petroleo-golfo-mexico.html","name": "Investigado un derrame de petróleo en el Golfo de México","snippet": "Investigado derrame petróleo Golfo México Houston.  ...  incluyen abandonar temporalmente el pozo y realizar las reparaciones necesarias'.","ranking": 50,"size": 1.960784314,"rscore": 92.2846,"reputation": 1,"repu_normalizada": 0,"date": "20-12-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.lavanguardia.com/medio-ambiente/20111220/54242297912/investigado-derrame-petroleo-golfo-mexico.html"}, 
{ "id": "3166","repu": 66,"re_nor": 5,"fecha": 29,"url": "http://armonicosdeconciencia.blogspot.com/2010/07/dra-lilliana-corredor-el-derrame-de.html","name": "Dra. Liliana Corredor: El Derrame de Petróleo, Balance del ...","snippet": "...  del actual Derrame de Petróleo Crudo en el Golfo de Mexico.  ...  4) Nuestro enfoque y poder colectivos, pueden perjudicar o reparar el  ...","ranking": 76,"size": 1.298701299,"rscore": 97.7378,"reputation": 1,"repu_normalizada": 0,"date": "08-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/armonicosdeconciencia.blogspot.cl/2010/07/dra-lilliana-corredor-el-derrame-de.html"}, 
{ "id": "3167","repu": 69,"re_nor": 5,"fecha": 60,"url": "http://www.bi2green.com/energia-renovable-imperante-mexico-mexic/","name": "Renovable debe de ser el futuro de las energías en México ...","snippet": "Desde que ocurrió el derrame de petróleo en el Golfo de México en abril  ...  haga responsable a la paraestatal para la reparación de los daños,  ...","ranking": 78,"size": 1.265822785,"rscore": 91.31905,"reputation": 2,"repu_normalizada": 0,"date": "31-08-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.bi2green.com/energia-renovable-imperante-mexico-mexic/index.html"}, 
{ "id": "3168","repu": 67,"re_nor": 5,"fecha": 16,"url": "http://actualidad.rt.com/ciencias/view/12360-BP-pone-en-practica-nuevas-soluciones-para-acabar-con-fuga-de-crudo","name": "BP pone en práctica nuevas soluciones para acabar con la ...","snippet": "British Petroleum (BP) intentará una vez más detener el vertido de petróleo en el golfo de México.  ...  El derrame, que empezó el 20 de abril con el hundimiento de la  ...  millones de dólares para mitigar las consecuencias de la catástrofe.  ....  Rusia ensaya maniobras militares a gran escala con la mayor  ...","ranking": 34,"size": 2.857142857,"rscore": 99.288284,"reputation": 1,"repu_normalizada": 0,"date": "01-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/actualidad.rt.com/ciencias/view/12360-BP-pone-en-practica-nuevas-soluciones-para-acabar-con-fuga-de-crudo.html"}, 
{ "id": "3169","repu": 70,"re_nor": 5,"fecha": 73,"url": "http://foros.elsiglodetorreon.com.mx/politica/603802-diferencia+entre+un+empinado+de+traidores+a+la+patria+y+un+subliminado.html","name": "Diferencia entre un empinado de traidores a la patria y un ...","snippet": "mitigar malas prácticas a través de un proceso homologado,  ...  El abuso en los contratos en el gigante petrolero tienen directa incidencia en el margen de maniobra que tiene el  ...  La producción de petróleo de México está cayendo y en un  ....  relacionado con la limpieza de un derrame de petróleo.","ranking": 69,"size": 1.428571429,"rscore": 96.01735,"reputation": 2,"repu_normalizada": 0,"date": "21-01-2015","colour": 58,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/foros.elsiglodetorreon.com.mx/politica/603802-diferencia%2bentre%2bun%2bempinado%2bde%2btraidores%2ba%2bla%2bpatria%2by%2bun%2bsubliminado.html"}, 
{ "id": "3170","repu": 77,"re_nor": 7,"fecha": 82,"url": "http://semanariouniversidad.ucr.cr/mundo/petrolera-pagara-18-700-millones-por-marea-negra-en-eeuu/","name": "Petrolera pagará $18.700 millones por marea negra en EEUU","snippet": "Tras ocasionar la peor marea negra en la historia del Golfo de México,  ...  Ayudaría a reparar el daño causado a la economía del Golfo, la industria de la pesca, los  ...  en su momento que el derrame de petróleo del Golfo de México en 2010 fue  ...","ranking": 93,"size": 1.063829787,"rscore": 93.66822,"reputation": 5,"repu_normalizada": 0,"date": "02-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/semanariouniversidad.ucr.cr/mundo/petrolera-pagara-18-700-millones-por-marea-negra-en-eeuu/index.html"}, 
{ "id": "3171","repu": 71,"re_nor": 6,"fecha": 81,"url": "http://sostenibilidad.semana.com/medio-ambiente/articulo/bp-pagara-usd-18700-millones-peor-marea-negra-historia-eeuu/33316","name": "18.700 millones de dólares pagará BP por derrame de ...","snippet": "Ayudaría a reparar el daño causado a la economía del Golfo,  ...  en su momento que el derrame de petróleo del Golfo de México en 2010 fue  ...","ranking": 40,"size": 2.43902439,"rscore": 93.943085,"reputation": 2,"repu_normalizada": 0,"date": "02-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/sostenibilidad.semana.com/medio-ambiente/articulo/bp-pagara-usd-18700-millones-peor-marea-negra-historia-eeuu/33316.html"}, 
{ "id": "3172","repu": 68,"re_nor": 5,"fecha": 69,"url": "http://www.ambientum.com/boletino/noticias/El-Golfo-de-Mexico-4-a%C3%B1os-despues-del-derrame-de-BP.asp","name": "El Golfo de México 4 años después del derrame de BP ...","snippet": "...  años después del derrame de petróleo de BP en el Golfo de México  ...  de Ecuador vigila acciones de reparación tras derrame de petróleo en  ...","ranking": 7,"size": 12.5,"rscore": 93.15878,"reputation": 1,"repu_normalizada": 0,"date": "21-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.ambientum.com/boletino/noticias/El-Golfo-de-Mexico-4-a%C3%B1os-despues-del-derrame-de-BP.html"}, 
{ "id": "3173","repu": 80,"re_nor": 7,"fecha": 35,"url": "http://www.blogylana.com/que-hay-que-tomar-en-cuenta-cuando-se-invierte-en-acciones/","name": "Qué hay que tomar en cuenta cuando se invierte en acciones","snippet": "La compañía causante del desastre ambiental en el Golfo de México vio cómo  ...  a la reparación del derrame de petróleo y ha asegurado que está sellando el  ...","ranking": 94,"size": 1.052631579,"rscore": 87.44455,"reputation": 8,"repu_normalizada": 0,"date": "26-10-2010","colour": 7,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.blogylana.com/que-hay-que-tomar-en-cuenta-cuando-se-invierte-en-acciones/index.html"}, 
{ "id": "3174","repu": 72,"re_nor": 6,"fecha": 12,"url": "http://www.amdee.org/Boletin/2010/Mayo/30.htm","name": "Síntesis Amdee Mayo 30, 2010","snippet": "BP fracasa en intento de contener derrame  ...  La empresa británica BP anunció ayer que la compleja maniobra ???top Kill??? para cerrar su pozo petrolero en el golfo de México fracasó, aplastando las esperanzas de un rápido fin  ...  del petróleo ocasionada (entre 16 mil y 19 mil barriles al día), mitigar el daño  ...","ranking": 18,"size": 5.263157895,"rscore": 89.648735,"reputation": 2,"repu_normalizada": 0,"date": "30-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.amdee.org/Boletin/2010/Mayo/30.html"}, 
{ "id": "3175","repu": 78,"re_nor": 7,"fecha": 62,"url": "http://www.dforceblog.com/2013/01/03/bp-se-declara-culpable-por-el-derrame-de-petroleo-en-el-golfo-de-mexico/","name": "BP se Declara Culpable Por el Derrame de Petróleo en el ...","snippet": "¿Entonces, han reparado el daño que causó el derrame de petróleo?  ...  reparar los daños, además de que se perdieron 11 vidas humanas,  ...  La Realidad Sobre el Derrame de Petróleo en el Golfo de México ???Primera Parte","ranking": 89,"size": 1.111111111,"rscore": 89.84749,"reputation": 6,"repu_normalizada": 0,"date": "03-01-2013","colour": 34,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.dforceblog.com/2013/01/03/bp-se-declara-culpable-por-el-derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "3176","repu": 75,"re_nor": 6,"fecha": 55,"url": "http://blog.m633.com/2012_01_01_archive.html","name": "M633: enero 2012","snippet": "Ya son cuatro portaaviones que están en el Golfo Pérsico.  ...  último que, de cumplirse, pondría en riesgo el suministro de petróleo del Golfo Pérsico.  .....  como las mayores maniobras militares conjuntas de Estados Unidos e Israel.  .....  en Colombia, la ley Doring planteada en México, son como la Sopa y la  ...","ranking": 55,"size": 1.785714286,"rscore": 86.85664,"reputation": 4,"repu_normalizada": 0,"date": "31-01-2012","colour": 22,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/blog.m633.com/2012_01_01_archive.html"}, 
{ "id": "3177","repu": 76,"re_nor": 6,"fecha": 3,"url": "http://www.cetmar.org/documentacion/mareas_negras_catastrofes.htm","name": "Mareas Negras Catástrofes","snippet": "El 20 de marzo, acontece el derrame más controvertido en cuanto a cifras, el petrolero  ....  El 19 de diciembre , el petrolero 'Sea Star' se hunde en el Golfo de Amán y  ....  tn. se decide hundir el buque debido al coste de su reparación a 500km. de  ...  en el golfo de México, durante los 280 días que se siguieron desde el inicio  ...","ranking": 56,"size": 1.754385965,"rscore": 88.49764,"reputation": 4,"repu_normalizada": 0,"date": "27-01-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.cetmar.org/documentacion/mareas_negras_catastrofes.html"}, 
{ "id": "3178","repu": 74,"re_nor": 6,"fecha": 39,"url": "http://www.taringa.net/posts/ecologia/5879738/El-desastre-ecologico-mas-grande-hasta-ahora.html","name": "El desastre ecologico mas grande hasta ahora - Taringa!","snippet": "La plataforma de BP que desató el derrame de petróleo más grande de  ...  por el petróleo del desastroso derrame en el Golfo de México que limpiarlas.  .....  Incluso si la maniobra 'top-kill' de BP para taponear la fuga tiene  ...  mitigación que implementó a 1,6 kilómetros de profundidad sobre el lecho marino.","ranking": 5,"size": 16.66666667,"rscore": 72.36874,"reputation": 3,"repu_normalizada": 0,"date": "01-12-2010","colour": 9,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.taringa.net/posts/ecologia/5879738/El-desastre-ecologico-mas-grande-hasta-ahora.html"}, 
{ "id": "3179","repu": 87,"re_nor": 8,"fecha": 83,"url": "http://www.noticiasrcn.com/internacional-america/bp-debera-pagar-us-18700-millones-contaminacion-crudo-el-golfo-mexico","name": "BP deberá pagar US$ 18.700 millones por la contaminación ...","snippet": "...  en su momento que el derrame de petróleo del Golfo de México en 2010 fue  ...  Ayudaría a reparar el daño causado a la economía del Golfo, la industria de la  ...","ranking": 91,"size": 1.086956522,"rscore": 71.55615,"reputation": 12,"repu_normalizada": 0,"date": "02-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.noticiasrcn.com/internacional-america/bp-debera-pagar-us-18700-millones-contaminacion-crudo-el-golfo-mexico.html"}, 
{ "id": "3180","repu": 86,"re_nor": 8,"fecha": 58,"url": "http://www.cubadebate.cu/noticias/2012/03/03/bp-pagara-7800-millones-de-dolares-por-el-derrame-petrolero-en-el-golfo-de-mexico/","name": "BP pagará 7.800 millones de dólares por el derrame ...","snippet": "El grupo petrolero BP llegó a un acuerdo con los afectados por el  ...  BP pagará 7.800 millones de dólares por el derrame petrolero en el Golfo de México  ...  de años, que la naturaleza tardara en reparar el daño causado?","ranking": 86,"size": 1.149425287,"rscore": 75.13254,"reputation": 11,"repu_normalizada": 0,"date": "03-03-2012","colour": 24,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.cubadebate.cu/noticias/2012/03/03/bp-pagara-7800-millones-de-dolares-por-el-derrame-petrolero-en-el-golfo-de-mexico/index.html"}, 
{ "id": "3181","repu": 83,"re_nor": 8,"fecha": 19,"url": "http://www.elblogsalmon.com/entorno/acciones-de-british-petroleum-caen-50-por-derrame","name": "Acciones de British Petroleum caen 50% por derrame","snippet": "Acciones de British Petroleum caen 50% por derrame  ...  resultado del enorme derrame de petróleo en el Golfo de México, que continúa  ....  para reparaciones en alta temperatura Formadores de empaquetadura hasta 600ºC.","ranking": 67,"size": 1.470588235,"rscore": 77.006325,"reputation": 9,"repu_normalizada": 0,"date": "12-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.elblogsalmon.com/entorno/acciones-de-british-petroleum-caen-50-por-derrame.html"}, 
{ "id": "3182","repu": 79,"re_nor": 7,"fecha": 72,"url": "http://www.lasegunda.com/Noticias/Impreso/2014/10/967783/ya-no-hay-sitios-pristinos-en-el-mar-e-incluso-los-afectados-como-quintero-los-estamos-acabando","name": "Oceanógrafa Klaudia Hernández y el derrame en Quintero ...","snippet": "'La normativa respecto de los derrames debiera ser menos general, y la  ...  ha seguido de cerca el derrame de 22 mil litros de petróleo en la bahía de  ...  En especial cuando se trata de estructuras estables, donde se realizan este tipo de maniobras.  ...  -¿Cómo se trató el derrame en el Golfo de México?","ranking": 17,"size": 5.555555556,"rscore": 73.590385,"reputation": 7,"repu_normalizada": 0,"date": "08-10-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.lasegunda.com/Noticias/Impreso/2014/10/967783/ya-no-hay-sitios-pristinos-en-el-mar-e-incluso-los-afectados-como-quintero-los-estamos-acabando.html"}, 
{ "id": "3183","repu": 81,"re_nor": 7,"fecha": 20,"url": "http://www.ecoosfera.com/2010/06/consecuencias-del-derrame-de-petroleo-en-el-golfo-de-mexico-numeros-y-estadisticas/","name": "Consecuencias del derrame de petróleo en el Golfo de ...","snippet": "Consecuencias del derrame de petróleo en el Golfo de México: números y estadísticas. A pesar de los esfuerzos de BP por ocultar las ...","ranking": 10,"size": 9.090909091,"rscore": 65.57645,"reputation": 8,"repu_normalizada": 0,"date": "13-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.ecoosfera.com/2010/06/consecuencias-del-derrame-de-petroleo-en-el-golfo-de-mexico-numeros-y-estadisticas/index.html"}, 
{ "id": "3184","repu": 82,"re_nor": 7,"fecha": 67,"url": "http://pijamasurf.com/2014/02/ecuador-vs-chevron-impunidad-y-corrupcion-en-el-derrame-de-petroleo-mas-grandes-de-la-historia/","name": "Ecuador vs Chevron, impunidad y corrupción en el derrame ...","snippet": "Las operaciones de la empresa petrolera Texaco (actualmente Chevron)  ...  en Alaska y seis veces más que el derrame del Golfo de México.  ...  las zonas afectadas y pagar 30 millones de dólares en reparación de los daños.","ranking": 19,"size": 5,"rscore": 65.23059,"reputation": 8,"repu_normalizada": 0,"date": "21-02-2014","colour": 47,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/pijamasurf.com/2014/02/ecuador-vs-chevron-impunidad-y-corrupcion-en-el-derrame-de-petroleo-mas-grandes-de-la-historia/index.html"}, 
{ "id": "3185","repu": 84,"re_nor": 8,"fecha": 74,"url": "http://eleconomista.com.mx/industrias/2015/01/23/pemex-pago-remolque-plataforma-arabia-que-nunca-ocurrio","name": "Pemex pagó remolque de plataforma desde Arabia que ...","snippet": "La gigante petrolera estatal mexicana Pemex pagó nueve millones de dólares en el  ...  plataforma petrolera desde Emiratos Árabes Unidos hasta el Golfo de México.  ...  mitigar malas prácticas a través de un proceso homologado,  ...  gigante petrolero tienen directa incidencia en el margen de maniobra que  ...","ranking": 16,"size": 5.882352941,"rscore": 64.55807,"reputation": 9,"repu_normalizada": 0,"date": "23-01-2015","colour": 58,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/eleconomista.com.mx/industrias/2015/01/23/pemex-pago-remolque-plataforma-arabia-que-nunca-ocurrio.html"}, 
{ "id": "3186","repu": 85,"re_nor": 8,"fecha": 56,"url": "https://actualidad.rt.com/economia/view/40012-BP-pagara-7.800-millones-de-d%C3%B3lares-por-derrame-en-Golfo-de-M%C3%A9xico","name": "BP pagará 7.800 millones de dólares por el derrame en el ...","snippet": "BP pagará 7.800 millones de dólares por el derrame en el Golfo de México  ...  afectados por el derrame de petróleo en el Golfo de México hace dos años.  ...  de dólares para reparar el daño ecológico causado por el derrame  ...","ranking": 9,"size": 10,"rscore": 67.72525,"reputation": 9,"repu_normalizada": 0,"date": "03-03-2012","colour": 24,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/actualidad.rt.com/economia/view/40012-BP-pagara-7.html"}, 
{ "id": "3187","repu": 88,"re_nor": 8,"fecha": 61,"url": "http://www.ecologiaverde.com/multa-historica-de-4-500-millones-de-dolares-para-la-petrolera-bp-por-el-desastre-del-golfo-de-mexico/","name": "Multa histórica de 4.500 millones de dólares para la ...","snippet": "Por suerte, la fuga de crudo padecida por el Golfo de México en abril del 2010 saldrá carita, aunque en realidad no existe dinero suficiente para reparar el daño.  ...  ecológico sin precedentes con el derrame de cerca de 800 millones de  ...  millones de dólares para la petrolera BP por el desastre del Golfo  ...","ranking": 31,"size": 3.125,"rscore": 69.49672,"reputation": 14,"repu_normalizada": 0,"date": "20-11-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.ecologiaverde.com/multa-historica-de-4-500-millones-de-dolares-para-la-petrolera-bp-por-el-desastre-del-golfo-de-mexico/index.html"}, 
{ "id": "3188","repu": 92,"re_nor": 9,"fecha": 84,"url": "http://www.elperiodico.com/es/noticias/sociedad/petrolera-acuerda-pagar-18700-millones-dolares-por-vertido-golfo-mexico-4323663","name": "La petrolera BP acuerda pagar 18.700 millones de dólares ...","snippet": "...  BP acuerda pagar 18.700 millones de dólares por el vertido del Golfo de México  ...  Con esta decisión se cierra el prolongado litigio por ese derrame de  ...  'Ayudará reparar el daño realizado a la economía del golfo, los  ...","ranking": 68,"size": 1.449275362,"rscore": 5.961205,"reputation": 24,"repu_normalizada": 1,"date": "02-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.elperiodico.com/es/noticias/sociedad/petrolera-acuerda-pagar-18700-millones-dolares-por-vertido-golfo-mexico-4323663.html"}, 
{ "id": "3189","repu": 89,"re_nor": 9,"fecha": 45,"url": "http://www.narom.org/Rusia%20ayuda%20Golfo%20Mexico.html","name": "querrán que siga saliendo petróleo en en Golfo de México","snippet": "...  su tecnología para reparar el desastre del petróleo en el Golfo de México  ...  Los métodos utilizados previamente para frenar el derrame resultan insuficientes.","ranking": 12,"size": 7.692307692,"rscore": 2.96211,"reputation": 16,"repu_normalizada": 0,"date": "22-05-2011","colour": 14,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.narom.org/Rusia%20ayuda%20Golfo%20Mexico.html"}, 
{ "id": "3190","repu": 90,"re_nor": 9,"fecha": 75,"url": "http://elblogverde.com/derrame-de-petroleo-en-golfo-de-mexico/","name": "(Recordamos) Derrame de petróleo en el Golfo de México ...","snippet": "El 22 de Abril de 2010 se detectó un grave derrame de petróleo en el Golfo de México. Coincidentemente, el desafortunado accidente ocurrió ...","ranking": 0,"size": 100,"rscore": 6.690575,"reputation": 18,"repu_normalizada": 0,"date": "29-01-2015","colour": 58,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/elblogverde.com/derrame-de-petroleo-en-golfo-de-mexico/index.html"}, 
{ "id": "3191","repu": 91,"re_nor": 9,"fecha": 98,"url": "https://es.wikipedia.org/wiki/Derrame_de_petr%C3%B3leo","name": "Derrame de petróleo - Wikipedia, la enciclopedia libre","snippet": "Tareas de limpieza del derrame de petróleo provocado por el buque 'Prestige'.  ....  el 22 de abril de 2010 provocando un derrame de petróleo incontrolado en el golfo de México que causó enormes daños de complicada y lenta reparación.","ranking": 1,"size": 50,"rscore": 7.65315,"reputation": 20,"repu_normalizada": 0,"date": "29-11-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/es.wikipedia.org/wiki/Derrame_de_petr%C3%B3leo.html"}, 
{ "id": "3192","repu": 97,"re_nor": 10,"fecha": 13,"url": "http://lapizarradeyuri.blogspot.com/2010/05/cinco-preguntas-bp.html","name": "La pizarra de Yuri: Cinco preguntas a BP.","snippet": "¿De qué manera BP y sus asociados van a reparar el daño causado al  ...  el petróleo sigue fluyendo al Golfo de México a un ritmo de entre 5.000 y  ...  pero la realidad es que la utilización de dispersantes contra derrames de  ...","ranking": 97,"size": 1.020408163,"rscore": 5.85283,"reputation": 151,"repu_normalizada": 3,"date": "30-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/lapizarradeyuri.blogspot.cl/2010/05/cinco-preguntas-bp.html"}, 
{ "id": "3193","repu": 93,"re_nor": 9,"fecha": 87,"url": "http://www.publico.es/internacional/bp-pagara-mayor-multa-eeuu.html","name": "BP pagará la mayor multa de EEUU por el vertido en el ...","snippet": "'Ayudará a reparar el daño realizado a la economía del golfo de  ...  El anterior gran derrame de petróleo en EEUU fue el provocado por el  ...","ranking": 47,"size": 2.083333333,"rscore": 18.73224,"reputation": 59,"repu_normalizada": 1,"date": "03-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.publico.es/internacional/bp-pagara-mayor-multa-eeuu.html"}, 
{ "id": "3194","repu": 98,"re_nor": 10,"fecha": 91,"url": "http://es.panampost.com/maria-suarez/2015/07/10/ataques-de-las-farc-afectan-la-produccion-de-petroleo-en-colombia/","name": "petróleo - PanAm Post","snippet": "Ataques de las FARC afectan la producción de petróleo en Colombia  ...  de la planta de British Petroleum (BP) en el golfo de México en 2010, que  ...  efectiva las reparaciones de los oleoductos y el control de los derrames de  ...","ranking": 95,"size": 1.041666667,"rscore": 24.87367,"reputation": 192,"repu_normalizada": 4,"date": "10-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/es.panampost.com/maria-suarez/2015/07/10/ataques-de-las-farc-afectan-la-produccion-de-petroleo-en-colombia/index.html"}, 
{ "id": "3195","repu": 94,"re_nor": 9,"fecha": 100,"url": "http://nooilcanarias.com/","name": "No Oil Canarias | No Offshore Canarias","snippet": "El buque de Canarias «Oleg Naydenov» sigue derramando fuel. ... Una plataforma petrolera está en llamas en el Golfo de México rt Oil Platform in Gulf of ...","ranking": 45,"size": 2.173913043,"rscore": 36.89925,"reputation": 86,"repu_normalizada": 2,"date": "22-12-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/nooilcanarias.com/index.html"}, 
{ "id": "3196","repu": 100,"re_nor": 10,"fecha": 1,"url": "http://www.enlaceveracruz212.com.mx/","name": "Enlace Veracruz 212","snippet": "Además de la pena privativa de libertad, también se le dictó un pago de 310 mil pesos, como parte de la reparación del daño y 100 días de salario mínimo ...","ranking": 99,"size": 1,"rscore": 44.97042,"reputation": 445,"repu_normalizada": 10,"date": "17-03-2005","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.enlaceveracruz212.com.mx/index.html"}, 
{ "id": "3197","repu": 99,"re_nor": 10,"fecha": 86,"url": "http://www.rtve.es/noticias/20150702/bp-pagara-unos-16900-millones-euros-vertido-crudo-golfo-mexico-2010/1172540.shtml","name": "BP pagará unos 16.900 millones de euros por el vertido de ...","snippet": "Se cierra así el litigio por el mayor derrame de petróleo de la historia de EE.  ...  UU. por el vertido de crudo en el Golfo de México ocurrido en 2010.  ...  labores de reparación y restauración de los estados afectados en el golfo.","ranking": 90,"size": 1.098901099,"rscore": 52.5897,"reputation": 246,"repu_normalizada": 6,"date": "02-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3-2/www.rtve.es/noticias/20150702/bp-pagara-unos-16900-millones-euros-vertido-crudo-golfo-mexico-2010/1172540.html"}, 
{ "id": "3198","repu": 96,"re_nor": 10,"fecha": 70,"url": "http://wormius.blogspot.com/2014_04_01_archive.html","name": "WORMIUS: abril 2014","snippet": "Esto significa que los microbios 'podrían ayudar a mitigar los efectos de la  ...  como la fracturación hidráulica y los derrames de petróleo', dijo el informe.  ...  se detectó después del derrame de BP en el Golfo de México en 2010, el peor  .....  no fueron suficientes para garantizar la seguridad de esta maniobra.","ranking": 58,"size": 1.694915254,"rscore": 60.55106,"reputation": 144,"repu_normalizada": 3,"date": "30-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/wormius.blogspot.cl/2014_04_01_archive.html"}, 
{ "id": "3199","repu": 95,"re_nor": 10,"fecha": 85,"url": "http://www.bbc.com/mundo/noticias/2015/07/150702_eeu_bp_derrame_acuerdo_ep","name": "BP acuerda pagar US$18.700 millones por el derrame de ...","snippet": "UU. por los daños causados por el vertido en la costa del Golfo en 2010.  ...  BP acuerda pagar US$18.700 millones por el derrame de crudo en el Golfo de México  ...  La petrolera llegó a un acuerdo de principios con la justicia  ...  ayudaría a reparar el daño causado a la economía del Golfo, la pesca, los  ...","ranking": 4,"size": 20,"rscore": 89.24104,"reputation": 113,"repu_normalizada": 3,"date": "02-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo3/www.bbc.com/mundo/noticias/2015/07/150702_eeu_bp_derrame_acuerdo_ep.html"}
]
};
};
function getData4() {
return {
"id" : "4",
"name": "Responsabilidades del derrame de petróleo del golfo de México",
"children": 
[
{ "id": "4100","repu": 1,"re_nor": 0,"fecha": 40,"url": "http://www.juventudrebelde.cu/internacionales/2010-05-14/continua-derrame-de-petroleo-en-el-golfo-de-mexico/","name": "Continúa derrame de petróleo en el Golfo de México ...","snippet": "Continúa derrame de petróleo en el Golfo de México  ...  mar afuera, afectarán la política energética del gobierno del presidente Barack Obama.","ranking": 83,"size": 1.19047619,"rscore": 9.117035,"reputation": 0,"repu_normalizada": 0,"date": "14-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.juventudrebelde.cu/internacionales/2010-05-14/continua-derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "4101","repu": 2,"re_nor": 0,"fecha": 21,"url": "http://www2.inecc.gob.mx/publicaciones/gacetas/243/simonian.html","name": "Medio ambiente y políticas publicas en México (1970-1993)","snippet": "En 1975, Echeverría presentó su visión de las causas principales de los  ...  Para él, la preservación del ambiente era una responsabilidad común,  ....  de que el petróleo se había extendido a los largo de la costa del Golfo de  ...","ranking": 75,"size": 1.315789474,"rscore": 82.88342,"reputation": 0,"repu_normalizada": 0,"date": "27-08-2007","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www2.inecc.gob.mx/publicaciones/gacetas/243/simonian.html"}, 
{ "id": "4102","repu": 3,"re_nor": 0,"fecha": 36,"url": "http://medioambienteyperiodismo.blogspot.com/2010/05/contaminacion-marina-por-vertido-de.html","name": "contaminacion marina por vertido de petroleo en el golfo de ...","snippet": "El derrame de petróleo producido proviene de una fuga en el pozo que fue  ...  y se hundió la semana pasada a unos 80 km de la Costa en el Golfo de México","ranking": 77,"size": 1.282051282,"rscore": 6.832596,"reputation": 0,"repu_normalizada": 0,"date": "04-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/medioambienteyperiodismo.blogspot.cl/2010/05/contaminacion-marina-por-vertido-de.html"}, 
{ "id": "4103","repu": 4,"re_nor": 0,"fecha": 29,"url": "http://tesmunvii.blogspot.com/2009/10/el-derrame-de-petroleo-en-el-golfo-de.html","name": "El derrame de petróleo en el Golfo de México - tesmun vii","snippet": "British Petroleum (BP) es la mayor extractora petrolera del Golfo de México.  ...  las graves consecuencias de la explosión y el derrame de petróleo en el Golfo.  ...  que tiene obligaciones morales y legales aquí en el Golfo por los daños que  ...","ranking": 79,"size": 1.25,"rscore": 89.09485,"reputation": 0,"repu_normalizada": 0,"date": "10-10-2009","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/tesmunvii.blogspot.cl/2009/10/el-derrame-de-petroleo-en-el-golfo-de.html"}, 
{ "id": "4104","repu": 64,"re_nor": 7,"fecha": 42,"url": "http://www.diariosur.es/rc/20100525/sociedad/eeuu-declara-como-zonas-201005250123.html","name": "El Golfo de México, declarado zona de «desastre pesquero ...","snippet": "...  multará a British Petroleum por su responsabilidad en el vertido de crudo  ...  Obama ha decidido aumentar la presión sobre la petrolera BP para que  ...  han viajado a la costa del Golfo de México para revisar los efectos de  ...","ranking": 98,"size": 1.01010101,"rscore": 86.79312,"reputation": 3,"repu_normalizada": 0,"date": "25-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.diariosur.es/rc/20100525/sociedad/eeuu-declara-como-zonas-201005250123.html"}, 
{ "id": "4105","repu": 5,"re_nor": 0,"fecha": 97,"url": "http://www.oilchannel.tv/noticias/tecnologia-colombiana-podria-solucionar-consecuencias-de-derrames-de-petroleo","name": "Tecnología colombiana podría solucionar consecuencias ...","snippet": "La CNH autorizó búsqueda de hidrocarburos en el Golfo de México con  ...  absorbente biodegradable capaz de combatir derrames de petróleo.","ranking": 72,"size": 1.369863014,"rscore": 15.0056,"reputation": 0,"repu_normalizada": 0,"date": "22-09-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.oilchannel.tv/noticias/tecnologia-colombiana-podria-solucionar-consecuencias-de-derrames-de-petroleo.html"}, 
{ "id": "4106","repu": 6,"re_nor": 0,"fecha": 85,"url": "http://www.rcinet.ca/es/2014/01/30/canada-quiere-elevar-a-mil-millones-la-cobertura-de-responsabilidad-de-las-empresas-de-explotacion-petrolera-y-nuclear/","name": "Canadá quiere elevar la cobertura de responsabilidad a ...","snippet": "Deepwater Horizon en el Golfo de México causaron un gran impacto  ...  la muerte de 11 empleados en la explosión de la plataforma petrolera.","ranking": 67,"size": 1.470588235,"rscore": 1.22755,"reputation": 0,"repu_normalizada": 0,"date": "30-01-2014","colour": 46,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.rcinet.ca/es/2014/01/30/canada-quiere-elevar-a-mil-millones-la-cobertura-de-responsabilidad-de-las-empresas-de-explotacion-petrolera-y-nuclear/index.html"}, 
{ "id": "4107","repu": 7,"re_nor": 1,"fecha": 63,"url": "http://kerchak.com/hundimiento-deepwater-horizon/","name": "Se cumple un año del hundimiento de la Deepwater Horizon","snippet": "El hundimiento de la plataforma petrolera Deepwater Horizon en el Golfo de México,  ...  carey como en este caso) han sufrido el derrame en el Golfo de México.","ranking": 71,"size": 1.388888889,"rscore": 85.28359,"reputation": 0,"repu_normalizada": 0,"date": "20-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/kerchak.com/hundimiento-deepwater-horizon/index.html"}, 
{ "id": "4108","repu": 8,"re_nor": 1,"fecha": 32,"url": "http://www.telemetro.com/internacionales/Petrolera-BP-responsabilidad-marea-negra_0_254974508.html","name": "Petrolera BP asume 'plena responsabilidad' por marea negra","snippet": "La compañía petrolera británica BP, operadora de la plataforma de  ...  el Golfo de México, asume la ' plena responsabilidad por la marea negra' que  ...  la fuga y limitar las consecuencias para el ambiente por la marea negra',  ...","ranking": 76,"size": 1.298701299,"rscore": 90.66291,"reputation": 0,"repu_normalizada": 0,"date": "30-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.telemetro.com/internacionales/Petrolera-BP-responsabilidad-marea-negra_0_254974508.html"}, 
{ "id": "4109","repu": 9,"re_nor": 1,"fecha": 62,"url": "http://www.elobservador.com.uy/obama-promete-ayuda-damnificados-golfo-mexico-n97809","name": "Obama promete ayuda para damnificados en Golfo de México","snippet": "BP 'tiene obligaciones morales y legales aquí, en el Golfo', dijo Obama.  ...  que alguien no pensó en las consecuencias de sus acciones', añadió.  ...  del mar) que captura unos 1.000 barriles de petróleo (160.000 litros) al día,  ...","ranking": 66,"size": 1.492537313,"rscore": 22.07966,"reputation": 0,"repu_normalizada": 0,"date": "11-04-2011","colour": 13,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.elobservador.com.uy/obama-promete-ayuda-damnificados-golfo-mexico-n97809.html"}, 
{ "id": "4110","repu": 10,"re_nor": 1,"fecha": 34,"url": "http://www.expansion.com/2010/05/03/economia-politica/1272870664.html","name": "El vertido de petróleo en el Golfo de México podría ...","snippet": "El vertido de petróleo en el Golfo de México podría convertirse en el 'Katrina' de Obama.  ...  Expansión.com - Diario líder de información de mercados, economía y política  ....  al derrame y dicen que podría convertirse en el 'Katrina' de Obama,  ...  Añadió que las repercusiones podrían durar 'mucho tiempo' y  ...","ranking": 69,"size": 1.428571429,"rscore": 88.23896,"reputation": 0,"repu_normalizada": 0,"date": "03-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.expansion.com/2010/05/03/economia-politica/1272870664.html"}, 
{ "id": "4111","repu": 11,"re_nor": 1,"fecha": 53,"url": "http://www.conscienciaolocura.net/general/derrame-de-petroleo-serios-danos-ecologicos/","name": "Derrame de petróleo, serios daños ecológicos","snippet": "Este derrame de petróleo en el Golfo de México, sin duda, representa un  ...  MAYOR PARTICIPACI??N Y RESPONSABILIDAD TENDIENTES  ...  al parecer esto fue una más de las consecuencias de la falta de visión de nuestos  ...","ranking": 65,"size": 1.515151515,"rscore": 84.27881,"reputation": 0,"repu_normalizada": 0,"date": "20-08-2010","colour": 5,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.conscienciaolocura.net/general/derrame-de-petroleo-serios-danos-ecologicos/index.html"}, 
{ "id": "4112","repu": 12,"re_nor": 1,"fecha": 35,"url": "http://www.diversidadambiental.org/medios/nota227.html","name": "Insuficientemente ponderados los impactos ambientales por ...","snippet": "En el año de 1979, también en el Golfo de México, PEMEX protagonizó  ...  como consumidores, tenemos la responsabilidad de favorecer y promover el  ...  mil litros de petróleo son vertidos diariamente al mar del Golfo de México,  ...  que sus consecuencias dañarán a la economía de los estados en el Golfo.","ranking": 73,"size": 1.351351351,"rscore": 4.59855,"reputation": 0,"repu_normalizada": 0,"date": "03-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.diversidadambiental.org/medios/nota227.html"}, 
{ "id": "4113","repu": 13,"re_nor": 2,"fecha": 55,"url": "http://www.buenastareas.com/materias/derrame-de-petroleo-consecuencias-en-la-flora-y-la-fauna/0","name": "Derrame De Petroleo Consecuencias En La Flora Y La Fauna","snippet": "Efectos del derrame de petróleo sobre la flora y fauna El petróleo o cualquier  ...  específico al golfo de México, el derrame de petróleo y las consecuencias que  ...  Políticas preventivas en caso de desastres naturales por derrames petroleros.","ranking": 57,"size": 1.724137931,"rscore": 80.391396,"reputation": 0,"repu_normalizada": 0,"date": "08-09-2010","colour": 6,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.buenastareas.com/materias/derrame-de-petroleo-consecuencias-en-la-flora-y-la-fauna/0.html"}, 
{ "id": "4114","repu": 14,"re_nor": 2,"fecha": 58,"url": "http://revcom.us/a/219/oil_disaster-es.html","name": "El desastre del petróleo en el Golfo... y el profundo ...","snippet": "El desastre del petróleo en el Golfo... y el profundo encubrimiento  ...  las causas del gigantesco derrame del petróleo en el golfo de México del  ....  militares y políticos que son esenciales para la supervivencia del capitalismo y  ...","ranking": 63,"size": 1.5625,"rscore": 86.412674,"reputation": 0,"repu_normalizada": 0,"date": "12-12-2010","colour": 9,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/revcom.us/a/219/oil_disaster-es.html"}, 
{ "id": "4115","repu": 15,"re_nor": 2,"fecha": 90,"url": "http://geoperspectivas.blogspot.com/2010/04/derrame-de-petroleo-en-el-golfo-de.html","name": "derrame de petróleo en el golfo de méxico - Geoperspectivas","snippet": "La inmensa mancha de petróleo en el Golfo de México es lo que se puede  ...  La mancha de petróleo del tamaño de Jamaica en el norte del Golfo de  .....  ERUPCI??N VOLCÁNICA EN ISLANDIA Y SUS CONSECUENCIAS.  ....  ESPACIO GEOGRÁFICO - NUESTRA RESPONSABILIDAD COMO GE??GRAFOS.","ranking": 60,"size": 1.639344262,"rscore": 37.30943,"reputation": 0,"repu_normalizada": 0,"date": "30-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/geoperspectivas.blogspot.cl/2010/04/derrame-de-petroleo-en-el-golfo-de.html"}, 
{ "id": "4116","repu": 16,"re_nor": 2,"fecha": 86,"url": "http://noticias.starmedia.com/sucesos/derrame-petroleo-en-golfo-mexico-afecto-atun.html","name": "Derrame de petróleo en el Golfo de México afectó el atún ...","snippet": "El peor derrame de crudo en la historia de Estados Unidos, ocurrido en el Golfo de  ...  Derrame de petróleo en el Golfo de México afectó el atún  ...  prisión por fraude fiscal. Guatemala: Baldetti a prisión por fraude fiscal. Política  ...","ranking": 61,"size": 1.612903226,"rscore": 89.21427,"reputation": 0,"repu_normalizada": 0,"date": "26-03-2014","colour": 48,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/noticias.starmedia.com/sucesos/derrame-petroleo-en-golfo-mexico-afecto-atun.html"}, 
{ "id": "4117","repu": 17,"re_nor": 2,"fecha": 37,"url": "http://www.ime.es/blog/2010/05/04/un-accidente-en-una-plataforma-offshore-provoca-la-desaparicion-de-once-trabajadores-y-una-gran-catastrofe-ecologica-en-el-golfo-de-mexico/","name": "Un accidente en una plataforma offshore provoca la ...","snippet": "...  de once trabajadores y una gran catástrofe ecológica en el Golfo de México  ...  lo que ha originado una gran mancha de petróleo que avanza sin control hacia la  ...  predecir su magnitud, pero asumirá sus responsabilidades.  ...  esperanzados en poder minimizar las consecuencias de la marea negra, tras  ...","ranking": 62,"size": 1.587301587,"rscore": 1.163376,"reputation": 0,"repu_normalizada": 0,"date": "04-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.ime.es/blog/2010/05/04/un-accidente-en-una-plataforma-offshore-provoca-la-desaparicion-de-once-trabajadores-y-una-gran-catastrofe-ecologica-en-el-golfo-de-mexico/index.html"}, 
{ "id": "4118","repu": 18,"re_nor": 2,"fecha": 91,"url": "http://www.activolegal.com/web/index.php/noticias/actualidad/1059-british-petroleum-deepwater-horizon-grave-negligencia-responsable-derrame-petroleo","name": "Se falla el caso de la Deepwater Horizon por contaminación ...","snippet": "...  grave negligencias, responsabilidad, derrame petroleo, contaminacion.  ...  por la contaminación marina con hidrocarburos en el Golfo de México  ...  Inc., fueron causas próximas del derrame e impuso responsabilidad a la  ...","ranking": 50,"size": 1.960784314,"rscore": 79.62818,"reputation": 0,"repu_normalizada": 0,"date": "10-09-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.activolegal.com/web/index.php/noticias/actualidad/1059-british-petroleum-deepwater-horizon-grave-negligencia-responsable-derrame-petroleo.html"}, 
{ "id": "4119","repu": 19,"re_nor": 2,"fecha": 54,"url": "http://eltiempo.com.ve/mundo/medida/declaran-culpable-a-bp-de-derrame-de-petroleo-en-golfo-de-mexico/152887","name": "Declaran culpable a BP de derrame de petróleo en Golfo de ...","snippet": "Declaran culpable a BP de derrame de petróleo en Golfo de México  ...  Recuerde nuestra política de publicación de comentarios: Los  ...","ranking": 56,"size": 1.754385965,"rscore": 87.28961,"reputation": 0,"repu_normalizada": 0,"date": "03-09-2010","colour": 6,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/eltiempo.com.ve/mundo/medida/declaran-culpable-a-bp-de-derrame-de-petroleo-en-golfo-de-mexico/152887.html"}, 
{ "id": "4120","repu": 48,"re_nor": 5,"fecha": 83,"url": "http://www.semana.com/nacion/articulo/drummond-investigada-por-la-contraloria/371164-3","name": "Drummond investigada por la Contraloría - Semana.com","snippet": "Otro proceso de responsabilidad fiscal es por utilizar buques de mayor  ...  de sanción a la BP por el derrame de petróleo en el golfo de México,  ...","ranking": 92,"size": 1.075268817,"rscore": 81.6087,"reputation": 1,"repu_normalizada": 0,"date": "18-01-2014","colour": 46,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.semana.com/nacion/articulo/drummond-investigada-por-la-contraloria/371164-3.html"}, 
{ "id": "4121","repu": 20,"re_nor": 2,"fecha": 9,"url": "http://alphia51.blogspot.com/2010/05/repercusion-del-derrame-petrolero-en-el.html","name": "repercusion del derrame petrolero en el golfo de mexico","snippet": "Finalmente, la repercusión del accidente de la plataforma petrolera en el Golfo de México, esta circunscrita básicamente en la política  ...","ranking": 54,"size": 1.818181818,"rscore": 7.34021,"reputation": 0,"repu_normalizada": 0,"date": "04-05-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/alphia51.blogspot.cl/2010/05/repercusion-del-derrame-petrolero-en-el.html"}, 
{ "id": "4122","repu": 21,"re_nor": 3,"fecha": 93,"url": "http://www.lr21.com.uy/mundo/1225207-plataforma-petrolera-estalla-golfo-mexico-temen-catastrofe-ambiental-hay-seis-muertos","name": "Plataforma petrolera estalla en el Golfo de México - Noticias ...","snippet": "Plataforma petrolera estalla en el Golfo de México y temen una catástrofe  ...  sin precedentes cuyas consecuencias se extendieron por décadas.  ...  tipo de responsabilidad, pero sobre todo también de evitar este tipo de  ...","ranking": 45,"size": 2.173913043,"rscore": 48.68387,"reputation": 0,"repu_normalizada": 0,"date": "02-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.lr21.com.uy/mundo/1225207-plataforma-petrolera-estalla-golfo-mexico-temen-catastrofe-ambiental-hay-seis-muertos.html"}, 
{ "id": "4123","repu": 22,"re_nor": 3,"fecha": 47,"url": "http://www.obamaworld.es/2010/06/18/que-ha-pasado-con-el-petroleo-en-el-golfo-de-mexico-y-de-quien-es-la-culpa/","name": "Qué ha pasado con el petróleo en el Golfo de México y de ...","snippet": "Qué ha pasado con el petróleo en el Golfo de México y de quién es la culpa  ...  La responsabilidad determinante es del gobierno anterior.  ...  Esta desgracia va a tener al menos tres consecuencias para los protagonistas  ...","ranking": 51,"size": 1.923076923,"rscore": 85.58681,"reputation": 0,"repu_normalizada": 0,"date": "18-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.obamaworld.es/2010/06/18/que-ha-pasado-con-el-petroleo-en-el-golfo-de-mexico-y-de-quien-es-la-culpa/index.html"}, 
{ "id": "4124","repu": 23,"re_nor": 3,"fecha": 44,"url": "http://eleconomista.com.mx/industrias/2010/06/10/derrame-petrolero-bp-llegara-mexico-semarnat","name": "Derrame petrolero de BP llegará a México: Semarnat | El ...","snippet": "Lea también: BP inicia captura de petróleo derramado.  ...  dispersar la mancha de crudo con consecuencias desastrosas para México.  ...  a sur en las aguas del Golfo, entre las costas de México y Estados Unidos, y los  ....  quien tuvo la responsabilidad de coordinar todos los procedimientos operativos y  ...","ranking": 48,"size": 2.040816327,"rscore": 5.873886,"reputation": 0,"repu_normalizada": 0,"date": "10-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/eleconomista.com.mx/industrias/2010/06/10/derrame-petrolero-bp-llegara-mexico-semarnat.html"}, 
{ "id": "4125","repu": 24,"re_nor": 3,"fecha": 26,"url": "http://www.azulambientalistas.org/derramerioguarapiche.html","name": "Posición de la Fundación Azul Ambientalistas ante el ...","snippet": "Después del derrame de petróleo acontecido en el Golfo de México, en el  ...  Como ambientalistas venezolanos, como dolientes sin intereses políticos o de  ...","ranking": 47,"size": 2.083333333,"rscore": 85.82113,"reputation": 0,"repu_normalizada": 0,"date": "14-12-2008","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.azulambientalistas.org/derramerioguarapiche.html"}, 
{ "id": "4126","repu": 25,"re_nor": 3,"fecha": 41,"url": "http://www.lavanguardia.com/sucesos/20100525/53933610469/ee-uu-multara-a-bp-por-su-responsabilidad-en-el-vertido-del-golfo-de-mexico.html","name": "EE.UU. multará a BP por su responsabilidad en el vertido ...","snippet": "UU. multará a BP por su responsabilidad en el vertido del golfo de México. La petrolera británica insiste en que está haciendo todo lo posible por  ...  de México para revisar los efectos de un vertido cuyas consecuencias que  ...","ranking": 33,"size": 2.941176471,"rscore": 16.33031,"reputation": 0,"repu_normalizada": 0,"date": "25-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.lavanguardia.com/sucesos/20100525/53933610469/ee-uu-multara-a-bp-por-su-responsabilidad-en-el-vertido-del-golfo-de-mexico.html"}, 
{ "id": "4127","repu": 26,"re_nor": 3,"fecha": 7,"url": "http://www.valdeperrillos.com/energia/mancha-petr-leo-en-golfo-m-jico","name": "Mancha de petróleo en el Golfo de Méjico. | Valdeperrillos ...","snippet": "El vertido del Golfo ya empieza a tener repercusiones políticas. Tras la  .....  En escala terrestre, en un parpadeo todo este petróleo derramado será digerido, desmenuzado y bien  ....  La fuga de petroleo en el Golfo de Mexico.","ranking": 52,"size": 1.886792453,"rscore": 93.43048,"reputation": 0,"repu_normalizada": 0,"date": "30-04-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.valdeperrillos.com/energia/mancha-petr-leo-en-golfo-m-jico.html"}, 
{ "id": "4128","repu": 27,"re_nor": 3,"fecha": 99,"url": "http://www.eldiario.es/internacional/delitos-economicos-ambientales-considerarse-humanidad_0_435707283.html","name": "Cuatro razones por las que los delitos económicos y ...","snippet": "Vertido de petróleo en el Golfo de México.  ...  ¿Qué pasaría si el derrame de petróleo de una multinacional con consecuencias a largo plazo en  ...  ¿O si se pudiera reclamar internacionalmente la responsabilidad de entidades  ...","ranking": 30,"size": 3.225806452,"rscore": 78.06098,"reputation": 0,"repu_normalizada": 0,"date": "03-10-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.eldiario.es/internacional/delitos-economicos-ambientales-considerarse-humanidad_0_435707283.html"}, 
{ "id": "4129","repu": 28,"re_nor": 3,"fecha": 30,"url": "http://www.univision.com/noticias/noticias-de-eeuu/se-cumplen-25-anos-del-derrame-del-exxon-valdez","name": "Se cumplen 25 años del derrame del Exxon Valdez ...","snippet": "25 años más tarde el petróleo derramado por el Exxon Valdez sigue  ...  un pozo de la compañía británica BP en el Golfo de México en 2010.","ranking": 44,"size": 2.222222222,"rscore": 19.81472,"reputation": 0,"repu_normalizada": 0,"date": "23-03-2010","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.univision.com/noticias/noticias-de-eeuu/se-cumplen-25-anos-del-derrame-del-exxon-valdez.html"}, 
{ "id": "4130","repu": 29,"re_nor": 3,"fecha": 72,"url": "http://es.euronews.com/tag/bp/","name": "BP | euronews","snippet": "La petrolera británica BP sigue reduciendo sus capacidades para afrontar un periodo  ...  BP pagará 18.700 millones de dólares por el vertido en el Golfo de México  ....  Las consecuencias del vertido de petróleo en el Golfo de México todavía???  ...  la responsabilidad de BP","ranking": 41,"size": 2.380952381,"rscore": 59.09,"reputation": 0,"repu_normalizada": 0,"date": "07-11-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/es.euronews.com/tag/bp/index.html"}, 
{ "id": "4131","repu": 30,"re_nor": 3,"fecha": 66,"url": "http://www.latercera.com/noticia/negocios/2015/07/655-637028-9-bp-pagara-18700-millones-de-dolares-por-vertido-en-golfo-de-mexico.shtml","name": "BP acuerda pagar 18.700 millones de dólares por vertido ...","snippet": "La petrolera británica BP anunció el jueves un acuerdo con la justicia  ...  4.900 millones para compensar la repercusión negativa sobre la economía de la  ...  dictaminó en su momento que el derrame de petróleo del Golfo de México en  ...  Suscripciones","ranking": 18,"size": 5.263157895,"rscore": 76.26222,"reputation": 0,"repu_normalizada": 0,"date": "01-07-2011","colour": 16,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.latercera.com/noticia/negocios/2015/07/655-637028-9-bp-pagara-18700-millones-de-dolares-por-vertido-en-golfo-de-mexico.html"}, 
{ "id": "4132","repu": 49,"re_nor": 5,"fecha": 51,"url": "http://www.guia.com.ve/actualidad/derrame","name": "Derrame de petróleo en Lago de Maracaibo - Guia.com.ve","snippet": "En momentos en que el derrame petrolero del Golfo de Mexico es noticia de  ...  del derrame se suma a una serie de desatinos en la politica petrolera, que  ...","ranking": 89,"size": 1.111111111,"rscore": 84.115234,"reputation": 1,"repu_normalizada": 0,"date": "06-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.guia.com.ve/actualidad/derrame.html"}, 
{ "id": "4133","repu": 31,"re_nor": 4,"fecha": 33,"url": "http://www.cnnexpansion.com/economia/2010/04/30/derrame-petrolero-impacto-economico","name": "Derrame petrolero, impacto económico - CNN Expansión","snippet": "Martes, 10 de noviembre de 2015 16:00:19 | México DF  ...  Limpiar el derrame de petróleo que se extiende por el Golfo de México costaría hasta 3,000 mdd","ranking": 15,"size": 6.25,"rscore": 16.80987,"reputation": 0,"repu_normalizada": 0,"date": "30-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.cnnexpansion.com/economia/2010/04/30/derrame-petrolero-impacto-economico.html"}, 
{ "id": "4134","repu": 32,"re_nor": 4,"fecha": 24,"url": "http://entrerayas.com/2012/03/contaminacion-ambiental-de-la-industria-petrolera/","name": "Contaminación ambiental de la industria petrolera - Entre ...","snippet": "Uno de los últimos grandes desastres de la industria petrolera fue el derrame de crudo en el Golfo de México siendo el peor en la historia de  ...","ranking": 32,"size": 3.03030303,"rscore": 86.19946,"reputation": 0,"repu_normalizada": 0,"date": "05-03-2008","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/entrerayas.com/2012/03/contaminacion-ambiental-de-la-industria-petrolera/index.html"}, 
{ "id": "4135","repu": 33,"re_nor": 4,"fecha": 45,"url": "http://www.azulambientalistas.org/posicion-de-las-ongs.html","name": "Posición de las ONG's ante las manchas de petróleo en el ...","snippet": "Hay pruebas de un derrame de petróleo en nuestro Lago de Maracaibo.  ...  de Hidrocarburos) la actividad petrolera y el petróleo mismo es responsabilidad del Estado  ...  En la reciente tragedia ocurrida en el Golfo de México al menos la empresa BP  ...  costeros también sufren las consecuencias de esta situación ambiental.","ranking": 20,"size": 4.761904762,"rscore": 81.14664,"reputation": 0,"repu_normalizada": 0,"date": "14-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.azulambientalistas.org/posicion-de-las-ongs.html"}, 
{ "id": "4136","repu": 34,"re_nor": 4,"fecha": 78,"url": "http://suite101.net/article/consecuencias-del-vertido-en-el-golfo-de-mexico-a19005","name": "Consecuencias del vertido en el Golfo de México | Suite101","snippet": "Esta cantidad de petroleo vertido supone prácticamente el doble de lo que había  ...  El Golfo de México es un frágil ecosistema, pero clave para la reproducción para  ...  Su responsabilidad en este accidente, le hace acreedora de millones de  ...","ranking": 36,"size": 2.702702703,"rscore": 88.67837,"reputation": 0,"repu_normalizada": 0,"date": "03-07-2013","colour": 40,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/suite101.net/article/consecuencias-del-vertido-en-el-golfo-de-mexico-a19005.html"}, 
{ "id": "4137","repu": 35,"re_nor": 4,"fecha": 13,"url": "http://www.diarioelpeso.com/anteriores/2010/22062010/US_220610_DiscursoObama.php","name": "Dramático discurso sobre derrame de petróleo de BP","snippet": "Y esta noche, he regresado de una visita al Golfo de México para hablar  ...  Ya ahora, este derrame de petróleo es el peor desastre ambiental que  ....  que las corporaciones jueguen bajo por sus propias normas y políticas.","ranking": 37,"size": 2.631578947,"rscore": 89.49271,"reputation": 0,"repu_normalizada": 0,"date": "21-06-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.diarioelpeso.com/anteriores/2010/22062010/US_220610_DiscursoObama.html"}, 
{ "id": "4138","repu": 36,"re_nor": 4,"fecha": 98,"url": "http://blogs.gestion.pe/cafetaipa/2015/09/crisis-de-volkswagen-cuatro-consideraciones-tras-el-caso-fraude-diesel-reputacion.html","name": "La crisis de Volkswagen, cuatro consideraciones tras el ...","snippet": "...  de los últimos años: el derrame de petróleo en el golfo de México de parte  ...  determinan el negocio, y ya sabemos que la responsabilidad social es muy  ...  a su historia de desarrollo industrial, los efectos son amplísimos.","ranking": 38,"size": 2.564102564,"rscore": 91.815384,"reputation": 0,"repu_normalizada": 0,"date": "24-09-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/blogs.gestion.pe/cafetaipa/2015/09/crisis-de-volkswagen-cuatro-consideraciones-tras-el-caso-fraude-diesel-reputacion.html"}, 
{ "id": "4139","repu": 65,"re_nor": 7,"fecha": 81,"url": "http://www.efeverde.com/noticias/ecuador-cree-que-chevron-intenta-eludir-su-responsabilidad-por-el-dano-a-la-amazonia/","name": "Ecuador cree que Chevron intenta eludir su ... - EFEverde","snippet": "Ecuador cree que Chevron intenta eludir su responsabilidad por el daño a la Amazonía.  ...  La OMM advierte de las ???consecuencias aterradoras??? del cambio climático  ...  demandas internacionales de la petrolera estadounidense Chevron  ...  mayor en un 85 % que el derrame de crudo en el Golfo de México.","ranking": 97,"size": 1.020408163,"rscore": 19.12265,"reputation": 3,"repu_normalizada": 0,"date": "18-10-2013","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.efeverde.com/noticias/ecuador-cree-que-chevron-intenta-eludir-su-responsabilidad-por-el-dano-a-la-amazonia/index.html"}, 
{ "id": "4140","repu": 37,"re_nor": 4,"fecha": 18,"url": "http://www.batanga.com/curiosidades/2010/09/21/controlan-derrame-de-petroleo-en-el-golfo-de-mexico","name": "Controlan derrame de petróleo en el Golfo de México ...","snippet": "El 20 de abril de este año tuvimos la triste noticia de que la plataforma petrolera Deepwater Horizon había estallado llevándose la vida de 11 ...","ranking": 21,"size": 4.545454545,"rscore": 84.2489,"reputation": 0,"repu_normalizada": 0,"date": "20-09-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.batanga.com/curiosidades/2010/09/21/controlan-derrame-de-petroleo-en-el-golfo-de-mexico.html"}, 
{ "id": "4141","repu": 38,"re_nor": 4,"fecha": 74,"url": "http://diarioresponsable.com/opinion/16097-rse-catastrofe-deepwater-horizonirresponsabilidad","name": "La catástrofe de la plataforma Deepwater Horizon: el coste ...","snippet": "Curso de experto en responsabilidad social  ....  El vertido de crudo en el Golfo de México provocado por la  ...  Los trabajadores de la plataforma petrolera habían expresado su preocupación sobre el estándar de seguridad en la planta.  ...  presentado la demanda judicial por los graves efectos del vertido.","ranking": 14,"size": 6.666666667,"rscore": 81.82825,"reputation": 0,"repu_normalizada": 0,"date": "27-11-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/diarioresponsable.com/opinion/16097-rse-catastrofe-deepwater-horizonirresponsabilidad.html"}, 
{ "id": "4142","repu": 39,"re_nor": 4,"fecha": 3,"url": "https://es.answers.yahoo.com/question/index?qid=20080626175517AANlMGW","name": "¿Alguien me puede decir consecuencias del derrame de petroleo ...","snippet": "quiero que me digan consecuencias del derrame de petroleo.  ...  consecuencias para el país del derrame de petróleo en el Golfo de México .","ranking": 23,"size": 4.166666667,"rscore": 87.97338,"reputation": 0,"repu_normalizada": 0,"date": "30-04-2004","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/es.answers.yahoo.com/question/index1d1d.html"}, 
{ "id": "4143","repu": 40,"re_nor": 4,"fecha": 43,"url": "http://www.lanacion.com.ar/1269447-obama-asumio-la-responsabilidad-por-el-derrame-de-petroleo-en-el-golfo-de-mexico","name": "Obama asumió la responsabilidad por el derrame de ...","snippet": "Obama asumió la responsabilidad por el derrame de petróleo en el Golfo de México  ...  el Golfo de México aunque también asumió la responsabilidad para  ...  responsabilidad de sus autores y las consecuencias derivadas de  ...","ranking": 11,"size": 8.333333333,"rscore": 80.10577,"reputation": 0,"repu_normalizada": 0,"date": "28-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.lanacion.com.ar/1269447-obama-asumio-la-responsabilidad-por-el-derrame-de-petroleo-en-el-golfo-de-mexico.html"}, 
{ "id": "4144","repu": 41,"re_nor": 5,"fecha": 20,"url": "http://www.dw.com/es/derrame-petrolero-en-el-mar-del-norte-el-m%C3%A1s-grave-de-la-d%C3%A9cada/a-15318901","name": "Derrame petrolero en el Mar del Norte - Deutsche Welle","snippet": "La petrolera neerlandesa Royal Dutch Shell informó que el derrame de  ...  Los ecologistas critican la política informativa de la petrolera neerlandesa.  ...  en el Golfo de México en 2010 ???cuando un accidente en la plataforma  ...","ranking": 24,"size": 4,"rscore": 90.1546,"reputation": 0,"repu_normalizada": 0,"date": "15-08-2007","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.dw.com/es/derrame-petrolero-en-el-mar-del-norte-el-m%C3%A1s-grave-de-la-d%C3%A9cada/a-15318901.html"}, 
{ "id": "4145","repu": 42,"re_nor": 5,"fecha": 76,"url": "http://ar.selecciones.com/contenido/a1044_el-derrame-de-petroleo-en-el-golfo-de-mexico","name": "El derrame de petroleo en el Golfo de Mexico - Selecciones","snippet": "El derrame de petroleo en el Golfo de Mexico se hace casi incontenible.  ...  son de exclusiva responsabilidad de sus autores y las consecuencias derivadas de  ...","ranking": 22,"size": 4.347826087,"rscore": 19.4415,"reputation": 0,"repu_normalizada": 0,"date": "03-05-2013","colour": 38,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/ar.selecciones.com/contenido/a1044_el-derrame-de-petroleo-en-el-golfo-de-mexico.html"}, 
{ "id": "4146","repu": 43,"re_nor": 5,"fecha": 52,"url": "http://consciencia-global.blogspot.com/2010/07/desastre-ambiental-en-el-golfo-de.html","name": "Desastre Ambiental en el Golfo de México - Generando ...","snippet": "El derrame de crudo de la petrolera BP se encuentra HOY arrojando  ...  El resultado: Incompetencias varias, Responsabilidades y un Apagón Mediático.  ....  consecuencias que puede afectar la zona del Golfo de México y su  ...","ranking": 25,"size": 3.846153846,"rscore": 91.65168,"reputation": 0,"repu_normalizada": 0,"date": "07-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/consciencia-global.blogspot.cl/2010/07/desastre-ambiental-en-el-golfo-de.html"}, 
{ "id": "4147","repu": 50,"re_nor": 5,"fecha": 94,"url": "http://www.elnuevoherald.com/noticias/estados-unidos/article19093707.html","name": "Golfo de México todavía sufre secuelas de recuperación lenta","snippet": "Cinco años después del peor desastre ecológico de la historia de la nación, el petróleo ha abandonado el Golfo de México pero sus costas ...","ranking": 78,"size": 1.265822785,"rscore": 79.56727,"reputation": 1,"repu_normalizada": 0,"date": "20-04-2015","colour": 61,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.elnuevoherald.com/noticias/estados-unidos/article19093707.html"}, 
{ "id": "4148","repu": 51,"re_nor": 6,"fecha": 61,"url": "http://www.intagnewspaper.org/articles/amazonia-triunfa-ante-chevron-texaco","name": "Amazonía triunfa ante Chevron-Texaco | Periodico Intag","snippet": "La petrolera Texaco-Chevron tiene que pagar 9,5 mil millones de dólares  ...  las comunidades que sufren las consecuencias de la extracción de recursos naturales.  ...  mucho los daños causados por el derrame en el Golfo de México producido  ...  evadir su responsabilidad al cambiar el nombre a Chevron y al no reconocer  ...","ranking": 84,"size": 1.176470588,"rscore": 85.24436,"reputation": 1,"repu_normalizada": 0,"date": "03-03-2011","colour": 12,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.intagnewspaper.org/articles/amazonia-triunfa-ante-chevron-texaco.html"}, 
{ "id": "4149","repu": 52,"re_nor": 6,"fecha": 96,"url": "http://www.pipartnergroup.com/las-12-empresas-mas-contaminantes-del-mundo/939/","name": "Las 12 empresas más contaminantes del mundo ... - PiPartner","snippet": "Responsabilidad Social »Responsabilidad Social »  ...  El mayor productor de petróleo y gas de Asia, Petro China, ha invertido grandes sumas de  ...  en la plataforma petrolífera semisumergible Deepwater Horizon en el Golfo de México. Tuvo graves consecuencias ecológicas en ocho parques nacionales  ...","ranking": 81,"size": 1.219512195,"rscore": 74.73294,"reputation": 1,"repu_normalizada": 0,"date": "17-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.pipartnergroup.com/las-12-empresas-mas-contaminantes-del-mundo/939/index.html"}, 
{ "id": "4150","repu": 44,"re_nor": 5,"fecha": 14,"url": "http://elregresa.blogspot.com/2010/06/marea-negra-derrame-de-petroleo-en-el.html","name": "Marea negra ,derrame de petróleo en el Golfo de México.","snippet": "Marea negra ,derrame de petróleo en el Golfo de México.  ...  acerca de lo que ocurre en esta zona y las repercusiones que esto podría traer a  ....  Michael E. Webber mientras que el investigador visitante sobre política nuclear  ...","ranking": 26,"size": 3.703703704,"rscore": 97.846054,"reputation": 0,"repu_normalizada": 0,"date": "28-06-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/elregresa.blogspot.cl/2010/06/marea-negra-derrame-de-petroleo-en-el.html"}, 
{ "id": "4151","repu": 45,"re_nor": 5,"fecha": 8,"url": "http://www.pucp.edu.pe/climadecambios/index.php?tmpl=articulo&id=868","name": "El derrame de petróleo en el Golfo de México :: PUCP ...","snippet": "La mancha de petróleo que se originó en el golfo de México por la explosión y hundimiento de una plataforma de Bristish Petroleum (BP) ...","ranking": 6,"size": 14.28571429,"rscore": 86.94012,"reputation": 0,"repu_normalizada": 0,"date": "02-05-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.pucp.edu.pe/climadecambios/index7606.html"}, 
{ "id": "4152","repu": 53,"re_nor": 6,"fecha": 69,"url": "http://www.alterinfos.org/spip.php?article5568","name": "ESTADOS UNIDOS - Explotación petrolera en Alaska pone ...","snippet": "La empresa Shell derramo 6.800 barriles de petróleo en el Delta del Níger  ...  de consecuencias aun mayores que el del Golfo de México.  ...  y comentarios son de exclusiva responsabilidad de sus autor@s y no reflejan,  ...","ranking": 80,"size": 1.234567901,"rscore": 18.32051,"reputation": 1,"repu_normalizada": 0,"date": "14-05-2012","colour": 26,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.alterinfos.org/spip0e62.html"}, 
{ "id": "4153","repu": 46,"re_nor": 5,"fecha": 28,"url": "http://suite101.net/article/efectos-y-consecuencias-del-derrame-de-oro-negro-en-el-golfo-a21879","name": "Consecuencias y efectos del derrame de petróleo en el golfo","snippet": "El derrame de petróleo en el golfo de México, trajo desolación y muerte y todo indica que seguirá impactando a la economía, la política y otros ejes importantes  ...","ranking": 2,"size": 33.33333333,"rscore": 89.77569,"reputation": 0,"repu_normalizada": 0,"date": "02-07-2009","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/suite101.net/article/efectos-y-consecuencias-del-derrame-de-oro-negro-en-el-golfo-a21879.html"}, 
{ "id": "4154","repu": 47,"re_nor": 5,"fecha": 100,"url": "https://es.wikipedia.org/wiki/BP","name": "BP - Wikipedia, la enciclopedia libre","snippet": "4.3.1 Consecuencias ecológicas","ranking": 4,"size": 20,"rscore": 93.91259,"reputation": 0,"repu_normalizada": 0,"date": "24-11-2015","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/es.wikipedia.org/wiki/BP.html"}, 
{ "id": "4155","repu": 60,"re_nor": 6,"fecha": 46,"url": "http://www.elblogalternativo.com/2010/06/14/video-que-parodia-el-derrame-de-petroleo-de-bp-en-el-golfo-de-mexico-y-video-de-la-cruda-realidad/","name": "Vídeo que parodia el derrame de petróleo de BP en el Golfo ...","snippet": "Vídeo que parodia el derrame de petróleo de BP en el Golfo de México y vídeo de  ...  mundobocabajo: ¿está la política tradicional crucificada?","ranking": 91,"size": 1.086956522,"rscore": 88.87182,"reputation": 2,"repu_normalizada": 0,"date": "14-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.elblogalternativo.com/2010/06/14/video-que-parodia-el-derrame-de-petroleo-de-bp-en-el-golfo-de-mexico-y-video-de-la-cruda-realidad/index.html"}, 
{ "id": "4156","repu": 66,"re_nor": 7,"fecha": 59,"url": "http://prensarural.org/spip/spip.php?article5159","name": "Agricultores colombianos demandan a la Brtitish Petroleum ...","snippet": "...  ya que se ocupa de las consecuencias del nuevo informe en el derrame de petróleo en aguas profundas en el Golfo de México y el cierre  ...  'En lugar de aceptar responsabilidad por sus acciones, BP, de la misma manera  ...","ranking": 96,"size": 1.030927835,"rscore": 81.88032,"reputation": 3,"repu_normalizada": 0,"date": "12-01-2011","colour": 10,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/prensarural.org/spip/spip0341.html"}, 
{ "id": "4157","repu": 67,"re_nor": 7,"fecha": 2,"url": "http://ecolo.org/documents/documents_in_spanish/ventajasEnergiaNuclear.htm","name": "Las ventajas de la energia nuclear","snippet": "'Unos de los problemas mas importantes de la lluvia ácida es de tipo político'  ...  El bien conocido derrame de petróleo de 40000 tn en las costas de Alaska en  ...  ha sido posible obturarlo derrama 700000 ton de petróleo en el golfo de México  ...","ranking": 94,"size": 1.052631579,"rscore": 83.97758,"reputation": 3,"repu_normalizada": 0,"date": "12-05-2003","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/ecolo.org/documents/documents_in_spanish/ventajasEnergiaNuclear.html"}, 
{ "id": "4158","repu": 54,"re_nor": 6,"fecha": 23,"url": "http://www.escolares.net/historia-universal/guerra-del-golfo-persico/","name": "Consecuencias de la Guerra del Golfo Pérsico - Tareas ...","snippet": "Es una estrategia que quedó como consecuencia de la guerra del Golfo. Es una estrategia diseñada para contener ...","ranking": 42,"size": 2.325581395,"rscore": 84.18423,"reputation": 1,"repu_normalizada": 0,"date": "19-10-2007","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.escolares.net/historia-universal/guerra-del-golfo-persico/index.html"}, 
{ "id": "4159","repu": 55,"re_nor": 6,"fecha": 89,"url": "http://noticias.masverdedigital.com/4-anos-despues-del-derrame-en-el-golfo-de-mexico-continuan-las-consecuencias-para-la-fauna/","name": "4 años después del derrame en el Golfo de México ...","snippet": "...  especies afectadas por el vertido y de consecuencias todavía muy palpables,  ...  ???Una cantidad inconcreta de petróleo sigue en el fondo del Golfo???, dice por  ...  pero no son la única especie con dificultades en el Golfo de México.  ...  Peter Colin (41), quienes admitieron su responsabilidad en la pesca ilícita  ...","ranking": 28,"size": 3.448275862,"rscore": 77.27327,"reputation": 1,"repu_normalizada": 0,"date": "28-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/noticias.masverdedigital.com/4-anos-despues-del-derrame-en-el-golfo-de-mexico-continuan-las-consecuencias-para-la-fauna/index.html"}, 
{ "id": "4160","repu": 56,"re_nor": 6,"fecha": 25,"url": "http://www.unlugarecologico.com/2012/05/antes-y-despues-del-derrame-de-petroleo.html","name": "Consecuencias de un derrame de petróleo - Un lugar ...","snippet": "Derrame de petróleo en el Golfo de México  ...  El impacto del derrame, que intervino los ciclos normales de la vida acuática, pudo determinarse  ...","ranking": 29,"size": 3.333333333,"rscore": 82.54323,"reputation": 1,"repu_normalizada": 0,"date": "22-05-2008","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.unlugarecologico.com/2012/05/antes-y-despues-del-derrame-de-petroleo.html"}, 
{ "id": "4161","repu": 68,"re_nor": 7,"fecha": 68,"url": "http://www.ee-iese.com/125/enportada.php","name": "REVISTA IESE.","snippet": "Esté en Japón, Estados Unidos, China o México, un líder global siempre se  ...  propia, la responsabilidad y las consecuencias de sus fracasos corporativos.  ...  responsabilidades tras la catástrofe del vertido de petróleo en el Golfo de México.","ranking": 85,"size": 1.162790698,"rscore": 81.262085,"reputation": 3,"repu_normalizada": 0,"date": "01-02-2012","colour": 23,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.ee-iese.com/125/enportada.html"}, 
{ "id": "4162","repu": 57,"re_nor": 6,"fecha": 70,"url": "http://www.belt.es/expertos/HOME2_experto.asp?id=6324","name": "Marea negra en el golfo de México - Belt Ibérica SA","snippet": "Millones de litros de petróleo se derramaron al golfo de México tras la  ...  También apuntaron otras causas, como el empleo de técnicas de dudosa  ...  subidas en las pólizas de Responsabilidad Civil para esta industria.","ranking": 17,"size": 5.555555556,"rscore": 14.310974,"reputation": 1,"repu_normalizada": 0,"date": "01-08-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.belt.es/expertos/HOME2_expertob2b5.html"}, 
{ "id": "4163","repu": 88,"re_nor": 9,"fecha": 88,"url": "http://beforeitsnews.com/politics/2014/04/que-queda-del-golfo-de-mexico-2615626.html","name": "¿Qué queda del Golfo de México ? | Politics - Before It's News","snippet": "No es difícil imaginar cómo el ecosistema del Golfo de México pasó de ser  ...  que los efectos del derrame de petróleo en gran medida se han abordado,  .....  BP no sólo se libro fácilmente de cualquier responsabilidad por su  ...","ranking": 99,"size": 1,"rscore": 88.894745,"reputation": 13,"repu_normalizada": 1,"date": "21-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/beforeitsnews.com/politics/2014/04/que-queda-del-golfo-de-mexico-2615626.html"}, 
{ "id": "4164","repu": 58,"re_nor": 6,"fecha": 17,"url": "http://www.astm.org/SNEWS/SPANISH/SPJA10/bassett_spja10.html","name": "Normas para la limpieza del derrame de petróleo y la ...","snippet": "El derrame de petróleo de la torre Deepwater Horizon en el Golfo de México no  ...  F20 no necesariamente previeron la agitación política, los desafíos técnicos  ...","ranking": 13,"size": 7.142857143,"rscore": 88.09146,"reputation": 1,"repu_normalizada": 0,"date": "06-08-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.astm.org/SNEWS/SPANISH/SPJA10/bassett_spja10.html"}, 
{ "id": "4165","repu": 75,"re_nor": 8,"fecha": 75,"url": "http://noticias-ambientales-internacionales.blogspot.com/2013/02/donde-quedo-el-petroleo-del-derrame-de.html","name": "Dónde quedó el petróleo del derrame de BP?","snippet": "Casi la mitad del petróleo crudo no salió a la superficie, sino que se  ...  Etiquetas: Caso Derrame de Petróleo de BP en el Golfo de México,  ...","ranking": 87,"size": 1.136363636,"rscore": 61.53032,"reputation": 5,"repu_normalizada": 0,"date": "28-02-2013","colour": 35,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/noticias-ambientales-internacionales.blogspot.cl/2013/02/donde-quedo-el-petroleo-del-derrame-de.html"}, 
{ "id": "4166","repu": 59,"re_nor": 6,"fecha": 87,"url": "http://www.ambientum.com/boletino/noticias/El-Golfo-de-Mexico-4-a%C3%B1os-despues-del-derrame-de-BP.asp","name": "El Golfo de México 4 años después del derrame de BP ...","snippet": "Catorce especies estudiadas cuatro años después del derrame de petróleo de BP en el Golfo de México siguen sufriendo los efectos de la ...","ranking": 10,"size": 9.090909091,"rscore": 93.15878,"reputation": 1,"repu_normalizada": 0,"date": "21-04-2014","colour": 49,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.ambientum.com/boletino/noticias/El-Golfo-de-Mexico-4-a%C3%B1os-despues-del-derrame-de-BP.html"}, 
{ "id": "4167","repu": 72,"re_nor": 8,"fecha": 80,"url": "http://www.excelsior.com.mx/global/2013/07/25/910654","name": "Empresa destruyó pruebas del derrame en el Golfo de México","snippet": "Halliburton era el contratista cementero de BP en la plataforma petrolera marina que explotó en el Golfo de México en 2010. Una fuga en el  ...","ranking": 82,"size": 1.204819277,"rscore": 79.571594,"reputation": 4,"repu_normalizada": 0,"date": "25-07-2013","colour": 40,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.excelsior.com.mx/global/2013/07/25/910654.html"}, 
{ "id": "4168","repu": 69,"re_nor": 7,"fecha": 22,"url": "http://www2.inecc.gob.mx/publicaciones/libros/118/cap9.html","name": "Capitulo nueve. Reconsiderando: La política ambiental ...","snippet": "El desarrollo de la política ambiental mexicana ha seguido un patrón definido.  ...  podían ser excedidos sin repercusiones perjudiciales, y prometía atacar sin dilación el  ....  Cuando los precios del petróleo cayeron en 1980, la economía  ....  (aunque después del derrame del pozo Ixtoc, en el Golfo de México,  ...","ranking": 59,"size": 1.666666667,"rscore": 82.40762,"reputation": 3,"repu_normalizada": 0,"date": "27-08-2007","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www2.inecc.gob.mx/publicaciones/libros/118/cap9.html"}, 
{ "id": "4169","repu": 61,"re_nor": 7,"fecha": 15,"url": "http://www.vidaysalud.com/diario/vida-saludable/que-efectos-tiene-en-tu-salud-el-derrame-de-petroleo-del-golfo-de-mexico/","name": "¿Qué efectos tiene en tu salud el derrame de petróleo del ...","snippet": "Política de Privacidad  ...  No sólo si vives en México o en estados como Alabama, Luisiana, Mississippi y Florida.  ...  Mucha gente está preocupada por los efectos del derrame de petróleo en el Golfo de México, y es que en  ...","ranking": 39,"size": 2.5,"rscore": 89.84877,"reputation": 2,"repu_normalizada": 0,"date": "02-07-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.vidaysalud.com/diario/vida-saludable/que-efectos-tiene-en-tu-salud-el-derrame-de-petroleo-del-golfo-de-mexico/index.html"}, 
{ "id": "4170","repu": 62,"re_nor": 7,"fecha": 64,"url": "http://huespedes.cica.es/gimadus/23/08_sostenibilidad_ecologica_y_comercio.html","name": "sostenibilidad ecológica y comercio internacional","snippet": "El 22 de abril del 2010 se hundió en el Golfo de México la Plataforma Petrolífera  ...  ha causado con el derrame de petróleo provocado a raíz de la explosión y  ....  Esto, quizás, gracias a los grandes intereses económicos y políticos que han  ...","ranking": 35,"size": 2.777777778,"rscore": 1.83804,"reputation": 2,"repu_normalizada": 0,"date": "15-05-2011","colour": 14,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/huespedes.cica.es/gimadus/23/08_sostenibilidad_ecologica_y_comercio.html"}, 
{ "id": "4171","repu": 76,"re_nor": 8,"fecha": 38,"url": "http://www.democracynow.org/es/blog/2010/5/5/british_petroleum_contaminador_multimillonario","name": "British Petroleum: contaminador multimillonario ...","snippet": "La analista de la industria petrolera Antonia Juhasz advirtió: ???BP es una de  ...  sobre el derrame de petróleo en el Golfo de México: ???BP es responsable de  ...  ???La industria hace todo lo que puede para limitar su responsabilidad, BP va a  ...  y la Costa del Golfo, educando a las personas acerca de los efectos  ...","ranking": 88,"size": 1.123595506,"rscore": 17.63003,"reputation": 5,"repu_normalizada": 0,"date": "05-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.democracynow.org/es/2010/5/5/british_petroleum_contaminador_multimillonario.html"}, 
{ "id": "4172","repu": 70,"re_nor": 7,"fecha": 57,"url": "http://www.conacyt.mx/index.php/comunicacion/comunicados-prensa/398-conacyt-evaluara-impacto-de-posibles-derrames-de-hidrocarburos-en-el-golfo-de-mexico","name": "conacyt evaluará impacto de posibles derrames de ...","snippet": "...  modelos de simulación y escenarios de la capacidad natural de respuesta ante derrames de petróleo a gran escala en el Golfo de México.","ranking": 49,"size": 2,"rscore": 83.64447,"reputation": 3,"repu_normalizada": 0,"date": "10-11-2010","colour": 8,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.conacyt.mx/index.php/comunicacion/comunicados-prensa/398-conacyt-evaluara-impacto-de-posibles-derrames-de-hidrocarburos-en-el-golfo-de-mexico.html"}, 
{ "id": "4173","repu": 84,"re_nor": 9,"fecha": 82,"url": "http://www.lamarea.com/2013/11/02/chevron/","name": "Ecuador pide apoyo en su litigio con Chevron | lamarea.com","snippet": "El país mantiene un pulso judicial con la petrolera estadounidense por  ...  consecuencias de los vertidos tóxicos de Texaco, ahora Chevron.  ...  equivalen a 85 veces el desastre de la BP en el Golfo de México. Entre los argumentos que la petrolera utiliza para desentenderse de la responsabilidad legal se  ...","ranking": 95,"size": 1.041666667,"rscore": 81.43361,"reputation": 9,"repu_normalizada": 0,"date": "02-11-2013","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.lamarea.com/2013/11/02/chevron/index.html"}, 
{ "id": "4174","repu": 63,"re_nor": 7,"fecha": 6,"url": "http://pijamasurf.com/2010/04/derrame-de-petroleo-en-el-golfo-de-mexico-uno-de-los-mas-grandes-ecocidios-de-la-historia/","name": "Derrame de petróleo en el Golfo de México - Pijamasurf","snippet": "Derrame de petróleo en el Golfo de México: uno de los más grandes ecocidios  ...  como debiera por absurdos intereses económicos/políticos.","ranking": 5,"size": 16.66666667,"rscore": 87.064804,"reputation": 2,"repu_normalizada": 0,"date": "29-04-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/pijamasurf.com/2010/04/derrame-de-petroleo-en-el-golfo-de-mexico-uno-de-los-mas-grandes-ecocidios-de-la-historia/index.html"}, 
{ "id": "4175","repu": 71,"re_nor": 8,"fecha": 1,"url": "http://www.monografias.com/trabajos15/derrames-petroleros/derrames-petroleros.shtml","name": "Derrames petroleros en el agua - Monografias.com","snippet": "Etapas básicas para combatir derrames de petróleo en agua.  ...  la producida por el pozo petrolífero Ixtoc I en el golfo de México en 1979 (3,3 millones de barriles).  .....  Consecuente, con la política de la Dirección General del Territorio Marítimo  ...","ranking": 34,"size": 2.857142857,"rscore": 84.89511,"reputation": 3,"repu_normalizada": 0,"date": "08-04-2000","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.monografias.com/trabajos15/derrames-petroleros/derrames-petroleros.html"}, 
{ "id": "4176","repu": 77,"re_nor": 8,"fecha": 65,"url": "http://www.comunidadism.es/blogs/los-danos-al-medio-ambiente-en-2008-representan-un-valor-monetario-de-66-trillones-de-dolares","name": "Los daños al medio ambiente en 2008 representan un valor ...","snippet": "Las consecuencias del cambio climático, la escasez de agua, la contaminación del aire, la pérdida de  ...  Vertido de petróleo de BP en el Golfo de México.  ...  Guía de la Ley 26/07 de Responsabilidad Medioambiental.","ranking": 68,"size": 1.449275362,"rscore": 82.9294,"reputation": 5,"repu_normalizada": 0,"date": "03-06-2011","colour": 15,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.comunidadism.es/blogs/los-danos-al-medio-ambiente-en-2008-representan-un-valor-monetario-de-66-trillones-de-dolares.html"}, 
{ "id": "4177","repu": 78,"re_nor": 8,"fecha": 79,"url": "http://www.xatakaciencia.com/medio-ambiente/8-gigantescas-catastrofes-medioambientales-propiciadas-por-el-ser-humano","name": "8 gigantescas catástrofes medioambientales propiciadas ...","snippet": "...  perforación de BP explotó, vertiendo petróleo en el Golfo de México  ...  grandes procesos' de la responsabilidad medioambiental en Japón.","ranking": 58,"size": 1.694915254,"rscore": 79.35464,"reputation": 6,"repu_normalizada": 0,"date": "06-07-2013","colour": 40,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.xatakaciencia.com/medio-ambiente/8-gigantescas-catastrofes-medioambientales-propiciadas-por-el-ser-humano.html"}, 
{ "id": "4178","repu": 73,"re_nor": 8,"fecha": 5,"url": "http://www.madrimasd.org/blogs/ciencia_marina/2010/04/29/131462","name": "Accidente Plataforma Petrolífera Golfo de México - Madri+d","snippet": "Una vez más, un desastre ecológico en el golfo de México.  ...  ???Anualmente más de 3 millones y medio de toneladas de petróleo (casi el 0,1%  ...  en Buenos Aires, haciendo politica, y el Riachuelo siga igual o mas contaminado cada día.  ....  ocasionados a raíz del derrame petrolero ocurrido en una de sus  ...","ranking": 16,"size": 5.882352941,"rscore": 78.4355,"reputation": 4,"repu_normalizada": 0,"date": "28-04-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.madrimasd.org/blogs/ciencia_marina/2010/04/29/131462.html"}, 
{ "id": "4179","repu": 85,"re_nor": 9,"fecha": 27,"url": "http://www.petroleomagdalena.com/2009-05-18/argentina-a-diez-anos-del-derrame-de-petroleo-en-magdalena-frustacion-degradacion-y-traicion/","name": "Argentina: a diez años del derrame de petróleo en Magdalena","snippet": "El accidente es considerado el mayor derrame de petróleo ocurrido en  ...  y la Secretaría de Política Ambiental de la Provincia de Buenos Aires, y que  ....  ???La fiebre del petróleo que amenaza al Golfo de México y al planeta???,  ...","ranking": 86,"size": 1.149425287,"rscore": 16.656845,"reputation": 9,"repu_normalizada": 0,"date": "19-05-2009","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.petroleomagdalena.com/2009-05-18/argentina-a-diez-anos-del-derrame-de-petroleo-en-magdalena-frustacion-degradacion-y-traicion/index.html"}, 
{ "id": "4180","repu": 79,"re_nor": 8,"fecha": 48,"url": "http://eco13.net/2010/06/video-de-las-consecuencias-del-vertido-del-golfo-de-mexico/","name": "Vídeo de las consecuencias del vertido del Golfo de México ...","snippet": "Vídeo de las consecuencias del vertido del Golfo de México  ...  grupos de delfines huyendo de las grandes vetas de petróleo y una ballena  ...  ni vídeos a la ciudadania para que no les exigan demasiadas responsabilidades.","ranking": 53,"size": 1.851851852,"rscore": 88.97024,"reputation": 6,"repu_normalizada": 0,"date": "29-06-2010","colour": 3,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/eco13.net/2010/06/video-de-las-consecuencias-del-vertido-del-golfo-de-mexico/index.html"}, 
{ "id": "4181","repu": 74,"re_nor": 8,"fecha": 19,"url": "http://www.nationalgeographic.es/medio-ambiente/100915-gulf-oil-spill-bp-top-kill-science-environmen","name": "Por qué el vertido de petróleo del Golfo de México no ...","snippet": "Por qué el vertido de petróleo del Golfo de México no desaparece  ...  ecológico y las consecuencias finales del Derrame de crudo en el Golfo de México???en el  ...","ranking": 9,"size": 10,"rscore": 91.430595,"reputation": 4,"repu_normalizada": 0,"date": "23-03-2007","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.nationalgeographic.es/medio-ambiente/100915-gulf-oil-spill-bp-top-kill-science-environmen.html"}, 
{ "id": "4182","repu": 82,"re_nor": 9,"fecha": 71,"url": "http://www.mapfre.com/fundacion/html/revistas/gerencia/n112/es/estudio1.html","name": "Gerencia de Riesgos y Seguros - Nº 112 - Mapfre","snippet": "La responsabilidad medioambiental y las garantías financieras: el régimen portugués y  ...  Las consecuencias de los grandes siniestros ambientales, recientes y  ...  Así, cabe citar el derrame de petróleo del Exxon Valdez en Alaska, a finales de  ...  como el derrame de crudo de British Petroleum (BP) en el golfo de México en  ...","ranking": 43,"size": 2.272727273,"rscore": 78.045166,"reputation": 8,"repu_normalizada": 0,"date": "03-10-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.mapfre.com/fundacion/html/revistas/gerencia/n112/es/estudio1.html"}, 
{ "id": "4183","repu": 87,"re_nor": 9,"fecha": 84,"url": "http://www.ehowenespanol.com/limpiar-derrames-petroleo-agua-info_522189/","name": "¿Qué se usa para limpiar los derrames de petróleo en el ...","snippet": "Los derrames de petróleo fueron una gran preocupación en la década de 1990  ...  agua liberó 206 millones de galones de petróleo crudo en el Golfo de México.","ranking": 74,"size": 1.333333333,"rscore": 84.24597,"reputation": 11,"repu_normalizada": 1,"date": "28-01-2014","colour": 46,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.sinembargo.mx/29-02-2012/165749.html"}, 
{ "id": "4184","repu": 83,"re_nor": 9,"fecha": 11,"url": "http://www.ecoosfera.com/2010/06/consecuencias-del-derrame-de-petroleo-en-el-golfo-de-mexico-numeros-y-estadisticas/","name": "Consecuencias del derrame de petróleo en el Golfo de ...","snippet": "Consecuencias del derrame de petróleo en el Golfo de México: números y estadísticas. A pesar de  ...  5,000 barriles. Cantidad de petróleo vertida diariamente al mar del Golfo de México  ....  Fotografía principal: Red Política.","ranking": 0,"size": 100,"rscore": 75.5223,"reputation": 8,"repu_normalizada": 0,"date": "12-06-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.ecoosfera.com/2010/06/consecuencias-del-derrame-de-petroleo-en-el-golfo-de-mexico-numeros-y-estadisticas/index.html"}, 
{ "id": "4185","repu": 80,"re_nor": 8,"fecha": 49,"url": "http://portal.educ.ar/debates/eid/ciencia/cronica-de-un-desastre-anuncia.php","name": "Crónica de un desastre anunciado: derrame de petróleo en ...","snippet": "El desastre ambiental que está ocurriendo en el Golfo de México  ...  petrolera de la compañía British Petroleum (BP), explotó en el Golfo de  ...  impacto ambiental y sus consecuencias catastróficas para la fauna, la flora y la vida en general.  ...  Como habitantes de este planeta tenemos la responsabilidad de  ...","ranking": 8,"size": 11.11111111,"rscore": 88.88975,"reputation": 7,"repu_normalizada": 0,"date": "05-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/portal.educ.ar/debates/eid/ciencia/cronica-de-un-desastre-anuncia.html"}, 
{ "id": "4186","repu": 81,"re_nor": 9,"fecha": 16,"url": "http://portal.educ.ar/debates/eid/ciencia/cronica-de-un-desastre-anuncia.php","name": "Crónica de un desastre anunciado: derrame de petróleo en ...","snippet": "El desastre ambiental que está ocurriendo en el Golfo de México causado  ...  petrolera de la compañía British Petroleum (BP), explotó en el Golfo de  ...  vulnerabilidades y nuestra política exterior, creo que este desastre va a  ...","ranking": 1,"size": 50,"rscore": 88.88975,"reputation": 7,"repu_normalizada": 0,"date": "04-07-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/portal.educ.ar/debates/eid/ciencia/cronica-de-un-desastre-anuncia.html"}, 
{ "id": "4187","repu": 86,"re_nor": 9,"fecha": 12,"url": "http://www.cubadebate.cu/fotorreportajes/2010/06/21/desarrame-petroleo-golfo-mexico/","name": "Derrame de petróleo en el Golfo de México, 2 meses después","snippet": "Derrame de petróleo en el Golfo de México, 2 meses después. En este  .....  Colombia: Gobierno aprueba participación en política de FARC-EP.","ranking": 27,"size": 3.571428571,"rscore": 24.503716,"reputation": 10,"repu_normalizada": 1,"date": "20-06-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.cubadebate.cu/fotorreportajes/2010/06/21/desarrame-petroleo-golfo-mexico/index.html"}, 
{ "id": "4188","repu": 92,"re_nor": 10,"fecha": 4,"url": "http://news.bbc.co.uk/hi/spanish/business/newsid_4194000/4194092.stm","name": "BBC Mundo | Economía | Petróleo sube por Katrina","snippet": "El precio del petróleo volvió a subir como consecuencia del paso del  ...  La producción de crudo en el Golfo de México se ha reducido en  ...  El contenido de las páginas externas sugeridas no es responsabilidad de la BBC.","ranking": 64,"size": 1.538461538,"rscore": 86.06661,"reputation": 15,"repu_normalizada": 1,"date": "29-08-2005","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/news.bbc.co.uk/hi/spanish/business/newsid_4194000/4194092.html"}, 
{ "id": "4189","repu": 89,"re_nor": 9,"fecha": 31,"url": "http://beforeitsnews.com/politics/2014/04/que-queda-del-golfo-de-mexico-2615626.html","name": "¿Qué queda del Golfo de México ? | Politics - Before It's News","snippet": "Aunque en apariencia el Golfo de México todavía está allí, el cuarto aniversario del derrame de petróleo de British Petroleum (BP) revela una  ...","ranking": 46,"size": 2.127659574,"rscore": 88.894745,"reputation": 13,"repu_normalizada": 1,"date": "20-04-2010","colour": 1,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/beforeitsnews.com/politics/2014/04/que-queda-del-golfo-de-mexico-2615626.html"}, 
{ "id": "4190","repu": 90,"re_nor": 9,"fecha": 73,"url": "http://www.ecologiaverde.com/multa-historica-de-4-500-millones-de-dolares-para-la-petrolera-bp-por-el-desastre-del-golfo-de-mexico/","name": "Multa histórica de 4.500 millones de dólares para la ...","snippet": "Por suerte, la fuga de crudo padecida por el Golfo de México en abril  ...  por su responsabilidad en el desastre ambiental, la petrolera declaraba no  ...  si bien las consecuencias ecológicas del desastre siguen siendo de una  ...","ranking": 40,"size": 2.43902439,"rscore": 79.49672,"reputation": 14,"repu_normalizada": 1,"date": "16-11-2012","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/www.ecologiaverde.com/multa-historica-de-4-500-millones-de-dolares-para-la-petrolera-bp-por-el-desastre-del-golfo-de-mexico/index.html"}, 
{ "id": "4191","repu": 98,"re_nor": 10,"fecha": 77,"url": "http://cienciasycosas.com/2013/06/01/estados-unidos-camino-de-la-independencia-petrolera/","name": "Estados Unidos, camino de la independencia petrolera ...","snippet": "Estados Unidos está logrando reducir su dependencia del petróleo extranjero  ...  como fue un aumento en las obligaciones de eficiencia energética en  ....  de África para las refinerías que están en la costa del golfo de México???, añadió.  ...  de carbón en Europa tiene consecuencias ambientales negativas.","ranking": 90,"size": 1.098901099,"rscore": 82.72306,"reputation": 32,"repu_normalizada": 3,"date": "01-06-2013","colour": 39,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/cienciasycosas.com/2013/06/01/estados-unidos-camino-de-la-independencia-petrolera/index.html"}, 
{ "id": "4192","repu": 91,"re_nor": 10,"fecha": 92,"url": "http://mundo.sputniknews.com/trend/golfo_mexico/","name": "Fuga de crudo en el Golfo de México - Sputnik Mundo","snippet": "La petrolera BP pagará $4.500 millones por derrame de crudo en el golfo de  ...  en total, durante cinco años por el vertido de petróleo en el golfo de México,  ...","ranking": 19,"size": 5,"rscore": 91.716255,"reputation": 14,"repu_normalizada": 1,"date": "20-12-2014","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/mundo.sputniknews.com/trend/golfo_mexico/index.html"}, 
{ "id": "4193","repu": 97,"re_nor": 10,"fecha": 50,"url": "http://www.dogguie.net/terribles-imagenes-del-catastrofico-derrame-de-petroleo-en-el-golfo-de-mexico/","name": "Terribles imágenes del catastrófico derrame de petróleo en ...","snippet": "...  silvestre afectada por los derrames de petróleo en el Golfo de México.  ...  Ese es el sistema politico y economico que se esta hererando hace  ...","ranking": 70,"size": 1.408450704,"rscore": 87.421875,"reputation": 27,"repu_normalizada": 3,"date": "05-07-2010","colour": 4,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/www.dogguie.net/terribles-imagenes-del-catastrofico-derrame-de-petroleo-en-el-golfo-de-mexico/index.html"}, 
{ "id": "4194","repu": 95,"re_nor": 10,"fecha": 39,"url": "http://espiritualidadypolitica.blogspot.com/2010/05/atencion-al-derrame-de-petroleo-del.html","name": "Atención al derrame de petróleo del Golfo de México","snippet": "Atención al derrame de petróleo del Golfo de México  .....  a la empresa no sólo de responsabilidades, como dijimos el otro día, sino también  ...  que llevamos diciendo en este blog desde el principio, y las consecuencias ya las  ...","ranking": 31,"size": 3.125,"rscore": 85.03542,"reputation": 21,"repu_normalizada": 2,"date": "11-05-2010","colour": 2,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/espiritualidadypolitica.blogspot.cl/2010/05/atencion-al-derrame-de-petroleo-del.html"}, 
{ "id": "4195","repu": 93,"re_nor": 10,"fecha": 60,"url": "http://elblogverde.com/derrame-de-petroleo-en-golfo-de-mexico/","name": "(Recordamos) Derrame de petróleo en el Golfo de México ...","snippet": "El 22 de Abril de 2010 se detectó un grave derrame de petróleo en el Golfo de México. Coincidentemente, el desafortunado accidente ocurrió ...","ranking": 3,"size": 25,"rscore": 36.690575,"reputation": 18,"repu_normalizada": 2,"date": "28-01-2011","colour": 10,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/elblogverde.com/derrame-de-petroleo-en-golfo-de-mexico/index.html"}, 
{ "id": "4196","repu": 96,"re_nor": 10,"fecha": 10,"url": "http://espiritualidadypolitica.blogspot.com/2010/05/atencion-al-derrame-de-petroleo-del.html","name": "Atención al derrame de petróleo del Golfo de México","snippet": "Atención al derrame de petróleo del Golfo de México  ....  Si es solo en España no tendra grandes repercusiones, ?no¿  ....  por las chingaderas de los politicos y trata de petroleo han contaminado, sin importarles el medio  ...","ranking": 12,"size": 7.692307692,"rscore": 85.03542,"reputation": 21,"repu_normalizada": 2,"date": "10-05-2006","colour": 0,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/espiritualidadypolitica.blogspot.cl/2010/05/atencion-al-derrame-de-petroleo-del.html"}, 
{ "id": "4197","repu": 99,"re_nor": 10,"fecha": 56,"url": "http://tiempo.infonews.com/nota/14554/bp-trata-de-minimizar-sus-responsabilidades","name": "BP trata de minimizar sus responsabilidades | Tiempo ...","snippet": "INVESTIGACI??N SOBRE EL DERRAME EN EL GOLFO DE M??XICO  ...  Cuando el largamente esperado informe sobre las causas del accidente de la  ...  'La multinacional petrolera intenta descargar una parte de la responsabilidad en las  ...","ranking": 55,"size": 1.785714286,"rscore": 77.91042,"reputation": 36,"repu_normalizada": 4,"date": "09-09-2010","colour": 6,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/tiempo.infonews.com/nota/14554/bp-trata-de-minimizar-sus-responsabilidades.html"}, 
{ "id": "4198","repu": 94,"re_nor": 10,"fecha": 67,"url": "https://es.wikipedia.org/wiki/Derrame_de_petr%C3%B3leo","name": "Derrame de petróleo - Wikipedia, la enciclopedia libre","snippet": "Tareas de limpieza del derrame de petróleo provocado por el buque 'Prestige'.  ....  provocando un derrame de petróleo incontrolado en el golfo de México que  ...","ranking": 7,"size": 12.5,"rscore": 97.65315,"reputation": 20,"repu_normalizada": 2,"date": "28-11-2011","colour": 65,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4-2/es.wikipedia.org/wiki/Derrame_de_petr%C3%B3leo.html"}, 
{ "id": "4199","repu": 100,"re_nor": 10,"fecha": 95,"url": "http://es.panampost.com/maria-suarez/2015/07/10/ataques-de-las-farc-afectan-la-produccion-de-petroleo-en-colombia/","name": "petróleo - PanAm Post","snippet": "Ataques de las FARC afectan la producción de petróleo en Colombia  ...  realmente tiene la responsabilidad en este tipo de hechos???, dice Carlos Leal.  ...  de la planta de British Petroleum (BP) en el golfo de México en 2010, que  ...  hubiera ocurrido y manifestaron que ???no eran las consecuencias deseadas???.","ranking": 93,"size": 1.063829787,"rscore": 84.87367,"reputation": 192,"repu_normalizada": 10,"date": "10-07-2015","colour": 64,"url_local": "http://localhost/ProyectoTesis/DataSet/Grupo4/es.panampost.com/maria-suarez/2015/07/10/ataques-de-las-farc-afectan-la-produccion-de-petroleo-en-colombia/index.html"}
]
};
};