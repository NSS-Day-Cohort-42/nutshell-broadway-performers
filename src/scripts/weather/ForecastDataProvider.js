
let forecast = []

export const getEventForecast = (eventLocation) => {
    return fetch(`https://api.weatherbit.io/v2.0/forecast/daily/data?city=${eventLocation}&units=I&key=b61604c210ad4e5fbb4f208cf0792b27`)
        .then(res => res.json())
        .then(parsedResponse => {
            forecast = parsedResponse.data
        })
}

export const useEventForecast = () => {
return forecast.slice()
}


let currentWeather

export const getCurrentWeather = (eventLocation) => {
    return fetch(`https://api.weatherbit.io/v2.0/current?city=${eventLocation}&units=I&key=b61604c210ad4e5fbb4f208cf0792b27`)
        .then(res => res.json())
        .then(parsedResponse => {
            currentWeather = parsedResponse.data[0]
        })
}

export const useCurrentWeather = () => {
return currentWeather
}