const recentQuakes = [{
	type: "Point",
	coordinates: [-115.5553333, 32.4728333, 9.36],

}];

L.geoJSON(recentQuakes).addTo(map).bindPopup('{Location Name}<br>{More Info}')
     .closePopup();