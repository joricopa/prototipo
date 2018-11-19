/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var contenidoTxt= new Array();
var archivoTxt= new XMLHttpRequest();
var fileRuta= 'datos.txt';
archivoTxt.open("GET",fileRuta,false);
archivoTxt.send(null);
var txt= archivoTxt.responseText;
console.log("texto");
console.log(txt);
console.log("texto");
var idSesion=parseInt(txt);
console.log("ESTE ");
console.log(idSesion);
console.log("ESTE ");
//console.log("idSesion")
//console.log(idSesion)
//console.log("idSesion")
var idPagina=0;
var grupoActual=0; 
var clic = 1;
var tarea= localStorage.getItem("xd");
console.log("tarea")
console.log(tarea)
var idUsuario= localStorage.getItem("idUsuario");
console.log("idUsuario")
console.log(idUsuario)
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
//guardaPaginator();

function divLogin(){ 
   if(clic==1){
   document.getElementById("page-container").style.height = "0px";
   document.getElementById("botonMostrarOcultar").value="Mostrar Página";
   clic = clic + 1;
   console.log(idSesion)
   $.post("insertaraccion.php",{accion:'2',idAsociado:idPagina,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
   } else{
       document.getElementById("page-container").style.height = "919px";
       document.getElementById("botonMostrarOcultar").value="Ocultar Página";      
    clic = 1;
    console.log(idSesion)
    $.post("insertaraccion.php",{accion:'1',idAsociado:idPagina,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
   }   
}
 var valorQuery;
var text = {};
var taskTime = 600000;
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

var queryString = getQueryString();

if (queryString["panas"] == 1){
    conjunto = 'json/G1.json';
}
else{
    conjunto = 'json/G2.json';
}

$(document).ready(function () {
    $.getJSON(conjunto, function (data) {
        text = data;
        var order = $("#sort").val();
        console.log(order)
        //bb();
        
        $('#query1').css('display', 'none');
        $('#query2').css('display', 'none');
        $('#query3').css('display', 'none');
        $('#query4').css('display', 'none');
        $('#query5').css('display', 'none');
        $('#query6').css('display', 'none');
        $('#query7').css('display', 'none');
        $('#query8').css('display', 'none');
        $('ul li').click(function () {
            console.log("hola1")
            $('#query0').css('display', 'none');
            $('#query1').css('display', 'none');
            $('#query2').css('display', 'none');
            $('#query3').css('display', 'none');
            $('#query4').css('display', 'none');
            $('#query5').css('display', 'none');
            $('#query6').css('display', 'none');
            $('#query7').css('display', 'none');
            $('#query8').css('display', 'none');
            if ($(this).attr('id') == '1') {
                $('#query1').css('display', '');
                $('#1').css('background-color', '#c8787a');
                $('#2').css('background-color', '#D9D9D9');
                $('#3').css('background-color', '#D9D9D9');
                $('#4').css('background-color', '#D9D9D9');
                $('#5').css('background-color', '#d9a2a4');
                $('#6').css('background-color', '#d8ee80');
                $('#7').css('background-color', '#85b3fe');
                $('#8').css('background-color', '#5bc183');                 
                generateResults(0, order, text);
                console.log("hola2")
                bb();
            }
            if ($(this).attr('id') == '2') {
                $('#query2').css('display', '');
                $('#2').css('background-color', '#C6E746');
                $('#1').css('background-color', '#D9D9D9');
                $('#3').css('background-color', '#D9D9D9');
                $('#4').css('background-color', '#D9D9D9');
                $('#5').css('background-color', '#d9a2a4');
                $('#6').css('background-color', '#d8ee80');
                $('#7').css('background-color', '#85b3fe');
                $('#8').css('background-color', '#5bc183');  
                generateResults(1, order, text);
                console.log("hola3")
                bb();
            }
            if ($(this).attr('id') == '3') {
                $('#query3').css('display', '');
                $('#3').css('background-color', '#4d90fe');
                $('#1').css('background-color', '#D9D9D9');
                $('#2').css('background-color', '#D9D9D9');
                $('#4').css('background-color', '#D9D9D9');
                $('#5').css('background-color', '#d9a2a4');
                $('#6').css('background-color', '#d8ee80');
                $('#7').css('background-color', '#85b3fe');
                $('#8').css('background-color', '#5bc183');  
                generateResults(2, order, text);
                console.log("hola4")
                bb();
            }
            if ($(this).attr('id') == '4') {
                $('#query4').css('display', '');
                $('#4').css('background-color', '#10a54a');
                $('#1').css('background-color', '#D9D9D9');
                $('#2').css('background-color', '#D9D9D9');
                $('#3').css('background-color', '#D9D9D9');
                $('#5').css('background-color', '#d9a2a4');
                $('#6').css('background-color', '#d8ee80');
                $('#7').css('background-color', '#85b3fe');
                $('#8').css('background-color', '#5bc183');  
                generateResults(3, order, text);
                console.log("hola5")
                bb();
            }
            if ($(this).attr('id') == '5') {
                $('#query5').css('display', '');
                $('#5').css('background-color', '#C8787A');
                $('#1').css('background-color', '#D9D9D9');
                $('#2').css('background-color', '#D9D9D9');
                $('#3').css('background-color', '#D9D9D9');
                $('#4').css('background-color', '#D9D9D9');
                $('#6').css('background-color', '#d8ee80');
                $('#7').css('background-color', '#85b3fe');
                $('#8').css('background-color', '#5bc183');  
                generateMiniResults(4, order, miniJson1);
                console.log("hola6")
            }
            if ($(this).attr('id') == '6') {
                $('#query6').css('display', '');
                $('#6').css('background-color', '#C6E746');
                $('#1').css('background-color', '#D9D9D9');
                $('#2').css('background-color', '#D9D9D9');
                $('#3').css('background-color', '#D9D9D9');
                $('#4').css('background-color', '#D9D9D9');
                $('#5').css('background-color', '#d9a2a4');
                $('#7').css('background-color', '#85b3fe');
                $('#8').css('background-color', '#5bc183');  
                generateMiniResults(5, order, miniJson2);
                console.log("hola7")
            }
            if ($(this).attr('id') == '7') {
                $('#query7').css('display', '');
                $('#7').css('background-color', '#4D90FE');
                $('#1').css('background-color', '#D9D9D9');
                $('#2').css('background-color', '#D9D9D9');
                $('#3').css('background-color', '#D9D9D9');
                $('#4').css('background-color', '#D9D9D9');
                $('#5').css('background-color', '#d9a2a4');
                $('#6').css('background-color', '#d8ee80');
                $('#8').css('background-color', '#5bc183');  
                generateMiniResults(6, order, miniJson3);
                console.log("hola8")
            }
            if ($(this).attr('id') == '8') {
                $('#query8').css('display', '');
                $('#8').css('background-color', '#10A54A');  
                $('#1').css('background-color', '#D9D9D9');
                $('#2').css('background-color', '#D9D9D9');
                $('#3').css('background-color', '#D9D9D9');
                $('#4').css('background-color', '#D9D9D9');
                $('#5').css('background-color', '#d9a2a4');
                $('#6').css('background-color', '#d8ee80');
                $('#7').css('background-color', '#85b3fe');
                generateMiniResults(7, order, miniJson4);
                console.log("hola9")
            }
        });
        //console.log(text.children[query].children.length);
    });
});

var arrayGroup1 = [],
    arrayGroup2 = [],
    arrayGroup3 = [],
    arrayGroup4 = [],
    visitados = [],    
	step=1,
    selection_log = [],
    c1Fauna = 0,
    c2Superficie = 0,
    c3Maniobras = 0,
    c4Responsabilidades = 0;

var sub_step = -1;

    //console.log("Soler!");

if (queryString["panas"] == 0)
    {
        sub_step = 2;
        doSubStep();
    }
else{
    sub_step = 0;
    doSubStep();
}

function bb()
{
    var order = $("#sort").val();
    generateResults(0, order, text);
    generateResults(1, order, text);
    generateResults(2, order, text);
    generateResults(3, order, text);
    generateMiniResults(4, order, miniJson1);
    generateMiniResults(5, order, miniJson2);
    generateMiniResults(6, order, miniJson3);
    generateMiniResults(7, order, miniJson4);

    $('#query1-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-1', dataelement: 'span', initval: 1, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});
    $('#query2-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-2', dataelement: 'span', initval: 0, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});
    $('#query3-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-3', dataelement: 'span', initval: 0, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});
    $('#query4-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-4', dataelement: 'span', initval: 0, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});
    $('#query5-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-5', dataelement: 'span', initval: 0, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});
    $('#query6-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-6', dataelement: 'span', initval: 0, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});
    $('#query7-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-7', dataelement: 'span', initval: 0, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});
    $('#query8-paginator').smartpaginator({totalrecords: 100, recordsperpage: 10, datacontainer: 'results-8', dataelement: 'span', initval: 0, next: 'Next', prev: 'Prev', first: 'First', last: 'Last', theme: 'black', onchange: onChange});

}


function onChange(newPageValue) {
    $.post("insertaraccion.php",{accion:'20',idAsociado:newPageValue,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    //alert(newPageValue);
    console.log("onchange function")
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

function change_state(obj) {
    var parentId;
    var localId;
    var child;
    var order = $("#sort").val(); 
    var err = false;

    if (obj.checked /*&& flag*/) {    
        for (i = 0; i < text.children.length; i++){
                text.children[i].children.sort(function (a, b) {
                    return parseFloat(a.id) - parseFloat(b.id);
                });
        }
		if (obj.id == "c1" && arrayGroup1.indexOf(obj.title)==-1){
			arrayGroup1.push(obj.title);
            
            parentId = parseInt(obj.value)+1;
            if (queryString["panas"] == 1){
                localId = obj.title-parentId*1000;
                }
            else{
                localId = obj.title-parentId*1000-100;
            }
            child = text.children[parentId-1].children[localId];
            miniJson1.children.push(child);
            $.post("insertaraccion.php",{accion:'15',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
            c1Fauna++; 
            document.getElementById("c1-fauna").innerHTML = c1Fauna ;
 
            generateMiniResults(4, order, miniJson1);
            console.log(arrayGroup1);
            console.log(miniJson1);
		}
		else if(obj.id == "c2" && arrayGroup2.indexOf(obj.title)==-1){
			arrayGroup2.push(obj.title);
            
            parentId = parseInt(obj.value)+1;
            if (queryString["panas"] == 1){
                localId = obj.title-parentId*1000;
                }
            else{
                localId = obj.title-parentId*1000-100;
            }
            child = text.children[parentId-1].children[localId];
            miniJson2.children.push(child);
            c2Superficie++; 
            $.post("insertaraccion.php",{accion:'16',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
            document.getElementById("c2-superficie").innerHTML = c2Superficie;

            generateMiniResults(5, order, miniJson2);
            console.log(arrayGroup2);
            console.log(miniJson2);
		}
		else if(obj.id == "c3" && arrayGroup3.indexOf(obj.title)==-1){
			arrayGroup3.push(obj.title);
            
            parentId = parseInt(obj.value)+1;
            if (queryString["panas"] == 1){
                localId = obj.title-parentId*1000;
                }
            else{
                localId = obj.title-parentId*1000-100;
            }
            child = text.children[parentId-1].children[localId];
            miniJson3.children.push(child);
            $.post("insertaraccion.php",{accion:'17',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
            c3Maniobras++;
            document.getElementById("c3-maniobras").innerHTML = c3Maniobras;
            generateMiniResults(6, order, miniJson3);
            console.log(arrayGroup3);
            console.log(miniJson3);
		}
		else if(obj.id == "c4" && arrayGroup4.indexOf(obj.title)==-1){
			arrayGroup4.push(obj.title);
            
            parentId = parseInt(obj.value)+1;
            if (queryString["panas"] == 1){
                localId = obj.title-parentId*1000;
                }
            else{
                localId = obj.title-parentId*1000-100;
            }
            child = text.children[parentId-1].children[localId];
            miniJson4.children.push(child);
            c4Responsabilidades++;
            $.post("insertaraccion.php",{accion:'18',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
            document.getElementById("c4-responsabilidades").innerHTML = c4Responsabilidades;

            generateMiniResults(7, order, miniJson4);
            console.log(arrayGroup4);
            console.log(miniJson4);
		}
        else{
            err = true;
            console.log("Error check");
        }

        //if checkbox is being checked, add a "checked" class
        if (!err){
            obj.parentNode.classList.add("checked");
        }
        
        

    }
    else {

        //else remove it
		if (obj.id == "c1" && arrayGroup1.indexOf(obj.title)!=-1 && (arrayGroup1.length == c1Fauna)){
			var index = arrayGroup1.indexOf(obj.title);
			arrayGroup1.splice(index, 1);
            
            deleteObject(miniJson1,obj.title);
            order = $("#sort").val();
            $.post("insertaraccion.php",{accion:'21',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
            c1Fauna--; 
            document.getElementById("c1-fauna").innerHTML = c1Fauna;
            generateMiniResults(4, order, miniJson1);
            console.log(arrayGroup1);
            console.log(miniJson1);

		}
		else if(obj.id == "c2" && arrayGroup2.indexOf(obj.title)!=-1 && (arrayGroup2.length == c2Superficie)){
			var index = arrayGroup2.indexOf(obj.title);
			arrayGroup2.splice(index, 1);
            
            deleteObject(miniJson2,obj.title);
            order = $("#sort").val();
            c2Superficie--;
            $.post("insertaraccion.php",{accion:'22',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt}); 
            document.getElementById("c2-superficie").innerHTML = c2Superficie;
            generateMiniResults(5, order, miniJson2);
            console.log(arrayGroup2);
            console.log(miniJson2);
		}
		else if(obj.id == "c3" && arrayGroup3.indexOf(obj.title)!=-1 && (arrayGroup3.length == c3Maniobras)){
			var index = arrayGroup3.indexOf(obj.title);
			arrayGroup3.splice(index, 1);
            
            deleteObject(miniJson3,obj.title);
            order = $("#sort").val();
            $.post("insertaraccion.php",{accion:'23',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
            c3Maniobras--;
            document.getElementById("c3-maniobras").innerHTML = c3Maniobras;
            generateMiniResults(6, order, miniJson3);
            console.log(arrayGroup3);
            console.log(miniJson3);
		}
		else if(obj.id == "c4" && arrayGroup4.indexOf(obj.title)!=-1 && (arrayGroup4.length == c4Responsabilidades)){
			var index = arrayGroup4.indexOf(obj.title);
            console.log("_____________________")
            console.log(index)
            console.log("_____________________")
			arrayGroup4.splice(index, 1);
            
            deleteObject(miniJson4,obj.title);
            order = $("#sort").val();
            c4Responsabilidades--;
            $.post("insertaraccion.php",{accion:'24',idAsociado:obj.title,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
            document.getElementById("c4-responsabilidades").innerHTML = c4Responsabilidades;
            generateMiniResults(7, order, miniJson4);
            console.log(arrayGroup4);
            console.log(miniJson4);
		}
        else{
            err = true;
            console.log("Error uncheck");
        }
        if (!err){
            obj.parentNode.classList.remove("checked");
        }
		
        

        
    }
    
    
}

function rankingFix(text, i, query)
{
    var rank = parseInt(text.children[query].children[i].ranking) + 1;
    return rank;
	
}

function rankingMiniFix(text, i, query)
{
    var rank = parseInt(text.children[i].ranking) + 1;
    return rank;
    
}

function getIDArraysOfImages(images, groupID){
        var arreglo = [];
        for(var i=0; i<images.length;i++){
            arreglo.push({image : images[i], group: groupID});
        }
        return arreglo;
    }  

function sendSelectedImages(){
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
            doSubStep();
        }
       function showEncuestaDemographic(){
            showFormModal('encuesta_demographic');
            console.log("FAIL");
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
                console.log(answers);
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
            console.log("preenvio1");
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
                console.log("preenvio2");
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
                        whichBodyGesture: whichBodyGesture,
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

function generateMiniResults(query, order, text) {
    var q = parseInt(query) + 1;
    $("#r" + q).remove();
    if (order == 0) {
        text.children.sort(function (a, b) {
            return parseFloat(a.ranking) - parseFloat(b.ranking);
        });
    }
    if (order == 1) {
        text.children.sort(function (a, b) {
            return parseFloat(b.ranking) - parseFloat(a.ranking);
        });
    }
    if (order == 2) {
        text.children.sort(function (a, b) {
            return parseFloat(b.colour) - parseFloat(a.colour);
        });
    }
    if (order == 3) {
        text.children.sort(function (a, b) {
            return parseFloat(a.colour) - parseFloat(b.colour);
        });
    }
    if (order == 4) {
        text.children.sort(function (a, b) {
            return parseFloat(b.rscore) - parseFloat(a.rscore);
        });
    }
    if (order == 5) {
        text.children.sort(function (a, b) {
            return parseFloat(a.rscore) - parseFloat(b.rscore);
        });
    }
    if (order == 6) {
        text.children.sort(function (a, b) {
            return parseFloat(b.reputation) - parseFloat(a.reputation);
        });
    }
    if (order == 7) {
        text.children.sort(function (a, b) {
            return parseFloat(a.reputation) - parseFloat(b.reputation);
        });
    }

    var ObjDivGscControl = $('<div></div>');
    var ObjDivExpArea = $('<div></div>');
    ObjDivGscControl.addClass("gsc-control-cse gsc-control-cse-es");
    ObjDivGscControl.attr("id", "r" + q);
    ObjDivExpArea.attr("id", "results-" + q);
    ObjDivExpArea.addClass("gsc-expansionArea");

    ObjDivGscControl.append(ObjDivExpArea);

    for (i = 0; i < text.children.length; i++)
    {
        var ObjDivGscResult = $('<span></span>');
        var ObjDivGsResult = $('<div></div>');
        var ObjDivTitle = $('<div></div>');
        var ObjDivVisibleUrl = $('<div></div>');
        var ObjDivSnippet = $('<div></div>');
        var ObjDivScores = $('<div></div>');
        var ObjATitle = $('<a></a>');

        var ObjLabelCat1 = $('<label></label>');
        var ObjLabelCat2 = $('<label></label>');
        var ObjLabelCat3 = $('<label></label>');
        var ObjLabelCat4 = $('<label></label>');

        var ObjButtonCat1 = $('<input/>');
        var ObjButtonCat2 = $('<input/>');
        var ObjButtonCat3 = $('<input/>');
        var ObjButtonCat4 = $('<input/>');

        ObjDivGscResult.addClass("gsc-webResult gsc-result");
        ObjDivGsResult.addClass("gs-webResult gs-result");

        ObjDivTitle.addClass("gs-title");
        ObjDivVisibleUrl.addClass("gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long");
        ObjDivSnippet.addClass("gs-bidi-start-align gs-snippet");
        ObjDivScores.addClass("gs-bidi-start-align gs-snippet");

        if (arrayGroup1.indexOf(text.children[i].id)==-1){
            ObjLabelCat1.addClass("input-check c1");
        }
        else{
            ObjLabelCat1.addClass("input-check c1 checked");
        }
        
        if (arrayGroup2.indexOf(text.children[i].id)==-1){
            ObjLabelCat2.addClass("input-check c2");
        }
        else{
            ObjLabelCat2.addClass("input-check c2 checked");
        }
        if (arrayGroup3.indexOf(text.children[i].id)==-1){
            ObjLabelCat3.addClass("input-check c3");
        }
        else{
            ObjLabelCat3.addClass("input-check c3 checked");
        }
        
        if (arrayGroup4.indexOf(text.children[i].id)==-1){
            ObjLabelCat4.addClass("input-check c4");
        }
        else{
            ObjLabelCat4.addClass("input-check c4 checked");
        }

        var studyMode = queryString["study"],
            userId = queryString["userId"],
            sessionId = queryString["session"],
            panas = queryString["panas"],
            doc_id = text.children[i].id;


        ObjATitle.addClass("gs-title");
        ObjATitle.attr("href", text.children[i].url_local +"?docId="+doc_id +"&study="+studyMode+"&userId="+userId+"&session="+sessionId+"&panas="+panas);
        ObjATitle.attr("target", "page-container");
        ObjATitle.click(function(i){
        	document.getElementById("page-container").src = text.children[i].url_local	
            console.log("estoy aqui")
        });
        ObjATitle.text(text.children[i].name);

        
        ObjDivVisibleUrl.text(text.children[i].url);

        ObjDivSnippet.text(text.children[i].date + " - " + text.children[i].snippet);
        ObjDivScores.text("Ranking: " + rankingMiniFix(text, i, query) + " - Legibilidad: " + text.children[i].rscore + " - Reputación: " + text.children[i].reputation);

        ObjDivExpArea.append(ObjDivGscResult);
        ObjDivGscResult.append(ObjDivGsResult);
        ObjDivGsResult.append(ObjDivTitle);
        ObjDivGsResult.append(ObjDivVisibleUrl);
        ObjDivGsResult.append(ObjDivSnippet);
        ObjDivGsResult.append(ObjDivScores);

        var sdiv;
        if (q==5){
            sdiv = "<input id=\"c1\" title=\""+text.children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
            ObjLabelCat1.append(sdiv);
            ObjDivTitle.append(ObjLabelCat1);
        }
        else if (q==6){
            sdiv = "<input id=\"c2\" title=\""+text.children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
            ObjLabelCat2.append(sdiv);
            ObjDivTitle.append(ObjLabelCat2);

        }
        else if (q==7){
            sdiv = "<input id=\"c3\" title=\""+text.children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
            ObjLabelCat3.append(sdiv);
            ObjDivTitle.append(ObjLabelCat3);
        }
        else if (q==8){
            sdiv = "<input id=\"c4\" title=\""+text.children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
            ObjLabelCat4.append(sdiv);
            ObjDivTitle.append(ObjLabelCat4);
        }
        else {
            console.log("Error q");
        }
        
        
        
        
        ObjDivTitle.append(ObjATitle);
    }
    var container = "#wrapper-" + q;
    $(container).append(ObjDivGscControl);
}

function generateResults(query, order, text) {
    var q = parseInt(query) + 1;
    $("#r" + q).remove();
    if (order == 0) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(a.ranking) - parseFloat(b.ranking);
        });
    }
    if (order == 1) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(b.ranking) - parseFloat(a.ranking);
        });
    }
    if (order == 2) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(b.fecha) - parseFloat(a.fecha);
        });
    }
    if (order == 3) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(a.fecha) - parseFloat(b.fecha);
        });
    }
    if (order == 4) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(b.rscore) - parseFloat(a.rscore);
        });
    }
    if (order == 5) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(a.rscore) - parseFloat(b.rscore);
        });
    }
    if (order == 6) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(b.reputation) - parseFloat(a.reputation);
        });
    }
    if (order == 7) {
        text.children[query].children.sort(function (a, b) {
            return parseFloat(a.reputation) - parseFloat(b.reputation);
        });
    }

    var ObjDivGscControl = $('<div></div>');
    var ObjDivExpArea = $('<div></div>');
    ObjDivGscControl.addClass("gsc-control-cse gsc-control-cse-es");
    ObjDivGscControl.attr("id", "r" + q);
    ObjDivExpArea.attr("id", "results-" + q);
    ObjDivExpArea.addClass("gsc-expansionArea");

    ObjDivGscControl.append(ObjDivExpArea);

    for (i = 0; i < text.children[query].children.length; i++)
    {
        var ObjDivGscResult = $('<span></span>');
        var ObjDivGsResult = $('<div></div>');
        var ObjDivTitle = $('<div></div>');
        var ObjDivVisibleUrl = $('<div></div>');
        var ObjDivSnippet = $('<div></div>');
        var ObjDivScores = $('<div></div>');
        var ObjATitle = $('<a></a>');

        var ObjLabelCat1 = $('<label></label>');
        var ObjLabelCat2 = $('<label></label>');
        var ObjLabelCat3 = $('<label></label>');
        var ObjLabelCat4 = $('<label></label>');

        //var ObjButtonCat1 = $('<input/>');
        var ObjButtonCat2 = $('<input/>');
        var ObjButtonCat3 = $('<input/>');
        var ObjButtonCat4 = $('<input/>');

        ObjDivGscResult.addClass("gsc-webResult gsc-result");
        ObjDivGsResult.addClass("gs-webResult gs-result");

        ObjDivTitle.addClass("gs-title");
        ObjDivVisibleUrl.addClass("gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long");
        ObjDivSnippet.addClass("gs-bidi-start-align gs-snippet");
        ObjDivScores.addClass("gs-bidi-start-align gs-snippet");

        if (arrayGroup1.indexOf(text.children[query].children[i].id)==-1){
			ObjLabelCat1.addClass("input-check c1");
		}
		else{
			ObjLabelCat1.addClass("input-check c1 checked");
		}
		
		if (arrayGroup2.indexOf(text.children[query].children[i].id)==-1){
			ObjLabelCat2.addClass("input-check c2");
		}
		else{
			ObjLabelCat2.addClass("input-check c2 checked");
		}
    	if (arrayGroup3.indexOf(text.children[query].children[i].id)==-1){
			ObjLabelCat3.addClass("input-check c3");
		}
		else{
			ObjLabelCat3.addClass("input-check c3 checked");
		}
		
		if (arrayGroup4.indexOf(text.children[query].children[i].id)==-1){
			ObjLabelCat4.addClass("input-check c4");
		}
		else{
			ObjLabelCat4.addClass("input-check c4 checked");
		}

        var studyMode = queryString["study"],
            userId = queryString["userId"],
            sessionId = queryString["session"],
            panas = queryString["panas"],
            doc_id = text.children[query].children[i].id;

        ObjATitle.addClass("gs-title");
        ObjATitle.attr("id",text.children[query].children[i].url_local);
        ObjATitle.attr("page",text.children[query].children[i].id);
        ObjATitle.attr("groupPage",text.children[query].id);
        ObjATitle.attr("ranking",rankingFix(text, i, query));
        ObjATitle.attr("fecha",text.children[query].children[i].date);
        ObjATitle.attr("legibilidad",text.children[query].children[i].rscore);
        ObjATitle.attr("reputacion",text.children[query].children[i].repu_normalizada);

		ObjATitle.attr("onmouseover","sobrePagina(this)");
        ObjATitle.attr("onClick","mostrarPagina(this)");
        ObjATitle.attr("numquery",query);
        if(visitados.indexOf(text.children[query].children[i].id)==-1){
            ObjATitle.text(text.children[query].children[i].name); 
        }
        else{
            ObjATitle.text(text.children[query].children[i].name).css('color', 'red'); 
        }
         
        ObjDivVisibleUrl.text(text.children[query].children[i].url);
        ObjDivSnippet.text(text.children[query].children[i].date + " - " + text.children[query].children[i].snippet);
        ObjDivScores.text("Ranking: " + rankingFix(text, i, query) + " - Legibilidad: " + scoreDiscretization(text.children[query].children[i].rscore) + " - Reputación: " + text.children[query].children[i].repu_normalizada);

        ObjDivExpArea.append(ObjDivGscResult);
        ObjDivGscResult.append(ObjDivGsResult);
        ObjDivGsResult.append(ObjDivTitle);
        ObjDivGsResult.append(ObjDivVisibleUrl);
        ObjDivGsResult.append(ObjDivSnippet);
        ObjDivGsResult.append(ObjDivScores);

        var sdiv1 = "<input id=\"c1\" title=\""+text.children[query].children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
		var sdiv2 = "<input id=\"c2\" title=\""+text.children[query].children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
		var sdiv3 = "<input id=\"c3\" title=\""+text.children[query].children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
		var sdiv4 = "<input id=\"c4\" title=\""+text.children[query].children[i].id+"\" onchange=\"change_state(this)\" type=\"checkbox\" value=\""+query+"\" name=\"test\"/>";
        if(text.children[query].children[i].id<2000){
            ObjLabelCat1.append(sdiv1);
            ObjDivTitle.append(ObjLabelCat1);
        }
        if((text.children[query].children[i].id>2000)&&(text.children[query].children[i].id<3000)){
            ObjLabelCat2.append(sdiv2);
            ObjDivTitle.append(ObjLabelCat2);
        }
        if((text.children[query].children[i].id>3000)&&(text.children[query].children[i].id<4000)){
            ObjLabelCat3.append(sdiv3);
            ObjDivTitle.append(ObjLabelCat3);
        }
        if(text.children[query].children[i].id>4000){
            ObjLabelCat4.append(sdiv4);
            ObjDivTitle.append(ObjLabelCat4);
        }    
        ObjDivTitle.append(ObjATitle);
    }

    valorQuery=query;
    var container = "#wrapper-" + q;
    $(container).append(ObjDivGscControl);
}

function sobrePagina(d){
    
	console.log("sobre snippet");
    idPagina=$(d).attr("page");
    grupoActual=$(d).attr("groupPage");
    
	$.post("insertaraccion.php",{accion:'25',idAsociado:$(d).attr("page"),queryGroup:$(d).attr("groupPage"),tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});

}

function mostrarPagina(d){
    console.log("click");
    console.log("Mostrando pagina")
    console.log(d.page)
    console.log(d.id)
    console.log($(d).attr("ranking"))
    if(visitados.indexOf($(d).attr("page"))==-1){
        visitados.push($(d).attr("page"));
    }

    
    console.log("visitados")
    console.log(visitados) 
    idPagina=$(d).attr("page");
    grupoActual=$(d).attr("groupPage");
    //$.('#idPagina').css('color', 'red');
    /* seleccionar los elementos con id="inicio" con clase="principal" y que son etiqueta "p" */
    //$("#d.id").css('color', 'red');
    $.post("insertaraccion.php",{accion:'19',idAsociado:$(d).attr("page"),queryGroup:$(d).attr("groupPage"),tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    document.getElementById(d.id).style.color = "red";
    document.getElementById('page-container').src = d.id;
    document.getElementById("page-container").style.height = "919px";
    document.getElementById("botonMostrarOcultar").value="Ocultar Página";
    document.getElementById("i1-ranking").innerHTML = $(d).attr("ranking");
    document.getElementById("i2-date").innerHTML = $(d).attr("fecha");
    document.getElementById("i3-rscore").innerHTML = scoreDiscretization($(d).attr("legibilidad"));
    document.getElementById("i4-reputation").innerHTML = $(d).attr("reputacion");
}

//reloj
//var min;
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
    //generaMinutos(); 
    devolvercero(minutos,segundos);
    segundos = segundos % 60;
    document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
     if (minutos ===0 && segundos ===0){
        alert ("Muchas Gracias por tu colaboración. Sigamos con lo siguiente.");
        window.location.href = "http://localhost/ProyectoTesis/index.php";
        //clearTimeOut(llamada);
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

function scoreDiscretization(d){
    if (d >= 90){
        return "Muy fácil";
    }
    if (d < 90 && d >= 80){
        return "Fácil";
    }
    if (d < 80 && d >= 70){
        return "Bastante fácil";
    }
    if (d < 70 && d >= 60){
        return "Normal";
    }
    if (d < 60 && d >= 50){
        return "Bastante difícil";
    }
    if (d < 50 && d >= 30){
        return "Difícil";
    }
    if (d < 30 && d >= 0){
        return "Muy difícil";
    }
}

function union(){
    bb();
    grupoActual=1;
    $.post("insertaraccion.php",{accion:'3',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
}
function union1(){
    bb();
    grupoActual=2;
    $.post("insertaraccion.php",{accion:'4',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
}
function union2(){
    bb();
    grupoActual=3;
    $.post("insertaraccion.php",{accion:'5',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
}
function union3(){
    bb();
    grupoActual=4;
    $.post("insertaraccion.php",{accion:'6',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
}
function union4(value){
    bb();
    console.log(value)
    if(value==0){
        $.post("insertaraccion.php",{accion:'7',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    if(value==1){
        $.post("insertaraccion.php",{accion:'8',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    if(value==2){
        $.post("insertaraccion.php",{accion:'9',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    if(value==3){
        $.post("insertaraccion.php",{accion:'10',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    if(value==4){
        $.post("insertaraccion.php",{accion:'11',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    if(value==5){
        $.post("insertaraccion.php",{accion:'12',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    if(value==6){
        $.post("insertaraccion.php",{accion:'13',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    if(value==7){
        $.post("insertaraccion.php",{accion:'14',idAsociado:null,queryGroup:grupoActual,tipoAccion:'tradicional',tarea:tarea,idUsuario:idUsuario,idSesion:txt});
    }
    
}