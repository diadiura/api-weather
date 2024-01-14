let select = document.createElement("select");
let option;

document.querySelector(".city").appendChild(select);
let listOptions = ["Kharkiv", "Kyiv", "Rivne", "Odesa", "Ternopil"];
let listValues = ["706483", "703448", "7046809", "698740", "691650"];
for (let i = 0; i < listOptions.length; i++) {
  option = document.createElement("option");
  option.innerHTML = listOptions[i];
  option.setAttribute("value", listValues[i]);
  select.append(option);
}
select.classList.add('cities')

const param = {
  url: "http://api.openweathermap.org/data/2.5/",
  appid: "b22a9210207867ff9b794a67d023a45e",
};
// fetch(
//   "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=0407c4a8a4eb0979b6251dc9dc19b9f0"
// )
//   .then(function (resp) {
//     return resp.json()
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function () {
//     //catch any errors
//   });

function getWeather() {
  const cityId = select.value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&appid=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function getWindDirection(windDeg) {
  let windDirection;
  if (windDeg > 338 || windDeg <= 22) {
    windDirection = "N";
  } else if (windDeg > 22 && windDeg <= 68) {
    windDirection = "NE";
  } else if (windDeg > 68 && windDeg <= 112) {
    windDirection = "E";
  } else if (windDeg > 112 && windDeg <= 157) {
    windDirection = "SE";
  } else if (windDeg > 157 && windDeg <= 202) {
    windDirection = "S";
  } else if (windDeg > 202 && windDeg <= 247) {
    windDirection = "SW";
  } else if (windDeg > 247 && windDeg <= 292) {
    windDirection = "W";
  } else if (windDeg > 292 && windDeg <= 338) {
    windDirection = "NW";
  }
  return windDirection;
}

//https://openweathermap.org/img/wn/10d@2x.png
function showWeather(data) {
  console.log(data);
  document.querySelector(".temperature").innerHTML =
    Math.round(data.main.temp) + "&deg;";
  document.querySelector(".feature").innerHTML = data.weather[0]["description"];
  document.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
  document.querySelector(".wind-direction p").innerHTML = getWindDirection(data.wind.deg);
  document.querySelector(".wind-speed p").innerHTML = Math.round(data.wind.speed);
  document.querySelector(".pressure p").innerHTML = data.main.pressure;
}
getWeather();
//document.querySelector('#city').onchange = getWeather;
document.querySelector(".button").onclick = getWeather;
