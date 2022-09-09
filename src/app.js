function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="col">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="weather-forecast">
  <div class="col">
                <span class="day">${formatDays(forecastDay.dt)}</span>
                <div class="temp">
                <span class="max-temp">H:${Math.round(
                  forecastDay.temp.max
                )}℉ </span> 
                <span class="min-temp">L:${Math.round(
                  forecastDay.temp.min
                )}℉</span>
                </div>
                </div>
                <div class="col-auto">
                <img
          src="img/f${forecastDay.weather[0].icon}.png"
          alt=""
          width="50"
        />
                </div>
              </div>
              
             `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-day-time").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#main-icon")
    .setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  document
    .querySelector("#main-icon")
    .setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "25ff250e18c21d3ed78d0fa66517f0aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputCityElement = document.querySelector("#input-city");
  search(inputCityElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("Jacksonville");
