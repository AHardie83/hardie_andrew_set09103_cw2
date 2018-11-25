var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 
formatedToday = yyyy + '-' + mm + '-' + dd;

var exampleURL = 'https://api.nasa.gov/neo/rest/v1/feed?';

var startDate = 'start_date=' + formatedToday;

var endDate = '&end_date=' + formatedToday;

var remainingUrlCode = '&api_key=';

var apiKey = 'ACH3onIL7fSX0tQGOXP8EBtQSc07CNRyZiD9u00p'; 

const container = document.createElement('div');
container.setAttribute('class','container');

const app = document.getElementById('root');
app.appendChild(container);


var request = new XMLHttpRequest(); 
request.open('GET', exampleURL + startDate + endDate + remainingUrlCode + apiKey, true);

request.onload = function(){

    const ptoday = document.createElement('p');
    ptoday.textContent = "Date: "+ formatedToday;
    const today = document.getElementById('today');
    today.appendChild(ptoday);

    var rowData = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
    var flyingObjects = rowData.near_earth_objects[formatedToday];
    flyingObjects.forEach(element => {
        const object = document.createElement('div');
        object.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        const br = document.createElement('br');
        h1.textContent =  'Asteroid Name: ' + element.name;

        const p1 = document.createElement('p');
        p1.textContent = 'Asteroid ID: ' + element.id;

        const p2 = document.createElement('p');
        p2.textContent = 'Asteroid Magnitude: ' + element.absolute_magnitude_h;

        const p3 = document.createElement('p');
        p3.textContent = 'Estimated Diameter: max: ' + element.estimated_diameter.meters.estimated_diameter_max + ' min: ' + element.estimated_diameter.meters.estimated_diameter_min;

        const p4 = document.createElement('p');
        p4.textContent = 'Hazardous: ' + element.is_potentially_hazardous_asteroid;

        const p5 = document.createElement('p');
        p5.textContent = 'Sentry Object: ' + element.is_sentry_object;

        container.appendChild(object);
        object.appendChild(h1);
        container.appendChild(br);
        object.appendChild(p1);
        object.appendChild(p2);
        object.appendChild(p3);
        object.appendChild(p4);
        object.appendChild(p5);

        console.log(element);
        console.log(element.absolute_magnitude_h);
        console.log(element.id);
        console.log(element.name);
	
    });
}
else {
console.log("Error in network request: " + request.statusText);
}
}

request.send(null);
