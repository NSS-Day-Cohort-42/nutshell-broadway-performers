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

  //NOTE: 604800000 === 7 days
  const fiveDaysFromNow = Date.now() + 604800000;
  if (foundEventObject.event_date > fiveDaysFromNow) {
    alert("can't show weather forecast for a date that far in advance");
  } else {
    const city = foundEventObject.event_location;

    triggerWeatherEvent(city).then(() => {
      const forecast = useEventForecastWeather();

      const eventWeatherForecast = forecast.find((forecastObject) => {
        const forecastDate = new Date(forecastObject.dt * 1000);
        const forecastDay = forecastDate.getDay();
        const forecastMonth = forecastDate.getMonth();
        const forecastYear = forecastDate.getFullYear();
        const eventDate = new Date(foundEventObject.event_date);
        const eventDay = eventDate.getDay();
        const eventMonth = eventDate.getMonth();
        const eventYear = eventDate.getFullYear();

        const forecastYearMonthDay = `${forecastYear}${forecastMonth}${forecastDay}`;
        const eventYearMonthDay = `${eventYear}${eventMonth}${eventDay}`;

        return forecastYearMonthDay === eventYearMonthDay;
      });
      renderForecast(eventWeatherForecast);
    });
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
  alert(`<dialog>${eventWeatherHTMLstring}</dialog>`);
};

// this didn't work. it would be cool if it did.

// Number.prototype.concatenate = function(b, base) {
//   if(typeof base == 'undefined') {
//           base = 10;
//   }
//   return this * Math.pow(base, Math.floor(Math.log(b) / Math.log(base)) + 1) + b;
// };

