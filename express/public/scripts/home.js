$(document).ready(function() {
	
});

function actualizar_partido(partido) {
	if(socket_data.ready) {
		if(socket_data.logged) return;
		else actualizar_resultado_unlogged(partido);
	} 
}
function actualizar_resultado_unlogged(partido) {
	console.log(partido);
}