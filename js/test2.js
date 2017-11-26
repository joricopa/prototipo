/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var queryString = getQueryString();
var taskTime = 600000;

if (queryString["panas"] == 1){
    conjunto = 'json/G1.json'
}
else{
    conjunto = 'json/G2.json'
}

$.getJSON(conjunto, function (data) {
        //$("#encuestas").load("encuestas.html");
        $(function () {
            $('#runner1').runner({
                countdown: true,
                startAt: taskTime,
                stopAt: 0,
                milliseconds: false,
                autostart: false
            }).on('runnerFinish', function(eventObject, info) {
                
                onNextStepClick();
                

            });
        });


//var superHtml = "";


var w = 860,
    h = 800,
    r = 720,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    format = d3.format(",d"),
    node,
    root,
    zoomIn = false,
    isDragging = false,
    dragPxOrigen,
    dragPyOrigen,
    ghost,
    dataSource = 0,
    rankingorder = false,
    dateOrder = false,
    scoreOrder = false,
    reputationOrder = false,
    arrayGroup1 = [],
    arrayGroup2 = [],
    arrayGroup3 = [],
    arrayGroup4 = [],
    c1Fauna = 0,
    c2Superficie = 0,
    c3Maniobras = 0,
    c4Responsabilidades = 0,
    inContainer = 0,
    step=1,
    selection_log = [];

    var sub_step = -1;



//console.log(queryString["panas"]);
if (queryString["panas"] == 0)
    {
        sub_step = 2;
        //sub_step = 6;
        //sub_step = 11;
        doSubStep();
    }
else{
    sub_step = 0;
    doSubStep();
}

var miniJson1 = {
        "name": "c1",
        "children": []
    };

var miniJson2 = {
        "name": "c2",
        "children": []
    };

var miniJson3 = {
        "name": "c3",
        "children": []
    };

var miniJson4 = {
        "name": "c4",
        "children": []
    };
//
var color = d3.scale.ordinal()
        .range(["#0A0B3D", "#090D3F", "#091042", "#091345", "#091648", "#09184B", "#091B4E", "#081E51", "#082154", "#082357", "#08265A", "#08295D", "#082C60", "#082F63", "#073166", "#073469", "#07376C", "#073A6F", "#073C72", "#073F75", "#064278", "#06457B", "#06477E", "#064A81", "#064D84", "#065087", "#06538A", "#05558D", "#055890", "#055B93", "#055E96", "#056099", "#05639C", "#04669F", "#0469A2", "#046BA5", "#046EA8", "#0471AB", "#0474AE", "#0477B1", "#0379B4", "#037CB7", "#037FBA", "#0382BD", "#0384C0", "#0387C3", "#028AC6", "#028DC9", "#028FCC", "#0292CF", "#0295D2", "#0298D5", "#019BD8", "#019DDB", "#01A0DE", "#01A3E1", "#01A6E4", "#01A8E7", "#01ABEA", "#00AEED", "#00B1F0", "#00B3F3", "#00B6F6", "#00B9F9", "#00BCFC", "#00BFFF"])
        .domain(d3.range(0, 66));

var colorRscore = d3.scale.ordinal()
        .range(["#FF0000", "#FF5500", "#FFAA00", "#FFFF00", "#AAFF00", "#55FF00", "#00FF00"])
        .domain(d3.range(0, 6));

var colorRanking = d3.scale.ordinal()
        .range(["#FFFFFF", "#FCFCFC", "#F9F9F9", "#F7F7F7", "#F4F4F4", "#F2F2F2", "#EFEFEF", "#ECECEC", "#EAEAEA", "#E7E7E7", "#E5E5E5", "#E2E2E2", "#E0E0E0", "#DDDDDD", "#DADADA", "#D8D8D8", "#D5D5D5", "#D3D3D3", "#D0D0D0", "#CECECE", "#CBCBCB", "#C8C8C8", "#C6C6C6", "#C3C3C3", "#C1C1C1", "#BEBEBE", "#BCBCBC", "#B9B9B9", "#B6B6B6", "#B4B4B4", "#B1B1B1", "#AFAFAF", "#ACACAC", "#AAAAAA", "#A7A7A7", "#A4A4A4", "#A2A2A2", "#9F9F9F", "#9D9D9D", "#9A9A9A", "#979797", "#959595", "#929292", "#909090", "#8D8D8D", "#8B8B8B", "#888888", "#858585", "#838383", "#808080", "#7E7E7E", "#7B7B7B", "#797979", "#767676", "#737373", "#717171", "#6E6E6E", "#6C6C6C", "#696969", "#676767", "#646464", "#616161", "#5F5F5F", "#5C5C5C", "#5A5A5A", "#575757", "#555555", "#525252", "#4F4F4F", "#4D4D4D", "#4A4A4A", "#484848", "#454545", "#424242", "#404040", "#3D3D3D", "#3B3B3B", "#383838", "#363636", "#333333", "#303030", "#2E2E2E", "#2B2B2B", "#292929", "#262626", "#242424", "#212121", "#1E1E1E", "#1C1C1C", "#191919", "#171717", "#141414", "#121212", "#0F0F0F", "#0C0C0C", "#0A0A0A", "#070707", "#050505", "#020202", "#000000"])
        .domain(d3.range(0, 100));
//
var pack = d3.layout.pack()
        .size([r, r])
        .value(function (d) {
            return d.size;
        });


var svg = d3.select("#svg-container").append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("transform", "translate(" + (w - 1.1 * r) / 2 + "," + (h - 0.93 * r) / 2 + ")");
d3.select("#svg-container").append("div")
    .attr("id", "hope")
    .style("width","60px")
    .style("height","60px")
    .style("float","right")
    .style("display","inline-block")
    .style("top","66px")
    .style("right","-2px")
    .style("background-image","url(\"img/close60.png\")")
    .style("position","absolute");
    
d3.select("#svg-container").append("div")
    .attr("id", "despair")
    .style("width","60px")
    .style("height","60px")
    .style("float","right")
    .style("display","inline-block")
    .style("top","700px")
    .style("right","-2px")
    .style("background-image","url(\"img/bin60.png\")")
    .style("position","absolute");
if (inContainer==0){
    $('#hope').hide();
    $('#despair').hide();
}

console.log("Setting up the drag function...");
var drag = d3.behavior.drag()
        .on("drag", dragmove)
        .on("dragstart", dragstart)
        .on("dragend", dragend);
var jsondata = data;
node = root = jsondata;



var nodes = pack.nodes(jsondata);

var vis = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g");

var circles = vis.append("circle")
        .attr("class", function (d) {
            return d.children ? "parent" : "child";
        })
        .style("stroke", function(d){
            return !d.children ? colorStroke(d) : "#4682B4";
        })
        .style("fill", function (d) {
            return !d.children ? color(d.colour) : "white";
        })
        .style("cursor", function (d) {
            return !d.children ? "pointer" : "auto";
        })
        .attr("stroke-width", function(d){
            return !d.children ? "2px" : "1px";
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return d.r;
        })

        .on("click", function (d) {
            return (!d.children ? clickedNode(d) : zoom(node == d ? root : d));
        })

        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)
        .call(drag);

var text = vis.append("text")
        .attr("class", function (d) {
            return d.children ? "parent" : "child";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
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
        .style("fill", function (d){
            return !d.children ? colorRanking(d.ranking): "white";
        })
        .text(function (d) {
            if (!d.children) {
                return d.reputation;
            }
        });

var labelDiv = d3.select("#svg-container").append("svg")
        .attr("width", r)
        .attr("height", 60)
       // .enter()
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

// Variables que nombran los botones que les
var buttonData = ["Ranking", "Fecha", "Legibilidad", "Reputación"];
//aca le da las medidas al svg
var buttonDiv = d3.select("#svg-container").append("svg")
        .attr("width", r)
        .attr("height", 40);

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
            updateVis(jsondata);
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
        })
        ;

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

updateVis(jsondata);

var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 1e-6);

function mouseover() {
    if (true) {
        div
            .transition()
            .duration(500)
            .style("opacity", 1);
    }
}

function mousemove(d) {
    if (d.depth > 0) {
        div
            .text(d.name)
            .style("left", (d3.event.pageX - 0) + "px")
            .style("top", (d3.event.pageY - 0) + "px");
        if (!d.children) {
            div.style("background", color(d.colour))
            div.style("color","white");
        }
        if (d.depth == 1) {
            div.style("background", "white");
            div.style("color","black");
        }
    }
    else {
        div.style("opacity", 1e-6);
    }
}

function mouseout() {
    if (true) {
        div.transition()
                .duration(500)
                .style("opacity", 1e-6);
    }
}

function rankingFix(d)
{
    var rank = parseInt(d.ranking) + 1;
    return rank;
}

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

function scoreDiscretization(d)
{
    if (d.rscore >= 90)
    {
        return "Muy fácil";
    }
    if (d.rscore < 90 && d.rscore >= 80)
    {
        return "Fácil";
    }
    if (d.rscore < 80 && d.rscore >= 70)
    {
        return "Bastante fácil";
    }
    if (d.rscore < 70 && d.rscore >= 60)
    {
        return "Normal";
    }
    if (d.rscore < 60 && d.rscore >= 50)
    {
        return "Bastante difícil";
    }
    if (d.rscore < 50 && d.rscore >= 30)
    {
        return "Difícil";
    }
    if (d.rscore < 30 && d.rscore >= 0)
    {
        return "Muy difícil";
    }
}

function clickedNode(d) {
    d3.event.sourceEvent.stopPropagation(); // silence other listeners
    console.log("click");
    if (!d.children) {
        console.log("Showing web page...");
        document.getElementById('page-container').src = d.url_local;
        document.getElementById("i1-ranking").innerHTML = rankingFix(d);
        document.getElementById("i2-date").innerHTML = d.date;
        document.getElementById("i3-rscore").innerHTML = scoreDiscretization(d);
        document.getElementById("i4-reputation").innerHTML = d.reputation;
        console.log(d.name);
    }
}

d3.selection.prototype.moveToFront = function() { return this.each(function() { this.parentNode.appendChild(this); }); }


console.log("Starting drag...");
function dragstart(d) {


    //d3.event.sourceEvent.stopPropagation(); // silence other listeners
    if (!d.children) {
        clickedNode(d);
        console.log(d.id)
        dragPxOrigen = d.x;
        dragPyOrigen = d.y;
        var time = timeStamp();
        var doc_id = parseInt(d.id);
        document.getElementById("current_document").innerHTML = doc_id ;
        var log = {action:0, id_image: doc_id, x_data: dragPxOrigen, y_data: dragPyOrigen, time:time};
        //log["id_image"] = 8;
        console.log(log);
        //selection_log.push(log);
        ghost = svg.append("svg:circle")
                .attr("id", d.id)
                .attr("cx", dragPxOrigen)
                .attr("cy", dragPyOrigen)
                .attr("r", d.r)
                .style("fill", color(d.colour))
                .style("opacity", 0.7)
                .style("position", "absolute")
                .style("z-index", 4)
                .style("cursor", "pointer");

        if (zoomIn) {
            var rParent = d.parent.r;
            var k = r / rParent / 2;
            x.domain([d.parent.x - rParent, d.parent.x + rParent]);
            y.domain([d.parent.y - rParent, d.parent.y + rParent]);
            ghost.attr("cx", function (d) {
                return x(dragPxOrigen);
            })
                    .attr("cy", function (d) {
                        return y(dragPyOrigen);
                    })
                    .attr("r", k * d.r);
        }

    }
}

function dragmove(d) {
    if (!d.children) {
        isDragging = true;
        if (isDragging) {
//isDragging = true;
            ghost.attr("cx", d3.mouse(this)[0]);
            ghost.attr("cy", d3.mouse(this)[1]);
            if (d3.mouse(this)[1]<640 && d3.mouse(this)[0]>780 && d3.mouse(this)[0]<840 & inContainer>0){
                d3.select("#despair").style("background-image","url(\"img/bin60-open.png\")");
            }
            else{
                d3.select("#despair").style("background-image","url(\"img/bin60.png\")");
            }
           /* var sel = d3.select(this);
            sel.moveToFront();*/
        }
    }
}

function deleteObject(obj,id){

    for(var i=0; i<obj.children.length;i++){
        if(obj.children[i].id == id){
            //obj.children[i] = null;
            obj.children.splice(i, 1);
            return obj;
        }
    }
    return obj;
}

function subVisOut(){
        $('#hope').hide();
        $('#despair').hide();
        console.log("out");
        zoomIn = false;
        rankingorder = !rankingorder;
        dateOrder = !dateOrder;
        scoreOrder = !scoreOrder;
        reputationOrder = !reputationOrder;
        inContainer = 0;
        //svg.selectAll("circle").remove();
        ///svg.selectAll("text").remove();
        updateVis(jsondata);
}


function dragend(d) {   
    if (ghost != null) {
        var time = timeStamp();
        var log = {id_image: d.id, x_data: ghost.attr("cx"), y_data: ghost.attr("cy"), time:time};
        if (ghost.attr("cy") < 0) {
            log["action"] = 1;
            jsondata.children.sort(function (a, b) {
                return parseFloat(a.id) - parseFloat(b.id);
            });
            for (i = 0; i < jsondata.children.length; i++){
                jsondata.children[i].children.sort(function (a, b) {
                    return parseFloat(a.id) - parseFloat(b.id);
                });
            }
            var parentId, localId, child;
            if (ghost.attr("cx") > 0 && ghost.attr("cx") < 200) {
                log["extra_data"] = "C1";
                console.log("Container 1");
                if (arrayGroup1.indexOf(d.id)==-1 && !d.children){
                    arrayGroup1.push(d.id);

                    c1Fauna++; 
                    document.getElementById("c1-fauna").innerHTML = c1Fauna;
                    parentId = parseInt(d.parent.id);
                    if (queryString["panas"] == 1){
                        localId = d.id-parentId*1000;
                    }
                    else{
                        localId = d.id-parentId*1000-100;
                    }
                    child = jsondata.children[parentId-1].children[localId];
                    miniJson1.children.push(child);

                    
                   /* miniJson1.children.splice(0, 1);
                    console.log(miniJson1.children);*/
                    
                }               
                console.log("Grupo 1:" + arrayGroup1);
            }
            if (ghost.attr("cx") > 200 && ghost.attr("cx") < 400) {
                log["extra_data"] = "C2";
                console.log("Container 2");
                if (arrayGroup2.indexOf(d.id)==-1 && !d.children){
                    arrayGroup2.push(d.id);
                    c2Superficie++; 
                    document.getElementById("c2-superficie").innerHTML = c2Superficie;
                    parentId = parseInt(d.parent.id);
                    if (queryString["panas"] == 1){
                        localId = d.id-parentId*1000;
                    }
                    else{
                        localId = d.id-parentId*1000-100;
                    }
                    child = jsondata.children[parentId-1].children[localId];
                    miniJson2.children.push(child);
                }               
                console.log("Grupo 2:" + arrayGroup2);
            }
            if (ghost.attr("cx") > 400 && ghost.attr("cx") < 600) {
                log["extra_data"] = "C3";
                console.log("Container 3");
                if (arrayGroup3.indexOf(d.id)==-1 && !d.children){
                    arrayGroup3.push(d.id);
                    c3Maniobras++; 
                    document.getElementById("c3-maniobras").innerHTML = c3Maniobras;
                    parentId = parseInt(d.parent.id);
                    if (queryString["panas"] == 1){
                        localId = d.id-parentId*1000;
                    }
                    else{
                        localId = d.id-parentId*1000-100;
                    }
                    child = jsondata.children[parentId-1].children[localId];
                    miniJson3.children.push(child);
                }               
                console.log("Grupo 3:" + arrayGroup3);
            }
            if (ghost.attr("cx") > 600 && ghost.attr("cx") < 800) {
                log["extra_data"] = "C4";
                console.log("Container 4");
                if (arrayGroup4.indexOf(d.id)==-1 && !d.children){
                    arrayGroup4.push(d.id);
                    c4Responsabilidades++; 
                    document.getElementById("c4-responsabilidades").innerHTML = c4Responsabilidades;
                    parentId = parseInt(d.parent.id);
                    if (queryString["panas"] == 1){
                        localId = d.id-parentId*1000;
                    }
                    else{
                        localId = d.id-parentId*1000-100;
                    }
                    child = jsondata.children[parentId-1].children[localId];
                    miniJson4.children.push(child);
                }               
                console.log("Grupo 4:" +arrayGroup4);
            }
            
            ghost.attr("cx", d3.mouse(this)[0]);
            ghost.attr("cy", d3.mouse(this)[1]);
            //ghost.style("fill", "red");

            /*variable++;
             var somevar1 = "your variable1";
             var somevar2 = "your variable2";
             $.ajax({
             type: "POST",
             url: "cazzo.php",
             data: "variable1=" + somevar1 + "\u0026variable2=" + somevar2,
             success: function () {
             console.log("Insert in db...")
             }
             });*/

            console.log("Saving node...");
        }
        else {
          
            if (inContainer>0 && ghost.attr("cx") > 780 && ghost.attr("cx") < 840) {
                
                
                var objID = ghost.attr("id");
                if (inContainer== 1){
                    
                    var index = arrayGroup1.indexOf(objID);

                    arrayGroup1.splice(index, 1);
                    miniJson1 = deleteObject(miniJson1,objID);
                    c1Fauna--; 
                    document.getElementById("c1-fauna").innerHTML = c1Fauna;
                    if (c1Fauna==0){
                        subVisOut();


                    }
                    else{
                        subVis(miniJson1,arrayGroup1,0);
                    }
                    


                }
                else if(inContainer== 2){
                    var index = arrayGroup2.indexOf(objID);
                    arrayGroup2.splice(index, 1);
                    miniJson2 = deleteObject(miniJson2,objID);
                    c2Superficie--; 
                    document.getElementById("c2-superficie").innerHTML = c2Superficie;
                    if (c2Superficie==0){
                        subVisOut();

                    }
                    else{
                        subVis(miniJson2,arrayGroup2,0);
                    }

                }
                else if(inContainer== 3){
                    var index = arrayGroup3.indexOf(objID);
                    arrayGroup3.splice(index, 1);
                    miniJson3 = deleteObject(miniJson3,objID);
                    c3Maniobras--; 
                    document.getElementById("c3-maniobras").innerHTML = c3Maniobras;
                    if (c3Maniobras==0){
                        subVisOut();

                    }
                    else{
                        subVis(miniJson3,arrayGroup3,0);
                    }
                    

                }
                else if(inContainer== 4){
                    var index = arrayGroup4.indexOf(objID);
                    arrayGroup4.splice(index, 1);
                    miniJson4 = deleteObject(miniJson4,objID);
                    c4Responsabilidades--; 
                    document.getElementById("c4-responsabilidades").innerHTML = c4Responsabilidades;
                    if (c4Responsabilidades==0){
                        subVisOut();

                    }
                    else{
                        subVis(miniJson4,arrayGroup4,0);
                    }
                    
                }
                ghost.attr("cx", dragPxOrigen);
                ghost.attr("cy", dragPyOrigen);
                d3.select("#despair").style("background-image","url(\"img/bin60.png\")");
            }
            else{
                log["action"] = 2;
                ghost.attr("cx", dragPxOrigen);
                ghost.attr("cy", dragPyOrigen);
                console.log("No valid action. Node outside of drop area..");
            }
            log["action"] = 2;
            ghost.attr("cx", dragPxOrigen);
            ghost.attr("cy", dragPyOrigen);
            console.log("No valid action. Node outside of drop area..");
        }
        //console.log(log);
        //selection_log.push(log);
        isDragging = false;
        ghost.remove();
    }
}

$("#svg-container").click(function(e) {
    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);
    var relativeY = (e.pageY - offset.top);
      
    $(".position").val("afaf");
    if (relativeY < 60){
        if (relativeX>=0 && relativeX < 200 && arrayGroup1.length>0) {
            inContainer = 1;
            zoomIn = true;
            subVis(miniJson1,arrayGroup1,3000);
        }
        if (relativeX>=200 && relativeX<400 && arrayGroup2.length>0) {
            inContainer = 2;
            zoomIn = true;
            subVis(miniJson2,arrayGroup2,3000);
        }
        if (relativeX>=400 && relativeX<600 && arrayGroup3.length>0) {
            inContainer = 3;
            zoomIn = true;
            subVis(miniJson3,arrayGroup3,3000);
        }
        if (relativeX>=600 && relativeX<800 && arrayGroup4.length>0) {
            inContainer = 4;
            zoomIn = true;
            subVis(miniJson4,arrayGroup4,3000);
        }
    }
    else if (relativeY > 60 && relativeX > 800 && relativeX < 860){
        subVisOut();

    }

      
});




function zoom(d, i) {
    if (true) {//
        if (d.children){
            var k = r / d.r / 2;
            x.domain([d.x - d.r, d.x + d.r]);
            y.domain([d.y - d.r, d.y + d.r]);
            var t = vis.transition()
                    .duration(d3.event.altKey ? 7500 : 750);
        }
        var auxiliar = parseInt(d.id);
        var dif = 0;

        t.selectAll("circle")
                .attr("cx", function (d) {
                    return x(d.x);
                })
                .attr("cy", function (d) {
                    return y(d.y);
                })
                .attr("r", function (d) {
                    return k * d.r;
                })
;
        
                
        t.selectAll("text")
                .attr("x", function (d) {
                    return x(d.x);
                })
                .attr("y", function (d) {
                    return y(d.y);
                })
;
        if (!d3.event.altKey) {
            if (!zoomIn && d.depth == 1 && d.depth!=0) {
                var time = timeStamp();
                var log = {action:3, id_image: d.id, time:time};
                //selection_log.push(log);
                console.log("zoom in");
                console.log("Nivel nodo: " + d.depth);
                t.selectAll("circle")
                    .style("opacity", function(d){
                        if (d.depth==0){
                            return 0;
                        }
                    })
                    .style("display", function(d){
                        dif = d.id-auxiliar*1000;
                        if (((dif>1000 || dif<0)  && d.id!=auxiliar)){
                            flag = true;
                            return "none";
                        }
                        else{
                            return "unset"
                        }

                    });

                t.selectAll("text")
                        /*.attr("x", function (d) {
                            return x(d.x);
                        })
                        .attr("y", function (d) {
                            return y(d.y);
                        })*/
                        /*
                        .style("font-family", function (d) {
                            return "adelle,sans-serif";
                        })*/
                        .style("font-size", function (d) {
                            var len = 1.25;
                            var size = d.r / 3;
                            size *= 10 / len;
                            size += 1;
                            return Math.round(size) + 'px';
                        })
                        .style("display", function(d){
                            dif = d.id-auxiliar*1000;
                            if ((dif>1000 || dif<0 && d.id!=auxiliar)){
                                return "none";
                            }
                            else{
                                return "unset"
                            }

                        });
                zoomIn = true;
            }
            if (zoomIn && d.depth <= 0) {
                var time = timeStamp();
                var log = {action:4, time:time};
                //console.log(log);
                //selection_log.push(log);
                console.log("zoom out");
                t.selectAll("circle").style("display", function (d) {
                            return "";
                        })
                                .style("opacity", function(d){
                    if (d.depth==0){

                        flag = false;
                        return 1;
                    }
                });
                t.selectAll("text")
                        .attr("x", function (d) {
                            return x(d.x);
                        })
                        .attr("y", function (d) {
                            return y(d.y);
                        })/*
                        .style("font-family", function (d) {
                            return "adelle,sans-serif";
                        })*/
                        .style("font-size", function (d) {
                            var len = 3;
                            var size = d.r / 3;
                            size *= 10 / len;
                            size += 1;
                            return Math.round(size) + 'px';
                        })
                        .style("display", function (d) {
                            return "unset";
                        });
                console.log("Nivel nodo: " + d.depth);
                zoomIn = false;
            }
        }
        node = d;
        d3.event.stopPropagation();
    }
}


function updateVis(info) {
    var time = timeStamp();
    var log = {action:5, time:time};
    if (dataSource == 0) {
        rankingorder = !rankingorder;
        //document.getElementById(dataSource).style.background="blue";
        log["extra_data"] = "B1";
        //console.log(log);
        
        pack.value(function (d) {
            return rankingorder ? d.size : 100 * d.size / (101 * d.size - 100);
        });
    }
    if (dataSource == 1) {
        dateOrder = !dateOrder;
        log["extra_data"] = "B2";
        pack.value(function (d) {
            return dateOrder ? 66/(66-d.colour) : 66 /(d.colour+1);
        });
    }
    if (dataSource == 2) {
        scoreOrder = !scoreOrder;
        log["extra_data"] = "B3";
        pack.value(function (d) {
            return scoreOrder ?  100/(100 - d.rscore + 1) : 100/(d.rscore + 1) ;
        });
    }
    if (dataSource == 3) {
        reputationOrder = !reputationOrder;
        log["extra_data"] = "B4";
        pack.value(function (d) {
            return reputationOrder ? d.reputation + 1: 400/(1+d.reputation);
        });
    }
    //selection_log.push(log);
    rectB
            .attr("x", function (d, i) {
                return (i * 100) + 100;
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

    var data1 = pack.nodes(info);

    if (true){
            circles.transition()
            .duration(3000)
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("r", function (d) {
                return d.r;
            })
            .style("display", function (d){return "unset"});
    text.transition()
            .duration(3000)
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .style("font-size", function (d) {
                var len = 3;
                var size = d.r / 3;
                size *= 10 / len;
                size += 1;
                return Math.round(size) + 'px';
            })
            .style("display", function (d){return "unset"})
            .text(function (d) {

                if (!d.children) {
                    return d.reputation;
                }
            });
                       //  zoom(root);
    }
    else{
        zoomIn=true;
        zoom(info)
    }
    labelDivText.style("fill", function (d) {
            return sortingColor(d);
        }
    );


    labelDivText.text(function (d) {
            return sortingLabel(d);
        }
    );
};




function subVis(info,arrayGroupN,transitionTime){
    svg.selectAll("circle").remove();
    svg.selectAll("text").remove();
    for(var i=0; i<info.children.length;i++){
        console.log(info.children[i].id)
    }
   nodes = pack.nodes(jsondata);
   vis = svg.selectAll(".node")
   .data(nodes)
   .enter()
   .append("g");
    circles = vis.append("circle")
       /* .filter(function(d){ 
            //console.log(miniJson1.children.indexOf(d.id));
            return !arrayGroup1.indexOf(d.id); })*/
        .attr("id", function(d){
            return d.id;
        })
        .attr("class", function (d) {
            return d.children ? "parent" : "child";
        })
        .style("stroke", function(d){
            return !d.children ? colorStroke(d) : "#4682B4";
        })
        .style("fill", function (d) {
            return !d.children ? color(d.colour) : "white";
        })
        .style("cursor", function (d) {
            return !d.children ? "pointer" : "auto";
        })
        .attr("stroke-width", function(d){
            return !d.children ? "2px" : "1px";
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return d.r;
        })
        .style("display", function (d){
            //for (i = 0; i <= miniJson1.children.length; i++){
                if (arrayGroupN.indexOf(d.id)==-1 ){
                    //console.log(d.id);
                    return "none";
                }
                else{

                    return "unset";
                }
            //}
        })

        .on("click", function (d) {
            return (!d.children ? clickedNode(d) : zoom(node == d ? root : d));
        })

        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)
        .call(drag);
    text = vis.append("text")
        .attr("class", function (d) {
            return d.children ? "parent" : "child";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
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
        .style("display", function (d){
            //for (i = 0; i <= miniJson1.children.length; i++){
                if (arrayGroupN.indexOf(d.id)==-1){
                    //console.log(d.id);
                    return "none";
                }
                else{
                    //console.log(miniJson1.children[i].id);
                    return "unset";
                }
            //}
        })
        .style("fill", function (d){
            return !d.children ? colorRanking(d.ranking): "white";
        })
        .text(function (d) {
            if (!d.children) {
                return d.reputation;
            }
        });
   var data1 = pack.nodes(info);
    
    circles.transition()
    .duration(transitionTime)
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", function (d) {
        return d.r;
    });
    
    text.transition()
    .duration(transitionTime)
    .attr("x", function (d) {
        return d.x;
    })
    .attr("y", function (d) {
        return d.y;
    })
    .style("font-size", function (d) {
        var len = 3;
        var size = d.r / 3;
        size *= 10 / len;
        size += 1;
        return Math.round(size) + 'px';
    })
;

    $('#hope').show();
    $('#despair').show();
};




function doSubStep()
        {
            if (sub_step == 0)
            {
                showEncuestaDemographic();
            }
            else if (sub_step == 1)
            {
                showEncuestaPositive(true);
            }
            else if (sub_step == 2){
                showEncuestaSam();
            }
            else if (sub_step == 3){
                showEnunciadoTareaSeleccion();
            }
            else if (sub_step == 4){
                showEncuestaPreTask();
            }
            else if (sub_step == 5){
                showEncuestaSam();
            }
            else if (sub_step == 6){
                $('body').scrollTop(0);
                var time = timeStamp();
                $.post("http://localhost/ProyectoTesisBD/index.php/users/startOrganizationTask",{session:queryString["session"], start_time:time},
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok")
                            {
                                $.modal.close();
                                $('#runner1').runner('start');
                            }
                            else{
                                console.log("Error");
                            }
                        }
                        else{
                            console.log("Connection error");
                        }
                    }
                );
            }
            else if (sub_step == 7){
                $.modal.close();
                $('#runner1').hide();
                taskTime = 300000;
                $('#runner2').runner({
                    countdown: true,
                    startAt: taskTime,
                    stopAt: 0,
                    milliseconds: false,
                    autostart: false
                }).on('runnerFinish', function(eventObject, info) {
                    onNextStepClick();
                });
                //$('#runner').runner('reset');
                step = 2;
                $('#runner2').runner('start');
            }
            else if (sub_step == 8){
                showEncuestaPostTask();
            }
            else if (sub_step == 9){
                showEncuestaSam();
            }
            else if (sub_step == 10){
                showEncuestaCognitive();
            }
            else if (sub_step == 11){
                showEncuestaUserExperience();
            }
            else if (sub_step == 12){
                showEncuestaEngagement();
            }
            else if (sub_step == 13){
                if (queryString["panas"] == 0){
                    showEncuestaPositive(false);
                }
                else{
                    var time = timeStamp();
                    console.log("Here");
                    $.post("http://localhost/ProyectoTesisBD/index.php/users/logout",{session:queryString["session"], logout_time:time},
                        function (data, status){
                            if (status == "success"){
                                console.log("No Fail");
                                if (data["message"] == "ok")
                                {
                                    showInfoModal("¡Has terminado esta fase!", "Muchas gracias por participar en este estudio", false);
                                }
                                else{
                                    console.log("Error");
                                }
                            }
                            else{
                                console.log("Connection error");
                            }
                        }
                    );

                }
            }
            else if (sub_step == 14){
                var time = timeStamp();
                $.post("http://localhost/ProyectoTesisBD/index.php/users/logout",{session:queryString["session"], logout_time:time},
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok")
                            {
                                showInfoModal("¡Has terminado esta fase!", "Muchas gracias por participar en este estudio", false);
                            }
                            else{
                                console.log("Error");
                            }
                        }
                        else{
                            console.log("Connection error");
                        }
                    }
                );
            }
        }

        function nextSubStep(){
            sub_step++;
            console.log(sub_step);
            doSubStep();
        }

        function showInfoModal(title, message, escape){
            $('#info_modal_title').empty();
            $('#info_modal_title').text(title);
            $('#info_modal_message').empty();
            $('#info_modal_message').text(message);

            $('#info_modal').modal({
                        fadeDuration: 250,     // Number of milliseconds the fade transition takes (null means no transition)
                        fadeDelay: 1.0,
                        zIndex: 2000,
                        escapeClose: escape,
                        showClose: escape,
                        clickClose: escape,
                        opacity: escape ? 0.75 : 1,
                    });

        }

       function showEncuestaDemographic(){
            showFormModal('encuesta_demographic');
        }

        function showFormModal(modal_id){
            $('#'+modal_id).modal({
                    fadeDuration: 250,     // Number of milliseconds the fade transition takes (null means no transition)
                    fadeDelay: 1.0,
                    zIndex: 2000,           //escapeClose: false,clickClose: false,showClose: false
                    opacity: 1,
                    escapeClose: false,
                    clickClose: false,
                    showClose: false
                });

        }

        function showEnunciadoContexto(){
            showFormModal('contexto_tarea');
        }

        function showEnunciadoTareaPersonalizada()
        {
            showFormModal('enunciado_tarea_personalizada');
        }

        function showEnunciadoTareaSeleccion(){
            showFormModal('enunciado_tarea_seleccion');
        }

        function showEnunciadoTareaManipulacion(pre){
            if (pre){
                $('#tarea2_pregunta_1').text("Especies marinas que resultaron más afectadas producto del derrame");
                $('#tarea2_pregunta_2').text("Estimación de cantidad total de petróleo derramado en el Golfo de México en toneladas");
                $('#tarea2_pregunta_3').text("Técnica de contención de daño utilizada en las primeras semanas");
                $('#tarea2_pregunta_4').text("Indemnización de BP a los afectados");
            }
            else{
                $('#tarea2_pregunta_1').text("Aves que resultaron más afectadas producto del derrame");
                $('#tarea2_pregunta_2').text("Extensión del derrame en el Golfo de México en kilómetros");
                $('#tarea2_pregunta_3').text("Maniobras de limpieza y mitigación realizadas en las primeras semanas");
                $('#tarea2_pregunta_4').text("Aporte de BP a los costos de limpieza");
            }
            showFormModal('enunciado_tarea_manipulacion');
        }

        function showEncuestaSam(){
            showFormModal('encuesta_sam');
        }
        function showEncuestaPreTask(manipulation){
            if (manipulation){
                $('#msg_pre_task').text("la tarea a realizar:")
                showFormModal('encuesta_pre_tasK');
            }
            else{
                $('#msg_pre_task').text("el tópico de la tarea a realizar:")
                showFormModal('encuesta_pre_tasK');
            }
        }
        function showEncuestaPostTask(){
            showFormModal('encuesta_post_tasK');
        }
        function showEncuestaCognitive()
        {
            showFormModal('encuesta_cognitive');
        }
        function showEncuestaEngagement()
        {
            showFormModal('encuesta_engagement');
        }
        function showEncuestaPositive(pre)
        {
            if (pre){
                $('#title_positive').text("durante las últimas 24 horas");
            }
            else{
                $('#title_positive').text("durante este estudio");
            }
            showFormModal('encuesta_positive');

        }
        function showEncuestaDemographic(){
            showFormModal('encuesta_demographic');
        }
        function showEncuestaUserExperience()
        {
            showFormModal('encuesta_ux');
        }

        function sendUserExperience(button)
        {
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if (validateUserExperience()){
                var time = timeStamp();
                var answers = [$('input[name=q1_ux]:checked').val(),
                    $('input[name=q2_ux]:checked').val(),
                    $('input[name=q3_ux]:checked').val(),
                    $('input[name=q4_ux]:checked').val(),
                    $('input[name=q5_ux]:checked').val(),
                    $('input[name=q6_ux]:checked').val(),
                    $('input[name=q7_ux]:checked').val(),
                    $('input[name=q8_ux]:checked').val(),
                    $('input[name=q9_ux]:checked').val(),
                    $('input[name=q10_ux]:checked').val(),
                    $('input[name=q11_ux]:checked').val(),
                    $('input[name=q12_ux]:checked').val(),
                    $('input[name=q13_ux]:checked').val(),
                    $('input[name=q14_ux]:checked').val(),
                    $('input[name=q15_ux]:checked').val(),
                    $('input[name=q16_ux]:checked').val(),
                    $('input[name=q17_ux]:checked').val(),
                    $('input[name=q18_ux]:checked').val(),
                    $('input[name=q19_ux]:checked').val()];
                var session = queryString["session"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/userExperienceAnswer",
                    {   sessionId: session,
                        q1: answers[0],
                        q2: answers[1],
                        q3: answers[2],
                        q4: answers[3],
                        q5: answers[4],
                        q6: answers[5],
                        q7: answers[6],
                        q8: answers[7],
                        q9: answers[8],
                        q10: answers[9],
                        q11: answers[10],
                        q12: answers[11],
                        q13: answers[12],
                        q14: answers[13],
                        q15: answers[14],
                        q16: answers[15],
                        q17: answers[16],
                        q18: answers[17],
                        q19: answers[18],
                        time: time}, 
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                nextSubStep();
                                console.log("Enviado");
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_ux').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }

        }

        function validateUserExperience()
        {
            var answers = [$('input[name=q1_ux]:checked').val(),
                    $('input[name=q2_ux]:checked').val(),
                    $('input[name=q3_ux]:checked').val(),
                    $('input[name=q4_ux]:checked').val(),
                    $('input[name=q5_ux]:checked').val(),
                    $('input[name=q6_ux]:checked').val(),
                    $('input[name=q7_ux]:checked').val(),
                    $('input[name=q8_ux]:checked').val(),
                    $('input[name=q9_ux]:checked').val(),
                    $('input[name=q10_ux]:checked').val(),
                    $('input[name=q11_ux]:checked').val(),
                    $('input[name=q12_ux]:checked').val(),
                    $('input[name=q13_ux]:checked').val(),
                    $('input[name=q14_ux]:checked').val(),
                    $('input[name=q15_ux]:checked').val(),
                    $('input[name=q16_ux]:checked').val(),
                    $('input[name=q17_ux]:checked').val(),
                    $('input[name=q18_ux]:checked').val(),
                    $('input[name=q19_ux]:checked').val()];

            for(var i=0; i< answers.length; i++)
            {
                if (answers[i] == undefined)
                    return false;
            }

            return true;
        }

        function sendCognitive(button)
        {
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if(validateCognitive()){
                var time = timeStamp();
                var answers = [$('input[name=q1_mentally]:checked').val(),
                    $('input[name=q2_physically]:checked').val(),
                    $('input[name=q3_rushed]:checked').val(),
                    $('input[name=q4_success]:checked').val(),
                    $('input[name=q5_hard]:checked').val(),
                    $('input[name=q6_negativeAffect]:checked').val(),
                    $('input[name=q7_esfuerzo_rendimiento]:checked').val(),
                    $('input[name=q8_temporal_frustracion]:checked').val(),
                    $('input[name=q9_temporal_esfuerzo]:checked').val(),
                    $('input[name=q10_fisica_frustracion]:checked').val(),
                    $('input[name=q11_rendimiento_frustracion]:checked').val(),
                    $('input[name=q12_fisica_temporal]:checked').val(),
                    $('input[name=q13_fisica_rendimiento]:checked').val(),
                    $('input[name=q14_fisica_mental]:checked').val(),
                    $('input[name=q15_frustracion_esfuerzo]:checked').val(),
                    $('input[name=q16_rendimiento_mental]:checked').val(),
                    $('input[name=q17_rendimiento_temporal]:checked').val(),
                    $('input[name=q18_mental_esfuerzo]:checked').val(),
                    $('input[name=q19_mental_fisica]:checked').val(),
                    $('input[name=q20_esfuerzo_fisica]:checked').val(),
                    $('input[name=q21_frustracion_mental]:checked').val()];
                var session = queryString["session"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/cognitiveAnswer",
                    {   sessionId: session,
                        q1: answers[0],
                        q2: answers[1],
                        q3: answers[2],
                        q4: answers[3],
                        q5: answers[4],
                        q6: answers[5],
                        q7: answers[6],
                        q8: answers[7],
                        q9: answers[8],
                        q10: answers[9],
                        q11: answers[10],
                        q12: answers[11],
                        q13: answers[12],
                        q14: answers[13],
                        q15: answers[14],
                        q16: answers[15],
                        q17: answers[16],
                        q18: answers[17],
                        q19: answers[18],
                        q20: answers[19],
                        q21: answers[20],
                        time: time}, 
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                nextSubStep();
                                console.log("Enviado");
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_cognitive').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }
        }

        function validateCognitive()
        {
            var answers = [$('input[name=q1_mentally]:checked').val(),
            $('input[name=q2_physically]:checked').val(),
            $('input[name=q3_rushed]:checked').val(),
            $('input[name=q4_success]:checked').val(),
            $('input[name=q5_hard]:checked').val(),
            $('input[name=q6_negativeAffect]:checked').val(),
            $('input[name=q7_esfuerzo_rendimiento]:checked').val(),
            $('input[name=q8_temporal_frustracion]:checked').val(),
            $('input[name=q9_temporal_esfuerzo]:checked').val(),
            $('input[name=q10_fisica_frustracion]:checked').val(),
            $('input[name=q11_rendimiento_frustracion]:checked').val(),
            $('input[name=q12_fisica_temporal]:checked').val(),
            $('input[name=q13_fisica_rendimiento]:checked').val(),
            $('input[name=q14_fisica_mental]:checked').val(),
            $('input[name=q15_frustracion_esfuerzo]:checked').val(),
            $('input[name=q16_rendimiento_mental]:checked').val(),
            $('input[name=q17_rendimiento_temporal]:checked').val(),
            $('input[name=q18_mental_esfuerzo]:checked').val(),
            $('input[name=q19_mental_fisica]:checked').val(),
            $('input[name=q20_esfuerzo_fisica]:checked').val(),
            $('input[name=q21_frustracion_mental]:checked').val()];

            for(var i=0; i< answers.length; i++)
            {
                if (answers[i] == undefined)
                    return false;
            }

            return true;
        }

        function sendEngagement(button)
        {
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if(validateEngagement()){
                var time = timeStamp();
                var answers = [$('input[name=q1_lost_myself]:checked').val(),
                $('input[name=q2_lost_track_time]:checked').val(),
                $('input[name=q3_blocked_out]:checked').val(),
                $('input[name=q4_lost_track_world]:checked').val(),
                $('input[name=q5_slipped_away]:checked').val(),
                $('input[name=q6_absorbed]:checked').val(),
                $('input[name=q7_let_go]:checked').val(),
                $('input[name=q8_drawn]:checked').val(),
                $('input[name=q9_involved]:checked').val(),
                $('input[name=q10_fun_experience]:checked').val(),
                $('input[name=q11_curiosity]:checked').val(),
                $('input[name=q12_content]:checked').val(),
                $('input[name=q13_interested]:checked').val(),
                $('input[name=q14_worthwhile]:checked').val(),
                $('input[name=q15_success]:checked').val(),
                $('input[name=q16_dont_work]:checked').val(),
                $('input[name=q17_rewarding]:checked').val(),
                $('input[name=q18_recommend]:checked').val(),
                $('input[name=q19_attractive]:checked').val(),
                $('input[name=q20_aesthetically]:checked').val(),
                $('input[name=q21_liked]:checked').val(),
                $('input[name=q22_appealed]:checked').val(),
                $('input[name=q23_pleasing]:checked').val(),
                $('input[name=q24_frustrated]:checked').val(),
                $('input[name=q25_confusing]:checked').val(),
                $('input[name=q26_annoyed]:checked').val(),
                $('input[name=q27_discouraged]:checked').val(),
                $('input[name=q28_taxing]:checked').val(),
                $('input[name=q29_demanding]:checked').val(),
                $('input[name=q30_control]:checked').val(),
                $('input[name=q31_couldnt]:checked').val()];
                var session = queryString["session"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/engagementAnswer",
                    {   sessionId: session,
                        q1: answers[0],
                        q2: answers[1],
                        q3: answers[2],
                        q4: answers[3],
                        q5: answers[4],
                        q6: answers[5],
                        q7: answers[6],
                        q8: answers[7],
                        q9: answers[8],
                        q10: answers[9],
                        q11: answers[10],
                        q12: answers[11],
                        q13: answers[12],
                        q14: answers[13],
                        q15: answers[14],
                        q16: answers[15],
                        q17: answers[16],
                        q18: answers[17],
                        q19: answers[18],
                        q20: answers[19],
                        q21: answers[20],
                        q22: answers[21],
                        q23: answers[22],
                        q24: answers[23],
                        q25: answers[24],
                        q26: answers[25],
                        q27: answers[26],
                        q28: answers[27],
                        q29: answers[28],
                        q30: answers[29],
                        q31: answers[30],
                        time: time}, 
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                nextSubStep();
                                console.log("Enviado");
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_cognitive').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }
        }

        function validateEngagement()
        {
            
            var answers = [$('input[name=q1_lost_myself]:checked').val(),
            $('input[name=q2_lost_track_time]:checked').val(),
            $('input[name=q3_blocked_out]:checked').val(),
            $('input[name=q4_lost_track_world]:checked').val(),
            $('input[name=q5_slipped_away]:checked').val(),
            $('input[name=q6_absorbed]:checked').val(),
            $('input[name=q7_let_go]:checked').val(),
            $('input[name=q8_drawn]:checked').val(),
            $('input[name=q9_involved]:checked').val(),
            $('input[name=q10_fun_experience]:checked').val(),
            $('input[name=q11_curiosity]:checked').val(),
            $('input[name=q12_content]:checked').val(),
            $('input[name=q13_interested]:checked').val(),
            $('input[name=q14_worthwhile]:checked').val(),
            $('input[name=q15_success]:checked').val(),
            $('input[name=q16_dont_work]:checked').val(),
            $('input[name=q17_rewarding]:checked').val(),
            $('input[name=q18_recommend]:checked').val(),
            $('input[name=q19_attractive]:checked').val(),
            $('input[name=q20_aesthetically]:checked').val(),
            $('input[name=q21_liked]:checked').val(),
            $('input[name=q22_appealed]:checked').val(),
            $('input[name=q23_pleasing]:checked').val(),
            $('input[name=q24_frustrated]:checked').val(),
            $('input[name=q25_confusing]:checked').val(),
            $('input[name=q26_annoyed]:checked').val(),
            $('input[name=q27_discouraged]:checked').val(),
            $('input[name=q28_taxing]:checked').val(),
            $('input[name=q29_demanding]:checked').val(),
            $('input[name=q30_control]:checked').val(),
            $('input[name=q31_couldnt]:checked').val()];

            for(var i=0; i< answers.length; i++)
            {
                if (answers[i] == undefined)
                    return false;
            }

            return true;
        }


        function sendPositive(button)
        {
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if(validatePositive()){
                var time = timeStamp();
                var answers = [$('input[name=q1_amused]:checked').val() ,
                    $('input[name=q2_angry]:checked').val() ,
                    $('input[name=q3_ashamed]:checked').val(),
                    $('input[name=q4_awe]:checked').val(),
                    $('input[name=q5_contemptuous]:checked').val(),
                    $('input[name=q6_disgust]:checked').val(),
                    $('input[name=q7_embarrassed]:checked').val(),
                    $('input[name=q8_grateful]:checked').val(),
                    $('input[name=q9_guilty]:checked').val(),
                    $('input[name=q10_hate]:checked').val(),
                    $('input[name=q11_hopeful]:checked').val(),
                    $('input[name=q12_inspired]:checked').val(),
                    $('input[name=q13_interested]:checked').val(),
                    $('input[name=q14_joyful]:checked').val(),
                    $('input[name=q15_love]:checked').val(),
                    $('input[name=q16_proud]:checked').val(),
                    $('input[name=q17_sad]:checked').val(),
                    $('input[name=q18_scared]:checked').val(),
                    $('input[name=q19_serene]:checked').val(),
                    $('input[name=q20_stressed]:checked').val()];
                var session = queryString["session"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/positiveAnswer",
                    {   sessionId: session,
                        q1: answers[0],
                        q2: answers[1],
                        q3: answers[2],
                        q4: answers[3],
                        q5: answers[4],
                        q6: answers[5],
                        q7: answers[6],
                        q8: answers[7],
                        q9: answers[8],
                        q10: answers[9],
                        q11: answers[10],
                        q12: answers[11],
                        q13: answers[12],
                        q14: answers[13],
                        q15: answers[14],
                        q16: answers[15],
                        q17: answers[16],
                        q18: answers[17],
                        q19: answers[18],
                        q20: answers[19],
                        time: time}, 
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                nextSubStep();
                                console.log("Positive enviada");
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_positive').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }

        }

        function validatePositive()
        {
            var answers = [$('input[name=q1_amused]:checked').val() ,
            $('input[name=q2_angry]:checked').val() ,
            $('input[name=q3_ashamed]:checked').val(),
            $('input[name=q4_awe]:checked').val(),
            $('input[name=q5_contemptuous]:checked').val(),
            $('input[name=q6_disgust]:checked').val(),
            $('input[name=q7_embarrassed]:checked').val(),
            $('input[name=q8_grateful]:checked').val(),
            $('input[name=q9_guilty]:checked').val(),
            $('input[name=q10_hate]:checked').val(),
            $('input[name=q11_hopeful]:checked').val(),
            $('input[name=q12_inspired]:checked').val(),
            $('input[name=q13_interested]:checked').val(),
            $('input[name=q14_joyful]:checked').val(),
            $('input[name=q15_love]:checked').val(),
            $('input[name=q16_proud]:checked').val(),
            $('input[name=q17_sad]:checked').val(),
            $('input[name=q18_scared]:checked').val(),
            $('input[name=q19_serene]:checked').val(),
            $('input[name=q20_stressed]:checked').val()];

            for(var i=0; i< answers.length; i++)
            {
                if (answers[i] == undefined)
                    return false;
            }

            return true;
        }

/*$(function() {
$("#encuesta_demographic").click(
    function(this) {    sendDemographic(this);}

);
);*/
/*
$("#encuesta_demographic").click(
    function(this) {    sendDemographic(this);}

);*/

$("#encuesta_pre_tasK input[type='button']").on("click", clickSendPreTask); 
$("#encuesta_post_tasK input[type='button']").on("click", clickSendPostTask);

$("#enunciado_tarea_seleccion tr td input[type='submit']").on("click", nextSubStep);
$("#enunciado_tarea_manipulacion tr td input[type='submit']").on("click", nextSubStep);  

$("#encuesta_sam tr td input[type='button']").on("click", clickSendSAM); 
$("#encuesta_demographic font table tr td input[type='submit']").on("click", clickSendDemographic); 
$("#encuesta_cognitive tr td input[type='button']").on("click", clickSendCognitive); 
$("#encuesta_engagement tr td input[type='button']").on("click", clickSendEngagement); 
$("#encuesta_positive tr td input[type='button']").on("click", clickSendPositive);
$("#encuesta_ux font table tr td input[type='submit']").on("click", clickUserExperience);

function clickSendPreTask() {
    sendPreTask(this);
};

function clickSendPostTask() {
    sendPostTask(this);
};

function clickSendSAM() {
    sendSAM(this);
};
function clickSendDemographic() {
    sendDemographic(this);
};
function clickSendCognitive() {
    sendCognitive(this);
};
function clickSendEngagement() {
    sendEngagement(this);
};
function clickSendPositive() {
    sendPositive(this);
};
function clickUserExperience() {
    sendUserExperience(this);
};


function sendDemographic(button)
        {
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if(validateDemographic()){
                var time = timeStamp();
                var age = $('input[name=age]').val();
                var sex = $('input[name=sex]:checked').val();
                var mano= $('input[name=mano]:checked').val();
                var program = $('input[name=program]:checked').val();
                var major = $('input[name=major]').val();
                var os = $('input[name=os]:checked').val();
                var browser = $('input[name=browser]:checked').val();
                var body = $('input[name=bodyGesture]:checked').val();
                var whichBodyGesture = $('input[name=whichBodyGesture]').val();
                var userId = queryString["userId"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/demographicAnswer",
                    {   userId: userId,
                        edad: age,
                        sexo: sex,
                        mano: mano,
                        estudios: program,
                        programa: major,
                        os: os,
                        browser: browser,
                        bodyGesture: body,
                        whichBodyGesture, whichBodyGesture,
                        time: time}, 
                    function (data, status){
                        console.log(data);
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                nextSubStep();
                                console.log("Enviado");
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_demographic').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }

        }


        function validateDemographic()
        {
            var age = $('input[name=age]').val();
            var sex = $('input[name=sex]:checked').val();
            var mano= $('input[name=mano]:checked').val();
            var program = $('input[name=program]:checked').val();
            var major = $('input[name=major]').val();
            var os = $('input[name=os]:checked').val();
            var browser = $('input[name=browser]:checked').val();
            var body = $('input[name=bodyGesture]:checked').val();

            if (age == "")
                return false;
            if (sex == undefined)
                return false;
            if (mano == undefined)
                return false;
            if (program == undefined)
                return false;
            if (major == "")
                return false;
            if (os == undefined)
                return false;
            if (browser == undefined)
                return false;
            if (body == undefined)
                return false;

            return true;

        }

                function sendSAM(button){
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if(validateSAM()){
                var time = timeStamp();
                var selectedValence = $('input[name=valence]:checked').val();
                var selectedActivation = $('input[name=activation]:checked').val();
                var selectedControl= $('input[name=control]:checked').val();
                var session = queryString["session"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/samAnswer",
                    {sessionId: session, q1: selectedValence, q2: selectedActivation, q3: selectedControl, step: sub_step, time: time}, 
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                resetSAM();
                                nextSubStep();
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_sam').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }
        }

        function validateSAM(){
            var selectedValence = $('input[name=valence]:checked').val();
            var selectedActivation = $('input[name=activation]:checked').val();
            var selectedControl= $('input[name=control]:checked').val();
            if (selectedValence == undefined)
                return false;
            if (selectedActivation == undefined)
                return false;
            if (selectedControl == undefined)
                return false;
            return true;
        }

        function resetSAM(){
            $('input[name=valence]:checked').prop("checked", null);
            $('input[name=activation]:checked').prop("checked", null);
            $('input[name=control]:checked').prop("checked", null);
        }

        function sendPreTask(button){
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if(validatePreTask()){
                var time = timeStamp();
                var selectedQ1 = $('input[name=q1_pre_task]:checked').val();
                var selectedQ2 = $('input[name=q2_pre_task]:checked').val();
                var session = queryString["session"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/preTaskAnswer",
                    {sessionId: session, q1: selectedQ1, q2: selectedQ2, step: sub_step, time: time}, 
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                resetPreTask();
                                nextSubStep();
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_pretask').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }

        }

        function validatePreTask(){
            var selectedQ1 = $('input[name=q1_pre_task]:checked').val();
            var selectedQ2 = $('input[name=q2_pre_task]:checked').val();
            if (selectedQ1 == undefined)
                return false;
            if (selectedQ2 == undefined)
                return false;
            return true;
        }

        function resetPreTask(){
            $('input[name=q1_pre_task]:checked').prop("checked", null);
            $('input[name=q2_pre_task]:checked').prop("checked", null);
        }

        function sendPostTask(button){
            $(button).prop("disabled", true);
            $(button).val("Espere...");
            if(validatePostTask()){
                var time = timeStamp();
                var selectedQ1 = $('input[name=q1_post_task]:checked').val();
                var selectedQ2 = $('input[name=q2_post_task]:checked').val();
                var session = queryString["session"];
                $.post("http://localhost/ProyectoTesisBD/index.php/users/postTaskAnswer",
                    {sessionId: session, q1: selectedQ1, q2: selectedQ2, step: sub_step, time: time}, 
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok"){
                                $(button).prop("disabled", false);
                                $(button).val("Enviar");
                                resetPostTask();
                                nextSubStep();
                            }
                            else{
                                console.log("Connection error: "+data);
                            }
                        }
                });
            }
            else{
                $('#error_message_posttask').show();
                $(button).prop("disabled", false);
                $(button).val("Enviar");
            }

        }

        function validatePostTask(){
            var selectedQ1 = $('input[name=q1_post_task]:checked').val();
            var selectedQ2 = $('input[name=q2_post_task]:checked').val();
            if (selectedQ1 == undefined)
                return false;
            if (selectedQ2 == undefined)
                return false;
            return true;
        }

        function resetPostTask(){
            $('input[name=q1_post_task]:checked').prop("checked", null);
            $('input[name=q2_post_task]:checked').prop("checked", null);
        }

    function getIDArraysOfImages(images, groupID){
        var arreglo = [];
        for(var i=0; i<images.length;i++){
            arreglo.push({image : images[i], group: groupID});
        }
        return arreglo;
    }  

function sendSelectedImages(){
    console.log("sendSelectedImages intro");
    var groups;
    groups = getIDArraysOfImages(arrayGroup1, 1);
    groups = groups.concat(getIDArraysOfImages(arrayGroup2,2));
    groups = groups.concat(getIDArraysOfImages(arrayGroup3,3));
    groups = groups.concat(getIDArraysOfImages(arrayGroup4,4));
    console.log(groups);
    $.post("http://localhost/ProyectoTesisBD/index.php/users/selectedImages",
        {
            groups: groups,
            session: queryString["session"]
        },
        function (data, status){
            if (status == "success"){
                console.log("insertado");
                nextSubStep();
            }
            else{
                console.log("error");
        }
    });
};

function onNextStepClick()
{
    
    console.log("Step:" + step)
    // Se encuentra en etapa 1, ir a etapa 2
    
   if (step == 1 ){
        $('#runner1').runner('stop');
        if (queryString["panas"] == 1){
            showEnunciadoTareaManipulacion(true);
        }
        else{
            showEnunciadoTareaManipulacion(false);
        }
        
        

   }
   else if (step == 2){
        $('#runner2').runner('stop');
        //goToManipulationStep();
        console.log("SL: ",selection_log.length);
        // Enviar Log
        $.post("http://localhost/ProyectoTesisBD/index.php/users/selectionLogEntry",
        {
            entry: selection_log,
            session: queryString["session"]
        },
        function (data, status){
            console.log("problem:", data);
            if (status == "success"){
                
                var time = timeStamp();
                $.post("http://localhost/ProyectoTesisBD/index.php/users/finishOrganizationTask",{session:queryString["session"], finish_time:time},
                    function (data, status){
                        if (status == "success"){
                            if (data["message"] == "ok")
                            {
                                //nextSubStep();
                                // Resetear reloj
                                console.log("sendSelectedImages");
                            
                                sendSelectedImages();
                            }
                            else{
                                console.log("Error");
                            }
                        }
                        else{
                            console.log("Connection error");
                        }
                    }
                );
            }
            else{
                console.log("error");
            }
        });
    }
}



})