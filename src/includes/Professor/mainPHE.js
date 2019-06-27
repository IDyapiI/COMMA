
if(typeof proj === 'undefined')
	proj = {};

proj.PHE = {};


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
			btnSupr = $("<button type='button' class='button btn btn-danger'>").text("suppr"),
			btnModif = $("<button type='button' class='button btn btn-info'>").text("modif");

		divSerie.append(titleSerie).append(btnSupr).append(btnModif);
		$("ul." + serie.matiere).append(divSerie);
	});
}

function popupCreateSerie (){
	let obj = {
		id: "modalSerie",
		title: "Création Série",
		content: $("#navbarsExampleDefault ul"),
		callbackValid: formulaire,
		form: formCreateSerie()
	};

	function formCreateSerie(){
		let form = $("<form id='form_creationSerie'/>"),
			partie1 = $("<div class='form-group'><label for='exampleInputNom'>Nom</label><input type='text' class='form-control' id='exampleInputNom' aria-describedby='nameHelp' placeholder='Enter name'><small id='nameHelp' class='form-text text-muted'>Le nom que porteras la série.</small></div>"),
			partie2 = $("<div class='form-group'><label for='exampleFormControlSelect1'>Selectionner une matiere</label><select class='form-control' id='exampleFormControlSelect1'><option>Mathématique</option><option>Anglais</option><option>Physique</option><option>Français</option></select></div>"),
			partie3 = $("<div class='form-group'><label for='exampleFormControlSelect2'>Niveau</label><select class='form-control' id='exampleFormControlSelect2'><option>6eme</option><option>5eme</option><option>...</option></select></div>"),
			partie4 = $("<div class='form-group'><label for='exampleInputDescription'>Description</label><input type='text' class='form-control' id='exampleInputDescription' aria-describedby='descHelp' placeholder='Descritpion'></div>");


		form.append(partie1).append(partie2).append(partie3).append(partie4);
		return form;
	}

	createModal(obj);

	function formulaire(){
		let valName = $("#form_creationSerie #exampleInputNom")[0].value,
			valTopic = $("#form_creationSerie #exampleFormControlSelect1")[0].value,
			valLevel = $("#form_creationSerie #exampleFormControlSelect2")[0].value,
			valDescription = $("#form_creationSerie #exampleInputDescription")[0].value,
			data = {
				topic: valTopic,
				name: valName,
				level: valLevel,
				description: valDescription,
				creatorId: proj.user.id
			}

		$.ajax({
			url : "http://localhost:3000/api/series/", // La ressource ciblée
			type : "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function (data) {
				creationSerie(data);
			},
			error: function (e) {
				alert("impossible de récupérer les series");
			}
		});
	}
}

//TODO faire écran de création de série
function creationSerie(){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>");

	$("#main").append(mainDiv);
	if (proj.user.status !== "0")
		mainDiv.load("includes/Student/readSeries.html");
	else
		mainDiv.load("includes/Professor/createSeries.html");
}