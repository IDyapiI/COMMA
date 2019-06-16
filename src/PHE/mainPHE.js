
if(typeof proj === 'undefined')
	proj = {};

proj.PHE = {};

initPHE();

function initPHE(){
	//mise en forme de la page Home pour enseignant
	//gestion footer
	$("#footer").css("display", "none");

	//gestion header
	$("#navbarsExampleDefault ul li").css("display", "none");
	$("#connexion").css("display", "none");
	$("#deconnexion").css("display", "block");
	$(".container #exampleModal .modal-body").text("Etes vous sur de vous déconnecter?");

	let createBtn = $("<li style='width: 92px;' class='nav-item active'><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modalSerie'>Créer série</button></li>"),
		obj = {id: "modalSerie", title: "test", content: "est ce que ça marche?"},
		modal = createModal(obj);
	$("#navbarsExampleDefault ul").append(createBtn).append(modal);

	/*createBtn.on("click", (e) => {
		creationSerie();
	});*/
	//gestion content
	$("#main .jumbotron").css("display", "none");
	liste = [
		{
			name: "liste1",
			matiere: "math",
			id: 1
		},
		{
			name: "liste2",
			matiere: "info",
			id: 2
		},
		{
			name: "liste3",
			matiere: "math",
			id: 3
		},
		{
			name: "liste4",
			matiere: "math",
			id: 4
		}
	];
	afficherSerie(liste);
};

function afficherSerie(listSerie){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>"),
		tabMatiere = [];

	$("#main").append(mainDiv);
	
	_.forEach(listSerie, (serie) => {
		if (_.findIndex(tabMatiere, function(o) { return o == serie.matiere; }) < 0){
			let divMat = $("<div class='menu'>"),
				titleMat = $("<p class='title'>").text(serie.matiere),
				listeSerie = $("<ul class='liste list-group'>").addClass(serie.matiere);

			divMat.append(titleMat);
			mainDiv.append(divMat).append(listeSerie);

			tabMatiere.push(serie.matiere);

			divMat.on("click", (e) => {
				let list = $("ul." + serie.matiere);
				if(list.css("display") === "flex")
					list.css("display", "none");
				else
					list.css("display", "flex");
			})
		}

		let divSerie = $("<li class='list-group-item' id='" + serie.id + "'>"),
			titleSerie = $("<p class='title'>").text(serie.name),
			btnSupr = $("<button type='button' class='button btn btn-danger'>").text("suppr"),
			btnModif = $("<button type='button' class='button btn btn-info'>").text("modif");

		divSerie.append(titleSerie).append(btnSupr).append(btnModif);
		$("ul." + serie.matiere).append(divSerie);
	});
}

//TODO faire fonction création de série
function creationSerie(){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>");

	$("#main").append(mainDiv);
}

/**
 *
 * @param obj obj.id, obj.tilte, obj.content
 * @return {jQuery|HTMLElement}
 */
function createModal(obj){
	let modal = $("<div class='modal fade' id='" + obj.id + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'/>"),
		modalPart1 = $("<div class='modal-dialog' role='document'/>"),
		modalPart2 = $("<div class='modal-content'/>"),
		modalHeader = $("<div class='modal-header'><h5 class='modal-title' id='ModalLabel'>" + obj.title + "</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'>\n" +
			"          <span aria-hidden='true'>&times;</span></button></div>"),
		modalContent = $("<div class='modal-body'>" + obj.content + "</div>"),
		modalFooter = $("<div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary'>OK</button></div>");

	modalPart2.append(modalHeader).append(modalContent).append(modalFooter);
	modalPart1.append(modalPart2)
	modal.append(modalPart1);

	return modal;
}