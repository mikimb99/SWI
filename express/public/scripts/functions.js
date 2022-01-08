function clear_alerts(fun) {
	$("#alert-zone .alert").slideUp(500).promise().done(fun);
}





//FUNCIONES PARA PARTIDOS

$(document).ready(function() {
mapboxgl.accessToken = 'pk.eyJ1IjoibXBhem9zYiIsImEiOiJja3g3dW5qMzYwYTVlMm9xY3dkNjdlMnp6In0.9yDbF6ZEr1eCpFEOvfIzQQ';
map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
	});
 	mapcontrol = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl
	});
	map.addControl(mapcontrol);
});