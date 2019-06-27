if(typeof proj === 'undefined')
	proj = {};

proj.user = {};


function connexion(){

	let valEmail = $("#formulaireConnexion .email")[0].value,
		valPassword = $("#formulaireConnexion .password")[0].value,
		data = {
			email: valEmail,
			password: valPassword
		};

	$.ajax({
		url: "http://localhost:3000/api/login", // La ressource ciblée
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function (data) {
			proj.user.id = data[0]._id;
			proj.user.status = data[0].status;
			$("header").load("includes/Professor/headerProf.html", () => {
				initPHE(data);
			});
		},
		error: function (e) {
			alert("impossible de récupérer de ce connecter");
		}
	});
}


function initPHE(data){
	//mise en forme de la page Home pour enseignant
	//gestion footer
	$("#footer").css("display", "none");
	if (proj.user.status === "0")
		$("#navbarsExampleDefault li.create").css("display", "none");

	//TODO appel au web service pour récupére les séries
	//TODO V2 pas besoin si ramener par le login
	let liste = [
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
	afficherSerie(data.liste || liste);
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
			btnModif = $("<button type='button' class='button btn btn-info'>").text("modif");

		$("ul." + serie.matiere).append(divSerie);
		divSerie.append(titleSerie);
		if (proj.user.status === "0"){
			let btnSupr = $("<button type='button' class='button btn btn-danger'>").text("suppr");
			divSerie.append(btnSupr);

			btnSupr.on("click", (e) => {
				//supprSerie(serie);
			});
		}
		divSerie.append(btnModif);
	});
}