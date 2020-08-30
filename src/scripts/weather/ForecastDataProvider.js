
const forecast = []

export const getEventForecast = (eventLocation) => {
    return fetch(`https://api.weatherbit.io/v2.0/forecast/daily/data?city=${eventLocation}&key=b61604c210ad4e5fbb4f208cf0792b27`)
    .then()
}