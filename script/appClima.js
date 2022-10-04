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
        descripcion: 'Parcialmente nublado con lluvias',
        imagen: '../imagenes/dia-lluvioso.png',
        alt: 'Día con lluvias',
    },
    {
        id: '10n',
        descripcion: 'Parcialmente nublado con lluvias',
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
        imagen: '../imagenes/niebla.png',
        alt: 'Día con nieblas',
    },
    {
        id: '50n',
        descripcion: 'Neblinas',
        imagen: '../imagenes/niebla.png',
        alt: 'Noche con nieblas',
    },
];


// DECLARACION DE VARIABLES
const APIKEYCLIMA = '9dcc1818ed8b1b9cf09902249070fb83';
const btn = document.getElementById('buscar');
const inputCiudad = document.getElementById('inputCiudad');
const APIKEYMAPA = 'hE3wpAzogyZc3rgzoZJCGCFXQ8TLgF9k';
let recuperar_localStorage;


// FUNCION RESULTADO DEL CLIMA
let divClima = document.createElement('div');
divClima.id = 'clima';

const resultadoClima = (json) => {
    divClima.innerHTML = '';
    divClima.className = 'clima rounded p-3';

    let divZona = document.createElement('div');
    divZona.id = 'zona';
    let pZona = document.createElement('p');
    divZona.append(pZona);
    pZona.innerHTML = json.name;
    
    let divImg = document.createElement('div');
    divImg.id = 'icono';

    for (let i of iconos) {
        let icon = json.weather[0].icon;
        if (icon === i.id) {
            divImg.innerHTML = `<img src="${i.imagen}" alt="${i.alt}"/>`;
        } 
    }

    let divTempActual = document.createElement('div');
    divTempActual.id = 'temperaturaActual';
    let pTempActual = document.createElement('p');
    divTempActual.append(pTempActual);
    pTempActual.innerHTML = `${Math.round(json.main.temp)}°`;

    let divDescripcion = document.createElement('div');
    divDescripcion.id = 'descripcion';
    let pDescripcion = document.createElement('p');
    divDescripcion.append(pDescripcion);

    for (let i of iconos) {
        let icon = json.weather[0].icon;
        if (icon === i.id) {
            pDescripcion.innerHTML = i.descripcion;
        } 
    }

    let divInfo = document.createElement('div');
    divInfo.id = 'info';
    let ulInfo = document.createElement('ul');
    divInfo.append(ulInfo);

    let liMax = document.createElement('li');
    liMax.innerHTML = `<span>Temperatura Máxima</span> <span>${Math.round(json.main.temp_max)}°</span>`;

    let liMin = document.createElement('li');
    liMin.innerHTML = `<span>Temperatura Mínima</span> <span>${Math.round(json.main.temp_min)}°</span>`;

    let liHum = document.createElement('li');
    liHum.innerHTML = `<span>Húmedad</span> <span>${Math.round(json.main.humidity)}%</span>`;

    let liSt = document.createElement('li');
    liSt.innerHTML = `<span>Sensación Térmica</span> <span>${Math.round(json.main.feels_like)}°</span>`;

    let liPa = document.createElement('li');
    liPa.innerHTML = `<span>Presión Atmoférica</span> <span>${Math.round(json.main.pressure)} hPa</span>`;

    let liVv = document.createElement('li');
    liVv.innerHTML = `<span>Velocidad del Viento</span> <span>${Math.round(json.wind.speed)} km/h</span>`;

    ulInfo.append(liMax, liMin, liHum, liSt, liPa, liVv);
    divInfo.append(ulInfo);

    divClima.append(divZona, divImg, divTempActual, divDescripcion, divInfo);
    let section = document.querySelector('section');
    section.append(divClima);
}


let latitud;
let longitud;
const resultadoMapa = () => {
    fetch(`https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&key=${APIKEYMAPA}&zoom=7&center=${`${longitud},${latitud}`}&width=300&height=300&view=AR&language=es-ES`)

            .then(response=>{
                let divMapa = document.createElement('div');
                let imgMapa = document.createElement('img');
                imgMapa.id = 'mapa';
                imgMapa.src = response.url;
                divMapa.append(imgMapa);
                divClima.append(divMapa);
            });
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

        console.log(json);

        resultadoClima(json);

        // let resultado = json.name;
        // console.log(resultado);

        latitud = json.coord.lat;
        longitud = json.coord.lon;

        console.log(latitud, longitud);
        resultadoMapa(longitud, latitud);

        recuperar_localStorage = localStorage.setItem("busqueda", JSON.stringify(json));

    })

    .catch(error=>{console.log(`Ocurrió un error: ${error}`)});
    
    inputCiudad.value = '';
});


