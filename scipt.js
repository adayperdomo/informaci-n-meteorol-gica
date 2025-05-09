"use strict"

document.getElementById("boton").addEventListener("click", function(e){
    e.preventDefault();
    consultarAPI();
});


function consultarAPI(){
    let xhr, city, apiKey, url;

    city = document.getElementById("input").value;
    apiKey = "6dc317711b99db905e1bb85823bc495c"
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    xhr = new XMLHttpRequest();
    xhr.onload = function(){
        mostrarInformacion(this);
    }
    xhr.open("GET", url);
    xhr.send();

}

function mostrarInformacion(xhr){
    let obj = JSON.parse(xhr.responseText);

    let city = obj.name;
    let temp = String(Math.round(obj.main.temp));
    let weatherDescription = obj.weather[0].description;
    let country = obj.sys.country;
    let icon = "https://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png";

    let codigoHTML ="<div class='prueba'>" +
                        "<p class='nombre'>"+ city + "<sup>"+ country + "</sup></p>" +
                        "<p class='temperatura'>"+ temp + "<sup>ºC</sup></p>" +
                        "<figure>" +
                            "<img src='" + icon + "'>" +
                            "<figcaption>"+ weatherDescription +"</figcaption>" +
                        "</figure>" +
                    "</div>";

    document.getElementById("tarjetas").innerHTML += codigoHTML;

    document.getElementById("input").value = "";
}
