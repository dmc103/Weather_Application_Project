function displayTemp(response) {
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = response.data.main.temp;


}


let apiKey = `bf2bdff99ecfdbc9e74d435ee65cf081`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rotterdam&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);




