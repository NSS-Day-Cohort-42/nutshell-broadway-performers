export const eventsComponent = (eventObj) => {
  return `
    <section id="entry--${eventObj.id}" class="item events">
        <div class="name event__title">${eventObj.title}</div>        
        <div class="location event__location">${eventObj.location}</div>
        <div class="date event__date">${new Date(eventObj.date).toLocaleDateString(
          "en-US"
        )}</div>
        <button class="button delete__event delete--button" id="deleteEvent--${eventObj.id}">Delete</button>
        <button class="button forecast__event forecast--button" id="weatherForecastButton--${
          eventObj.id
        }">Weather Forecast</button>
        <div id="eventForecast--${eventObj.id}"></div>
         </section>
    `;
};
