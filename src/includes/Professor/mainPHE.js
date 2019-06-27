
if(typeof proj === 'undefined')
	proj = {};

proj.PHE = {};

function supprSerie(data) {
	$.ajax({
		url : "http://localhost:3000/api/series/" + data.id, // La ressource ciblée
		type : "DELETE",
		success: function (data) {
			initPH(data);
		},
		error: function (e) {
			alert("impossible de récupérer les series");
		}
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
			};

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
function creationSerie(data){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>");
	$("#main").append(mainDiv);
	mainDiv.load("includes/Professor/createSeries.html");
}

function exoSuivant(){
	let data = recupExo();
}

function terminerSerie(){

}

function recupExo(){
	let repUn = $("input#response1")[0].value,
		repDeux = $("input#response2")[0].value,
		repTrois = $("input#response3")[0].value,
		repQuatre = $("input#response4")[0].value;

	return{
		kind: "QCM",
		question:"yolo",
		responseList : [repUn,repDeux,repTrois,repQuatre],
		response: repUn
	}
}