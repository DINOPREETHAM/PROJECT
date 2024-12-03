const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryTxt = document.querySelector('.country_text');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-text');

const forecastItemsContainer = document.querySelector('.forecast-items-container');

const apiKey = 'b1a1bf0bdfd6cf505b7bbc1c0ea70007';

searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    } 
});

cityInput.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter' && cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
})

async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiUrl);

    return response.json();
}

async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);

    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection);
        return;
    }

    console.log(weatherData);

    const {
        name : country,
        main : { temp, humidity },
        weather : [{ id, main }],
        wind : { speed }
    } = weatherData

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + ' °C';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + ' M/s'

    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImg.src = `assests/weather/${getWeatherIcon(id)}`;

    await updateForecastInfo(city)
    showDisplaySection(weatherInfoSection); 
}

async function updateForecastInfo(city){
    const forecastData = await getFetchData('forecast', city);

    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T');

    forecastItemsContainer.innerHTML = " ";
    
    forecastData.list.forEach(forecastWeather => {
        if(forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)){
                updateForecastItems(forecastWeather);
        }
    })
}

function updateForecastItems(weatherData){

    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData;

    const dateTaken = new Date(date);
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

    const forecastItem = `
                <div class="forecast-item">
                    <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
                    <img src="assests/weather/${getWeatherIcon(id)}" class="forecast-item-img">
                    <h5 class="forcast-item-temp">${Math.round(temp)} °C</h5>
                </div>
                `
    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}

function showDisplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection]
    .forEach(section => section.style.display = 'none');

    section.style.display = 'flex';

}

function getWeatherIcon(id){
    if( id <= 232 ) return 'thunderstorm.svg';
    if( id <= 321 ) return 'drizzle.svg';
    if( id <= 531 ) return 'rain.svg';
    if( id <= 622 ) return 'snow.svg';
    if( id <= 781 ) return 'atmosphere.svg';
    if( id <= 800 ) return 'clear.svg';
    else return 'clouds.svg';
}

function getCurrentDate(){
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short' 
    }

    return currentDate.toLocaleDateString('en-GB', options);
}

const mapBtn = document.querySelector('.map-btn');
const weatherMapContainer = document.querySelector('.weather-map-container');

// When the map button is clicked, toggle the map container
mapBtn.addEventListener('click', () => {
    if (weatherMapContainer.style.display === 'none') {
        weatherMapContainer.style.display = 'block';
        weatherInfoSection.style.display = 'none';
        searchCitySection.style.display = 'none';
        cityInput.style.display = 'none';
        searchBtn.style.display = 'none';
        showWeatherMap(); // Function to display the weather map
    } else {
        weatherMapContainer.style.display = 'none';
        searchCitySection.style.display = 'block';
        cityInput.style.display = 'inline';
        searchBtn.style.display = 'block';
    }
});

function showWeatherMap() {
    const map = new L.Map('weather-map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // OpenWeatherMap Tile Layer for clouds or other weather data
    const weatherLayer = L.tileLayer('https://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=b1a1bf0bdfd6cf505b7bbc1c0ea70007', {
        attribution: '&copy; OpenWeatherMap'
    }).addTo(map);
}

