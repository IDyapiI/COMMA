
function supprSerie(id) {
	$.ajax({
		url : "http://localhost:3000/api/series/" + id, // La ressource ciblée
		type : "DELETE",
		success: function (data) {
			$.ajax({
				url: "http://localhost:3000/api/series/creatorId/" + proj.user.id, // La ressource ciblée
				type: "GET",
				success: function (data) {
					initPH({serie: data});
				},
				error: function (e) {
					alert("impossible de récupérer de ce connecter");
				}
			});
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
			partie4 = $("<div class='form-group'><label for='exampleFormControlSelect3'>Groupe</label></div>");
			partie5 = $("<select multiple class='form-control' id='exampleFormControlSelect3'></select>");

		$.ajax({
			url: "http://localhost:3000/api/groups/", // La ressource ciblée
			type: "GET",
			success: function (groups) {
				_.forEach(groups, (group) => {
					let option = $("<option id=" + group._id + ">" + group.name + "</option>");

					partie5.append(option);
				});
			},
			error: function (e) {
				alert("impossible de récupérer de ce connecter");
			}
		});

		partie4.append(partie5);
		form.append(partie1).append(partie2).append(partie3).append(partie4);
		return form;
	}

	createModal(obj);

	function formulaire(){
		let valName = $("#form_creationSerie #exampleInputNom")[0].value,
			valTopic = $("#form_creationSerie #exampleFormControlSelect1")[0].value,
			valLevel = $("#form_creationSerie #exampleFormControlSelect2")[0].value,
			optGroup = $("#form_creationSerie #exampleFormControlSelect3")[0].options,
			data = {
				topic: valTopic,
				name: valName,
				level: valLevel,
				groupId: [],
				creatorId: proj.user.id
			};

		for (let group of optGroup){
			if (group.selected)
				data.groupId.push(group.id);
		}

		$("#form_creationSerie #exampleFormControlSelect3")[0].options[0].selected

		$.ajax({
			url : "http://localhost:3000/api/series/", // La ressource ciblée
			type : "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function (data) {
				proj.serie = {};
				proj.serie.id = data._id;
				creationSerie();
			},
			error: function (e) {
				alert("impossible de récupérer les series");
			}
		});
	}
}

function creationSerie(data){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>");
	$("#main").prepend(mainDiv);
	mainDiv.load("includes/Professor/createSeries.html", (e) => {
		if(data){
			$("input#response1")[0].value = data.response;
			$("input#response2")[0].value = data.responseList[1];
			$("input#response3")[0].value = data.responseList[2];
			$("input#response4")[0].value = data.responseList[3];
			$("input#ex3")[0].value = data.question;
		}
	});
}

function exoSuivant(){
	let data = recupExo();

	if (!data)
		return;
	if (_.get(proj, 'serie.exo') && _.get(proj, 'serie.actu') >= 0 && proj.serie.exo[proj.serie.actu]){
		$.ajax({
			url: "http://localhost:3000/api/exercises/" + proj.serie.exo[proj.serie.actu]._id, // La ressource ciblée
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function (data) {
				let obj = {
					text: "Exercice modifié",
					content: $("#main"),
					type: "success"
				};
				createAlert(obj);
				proj.serie.actu++;
				creationSerie(proj.serie.exo[proj.serie.actu]);
			},
			error: function (e) {
				console.log("error");
			}
		});
	}else {
		$.ajax({
			url: "http://localhost:3000/api/exercises/", // La ressource ciblée
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function (data) {
				proj.serie.exoPreId = data._id;
				let obj = {
					text: "Exercice enregistrer",
					content: $("#main"),
					type: "success"
				};
				createAlert(obj);
				creationSerie();
			},
			error: function (e) {
				console.log("error");
			}
		});
	}
}

function terminerSerie(){
	let obj = {
		id: "confirmation",
		title: "Terminer série",
		content: $("#main"),
		callbackValid: finirSerie,
		form: "Etes vous sure de vouloir terminer? L'exercice en cour de saisie ne sera pas enregistrer."
	};
	createModal(obj);

	function finirSerie(){
		$.ajax({
			url: "http://localhost:3000/api/series/creatorId/" + proj.user.id, // La ressource ciblée
			type: "GET",
			success: function (data) {
				initPH({serie: data});
			},
			error: function (e) {
				alert("impossible de récupérer de ce connecter");
			}
		});
	}
}

function recupExo(){
	let repUn = $("input#response1")[0].value,
		repDeux = $("input#response2")[0].value,
		repTrois = $("input#response3")[0].value,
		repQuatre = $("input#response4")[0].value,
		question = $("input#ex3")[0].value;

	if (repUn === "" || repDeux === "" || repTrois === "" || repQuatre === "" || question === "" ){
		let obj;

		return false;
	}
	return{
		kind: "QCM",
		question:question,
		responseList : [repUn,repDeux,repTrois,repQuatre],
		response: repUn,
		serieId: proj.serie.id
	}
}