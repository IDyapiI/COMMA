
if(typeof proj === 'undefined')
	proj = {};

proj.PHE = {};

initPHE();

function initPHE(){
	//mise en forme de la page Home pour enseignant
	//gestion footer
	$("#footer").css("display", "none");

	//gestion header
	$(".container #exampleModal .modal-body").text("Etes vous sur de vous déconnecter?");

	//gestion content
};