var dataSource=0;
//Botones para reordenar
// Variables que nombran los botones que les
var buttonData = ["Ranking", "Legibilidad", "Reputación"];
//Acá las medidas al svg
var buttonDiv = d3.select("#contenedor2").append("svg")
        .attr("width", 960)
        .attr("height", 40);
//Botones 
var buttons = buttonDiv.selectAll(".updateButton")
        .data(buttonData)
        .enter()
        .append('g')
        .attr("class", "updateButton")
        .attr("width", 98)
        .attr("height", 25)
        .attr("type", "button")
        .attr("id", function (d, i) {
            return i;
        })
        .on("click", function (d, i) {
            dataSource = i;
            //updateVis(jsondata);
        });
var rectB = buttons.append("rect")
        .attr("x", function (d, i) {
            return (i * 100) + 100;
        })
        .attr("width", 98)
        .attr("height", 25)
        .attr("ry", 3)
        .attr("class", "updateButton")
        .attr("type", "button")
        .style("stroke", "#557985")
        .style("stroke-width", "2px")
        .style("cursor", "pointer")
        .style("fill", function (d, i) {
            return dataSource == i ? "#04BBF8" : "white";
        });

var rectT = buttons.append("text")
        .attr("x", function (d, i) {
            return (i * 100) + (100 / 2) + 98;
        })
        .attr("y", 12)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", "15px")
        .style("font-family", "sans-serif")
        .style("font-weight", "bold")
        .style("fill", function (d, i) {
            return dataSource == i ? "white" : "black";
        })
        .text(function (d) {
            return d;
        });

var labelDiv = d3.select("#contenedor2").append("svg")
        .attr("width", 960)
        .attr("height", 60)
        .append("g");
//var labelDivText=labelDiv.append("text")
//Se crea el svg en el contenedor2 que es la mitad izquierda de la página
var svg = d3.select("#contenedor2")
	.append("svg")
	.attr("width",760)
	.attr("height",720),
    margin = 10,
    diameter = 720,
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var colorRscore = d3.scaleOrdinal()
        .range(["#FF0000", "#FF5500", "#FFAA00", "#FFFF00", "#AAFF00", "#55FF00", "#00FF00"])
        .domain(d3.range(0, 6));

var colorRanking = d3.scaleOrdinal()
        .range(["#FFFFFF", "#FCFCFC", "#F9F9F9", "#F7F7F7", "#F4F4F4", "#F2F2F2", "#EFEFEF", "#ECECEC", "#EAEAEA", "#E7E7E7", "#E5E5E5", "#E2E2E2", "#E0E0E0", "#DDDDDD", "#DADADA", "#D8D8D8", "#D5D5D5", "#D3D3D3", "#D0D0D0", "#CECECE", "#CBCBCB", "#C8C8C8", "#C6C6C6", "#C3C3C3", "#C1C1C1", "#BEBEBE", "#BCBCBC", "#B9B9B9", "#B6B6B6", "#B4B4B4", "#B1B1B1", "#AFAFAF", "#ACACAC", "#AAAAAA", "#A7A7A7", "#A4A4A4", "#A2A2A2", "#9F9F9F", "#9D9D9D", "#9A9A9A", "#979797", "#959595", "#929292", "#909090", "#8D8D8D", "#8B8B8B", "#888888", "#858585", "#838383", "#808080", "#7E7E7E", "#7B7B7B", "#797979", "#767676", "#737373", "#717171", "#6E6E6E", "#6C6C6C", "#696969", "#676767", "#646464", "#616161", "#5F5F5F", "#5C5C5C", "#5A5A5A", "#575757", "#555555", "#525252", "#4F4F4F", "#4D4D4D", "#4A4A4A", "#484848", "#454545", "#424242", "#404040", "#3D3D3D", "#3B3B3B", "#383838", "#363636", "#333333", "#303030", "#2E2E2E", "#2B2B2B", "#292929", "#262626", "#242424", "#212121", "#1E1E1E", "#1C1C1C", "#191919", "#171717", "#141414", "#121212", "#0F0F0F", "#0C0C0C", "#0A0A0A", "#070707", "#050505", "#020202", "#000000"])
        .domain(d3.range(0, 100));

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

d3.json("json/G1.json", function(error, root) {
  if (error) throw error;
  //console.log(root[0]);
  root = d3.hierarchy(root)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

  var focus = root,
      nodes = pack(root).descendants(),
      view;

 var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .style("stroke", function(d){
            return !d.children ? colorStroke(d) : "#4682B4";
        })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });


  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { 
      	if (d.data.id<10) {
      		return d.data.name;
      	};
      	return d.data.ranking; });

  var node = g.selectAll("circle,text");

  svg
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
});

function colorStroke(d)
{
    var c;
    if (d.rscore >= 90)
    {
        c = 6;
    }
    if (d.rscore < 90 && d.rscore >= 80)
    {
        c = 5;
    }
    if (d.rscore < 80 && d.rscore >= 70)
    {
        c = 4;
    }
    if (d.rscore < 70 && d.rscore >= 60)
    {
        c = 3;
    }
    if (d.rscore < 60 && d.rscore >= 50)
    {
        c = 2;
    }
    if (d.rscore < 50 && d.rscore >= 30)
    {
        c = 1;
    }
    if (d.rscore < 30 && d.rscore >= 0)
    {
        c = 0;
    }
    return colorRscore(c);
}

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
