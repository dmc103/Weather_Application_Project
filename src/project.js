function displayTemp(response) {
    console.log(response.data);
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round (response.data.main.temp);

    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;

    let h2 = document.querySelector("h2");
    h2.innerHTML = response.data.sys.country


}


let apiKey = `bf2bdff99ecfdbc9e74d435ee65cf081`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rotterdam&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);




