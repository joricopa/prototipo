//Variables Globales
var diametro = 720, //diametro del circulo
	numeroDatos=0,
	dataSource = 0,
    rankingorder = false,
    dateOrder = false,
    scoreOrder = false,
    reputationOrder = false, 
	datos=[],
	flora=[],
	superficie=[],
	maniobras=[],
	responsabilidades=[];
	
var espacio=d3.select("#contenedor2").append("svg")
	.attr("width",diametro)
	.attr("height",100);
//Creación de botones
var datosBoton=["Legibilidad","Reputación","Ranking"];
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
		actualizaVista();
	});
botones.append("rect")
	.attr("x", function(d, i) { return (i * 100) + 100; })
    .attr("width", 98)
    .attr("height", 25)
    .attr("ry", 5)
    .style("stroke", "#787878")
    .style("fill", "tan");
botones.append("text")
    .attr("x", function(d, i) { return (i * 100) + (100 / 2) + 98; }) 
    .attr("y", 12)
    .attr("dy", "0.35em")
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .text(function(d) { return d; });
// botones para cambiar vista de datos    
/*
var datosBoton2=["Flora","Superficie","Maniobras","Responsabilidades"];
var botonDiv2=d3.select("#contenedor2").append("svg")
	.attr("width",diametro)
	.attr("height",40);
var botones2=botonDiv2.selectAll(".updateButton")
	.data(datosBoton2)
	.enter()
	.append("g")
	.attr("class","updateButton")
	.on("click",function(d,i){
		generaVista(datosBoton2[i]);
	} );
botones2.append("rect")
	.attr("x", function(d, i) { return (i * 150); })
    .attr("width", 150)
    .attr("height", 35)
    .attr("ry", 5)
    .style("stroke", "#787878")
    .style("fill", "tan");
botones2.append("text")
    .attr("x", function(d, i) { return (i * 150) + (150 / 2); }) 
    .attr("y", 22)
    .attr("dy", "0.35em")
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .text(function(d) { return d; });
*/
var labelDiv = d3.select("#contenedor2").append("svg")
        .attr("width", diametro)
        .attr("height", 40)
        .append("g");

var labelDivText = labelDiv.append("text")
        .attr("x", function (d, i) {
            return (i * 100) + (100 / 2) + 50;
        })
        .attr("y", 12)
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

function sortingLabel(d){
    var result;
    if (dataSource==0){
        if (rankingorder){
            result = "Ordenado por ranking mayor";
        }
        else{
            result = "Ordenado por ranking menor";
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
            result = "Ordenado por reputación mayor";
        }
        else{
            result = "Ordenado por reputación menor";
        }
    }
    return result;
}

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
	//.attr("transform", "translate(" + (diametro - 1.1 * diametro) / 2 + "," + (diametro - 0.93 * diametro) / 2 + ")");


//Lectura de archivo json
d3.json("json/G1.json", function(data){
	flora=data.children[0];
	superficie=data.children[1];
	maniobras=data.children[2];
	responsabilidades=data.children[3];
	//console.log(flora)

	//función que genera la vista
	function generaVista(datos){
		console.log("hola")
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
			.value(function(d){
				return 1;
			});
		d3.select("#vista")
			.selectAll("circle")
			.data(packChart(packableHijos))
			.enter()
			.append("circle")
			.attr("r", function(d){return d.r;})
			.attr("cx",function(d){return d.x;})
			.attr("cy",function(d){return d.y;})
			.style("fill", function(d){return !d.children ? color(parseInt(d.colour)) : "white"})
			.style("stroke", "green")
			.style("stroke","1px")
			.on("click", function(d){
				return (mostrarPagina(d))
			});
	}
	//generaVista(superficie);
	//función que actualiza los datos de la vista
	function actualizaVista(){
		if (auxiliar==0) {
			generaVista(flora);
		};
		if (auxiliar==1) {
			generaVista(superficie);
		};
		if (auxiliar==2) {
			generaVista(maniobras);
		};
		if (auxiliar==3) {
			generaVista(responsabilidades);
		};
	}
	//funcion para mostrar pagina
	function mostrarPagina(d){
		console.log("click");
		if(!d.children){
			console.log("Mostrando pagina")
			document.getElementById('page-container').src = d.url_local;
	        //document.getElementById("i1-ranking").innerHTML = rankingFix(d);
	        //document.getElementById("i2-date").innerHTML = d.date;
	        //document.getElementById("i3-rscore").innerHTML = scoreDiscretization(d);
	        //document.getElementById("i4-reputation").innerHTML = d.reputation;
		}
	}

	}
);
//Función que genera la vista 
function generaVista(datos){
		d3.selectAll("circle").remove();
		d3.json("json/G1.json", function(data){
			flora=data.children[0];
			superficie=data.children[1];
			maniobras=data.children[2];
			responsabilidades=data.children[3];
			console.log("hola")
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
				.value(function(d){
					return d.size;
				});
			d3.select("#vista")
				.selectAll("circle")
				.data(packChart(packableHijos))
				.enter()
				.append("circle")
				.attr("class", function (d) {return d.children ? "parent" : "child";})
				.attr("r", function(d){return d.r;})
				.attr("cx",function(d){return d.x;})
				.attr("cy",function(d){return d.y;})
				.style("fill",function (d) {
            return !d.children ? color(d.colour) : "white";})
				.style("stroke", function(d){return !d.children ? colorStroke(d) : "#4682B4";})
				.attr("stroke-width", function(d){
            return !d.children ? "3px" : "2px";})
				.style("cursor", function (d) {
		            return !d.children ? "pointer" : "auto";
		        })
				.on("click", function(d){
					return (mostrarPagina(d))
				});
			}
		);
	}

//funcion para mostrar pagina
function mostrarPagina(d){
	console.log("click");
	if(!d.children){
		console.log("Mostrando pagina")
		document.getElementById('page-container').src = d.url_local;
        document.getElementById("i1-ranking").innerHTML = rankingFix(d);
        document.getElementById("i2-date").innerHTML = d.date;
        document.getElementById("i3-rscore").innerHTML = scoreDiscretization(d);
        document.getElementById("i4-reputation").innerHTML = d.reputation;
	}
}

//funcion para calcular el radio en base a

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

actualizaVista();

function actualizaVista() {

    if (dataSource == 0)
        pack.value(function(d) { return d.size; });
    if (dataSource == 1)
        pack.value(function(d) { return 100; });
    if (dataSource == 2)
        pack.value(function(d) { return 1 +
                 Math.floor(Math.random()*301); });

    var data1 = pack.nodes(data);

    titles.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .text(function(d) { return d.name +
            (d.children ? "" : ": " + format(d.value)); });

    circles.transition()
        .duration(5000)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; });
};