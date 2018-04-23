//create variable 'map' for div id 'mapid'


const map = L.map('mapid').setView([0, 0], 1);


//add open street map tile layer 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//example add closed marker at center

//L.marker([0,0]).addTo(map)
//     .bindPopup('Placeholder text.<br>Placeholder text')
//    .closePopup();


