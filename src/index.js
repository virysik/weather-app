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

function searchCity(city) {
  let apiKey = "974437790c20752769b5d2ac36ae13ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-item").value;
  searchCity(city);
}

function showTemperature(response) {
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
    response.data.weather[0].main;

  document.querySelector("#time-item").innerHTML = formatTime(
    response.data.dt * 1000
  );
}

function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = `metric`;
  let apiKey = "974437790c20752769b5d2ac36ae13ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function searchCurrentWeather() {
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let yourCity = document.querySelector("#search-form");
yourCity.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", searchCurrentWeather);

let now = new Date();
formatDate(now);

searchCity("New York");
