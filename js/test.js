/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var jsondata = $.getJSON("json/test.json", function (jsondata) {

        //console.log(jsondata.children[0].children[0].url);
        console.log("Setting up variables...");
        var w = 1280,
                h = 800,
                r = 720,
                x = d3.scale.linear().range([0, r]),
                y = d3.scale.linear().range([0, r]),
                node,
                root,
                isDragging = false,
                dragPxOrigen,
                dragPyOrigen,
                variable = 0,
                dataSource = 0,
                zoomIn = true,
                ghost,
                sortOrder = 0;

        var color = d3.scale.ordinal()
                .range(["#696969", "#676A6B", "#656B6D", "#646C6F", "#626E72", "#606F74", "#5F7076", "#5D7279", "#5C737B", "#5A747D", "#587680", "#577782", "#557884", "#547A87", "#527B89", "#507C8B", "#4F7E8D", "#4D7F90", "#4B8092", "#4A8294", "#488397", "#478499", "#45869B", "#43879E", "#4288A0", "#408AA2", "#3F8BA5", "#3D8CA7", "#3B8EA9", "#3A8FAB", "#3890AE", "#3692B0", "#3593B2", "#3394B5", "#3295B7", "#3097B9", "#2E98BC", "#2D99BE", "#2B9BC0", "#2A9CC3", "#289DC5", "#269FC7", "#25A0C9", "#23A1CC", "#21A3CE", "#20A4D0", "#1EA5D3", "#1DA7D5", "#1BA8D7", "#19A9DA", "#18ABDC", "#16ACDE", "#14ADE1", "#13AFE3", "#11B0E5", "#10B1E7", "#0EB3EA", "#0CB4EC", "#0BB5EE", "#09B7F1", "#08B8F3", "#06B9F5", "#04BBF8", "#03BCFA", "#01BDFC", "#00BFFF"])
                .domain(d3.range(0, 66));

        console.log("Setting up the pack function...");
        var pack = d3.layout.pack()
                .size([r, r])
                .value(function (d) {
                    return d.size;
                });
        console.log(jsondata);
        console.log("Parsing the JSON array...");
        node = root = jsondata;

        console.log("Packing the nodes...");
        var nodes = pack.nodes(root);

        console.log("Adding the svg to the document...");
        var vis = d3.select("#svg-container").append("svg:svg", "h2")
                .attr("width", w)
                .attr("height", h)
                .append("svg:g")
                .attr("transform", "translate(" + (w - 1.75 * r) / 2 + "," + (h - 0.95 * r) / 2 + ")");

        var buttonData = ["Ranking", "Fecha", "Legibilidad", "Reputación"];
        var buttonDiv = d3.select("#svg-container").append("svg:svg", "h2")
                .attr("width", r)
                .attr("height", 50);
        var buttons = buttonDiv.selectAll(".updateButton")
                .data(buttonData)
                .enter()
                .append('g')
                .attr("class", "updateButton")
                .on("click", function (d, i) {
                    dataSource = i;
                    updateVis();
                });
        buttons.append("rect")
                .attr("x", function (d, i) {
                    return (i * 100) + 100;
                })
                .attr("width", 98)
                .attr("height", 25)
                .attr("ry", 5)
                .style("stroke", "#00B2EE")
                .style("fill", "#00B2EE");
        buttons.append("text")
                .attr("x", function (d, i) {
                    return (i * 100) + (100 / 2) + 98;
                })
                .attr("y", 12)
                .attr("dy", "0.35em")
                .style("text-anchor", "middle")
                .style("font-size", "15px")
                .text(function (d) {
                    return d;
                });

        var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 1e-6);

        // $('#page-container').unbind('click');
        console.log("Setting up the drag function...");
        var drag = d3.behavior.drag()
                .on("drag", dragmove)
                .on("dragstart", dragstart)
                .on("dragend", dragend);

        var dropdiv = d3.select('#auxiliar')
                .append("svg")
                .attr("width", 800)
                .attr("height", 50)
                .style("background-color", "#FFFFFF")
                .style("display", "inline-block");

        console.log("Configuring all of the svg:circles...");
        var circle = vis.selectAll("circle")
                .data(nodes)
                .enter().append("svg:circle")
                .attr("class", function (d) {
                    return d.children ? "parent" : "child";
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
                .style("fill", function (d) {
                    return color(d.colour);
                })
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseout", mouseout)

                .on("click", function (d) {
                    return zoom(node == d ? root : d);
                })
                .call(drag)
                .append("title").text(function (d) {
            return d.name;
        });

        console.log("Configuring all of the svg:texts...");
        var text = vis.selectAll("text")
                .data(nodes)
                .enter().append("svg:text")
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
                .style("opacity", function (d) {
                    return /*d.r > 20 ? 1 : 0*/1;
                })
                .style("font-family", function (d) {
                    return "adelle,sans-serif";
                })
                .style("font-size", function (d) {
                    var len = 3;/*d.name.substring(0, d.r / 3).length;*/
                    var size = d.r / 3;
                    size *= 10 / len;
                    size += 1;
                    return Math.round(size) + 'px';
                })
                .text(function (d) {
                    if (!d.children) {
                        return d.reputation /*+
                         (d.children ? "" : ": " + format(d.value))*/;
                    }
                });

        console.log("Binding the zoom function");
        d3.select(window).on("click", function () {
            zoom(root);
        });


        console.log("Setting up the zoom function...");
        function zoom(d, i) {
            if (d.children) {//
                var k = r / d.r / 2;
                x.domain([d.x - d.r, d.x + d.r]);
                y.domain([d.y - d.r, d.y + d.r]);

                var t = vis.transition()
                        .duration(d3.event.altKey ? 7500 : 750);

                t.selectAll("circle")
                        .attr("cx", function (d) {
                            return x(d.x);
                        })
                        .attr("cy", function (d) {
                            return y(d.y);
                        })
                        .attr("r", function (d) {
                            return k * d.r;
                        });

                t.selectAll("text")
                        .attr("x", function (d) {
                            return x(d.x);
                        })
                        .attr("y", function (d) {
                            return y(d.y);
                        })
                        .style("opacity", function (d) {
                            return 1;
                        })
                        .style("font-family", function (d) {
                            return "adelle,sans-serif";
                        });/*
                         .style("font-size", function (d) {
                         
                         var len;
                         if (!zoomIn && d.depth==0){
                         len = 2;
                         console.log("zoom in cazzo")
                         zoomIn = false;
                         }
                         else if (zoomIn && d.depth==1){
                         len = 3;
                         zoomIn = true;
                         }
                         var size = d.r / 3;
                         size *= 10 / len;
                         size += 1;
                         return   Math.round(size) + 'px';
                         });*/
                if (!d3.event.altKey) {
                    if (zoomIn && d.depth == 1) {
                        console.log("zoom in");
                        console.log("Nivel nodo: " + d.depth);
                        t.selectAll("text")

                                .attr("x", function (d) {
                                    return x(d.x);
                                })
                                .attr("y", function (d) {
                                    return y(d.y);
                                })
                                .style("opacity", function (d) {
                                    return 1;
                                })
                                .style("font-family", function (d) {
                                    return "adelle,sans-serif";
                                })
                                .style("font-size", function (d) {
                                    var len = 2;
                                    var size = d.r / 3;
                                    size *= 10 / len;
                                    size += 1;
                                    return Math.round(size) + 'px';
                                });
                        zoomIn = false;
                    }
                    if (!zoomIn && d.depth == 0) {
                        console.log("zoom out");
                        t.selectAll("text")
                                .attr("x", function (d) {
                                    return x(d.x);
                                })
                                .attr("y", function (d) {
                                    return y(d.y);
                                })
                                .style("opacity", function (d) {
                                    return 1;
                                })
                                .style("font-family", function (d) {
                                    return "adelle,sans-serif";
                                })
                                .style("font-size", function (d) {
                                    var len = 3;
                                    var size = d.r / 3;
                                    size *= 10 / len;
                                    size += 1;
                                    return Math.round(size) + 'px';
                                });
                        console.log("Nivel nodo: " + d.depth);
                        zoomIn = true;
                    }
                }
                node = d;
                d3.event.stopPropagation();
            }
        }
        console.log("Setting classes...");
        function classes(node) {
            var classes = [];

            function recurse(name, node) {
                if (node.children)
                    node.children.forEach(function (child) {
                        recurse(node.name, child);
                    });
                else
                    classes.push({packageName: name, id: node.ranking, className: node.name, snippet: node.description, value: node.size, reputation: node.reputation, date: node.date, colour: node.colour, url: node.url});
            }

            recurse(null, node);
            return {children: classes};
        }
        console.log("Starting drag...");
        function dragstart(d) {
            d3.event.sourceEvent.stopPropagation(); // silence other listeners
            if (!d.children) {
                console.log("Showing web page...");
                /*$.ajax({url: d.url, success: function (data) {
                 document.getElementById("page-container").innerHTML = data;
                 document.getElementById("page-container").onmousedown = disableclick;
                 }});*/
                document.getElementById('page-container').src = d.url;
                document.getElementById("i1-ranking").innerHTML = rankingFix(d);
                document.getElementById("i2-date").innerHTML = d.date;
                document.getElementById("i3-rscore").innerHTML = scoreDiscretization(d);
                document.getElementById("i4-reputation").innerHTML = d.reputation;

                dragPxOrigen = d.x;
                dragPyOrigen = d.y;

                ghost = vis.append("svg:circle")
                        .attr("id", d.id)
                        .attr("cx", dragPxOrigen)
                        .attr("cy", dragPyOrigen)
                        .attr("r", d.r)
                        /*.style("fill", function (d) {
                         return color(d.date);
                         })*/
                        .style("fill", d.date)
                        .style("opacity", 0.7)
                        .style("z-index", 5);
                isDragging = true;
                console.log(d.name);
            }
        }

        function dragmove(d) {
            if (!d.children) {
                isDragging = true;
                if (isDragging) {
                    console.log(d3.mouse(this)[0]);
                    //isDragging = true;
                    ghost.attr("cx", d3.mouse(this)[0]);
                    ghost.attr("cy", d3.mouse(this)[1]);
                }
            }
        }

        function dragend(d) {
            if (ghost != null) {
                if (ghost.attr("cy") < 0 && ghost.attr("cx")<800) {
                    
                    if (ghost.attr("cx") > 0 && ghost.attr("cx") < 200) {
                        console.log("Container 1");
                    }
                    if (ghost.attr("cx") > 200 && ghost.attr("cx") < 400) {
                        console.log("Container 2");
                    }
                    if (ghost.attr("cx") > 400 && ghost.attr("cx") < 600) {
                        console.log("Container 3");
                    }
                    if (ghost.attr("cx") > 600 && ghost.attr("cx") < 800) {
                        console.log("Container 4");
                    }
                    ghost.attr("cx", d3.mouse(this)[0]);
                    ghost.attr("cy", d3.mouse(this)[1]);
                    ghost.style("fill", "red");
                    /*variable++;
                    var somevar1 = "your variable1";
                    var somevar2 = "your variable2";
                    $.ajax({
                        type: "POST",
                        url: "cazzo.php",
                        data: "variable1=" + somevar1 + "\u0026variable2=" + somevar2,
                        success: function () {
                            console.log("Insert in BD...");
                        }
                    });*/

                    console.log("Saving node...");
                }
                else {
                    ghost.attr("cx", dragPxOrigen);
                    ghost.attr("cy", dragPyOrigen);
                    console.log("No valid action. Node outside of drop area..");
                }
                isDragging = false;

                ghost.remove();

                /*if (!d.children)
                 {
                 if (d.y < 0) {
                 d3.select(this)
                 .attr("x", d.x)
                 .attr("y", d.y)
                 .style("fill", "red");
                 }
                 else {
                 d.x = dragPxOrigen;
                 d.y = dragPyOrigen;
                 }
                 isDragging = false;
                 }*/
            }
        }

        function mouseover() {
            if (true) {
                div.transition()
                        .duration(500)
                        .style("opacity", 1);
            }
        }

        function mousemove(d) {
            if (d.depth > 0) {
                div
                        .text(d.name)
                        .style("left", (d3.event.pageX - 34) + "px")
                        .style("top", (d3.event.pageY - 12) + "px");
            }
        }

        function mouseout() {
            if (true) {
                div.transition()
                        .duration(500)
                        .style("opacity", 1e-6);
            }
        }


/*
        function disableclick(event)
        {
            if (event.button == 0 || event.button == 1 || event.button == 2)
            {
                alert("Nope");
                return false;
            }
        }*/

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

        function rankingFix(d)
        {
            var rank = parseInt(d.ranking) + 1;
            return rank;
        }

        function sortingDate(d) {
            sortOrder += 1;

            var result;
            switch (sortOrder % 2) {
                case 0:
                    result = 65 / d.colour;

                case 1:
                    result = d.colour;
            }
            return result;
        }


        function updateVis() {

            if (dataSource == 0) {
                pack.value(function (d) {
                    return d.size;
                });
            }
            if (dataSource == 1) {
                pack.value(function (d) {
                    return sortingDate(d);
                });
            }
            if (dataSource == 2) {
                pack.value(function (d) {
                    return (d.rscore + 1);
                });
            }
            if (dataSource == 3) {
                pack.value(function (d) {
                    return d.reputation + 1;
                });
            }
            /*
            text.transition()
                    .duration(50000)
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
                    .text(function (d) {
                        if (true) {
                            return d.reputation;
                        }
                    });

            circle.transition()
                    .duration(5000)
                    .attr("cx", function (d) {
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        return d.y;
                    })
                    .attr("r", function (d) {
                        return d.r;
                    });
*/
            var data = pack.nodes(jsondata);


        }
        ;

    });

});