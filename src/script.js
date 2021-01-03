//Adding a date/time
let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = now.getDay();
let weekday = weekdays[day];
let today = document.querySelector("#date");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

today.innerHTML = `${weekday} ${hour}:${minutes}`;

//ENTER CITY AND CLICK SEARCH BUTTON THEN DISPLAY

//City name
function displayCityInfo(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-text");
  let searchCityName = document.querySelector("#city");
  searchCityName.innerHTML = `${searchInput.value}`;

  //City temperature
  let apiKey = "4581002eb6d6effa90c6392584a38b4b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}&appid=${apiKey}`;

  function getTemp(response) {
    let searchCityTempValue = Math.round(response.data.main.temp);
    let searchCityTempElement = document.querySelector("#today-temp");
    searchCityTempElement.innerHTML = `${searchCityTempValue}`;

    let searchCityHumidityValue = response.data.main.humidity;
    let searchCityHumidityElement = document.querySelector("#humidity");
    searchCityHumidityElement.innerHTML = `${searchCityHumidityValue}`;

    let searchCityWindSpeedValue = response.data.wind.speed;
    let searchCityWindSpeedElement = document.querySelector("#wind-speed");
    searchCityWindSpeedElement.innerHTML = `${searchCityWindSpeedValue}`;
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}

let searchButton = document.querySelector("#search-feature");
searchButton.addEventListener("submit", displayCityInfo);

//
function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocationTemp);

  function getCurrentTemp(response) {
    let currentCityTempValue = Math.round(response.data.main.temp);
    let currentCityTempElement = document.querySelector("#today-temp");
    currentCityTempElement.innerHTML = `${currentCityTempValue}`;

    let currentCityNameValue = response.data.name;
    let currentCityNameElement = document.querySelector("#city");
    currentCityNameElement.innerHTML = `${currentCityNameValue}`;

    let searchCityHumidityValue = response.data.main.humidity;
    let searchCityHumidityElement = document.querySelector("#humidity");
    searchCityHumidityElement.innerHTML = `${searchCityHumidityValue}`;

    let searchCityWindSpeedValue = response.data.wind.speed;
    let searchCityWindSpeedElement = document.querySelector("#wind-speed");
    searchCityWindSpeedElement.innerHTML = `${searchCityWindSpeedValue}`;
  }

  function showCurrentLocationTemp(position) {
    let latitudeValue = position.coords.latitude;
    let longitudeValue = position.coords.longitude;

    let apiKey = "4581002eb6d6effa90c6392584a38b4b";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}&units=${units}`;

    axios.get(`${apiUrl}&appid=${apiKey}`).then(getCurrentTemp);
  }
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", findCurrentLocation);

//Change to Fahrenheit
function changeToFahrenheit(event) {
  event.preventDefault();
  let currentLocationTemp = document.querySelector("#today-temp");
  currentLocationTemp.innerHTML = Math.round(
    (currentLocationTemp.innerHTML * 9) / 5 + 32
  );
}

//Change to Celsius
function changeToCelsius(event) {
  event.preventDefault();
  let currentLocationTemp = document.querySelector("#today-temp");
  currentLocationTemp.innerHTML = Math.round(
    ((currentLocationTemp.innerHTML - 32) * 5) / 9
  );
}

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", changeToFahrenheit);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", changeToCelsius);
