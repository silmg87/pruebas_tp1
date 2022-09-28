const APIKEYCLIMA = '9dcc1818ed8b1b9cf09902249070fb83';
const btn = document.getElementById('buscar');
const inputCiudad = document.getElementById('inputCiudad');
const resultadoTemp = document.getElementById('temperaturaActual');
const resultadoIcono = document.getElementById('icono');
const resultadoZona = document.getElementById('zona');
const resultadoInfo = document.getElementById('temperaturaInfo');
const maps = document.getElementById('mapa');
let divZona = '';
let tempActual = '';
let icono = '';
let info = '';
let divMapa = '';
let datos = [];

btn.addEventListener('click', event => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&appid=${APIKEYCLIMA}&units=metric&lang=es`)
    .then(respuesta=>{
        console.log(`Respuesta: ${respuesta}`, respuesta);
        return respuesta.json();
    })

    .then(json=>{
        console.log(json)

        divZona = `<p>${json.name}</p>`;
        resultadoZona.innerHTML = divZona;
        divZona = '';

        tempActual = `<p>${Math.round(json.main.temp)}°</p>`;
        resultadoTemp.innerHTML = tempActual;
        mensaje ='';

        info = `<div>
                    <p>${json.weather[0].description}</p>
                </div>
                <ul>
                    <li><span>Temperatura Máxima</span> <span>${Math.round(json.main.temp_max)}°</span></li>
                    <li><span>Temperatura Mínima</span> <span>${Math.round(json.main.temp_min)}°</span></li>
                    <li><span>Húmedad</span> <span>${Math.round(json.main.humidity)}%</span></li>
                    <li><span>Sensación Térmica</span> <span>${Math.round(json.main.feels_like)}°</span></li>
                    <li><span>Presión Atmoférica</span> <span>${Math.round(json.main.pressure)} hPa</span></li>
                    <li><span>Velocidad del Viento</span> <span>${Math.round(json.wind.speed)} km/h</span></li>
                </ul>`;
        resultadoInfo.innerHTML = info;
        info ='';


        
    })

    .catch(error=>{console.log(`Ocurrió un error: ${error}`)})
    
});