function formatDate(timestamp) {
    let date = new Date (timestamp);

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return `${day} ${formatTime(timestamp)}`;

}

function formatTime (timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {hours = `0${hours}`;}

    let minutes = date.getMinutes();
    if (minutes < 10) {minutes = `0${minutes}`;}
    return `${hours}:${minutes}`;
}

function displayTemp(response) {
    
    let temperature = document.querySelector("#temperature");
    let h1 = document.querySelector("h1");
    let h2 = document.querySelector("h2");
    let skies = document.querySelector("#skies");
    let humid = document.querySelector("#humid");
    let wind = document.querySelector("#wind");
    let today = document.querySelector("#today");
    let icon = document.querySelector("#icon");
    
    celsiusTemp = response.data.main.temp;

    
    temperature.innerHTML = Math.round(celsiusTemp);
    h1.innerHTML = response.data.name;
    h2.innerHTML = response.data.sys.country;
    skies.innerHTML = response.data.weather[0].description;
    humid.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    today.innerHTML = formatDate(response.data.dt*1000);
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    icon.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
    let forecastHour = document.querySelector ("#forecast");
    forecastHour.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastHour.innerHTML += 
        `<div class="col-2">
            <h5>
                ${formatTime(forecast.dt * 1000)}
            </h5>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
            <div class="forecast-temp">
                <strong>${Math.round(forecast.main.temp_max)}° |
                </strong> ${Math.round(forecast.main.temp_min)}°
            </div>
        </div>
        `;
    }
}



function search(city) {
    let apiKey = `bf2bdff99ecfdbc9e74d435ee65cf081`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast)
}


function handleSubmit(event) {
    event.preventDefault();
    let searching = document.querySelector("#searching");
    search(searching.value);
}

function displayFahrenheit(event) {
    event.preventDefault();
    let fahrenheit = (celsiusTemp * 9) / 5 + 32;
    let temperature = document.querySelector ("#temperature");
    temperature.innerHTML = Math.round(fahrenheit);
}

function displayCel(event) {
    let celsius = celsiusTemp;
    let temperature = document.querySelector ("#temperature");
    temperature.innerHTML = Math.round(celsius);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahLink = document.querySelector ("#fah-link");
fahLink.addEventListener ("click",displayFahrenheit);

let celLink = document.querySelector ("#cel-link");
celLink.addEventListener("click",displayCel);

search("Rotterdam");