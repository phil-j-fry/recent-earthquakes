//create variable 'map' for div id 'mapid'


var map = L.map('mapid').setView([0, 0], 1);


//add open street map tile layer 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//add closed marker at center

L.marker([0,0]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .closePopup();




L.geoJSON(recentQuakes, {
    style: function (feature) {
        return {color: feature.properties.color};
    }

}).bindPopup(function (layer) {
    return layer.features.properties.place;
}).addTo(map);


