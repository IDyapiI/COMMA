

function startSerie(data){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>");
	$("#main").prepend(mainDiv);
	mainDiv.load("includes/Student/readSeries.html", (e) => {
		if(data){
			let repList = 1;

			proj.serie.goodRep = 0;
			proj.serie.rep = Math.floor(Math.random() * Math.floor(4)) + 1;
			for (var i = 1; i <= 4; i++){
				if (i === proj.serie.rep){
					$("label#response" + i).text(data.response);
				}else{
					$("label#response" + i).text(data.responseList[repList]);
					repList++;
				}

			}
			$("div h1#question").text(data.question);
		}
	});
}

function questionSuivant(){
	if (proj.serie.finish)
		return;
	if($("input#customRadioInline" + proj.serie.rep)[0].checked)
		proj.serie.goodRep++;

	if (proj.serie.exo[proj.serie.exoActu + 1]) {
		proj.serie.exoActu++;
		startSerie(proj.serie.exo[proj.serie.exoActu]);
	}else{
		result();
	}
}

function result(){
	let obj = {
		type: "success",
		content: $("#main"),
		text: "Vous avez obtenue un score de " + proj.serie.goodRep + " sur " + proj.serie.nbExo + " question.",
		timer: 4000
	};

	proj.serie.finish = true;
	createAlert(obj);
}

function terminerSerieExo(){
	if (proj.serie.finish) {
		returnAcceuil();
	}else{
		let obj = {
			id: "finish",
			title: "Quittez Série",
			content: $("#main"),
			callbackValid: returnAcceuil,
			form: "Etes vous sure de vouloir terminer? La série d'exercice n'est pas terminer et ne sera pas prise en compte si vous arrêtez."
		};
		createModal(obj);
	}
}

function returnAcceuil(){
	$.ajax({
		url: "http://localhost:3000/api/series/groupId/" + proj.user.group, // La ressource ciblée
		type: "GET",
		success: function (data) {
			initPH({serie: data});
		},
		error: function (e) {
			alert("impossible de récupérer de ce connecter");
		}
	});
}