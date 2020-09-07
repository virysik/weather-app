function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(now) {
  let currentDate = document.querySelector("#date-item");
  let dayNumber = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  currentDate.innerHTML = `${dayNumber} ${month}`;

  let currentDay = document.querySelector("#day-item");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  currentDay.innerHTML = `${day}`;
}

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity-item").innerHTML =
    response.data.main.humidity;

  document.querySelector("#wind-item").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description-item").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#time-item").innerHTML = formatTime(
    response.data.dt * 1000
  );

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function showWeatherForecast(response) {
  let forecastLine = document.querySelector("#forecast-line");
  forecastLine.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastLine.innerHTML += `<div class="col">
            <ul>
               <li class="forecast time">${formatTime(forecast.dt * 1000)}</li>
                 <li><img src="http://openweathermap.org/img/wn/${
                   forecast.weather[0].icon
                 }@2x.png" alt=${
      forecast.weather[0].description
    } class = "forecast-emoji" /></li>
               <li class="forecast temp">
          ${Math.round(forecast.main.temp)}°</li>
           </ul>
        </div>`;
  }
}

function searchCity(city) {
  let apiKey = "974437790c20752769b5d2ac36ae13ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-item").value;
  searchCity(city);
}

function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = `metric`;
  let apiKey = "974437790c20752769b5d2ac36ae13ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function searchCurrentWeather() {
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active-link");
  celsiusLink.classList.remove("active-link");
  let temperature = document.querySelector("#current-temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active-link");
  celsiusLink.classList.add("active-link");
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let yourCity = document.querySelector("#search-form");
yourCity.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", searchCurrentWeather);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let now = new Date();
formatDate(now);

searchCity("New York");
