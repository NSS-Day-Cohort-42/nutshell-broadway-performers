
let forecast = []

export const getEventForecast = (eventLocation) => {
    return fetch(`https://api.weatherbit.io/v2.0/forecast/daily/data?city=${eventLocation}&units=I&key=b61604c210ad4e5fbb4f208cf0792b27`)
        .then(res => res.json())
        .then(parsedResponse => {
            forecast = parsedResponse.data
        })
        .catch(errorResponse => {
            alert('info not available for that locaiton! gotta be a city for this to work okay?')
    })
}

export const useEventForecast = () => {
return forecast.slice()
}

// If date is out of range, try to get current weather for specified location

let currentWeather

export const getCurrentWeather = (eventLocation) => {
    return fetch(`https://api.weatherbit.io/v2.0/current?city=${eventLocation}&units=I&key=b61604c210ad4e5fbb4f208cf0792b27`)
        .then(res => res.json())
        .then(parsedResponse => {
            currentWeather = parsedResponse.data[0]
        })
        .catch(errorResponse => {
            alert('info not available for that locaiton!')
    })
}

export const useCurrentWeather = () => {
return currentWeather
}