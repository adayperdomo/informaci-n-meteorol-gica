"use strict"

let ciudadesBuscadas = [];

document.getElementById("boton").addEventListener("click", function(e){
    e.preventDefault();
    consultarAPI();
});

function consultarAPI(){
    let xhr, city, apiKey, url;
    let pError = document.getElementById("mensaje-error");

    city = document.getElementById("input").value.trim();

    if(city === ""){
        pError.textContent = "Por favor, escribe una ciudad";
        pError.className = "error activo";
        return;
    }

    if(ciudadesBuscadas.includes(city.toLowerCase())){
        pError.textContent = "Ya has buscado esta ciudad";
        pError.className = "error advertencia";
        return;
    }

    apiKey = "6dc317711b99db905e1bb85823bc495c";
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    xhr = new XMLHttpRequest();
    xhr.onload = function(){
        mostrarInformacion(this, city);
    }
    xhr.open("GET", url);
    xhr.send();
}

function mostrarInformacion(xhr, city){
    let pError = document.getElementById("mensaje-error");

    if(xhr.status !== 200){
        pError.textContent = "Ciudad no encontrada. Inténtalo de nuevo";
        pError.className = "error activo";
        return;
    }

    let obj = JSON.parse(xhr.responseText);

    let cityName = obj.name;
    let temp = String(Math.round(obj.main.temp));
    let weatherDescription = obj.weather[0].description;
    let country = obj.sys.country;
    let icon = "https://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png";

    let codigoHTML ="<div class='prueba'>" +
                        "<p class='nombre'>"+ cityName + "<sup>"+ country + "</sup></p>" +
                        "<p class='temperatura'>"+ temp + "<sup>ºC</sup></p>" +
                        "<figure>" +
                            "<img src='" + icon + "'>" +
                            "<figcaption>"+ weatherDescription +"</figcaption>" +
                        "</figure>" +
                    "</div>";

    document.getElementById("tarjetas").innerHTML += codigoHTML;

    ciudadesBuscadas.push(city.toLowerCase());

    document.getElementById("input").value = "";

    pError.className = "error";
}
