export const eventsComponent = (eventObj) => {
    return `
    <section id="entry--${eventObj.id}" class="events">
        <div class="event__title">Event: ${eventObj.title}</div>        
        <div class="event__location">Event location ${eventObj.location}</div>
        <div class="event__date">Date of Event ${new Date(eventObj.date + 86400000).toLocaleDateString('en-US')}</div>
        <button id="deleteEvent--${eventObj.id}">Delete</button>
        <button id="weatherForecastButton--${eventObj.id}">Weather Forecast</button>
        <div id="eventForecast--${eventObj.id}"></div>
         </section>
    `
}