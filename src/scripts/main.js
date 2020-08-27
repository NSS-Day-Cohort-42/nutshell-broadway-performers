//import { getLocation, getWeather, showPosition } from "./weather/WeatherDataProvider.js"

import { getLocation, getWeather, useWeather,locationObject } from "./weather/WeatherDataProvider.js"


/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/


getLocation()

    // const lat = locationObject.coords.latitude,
    // const long = locationObject.coords.longitude,
    

.then(
    getWeather(lat, long)

)
.then(() => {
    const weatherData = useWeather() 
    console.log(weatherData)
}
)
 
 
    