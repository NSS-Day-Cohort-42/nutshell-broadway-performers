// Stored a constant that holds an array of the days of the week to use later in my date function
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

// weatherHTMLRep is a function that simply returns the string of HTML for a single days forecast
// this function has a single parameter that represents a single day of the forecast loop
export const weatherHTMLRep = (weatherObj) => {
  // In this function I create a constant that holds the formula to convert kelvin to Fahrenheit
  const kelvinConvert = Math.round(((`${weatherObj.temp.day}`-273.15)*1.8)+32)
  // Below is the resulting HTML representation of a single day.
  // In order to get the day of the week to display I had to create a "new Date"
  // I wrapped that new date in my days array.
  // This allowed my new Date function to return a numerical value of 0-6 which would coorespondingly display the name as it relates to the array. 
  return`
  <div class="weatherContainerOutput">
    <div>${days[new Date((weatherObj.dt*1000)).getDay()]}</div>
    <div>Avg:</div>
    <div>${kelvinConvert}&degF</div>
    <img src="http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png"></img>
  </div>
  `
}
