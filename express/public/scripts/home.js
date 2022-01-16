$(document).ready(function() {		
	
});

function show_alert() {
	clear_alerts(() =>{
		$("#alert-zone").html('<div class="alert alert-warning alert-dismissible fade show mt-2" style="display: none;" role="alert" id="alert-pass">¡Las contraseñas deben coincidir!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>').promise().done(() =>{
			$("#alert-pass").slideDown(500);
		});
	});
}

function blink_element(elemento) {
	a = (fs) => {
		$(elemento).fadeOut(500, () => {
			$(elemento).fadeIn(500, () => {
			fs();
		})});
	};
	a(() => {a(() => {a(() => {return;})})});
}

function actualizar_partido(partido) {
	if(socket_data.ready) {
		$('.partido_directo[partido_id='+partido.id+']  .local-marcador').text(partido.local_marcador);
		$('.partido_directo[partido_id='+partido.id+']  .visitante-marcador').text(partido.visitante_marcador);
		blink_element('.partido_directo[partido_id='+partido.id+']');
	} 
}

function finalizar_partido(partido) {
	if(socket_data.ready) {
		$('.partido_directo[partido_id='+partido.id+']').remove();
	}
}

function iniciar_partido(partido) {
	$('.partido_futuro[partido_id='+partido.id+']').fadeOut(1000, () => {
			$('.partido_futuro[partido_id='+partido.id+']').remove();		
	});
	tmp = '<div class="row partido_directo mb-3" style="display: none;" partido_id="'+partido.id+'"><div class="col-6 h1 border-end border-2 border-dark">'+partido.local+'</div><div class="col-6 h1 text-end">'+partido.visitante+'</div><div class="col-12 resultado text-center"><span class="h1 border-1 border-dark"><span class="local-marcador h1">'+partido.local_marcador+'</span>-<span class="visitante-marcador h1">'+partido.visitante_marcador+'</span></span></div><div class="text-center"><span class="h5 border-1 border-dark">'+partido.lugar+'</span></div></div>';
	$(".partido_directo").parent().append(tmp).promise().done(() => {
		$('.partido_directo[partido_id='+partido.id+']').fadeIn(500, () => {
			blink_element('.partido_directo[partido_id='+partido.id+']');
		});
	});
}