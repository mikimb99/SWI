function validate_register() {
	pass1 = $("#password1-input").val();
	pass2 = $("#password2-input").val();
	if(pass1==pass2) return true;
	else {
			$("#password1-input").val("");
			$("#password2-input").val("");
			$("#password1-input").focus();
			show_pass_alert();
			return false;
	}
}

function show_pass_alert() {
	clear_alerts(() =>{
		$("#alert-zone").html('<div class="alert alert-warning alert-dismissible fade show mt-2" style="display: none;" role="alert" id="alert-pass">¡Las contraseñas deben coincidir!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>').promise().done(() =>{
			$("#alert-pass").slideDown(500);
		});
	});
}