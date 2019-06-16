
if(typeof proj === 'undefined')
	proj = {};

proj.PHE = {};

initPHE();

function initPHE(){
	//mise en forme de la page Home pour enseignant
	//gestion footer
	$("#footer").css("display", "none");

	//gestion header
	$("#navbarsExampleDefault ul").css("display", "none");
	$("#connexion").css("display", "none");
	$("#deconnexion").css("display", "block");
	$(".container #exampleModal .modal-body").text("Etes vous sur de vous déconnecter?");
	//TODO rajouter le bouton créer liste dans le header

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
	let mainDiv = $("<div id='block'>"),
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
			btnSupr = $("<button type='button' class='button btn btn-warning'>").text("suppr"),
			btnModif = $("<button type='button' class='button btn btn-info'>").text("modif");

		divSerie.append(titleSerie).append(btnModif).append(btnSupr);
		$("ul." + serie.matiere).append(divSerie);
	});
}