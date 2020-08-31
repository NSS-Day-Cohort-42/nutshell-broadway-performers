export const FriendsEventsComponent = (eventObj) => {
    return `
    <section class="friendItem event" id="entry--${eventObj.id}" class="events">
        <div class="event__title">Event: ${eventObj.title}</div>        
        <div class="event__location">Event location ${eventObj.location}</div>
        <div class="event__date">Date of Event ${new Date(eventObj.date + 86400000).toLocaleDateString('en-US')}</div>
        <button classs="Forecast Button" id="weatherForecastButton--${eventObj.id}">Weather Forecast</button>
        <div id="eventForecast--${eventObj.id}"></div>
         </section>
    `
}