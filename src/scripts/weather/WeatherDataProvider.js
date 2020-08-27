
import key from "../Settings.js";
import { render } from  "./WeatherList.js"

let weatherArray = []

const successObject = (position) => {
  let lat = position.coords.latitude
  let long = position.coords.longitude
  console.log(position)
  getWeather(lat, long)
  .then(() => {
    const weatherData = useWeather() 
    console.log(weatherData)
    render(weatherData)
  })
}


function errorHandler(err) {
  if(err.code == 1) {
     alert("Error: Access is denied!");
  } else if( err.code == 2) {
     alert("Error: Position is unavailable!");
  }
}
  
export const getLocation = () => {
  if(navigator.geolocation) {
     return navigator.geolocation.getCurrentPosition(successObject, errorHandler, showError);
  } else {
     alert("Sorry, browser does not support geolocation!");
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

// 2 parameters are passed in which will hold the values of the latitude and longitude of the selected park.
export const getWeather = (lat, long) => {

  //return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=36.0546304&lon=-86.6910208&exclude=hourly&appid=8b29a4bca59654d89101420102680ded`)
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&appid=${key.weatherKey}`)
  .then(res => res.json())
  .then(
    parsedWeather => {
      weatherArray = parsedWeather.daily
    }
    )
  }
  
  export const useWeather = () => weatherArray.slice()

