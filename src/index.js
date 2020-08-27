let now = new Date();
let currentTime = document.querySelector("#time-item");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hours}:${minutes}`;

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

let currentDateOne = document.querySelector("#date-item1");
currentDateOne.innerHTML = `${dayNumber + 1} ${month}`;

let currentDateTwo = document.querySelector("#date-item2");
currentDateTwo.innerHTML = `${dayNumber + 2} ${month}`;

let currentDateThree = document.querySelector("#date-item3");
currentDateThree.innerHTML = `${dayNumber + 3} ${month}`;

let currentDateFour = document.querySelector("#date-item4");
currentDateFour.innerHTML = `${dayNumber + 4} ${month}`;

let currentDateFive = document.querySelector("#date-item5");
currentDateFive.innerHTML = `${dayNumber + 5} ${month}`;

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

//week5 homework

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
  console.log(response.data);
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
}

let yourCity = document.querySelector("#search-form");
yourCity.addEventListener("submit", handleSubmit);

searchCity("New York");

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

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", searchCurrentWeather);
