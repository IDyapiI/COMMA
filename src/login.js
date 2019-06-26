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
			$('header').load('includes/Professor/headerProf.html');
			initPHE(data);
		},
		error: function (e) {
			alert("impossible de récupérer les series");
		}
	});
}