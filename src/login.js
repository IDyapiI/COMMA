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
			proj.user.id = data.user._id;
			proj.user.status = data.user.status;
			$("header").load("includes/Professor/headerProf.html", () => {
				initPH(data);
			});
		},
		error: function (e) {
			alert("impossible de récupérer de ce connecter");
		}
	});
}


function initPH(data){
	//mise en forme de la page Home pour enseignant
	//gestion footer
	$("#footer").css("display", "none");
	if (proj.user.status === "0")
		$("#navbarsExampleDefault li.create").css("display", "none");

	afficherSerie(data.serie);
};

function afficherSerie(listSerie){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>"),
		tabMatiere = [];

	$("#main").append(mainDiv);

	_.forEach(listSerie, (serie) => {
		if (_.findIndex(tabMatiere, function(o) { return o == serie.topic; }) < 0){
			let divMat = $("<div class='menu'>"),
				titleMat = $("<p class='title'>").text(serie.topic),
				listeSerie = $("<ul class='liste list-group'>").addClass(serie.topic);

			divMat.append(titleMat);
			mainDiv.append(divMat).append(listeSerie);

			tabMatiere.push(serie.topic);

			divMat.on("click", (e) => {
				let list = $("ul." + serie.topic);
				if(list.css("display") === "flex")
					list.css("display", "none");
				else
					list.css("display", "flex");
			})
		}

		let divSerie = $("<li class='list-group-item' id='" + serie._id + "'>"),
			titleSerie = $("<p class='title'>").text(serie.name),
			btnModif = $("<button type='button' class='button btn btn-info'>").text("modif");

		$("ul." + serie.topic).append(divSerie);
		divSerie.append(titleSerie);
		if (proj.user.status !== "0"){
			let btnSupr = $("<button type='button' class='button btn btn-danger'>").text("suppr");
			divSerie.append(btnSupr);

			btnSupr.on("click", (e) => {
				//supprSerie(serie);
			});
		}
		divSerie.append(btnModif);
	});
}