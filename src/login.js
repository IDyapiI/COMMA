function connexion(){
	/*$.post(
		"http://localhost/api/login",
			{
				email : "toto@gmail.com", // Nous supposons que ce formulaire existe dans le DOM.
				password : "tata"
			},
			//TODO vérifé fonctionnement du web service
			function(data, status){
				initPHE(data);
			}
	);*/
	$('header').load('includes/Professor/headerProf.html');
	initPHE();
}