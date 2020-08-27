import { weatherHTMLRep } from "./WeatherHTMLConverter.js";



const eventHub = document.querySelector(".eventHub")
const contentTarget = document.querySelector(".weatherHeader")


// eventHub.addEventListener("parkSelected", () => {

//   const selectedParkCode = document.querySelector("#parkSelect").value

//   const foundParkObject = useParks().find(
//     (park) => {
//       return selectedParkCode === park.parkCode
//     })
    

//     const lat = successObject.coords.latitude
//     const long = successObject.coords.longitude
//     //const locationName = foundParkObject.name
    

//     getWeather(lat, long)
//     .then(() => {
//       const weather = useWeather()
//       render(weather, name)
//     }) 
//   })
     
  export const render = (weatherArr) => {
    let weatherHTMLString = ""
    weatherHTMLString = weatherHTMLRep(weatherArr)

  contentTarget.innerHTML = `
  <div class="weatherString">${weatherHTMLString}</div>
  `
}
