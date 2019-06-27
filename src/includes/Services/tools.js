/**
 *
 * @param obj obj.id, obj.tilte, obj.content
 * @return {jQuery|HTMLElement}
 */
function createModal(obj){
	let modal = $("<div class='modal fade' id='" + obj.id + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'/>"),
		modalPart1 = $("<div class='modal-dialog' role='document'/>"),
		modalPart2 = $("<div class='modal-content'/>"),
		modalHeader = $("<div class='modal-header'><h5 class='modal-title' id='ModalLabel'>" + obj.title + "</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'>\n" +
			"          <span aria-hidden='true'>&times;</span></button></div>"),
		modalContent = $("<div class='modal-body'/>"),s
		modalFooter = $("<div class='modal-footer'><button type='button' class='btn btn-secondary fermer' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary valid'>Submit</button></div>");

	modalContent.append(obj.form);
	modalPart2.append(modalHeader).append(modalContent).append(modalFooter);
	modalPart1.append(modalPart2)
	modal.append(modalPart1);
	obj.content.append(modal);

	$("button.fermer").on("click", (e) => {
		$("div#" + obj.id).remove();
		$("div.modal-backdrop.fade.show").remove();
	});

	$("button.valid").on("click", (e) => {
		obj.callbackValid();
		$("div#" + obj.id).remove();
		$("div.modal-backdrop.fade.show").remove();
	});
}

function createAlert(obj){
	let alert = $("<div class='alert' role='alert' style='margin: 20px;'>" + obj.text + "</div>");
	switch(obj.type){
		case "success":
			alert.addClass("alert-success");
			break;
	}

	obj.content.append(alert);
	alert.on("click", function(e){
		this.remove();
	})
}