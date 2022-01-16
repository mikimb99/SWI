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