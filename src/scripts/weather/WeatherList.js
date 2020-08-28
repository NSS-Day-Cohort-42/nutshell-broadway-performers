import { weatherHTMLRep, eventWeatherHTMLRep } from "./WeatherHTMLConverter.js";
import {
  triggerWeatherEvent,
  useEventForecastWeather,
} from "./WeatherDataProvider.js";

const eventHub = document.querySelector(".eventHub");
const contentTarget = document.querySelector(".weatherHeader");

//eventHub.addEventListener("eventWeatherButtonClicked", () => { //<--- Custom event name- need to get with the team on this

//const selectedEventWeather = document.querySelector("#eventSelect").value //<--- this might need some work. Not sure about ID or using .value
const selectedEventWeather = 1;

//testing function
const useEvents = () => {
  return [
    {
      userId: 1,
      event_name: "park",
      event_location: "Nashville",
      event_date: 1599022800000,
      id: 1,
    },
  ];
};
export const weatherEventList = () => {
  const EventList = useEvents();

  const foundEventObject = EventList.find((event) => {
    return selectedEventWeather === event.id;
  });

  //NOTE: 432000000 === 5 days
  const fiveDaysFromNow = Date.now() + 432000000;
  if (foundEventObject.event_date > fiveDaysFromNow) {
    alert("can't show weather forecast for a date that far in advance");
  } else {
    const city = foundEventObject.event_location;

    triggerWeatherEvent(city).then(() => {
      const forecast = useEventForecastWeather();
      console.table(forecast);
    })
  
      const eventWeatherForecast = forecast.find((forecastObject) => {
        let dateToString = forecastObject.dt + "" + "000";
        const dateToNumber = parseInt(dateToString);
        console.log(dateToNumber);
        return dateToNumber === foundEventObject.event_date;
      });
      renderForecast(eventWeatherForecast); //<----correct object from the array gets passed in here
  }

};

export const render = (weatherArr) => {
  let weatherHTMLString = "";
  weatherHTMLString = weatherHTMLRep(weatherArr);

  contentTarget.innerHTML = `
  <div class="weatherString">${weatherHTMLString}</div>
  `;
};

const renderForecast = (eventWeatherObject) => {
  let eventWeatherHTMLstring = "";
  eventWeatherHTMLstring = eventWeatherHTMLRep(eventWeatherObject);
  alert(`${eventWeatherHTMLstring}`);
};

// this didn't work. it would be cool if it did.

// Number.prototype.concatenate = function(b, base) {
//   if(typeof base == 'undefined') {
//           base = 10;
//   }
//   return this * Math.pow(base, Math.floor(Math.log(b) / Math.log(base)) + 1) + b;
// };
