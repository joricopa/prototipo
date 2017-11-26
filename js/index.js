// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function logIn(){
	var studySelectBox = $('#studyCheckbox').get(0);
	var study = studySelectBox.options[studySelectBox.selectedIndex].value;
	console.log(study)
  console.log("Login")
	if (study == 1){
    	window.location.href = "http://localhost/ProyectoTesis/visual.html";
  	}
  	else if (study == 0){
    	window.location.href = "http://localhost/ProyectoTesis/traditional.html";
  	}
}
