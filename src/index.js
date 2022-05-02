import './style.css';

let weatherData = {};

const getWeather = async (location) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=a9c5b4d87fe8529eb762ce740b25a463&units=imperial`, {mode: 'cors'});
        const weather = await response.json();
        weatherData = parseWeather(weather);
        populateDom(weatherData);
        return weatherData;
    } catch (err){
        console.log(err);
        alert('City not found');
    }
}

const parseWeather = (weather) => {
    let weatherConditions = weather.main;
    let name = weather.name;
    let country = weather.sys.country;
    let weatherDescription = weather.weather[0].description.toUpperCase();
    let wind = weather.wind.speed;
    return {name, country, weatherConditions, wind, weatherDescription};
}

const populateDom = async () => {
    let location = document.getElementById('location');
    let discription = document.getElementsByClassName('discription')[0];
    let temp = document.getElementsByClassName('temp')[0];
    let tempMax = document.getElementsByClassName('temp-max')[0];
    let tempMin = document.getElementsByClassName('temp-min')[0];
    let tempFeel = document.getElementsByClassName('feels-like')[0];
    let wind = document.getElementsByClassName('wind')[0];
    let humidity = document.getElementsByClassName('humidity')[0];
    
    location.innerText = (`${weatherData.name}, ${weatherData.country}`);
    discription.innerText = weatherData.weatherDescription;
    temp.innerText = Math.round(weatherData.weatherConditions.temp);
    tempMax.innerText = `Max Temp: ${Math.round(weatherData.weatherConditions.temp_max)}`;
    tempMin.innerText = `Min Temp: ${Math.round(weatherData.weatherConditions.temp_min)}`;
    tempFeel.innerText = `Feels Like: ${Math.round(weatherData.weatherConditions.feels_like)}`;
    wind.innerText = `Wind Speed: ${Math.round(weatherData.wind)} mph`;
    humidity.innerText = `Humidity: ${weatherData.weatherConditions.humidity}`;

}

const search = document.querySelector('input');
const submit = document.querySelector('input[type=submit]')

submit.addEventListener('click', function() {
    let city = search.value;
    getWeather(city);
})

getWeather('London');





