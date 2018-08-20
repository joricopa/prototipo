
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function logIn(){
	//window.alert("hola1 "); 
  //localStorage.clear();
  //storage.clear();

  var studySelectBox = $('#studyCheckbox').get(0);
	var study = studySelectBox.options[studySelectBox.selectedIndex].value;
	
  console.log(study)
  console.log("Login")
  
  var studyTask = $('#selectorTarea').get(0);
  var task = studyTask.options[studyTask.selectedIndex].value;
  console.log(task)
  localStorage.setItem("xd",task);

  var studySubject = $('#userName').get(0);
  var subject = studySubject.options[studySubject.selectedIndex].value;
  console.log(subject)

  //usuario=subject;

  $.post("insertardatosentabla.php",{nombre:subject,tarea:task,interfaz:study});
  


	if (study == 1){
      //window.location.href = "http://localhost/ProyectoTesis/insertardatosentabla.php";
    	window.location.href = "http://localhost/ProyectoTesis/visual.html";
  	}
  	else if (study == 0){
      //window.location.href = "http://localhost/ProyectoTesis/insertardatosentabla.php";
    	window.location.href = "http://localhost/ProyectoTesis/traditional.html";
  	}
  
}
