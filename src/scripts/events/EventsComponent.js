export const eventsComponent = (eventObj) => {
  return `
    <section id="entry--${eventObj.id}" class="item events">
        <div class="eventDetails">
        <div class="name event__title"><strong>Event:</strong> ${eventObj.title}</div>        
        <div class="location event__location"><strong>Location:</strong> ${eventObj.location}</div>
        <div class="date event__date"><strong>Date:</strong> ${new Date(eventObj.date).toLocaleDateString(
          "en-US"
        )}</div>
        </div>
        <div class="eventButtons">
        <button class="button delete__event delete--button" id="deleteEvent--${eventObj.id}"><i class="fas fa-trash-alt"></i></button>
        <button class="button showForecast__event forecast--button" id="weatherForecastButton--${eventObj.id}"><i class="fas fa-sun"></i></button>
        </div>
        <div class="forecast event__forecast" id="eventForecast--${eventObj.id}"></div>
         </section>
    `;
};
