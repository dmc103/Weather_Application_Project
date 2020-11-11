function formatDate(timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) hours = `0${hours}`

    let minutes = date.getMinutes();
    if (minutes < 10) hours = `0${minutes}`

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return `${day} ${hours}: ${minutes}`;

}



function displayTemp(response) {
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round (response.data.main.temp);

    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;

    let h2 = document.querySelector("h2");
    h2.innerHTML = response.data.sys.country;

    let skies = document.querySelector("#skies");
    skies.innerHTML = response.data.weather[0].description;

    let humid = document.querySelector("#humid");
    humid.innerHTML = response.data.main.humidity;

    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round (response.data.wind.speed);

    let today = document.querySelector("#today");
    today.innerHTML = formatDate(response.data.dt*1000);


}


let apiKey = `bf2bdff99ecfdbc9e74d435ee65cf081`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rotterdam&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);




