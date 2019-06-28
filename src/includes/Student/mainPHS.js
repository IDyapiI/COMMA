

function startSerie(data){
	$("#main #bloc").remove();
	let mainDiv = $("<div id='bloc'>");
	$("#main").prepend(mainDiv);
	mainDiv.load("includes/Student/readSeries.html", (e) => {
		if(data){
			// $("input#response1")[0].value = data.response;
			// $("input#response2")[0].value = data.responseList[1];
			// $("input#response3")[0].value = data.responseList[2];
			// $("input#response4")[0].value = data.responseList[3];
			// $("input#ex3")[0].value = data.question;
		}
	});
}