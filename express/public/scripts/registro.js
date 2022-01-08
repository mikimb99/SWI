function validate_register() {
	pass1 = $("#password1-input").val();
	pass2 = $("#password2-input").val();
	if(pass1==pass2) return true;
	else {
			$("#password1-input").val("");
			$("#password2-input").val("");
			$("#password1-input").focus();
			alert("Las contraseñas deben coincidir")
			return false;
	}
}