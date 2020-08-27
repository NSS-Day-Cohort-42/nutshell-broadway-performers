import { useWeather, getWeather } from "./WeatherProvider.js";
import { weatherHTMLRep } from "./WeatherHTMLConvertor.js";
import { useParks } from "../parks/ParkProvider.js";


const eventHub = document.querySelector(".eventHub")
const contentTarget = document.querySelector(".weatherContainer")


eventHub.addEventListener("parkSelected", () => {

  const selectedParkCode = document.querySelector("#parkSelect").value

  const foundParkObject = useParks().find(
    (park) => {
      return selectedParkCode === park.parkCode
    })
    

    const lat = successObject.coords.latitude
    const long = successObject.coords.longitude
    //const locationName = foundParkObject.name
    

    getWeather(lat, long)
    .then(() => {
      const weather = useWeather()
      render(weather, name)
    }) 
  })
     
  const render = (weatherArr, name) => {
    let weatherHTMLString = ""


  contentTarget.innerHTML = `
  <div class="weatherHeading">5 day forecast for ${name}</div>
  <div class="weatherString">${weatherHTMLString}</div>
  `
}
