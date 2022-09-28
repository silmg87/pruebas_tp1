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

function busquedasAnteriores() {
    let guardarDatos = '';
    for (let clave in recuperar_localStorage) {
        guardarDatos += `<div>
                            <p class="datos">
                            <span> ${recuperar_localStorage[clave].ciudad}</span>
                            <span> ${recuperar_localStorage[clave].temp}</span>
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
    inputCiudad.value = ''; 
}

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
                
            datosClima = {
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
                recuperar_localStorage = JSON.parse(localStorage.getItem("busqueda"));
        }

        guardarLocalStorage();
        
        function busquedasAnteriores() {
            let guardarDatos = '';
            for (let clave in recuperar_localStorage) {
                guardarDatos += `<div>
                                    <p class="datos">
                                    <span> ${recuperar_localStorage[clave].ciudad}</span>
                                    <span> ${recuperar_localStorage[clave].temp}</span>
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
            inputCiudad.value = ''; 
        }
        busquedasAnteriores();
        
    })
    
    .catch(error=>{console.log(`Ocurrió un error: ${error}`)})
    
  
    
     
});
