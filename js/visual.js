//Variables Globales
var diametro = 720, //diámetro del círculo
	dataSource = 0, //variable para el filtro de ordenamiento
    rankingorder = false,//booleano para generar el ordenamiento por ranking(mayor o menor si es falso o verdadero)
    dateOrder = false,//booleano para generar el ordenamiento por fecha
    scoreOrder = false,//booleano para generar el ordenamiento por legibilidad
    reputationOrder = false,//booleano para generar el ordenamiento por reputacion
    floraSuma=0,//variable para contar las paginas agregadas al grupo de flora
    superficieSuma=0,//variable para contar las paginas agregadas al grupo de superficie
    maniobrasSuma=0,//variable para contar las paginas agregadas al grupo de maniobras
    responsabilidadesSuma=0,//variable para contar las paginas agregadas al grupo de responsabilidades
    idActual=0,//variable que toma el valor de id de la ultima pagina que ha sido pinchada
    marcador=0,//variable que toma el valor del grupo de paginas que estan seleccionadas, para mantenerse en ese grupo al cambiar el filtro de ordenamiento
    guardados=[],//Aqui se guardan las ids de las paginas agregadas a flora
    guardados2=[],//Aqui se guardan las ids de las paginas agregadas a superficie
    guardados3=[],//Aqui se guardan las ids de las paginas agregadas a maniobras
    guardados4=[],//Aqui se guardan las ids de las paginas agregadas a responsabilidades
    visitados=[],//Aqui se guardan las ids de las paginas visitadas 
	datos=[],//para guardar los datos del json
	flora=[],//guarda los datos de flora extraidos del json
	superficie=[],//guarda los datos de supeficie extraidos del json
	maniobras=[],//guarda los datos de maniobras obtenidos del json
	responsabilidades=[];//guarda los datos de responsabilidades extraidos del json
//dejo un espacio para que queden los botones un poco mas abajo	
var espacio=d3.select("#contenedor2").append("svg")
	.attr("width",diametro)
	.attr("height",100);
//Creación de botones
var datosBoton=["Ranking", "Fecha", "Legibilidad", "Reputación"];//nombres de los botones
var botonDiv=d3.select("#contenedor2").append("svg")
	.attr("width",diametro)
	.attr("height",40);
var botones=botonDiv.selectAll(".updateButton")
	.data(datosBoton)
	.enter()
	.append("g")
	.attr("class","updateButton")
	.on("click", function(d,i){
		dataSource=i;
		console.log(dataSource)
		d3.selectAll("circle").remove();
		d3.select("#vista").selectAll("text").remove();
		tooltip.style("visibility", "hidden");
		cambiarBoton();
		labelDivText.style("fill", function (d) {
			        return sortingColor(d);});
		labelDivText.text(function (d) {
			        return sortingLabel(d);});
		if(marcador==1){
			return union(flora);
		}
		if(marcador==2){
			return union(superficie);
		}
		if(marcador==3){
			return union(maniobras);
		}
		if(marcador==4){
			return union(responsabilidades);
		}
	});
var rectB=botones.append("rect")
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
var rectT=botones.append("text")
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
        .attr("width", diametro)
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
            result = "Ordenado por mayor ranking";
        }
        else{
            result = "Ordenado por menor ranking";
        }
    }
    if (dataSource==1){
        if (dateOrder){
            result = "Ordenado por más reciente";
        }
        else{
            result = "Ordenado por más antiguo";
        }
    }
    if (dataSource==2){
        if (scoreOrder){
            result = "Ordenado por más facil de leer";
        }
        else{
            result = "Ordenado por mas difícil de leer";
        }
    }
    if (dataSource==3){
        if (reputationOrder){
            result = "Ordenado por mayor reputación";
        }
        else{
            result = "Ordenado por menor reputación";
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

//Creación de svg para representacion visual
var svg = d3.select("#contenedor2").append("svg")
	.attr("id","vista")
	.attr("width", diametro)
	.attr("height",diametro);

//Lectura de archivo json
d3.json("json/G1.json", function(data){
	flora=data.children[0];
	superficie=data.children[1];
	maniobras=data.children[2];
	responsabilidades=data.children[3];
	}
);
//Función que genera la vista 
function generaVista(datos){
		d3.selectAll("circle").remove();
		d3.select("#vista").selectAll("text").remove();
		d3.json("json/G1.json", function(data){
			flora=data.children[0];
			superficie=data.children[1];
			maniobras=data.children[2];
			responsabilidades=data.children[3];
			console.log("hola2")
			var hijos = datos.children;
			var nestedHijos=d3.nest()
				.key(function(d){return d.name})
				.entries(hijos);
			console.log(nestedHijos)
			var packableHijos={name:datos.name,values:nestedHijos};
			var packChart = d3.layout.pack();
			packChart.size([diametro,diametro])
				.children(function(d){
					return d.values;
				})
			if (dataSource == 0) {
			    rankingorder = !rankingorder;   
			    packChart.value(function (d) {
			        return rankingorder ? d.size : 100 * d.size / (101 * d.size - 100);
			    });
			}
			if (dataSource == 1) {
			    dateOrder = !dateOrder;
			    packChart.value(function (d) {
			        return dateOrder ? 100/(101-d.fecha) : 100/(d.fecha + 1);
			    });
			}
			if (dataSource == 2) {
			    scoreOrder = !scoreOrder;
			    packChart.value(function (d) {
			        return scoreOrder ?  100/(100 - d.rscore + 1) : 100/(d.rscore + 1) ;
			    });
			}
			if (dataSource == 3) {
			    reputationOrder = !reputationOrder;
			    packChart.value(function (d) {
			        return reputationOrder ? 100/(101-d.repu) : 100/(d.repu + 1);
			    });
			}
			labelDivText.style("fill", function (d) {
			        return sortingColor(d);
			    }
			);
			labelDivText.text(function (d) {
			        return sortingLabel(d);
			    }
			);

			d3.select("#vista")
				.selectAll("circle")
				.data(packChart(packableHijos))
				.enter()
				.append("circle")
				.attr("class", function (d) {return d.children ? "parent" : "child";})
				.attr("r", function(d){return d.r;})
				.attr("cx",function(d){return d.x;})
				.attr("cy",function(d){return d.y;})
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
				.on("click", function(d){
					var xPosition = parseFloat(d3.select(this).attr("cx"))+165;
					var yPosition = parseFloat(d3.select(this).attr("cy"))+195;
					
					d3.select(this).style("fill-opacity", "0.1");
					tooltip.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
					return (mostrarPagina(d))
				});
			d3.select("#vista")
				.selectAll("text")
				.data(packChart(packableHijos))
				.enter()
				.append("text")
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
		            		return d.repu_normalizada;
		            	}
		            }
		        })
		        .on("click", function(d){
					var xPosition = parseFloat(d3.select(this).attr("x"))+165;
					var yPosition = parseFloat(d3.select(this).attr("y"))+195;
					d3.select(this).style("fill-opacity", "0.1");
					tooltip.style("visibility", "visible").style("top", yPosition +"px").style("left",xPosition+"px");
					return (mostrarPagina(d))
				});
			
			}
		);
	}

//Función para mostrar la página
function mostrarPagina(d){
	console.log("click");
	if(!d.children){
		console.log("Mostrando pagina")
		document.getElementById('page-container').src = d.url_local;
        document.getElementById("i1-ranking").innerHTML = rankingFix(d);
        document.getElementById("i2-date").innerHTML = d.date;
        document.getElementById("i3-rscore").innerHTML = scoreDiscretization(d);
        document.getElementById("i4-reputation").innerHTML = d.reputation;
        document.getElementById("page-container").style.height = "919px";
        document.getElementById("botonMostrarOcultar").value="Ocultar Página";
        document.getElementById("Check1").checked=0;
        document.getElementById("Check2").checked=0;
        document.getElementById("Check3").checked=0;
        document.getElementById("Check4").checked=0;
        clic=1;
        idActual=d.id;
        console.log(idActual)
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

//Función que suma el contador al contenedor de páginas guardadas
function guardarPagina(){
	var index = guardados.indexOf(idActual);
	console.log(index)
	if (index==-1) {
		floraSuma++;
		document.getElementById("a1-fauna").innerHTML = floraSuma;
		guardados.push(idActual);
		actualizaPuntos(idActual);
	}
	
	else{
		var x = document.getElementById("Check1").checked;
		console.log("holaaaaa")
		floraSuma--;
		document.getElementById("a1-fauna").innerHTML = floraSuma;
		guardados.splice(index,1);
		actualizaPuntos(idActual);
	}
	
}
//funcion para actulizar los grupos a los que ha sido agregada una pagina 
function actualizaPuntos(idActual){
	if(idActual<2000){
		if(dataSource==0){
		rankingorder = !rankingorder;
		generaVista(flora);		
		}
		if(dataSource==1){
		dateOrder = !dateOrder;
		generaVista(flora);		
		}
		if(dataSource==2){
		scoreOrder = !scoreOrder;
		generaVista(flora);		
		}
		if(dataSource==3){
		reputationOrder = !reputationOrder;
		generaVista(flora);		
		}
	}
	if((idActual>=2000)&&(idActual<3000)){
		if(dataSource==0){
		rankingorder = !rankingorder;
		generaVista(superficie);		
		}
		if(dataSource==1){
		dateOrder = !dateOrder;
		generaVista(superficie);	
		}
		if(dataSource==2){
		scoreOrder = !scoreOrder;
		generaVista(superficie);		
		}
		if(dataSource==3){
		reputationOrder = !reputationOrder;
		generaVista(superficie);	
		}
	}
	if((idActual>=3000)&&(idActual<4000)){
		if(dataSource==0){
		rankingorder = !rankingorder;
		generaVista(maniobras);		
		}
		if(dataSource==1){
		dateOrder = !dateOrder;
		generaVista(maniobras);	
		}
		if(dataSource==2){
		scoreOrder = !scoreOrder;
		generaVista(maniobras);		
		}
		if(dataSource==3){
		reputationOrder = !reputationOrder;
		generaVista(maniobras);	
		}
	}
	if(idActual>=4000){
		if(dataSource==0){
		rankingorder = !rankingorder;
		generaVista(responsabilidades);		
		}
		if(dataSource==1){
		dateOrder = !dateOrder;
		generaVista(responsabilidades);
		}
		if(dataSource==2){
		scoreOrder = !scoreOrder;
		generaVista(responsabilidades);		
		}
		if(dataSource==3){
		reputationOrder = !reputationOrder;
		generaVista(responsabilidades);	
		}
	}
}
//funcion para agregar una pagina al grupo de supeficie
function guardarPagina2(){
	var index2 = guardados2.indexOf(idActual);
	if (index2==-1) {
		superficieSuma++;
		document.getElementById("a2-superficie").innerHTML = superficieSuma;
		guardados2.push(idActual);
		actualizaPuntos(idActual);
	}
	else{
		var x2 = document.getElementById("Check2").checked;
		console.log("holaaaaa2")
		superficieSuma--;
		document.getElementById("a2-superficie").innerHTML = superficieSuma;
		guardados2.splice(index2,1);
		actualizaPuntos(idActual);
	}

}
//funcion para agregar una pagina al grupo de maniobras
function guardarPagina3(){
	var index3 = guardados3.indexOf(idActual);
	if (index3==-1) {
		maniobrasSuma++;
		document.getElementById("a3-maniobras").innerHTML = maniobrasSuma;
		guardados3.push(idActual);
		actualizaPuntos(idActual);
	}
	else{
		var x3 = document.getElementById("Check3").checked;
		console.log("holaaaaa3")
		maniobrasSuma--;
		document.getElementById("a3-maniobras").innerHTML = maniobrasSuma;
		guardados3.splice(index3,1);
		actualizaPuntos(idActual);
	}
}
//funcion para agregar una pagina al grupo de responsabilidades
function guardarPagina4(){
	var index4 = guardados4.indexOf(idActual);
	if (index4==-1) {
		responsabilidadesSuma++;
		document.getElementById("a4-responsabilidades").innerHTML = responsabilidadesSuma;
		guardados4.push(idActual);
		actualizaPuntos(idActual);
	}
	else{
		var x4 = document.getElementById("Check4").checked;
		console.log("holaaaaa4")
		responsabilidadesSuma--;
		document.getElementById("a4-responsabilidades").innerHTML = responsabilidadesSuma;
		guardados4.splice(index4,1);
		actualizaPuntos(idActual);
	}
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
//Función para poder cambiar el color de los botones y generar la vista
function union(datos){
	generaVista(datos);
	if (datos==flora) {
		marcador=1;
		tooltip.style("visibility", "hidden");
		document.getElementById("c1").style.background="green";
		document.getElementById("c2").style.background="#D9D9D9";
		document.getElementById("c3").style.background="#D9D9D9";
		document.getElementById("c4").style.background="#D9D9D9";
	};
	if (datos==superficie) {
		marcador=2;
		tooltip.style("visibility", "hidden");
		document.getElementById("c1").style.background="#D9D9D9";
		document.getElementById("c2").style.background="green";
		document.getElementById("c3").style.background="#D9D9D9";
		document.getElementById("c4").style.background="#D9D9D9";
	};
	if (datos==maniobras) {
		marcador=3;
		tooltip.style("visibility", "hidden");
		document.getElementById("c1").style.background="#D9D9D9";
		document.getElementById("c2").style.background="#D9D9D9";
		document.getElementById("c3").style.background="green";
		document.getElementById("c4").style.background="#D9D9D9";
	};
	if (datos==responsabilidades) {
		marcador=4;
		tooltip.style("visibility", "hidden");
		document.getElementById("c1").style.background="#D9D9D9";
		document.getElementById("c2").style.background="#D9D9D9";
		document.getElementById("c3").style.background="#D9D9D9";
		document.getElementById("c4").style.background="green";
	};
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
   } else{
       document.getElementById("page-container").style.height = "919px";
       document.getElementById("botonMostrarOcultar").value="Ocultar Página";
    clic = 1;
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
	.html("<form><input type=checkbox name=Check1 id=Check1 onclick=guardarPagina()><label for=Check1></label><input type=checkbox name=Check2 id=Check2 onclick=guardarPagina2()><label for=Check2></label><input type=checkbox name=Check3 id=Check3 onclick=guardarPagina3()><label for=Check3></label><input type=checkbox name=Check4 id=Check4 onclick=guardarPagina4()><label for=Check4></label></form>")
        .on("click", function(d, i){
            //console.log(svg.select("#Check1").node().checked);
        });

//reloj
var segundos = 0;
var minutos = 10;
var llamada;
var ceromin='';
var ceroseg='';

function cuentaAtras(){ 
    devolvercero(minutos,segundos);
    segundos = segundos % 60;
    document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
     if (minutos ===0 && segundos ===0){
        alert ("Se agotó su tiempo");
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