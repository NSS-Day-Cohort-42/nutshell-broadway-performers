export const eventsComponent = (eventObj) => {
  return `
    <section id="entry--${eventObj.id}" class="item events">
        <div class="name event__title">${eventObj.title}</div>        
        <div class="location event__location">${eventObj.location}</div>
        <div class="date event__date">${new Date(eventObj.date).toLocaleDateString(
          "en-US"
        )}</div>
        <button class="button edit__event edit--button" id="editEvent--${eventObj.id}">Edit Event</button>
        <button class="button delete__event delete--button" id="deleteEvent--${eventObj.id}">Delete Event</button>
        <button class="button showForecast__event forecast--button" id="weatherForecastButton--${
          eventObj.id
        }">Show Forecast</button>
        <div class="forecast event__forecast" id="eventForecast--${eventObj.id}"></div>
         </section>
    `;
};
