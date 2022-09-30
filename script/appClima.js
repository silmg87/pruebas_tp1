'use strict';

// ARRAY DE ICONOS
const iconos = [
    {
        id: '01d',
        descripcion: 'Soleado',
        imagen: '../imagenes/soleado.png',
        alt: 'Día Soleado',
    },
    {
        id: '01n',
        descripcion: 'Cielo despejado',
        imagen: '../imagenes/noche-despejada.png',
        alt: 'Noche Despejada',
    },
    {
        id: '02d',
        descripcion: 'Parcialmente nublado con sol',
        imagen: '../imagenes/dia-nublado.png',
        alt: 'Día Nublado',
    },
    {
        id: '02n',
        descripcion: 'Pacialmente nublado',
        imagen: '../imagenes/noche-nublada.png',
        alt: 'Noche Nublada',
    },
    {
        id: '03d',
        descripcion: 'Mayormente nublado',
        imagen: '../imagenes/nubes.png',
        alt: 'Día Nublado',
    },
    {
        id: '03n',
        descripcion: 'Mayormente nublado',
        imagen: '../imagenes/nubes.png',
        alt: 'Noche Nublada',
    },
    {
        id: '04d',
        descripcion: 'Mayormente nublado',
        imagen: '../imagenes/nubes.png',
        alt: 'Día Nublado',
    },
    {
        id: '04n',
        descripcion: 'Mayormente nublado',
        imagen: '../imagenes/nubes.png',
        alt: 'Noche Nublada',
    },  
    {
        id: '09d',
        descripcion: 'Cielo cubierto con lloviznas',
        imagen: '../imagenes/llovizna.png',
        alt: 'Día con lloviznas',
    },
    {
        id: '09n',
        descripcion: 'Cielo cubierto con lloviznas',
        imagen: '../imagenes/llovizna.png',
        alt: 'Noche con lloviznas',
    },
    {
        id: '10d',
        descripcion: 'Parcialmente cubierto con lluvias',
        imagen: '../imagenes/dia-lluvioso.png',
        alt: 'Día con lluvias',
    },
    {
        id: '10n',
        descripcion: 'Parcialmente cubierto con lluvias',
        imagen: '../imagenes/noche-lluviosa.png',
        alt: 'Noche con luvias',
    },
    {
        id: '11d',
        descripcion: 'Tormentas eléctricas',
        imagen: '../imagenes/tormenta.png',
        alt: 'Día con tormenta',
    },
    {
        id: '11n',
        descripcion: 'Tormentas eléctricas',
        imagen: '../imagenes/tormenta.png',
        alt: 'Noche con tormenta',
    },
    {
        id: '13d',
        descripcion: 'Nevadas',
        imagen: '../imagenes/nieve.png',
        alt: 'Día con nevadas',
    },
    {
        id: '13n',
        descripcion: 'Nevadas',
        imagen: '../imagenes/nieve.png',
        alt: 'Noche con nevadas',
    },
    {
        id: '50d',
        descripcion: 'Neblinas',
        imagen: '../imagenes/nieblas.png',
        alt: 'Día con nieblas',
    },
    {
        id: '50n',
        descripcion: 'Neblinas',
        imagen: '../imagenes/nieblas.png',
        alt: 'Noche con nieblas',
    },
];

// DECLARACION DE VARIABLES
const APIKEYCLIMA = '9dcc1818ed8b1b9cf09902249070fb83';
const btn = document.getElementById('buscar');
const inputCiudad = document.getElementById('inputCiudad');

const resultadoTemp = document.getElementById('temperaturaActual');
const resultadoZona = document.getElementById('zona');
const resultadoIcono = document.getElementById('icono');
const resultadoInfo = document.getElementById('temperaturaInfo');
const maps = document.getElementById('mapa');
let divZona = '';
let tempActual = '';
let icono = '';
let info = '';
let divMapa = '';

// FUNCION PARA MOSTRAR DATOS DEL LOCALSTORAGE
function mostrarBusquedas() {
    if(localStorage.busqueda){
        recuperar_localStorage = JSON.parse(localStorage.getItem("busqueda"));
        let guardarDatos = '';
    for (let clave in recuperar_localStorage) {
        guardarDatos += `<div>
                            <h2>Vistos recientemente</h2>
                            <p class="datos">
                            <span>${recuperar_localStorage[clave].ciudad}</span>
                            <span>${recuperar_localStorage[clave].temp}</span>
                            <span>${recuperar_localStorage[clave].info.descripcion}</span>
                            <span>${recuperar_localStorage[clave].info.max}</span>
                            <span>${recuperar_localStorage[clave].info.min}</span>
                            <span>${recuperar_localStorage[clave].info.hum}</span>
                            <span>${recuperar_localStorage[clave].info.st}</span>
                            <span>${recuperar_localStorage[clave].info.presAt}</span>
                            <span>${recuperar_localStorage[clave].info.velViento}</span>
                            </p>
                        </div>`
    }

    document.querySelector("#mostrarAnterior").innerHTML = guardarDatos;

    }
}

// EVENTO CLICK "BUSCAR"
btn.addEventListener('click', event => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&appid=${APIKEYCLIMA}&units=metric&lang=es`)
    .then(response=>{
        console.log(`Respuesta: ${response}`, response);
        return response.json();
    })

    .then(json=>{
        console.log(json)

        let divZona = document.createElement('div');

        divZona = `<p>${json.name}</p>`;
        resultadoZona.innerHTML = divZona;
        divZona = '';

        for (let i of iconos) {
            let icon = json.weather[0].icon;
            if (icon === i.id) {
                icono = `<img src="${i.imagen}" alt="${i.alt}"/>`;
                resultadoIcono.innerHTML = icono;
            } 
            console.log(icon);
        }
        
        icono = '';

        tempActual = `<p>${Math.round(json.main.temp)}°</p>`;
        resultadoTemp.innerHTML = tempActual;
        tempActual = '';

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

        function guardarLocalStorage(){
            if (!localStorage.getItem("busqueda")) {
                var array_clima = [];
            } else {
                array_clima = JSON.parse(localStorage.busqueda);
            }
                
            let datosClima = {
                ciudad: json.name,
                temp: Math.round(json.main.temp),
                info: {
                    descripcion: json.weather[0].description,
                    max: Math.round(json.main.temp_max),
                    min: Math.round(json.main.temp_min),
                    hum: Math.round(json.main.humidity),
                    st: Math.round(json.main.feels_like),
                    presAt: Math.round(json.main.pressure),
                    velViento: Math.round(json.wind.speed)
                }
            }
                array_clima.push(datosClima);
                localStorage.setItem("busqueda", JSON.stringify(array_clima));	
                
        }

        guardarLocalStorage();
    })
    
    .catch(error=>{console.log(`Ocurrió un error: ${error}`)})

});



