function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

const MAP_KEY = process.env.API_KEY;

function initMap() {
	var macc = { lat: 42.1382114, lng: -71.5212585 };

	var map = new google.maps.Map(document.getElementById("map"), { zoom: 15, center: macc });

	var marker = new google.maps.Marker({ position: macc, map: map });
}
