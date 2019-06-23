
if(typeof proj === 'undefined')
	proj = {};

proj.PHE = {};

$.post(
	"http://localhost/api/login",
		{
			email : "toto@gmail.com", // Nous supposons que ce formulaire existe dans le DOM.
			password : "tata"
		},
		//TODO vérifé fonctionnement du web service
		function(data, status){
			initPHE(data);
		},
		'text'
);

function initPHE(data){
	//mise en forme de la page Home pour enseignant
	//gestion footer
	$("#footer").css("display", "none");

	//gestion header
	$("#navbarsExampleDefault ul li").css("display", "none");
	$("#connexion").css("display", "none");
	$("#deconnexion").css("display", "block");
	$(".container #exampleModal .modal-body").text("Etes vous sur de vous déconnecter?");

	let createBtn = $("<li style='width: 92px;' class='nav-item active'><button type='button' class='btn btn-primary create' data-toggle='modal' data-target='#modalSerie'>Créer série</button></li>");

	$("#navbarsExampleDefault ul").append(createBtn);

	$("button.create").on("click", (e) =>{
		let obj = {
			id: "modalSerie",
			title: "Création Série",
			content: $("#navbarsExampleDefault ul"),
			callbackValid: formulaire,
			form: formCreateSerie()
		};

		function formCreateSerie(){
			let form = $("<form/>"),
				partie1 = $("<div class='form-group'><label for='exampleInputNom'>Nom</label><input type='text' class='form-control' id='exampleInputNom' aria-describedby='nameHelp' placeholder='Enter name'><small id='nameHelp' class='form-text text-muted'>Le nom que porteras la série.</small></div>"),
				partie2 = $("<div class='form-group'><label for='exampleInputSelect'>Matière</label><select class='form-control' id='exampleInputSelect'><option value=''Choisit une matière</option><option value='math'>math</option><option value='info'>info</option></select></div>");

			form.append(partie1).append(partie2);
			return form;
		}

		createModal(obj);

		function formulaire(){
			let valName = $("input#exampleInputNom")[0].value,
				valMat = $("select#exampleInputSelect")[0].value;

			$.ajax({
				url : "http://localhost/api/series/", // La ressource ciblée
				type : "POST" // Le type de la requête HTTP.
			});
			//TODO fonction à appeler après envoie des infos de la série
			// creationSerie();
		}
	});

	//gestion content
	$("#main .jumbotron").css("display", "none");

	//TODO appel au web service pour récupére les séries
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

//TODO faire écran de création de série
function creationSerie(){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>");

	$("#main").append(mainDiv);
}