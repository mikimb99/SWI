var socket = io();
var socket_data = {
	ready: false,
	logged: null,
	user_id: null
};
socket.on('connect', () => {
	socket.emit('whoiam');
});

socket.on('start', (logged, myid) =>{
	socket_data.ready = true;
	socket_data.logged = logged;
	socket_data.user_id = myid;
});

function show_alert_socket_ok() {
	clear_alerts(() =>{
		$("#alert-zone").html('<div class="alert alert-success alert-dismissible fade show mt-2" style="display: none;" role="alert" id="socket-ok-alert">Cambios realizados correctamente.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>').promise().done(() =>{
			$("#socket-ok-alert").slideDown(500);
		});
	});
}

socket.on("ACK", () =>{
		show_alert_socket_ok();
});

socket.on('error', (error) => {
	alert(error);
});
socket.on('reconnect_failed', (error) => {
	alert("Error en el sistema de directo: " + error);
});

socket.on('resultado_update', (partido) => {
	actualizar_partido(partido);
});
socket.on('partido_finalizado', (partido) => {
	finalizar_partido(partido);
});

socket.on('partido_iniciado', (partido) => {
	iniciar_partido(partido);
});