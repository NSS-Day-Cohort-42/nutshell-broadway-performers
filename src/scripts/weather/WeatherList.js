import { useWeather, getWeather } from "./WeatherProvider.js";
import { weatherHTMLRep } from "./WeatherHTMLConvertor.js";
import { useParks } from "../parks/ParkProvider.js";

// Defined 2 variables.
// One contains EventHub location.
// The other is the container for weather.
const eventHub = document.querySelector(".eventHub")
const contentTarget = document.querySelector(".weatherContainer")

// Listening for a park to be selected.  
// When one is selected the following executes.
eventHub.addEventListener("parkSelected", () => {
  // looking to the DOM to see the value of the parkSelect ID
  // Stored it in a variable called selectedParkCode for later use.
  const selectedParkCode = document.querySelector("#parkSelect").value
  // created a constant named foundParkObject.
  // This constant is an array method used to find the park code in the JSON file
  // that matches the selectedParkCode variable stored above
  const foundParkObject = useParks().find(
    (park) => {
      return selectedParkCode === park.parkCode
    })
    
    // Below I'm storing 3 variables to hold values I need access to below.
    // They all use . notation to drill in to JSON file properties.
    const lat = foundParkObject.latitude
    const long = foundParkObject.longitude
    const name = foundParkObject.name
    
    // GetWeather has been imported above and I'm passing in 2 arguments.
    // These arguments hold the vaules of the selected park object from the dropdown.
    // This allows those values to be interpolated into the API call to have the result match the selected park.
    // The render function then runs passing in 2 arguments.
    // One is the weather array we just built.
    // And the other is the name variable of the selected park.
    getWeather(lat, long)
    .then(() => {
      const weather = useWeather()
      render(weather, name)
    }) 
  })
    
  // Render will generate the string that prints to the selected HTML class.
  // Render takes in to parameters as decribed above. 
  const render = (weatherArr, name) => {
    let weatherHTMLString = ""
  // The string is built out using a loop that starts with the next day and runs for 5 days.
  // The builder uses the linked weatherHTMLRep function to create
  for (let i = 1; i < 6; i++) {
    const element = weatherArr[i];
    weatherHTMLString += weatherHTMLRep(element)
  }

  // The HTML is created and wrapped in a div that allows for a heading with the name interpolated.
  contentTarget.innerHTML = `
  <div class="weatherHeading">5 day forecast for ${name}</div>
  <div class="weatherString">${weatherHTMLString}</div>
  `
}
