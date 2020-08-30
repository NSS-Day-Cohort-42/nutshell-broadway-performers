export const FriendsEventsComponent = (eventObj) => {
    return `
    <section class="friendItem event" id="entry--${eventObj.id}" class="events">
        <div class="event__title">${eventObj.title}</div>        
        <div class="event__location">${eventObj.location}</div>
        <div class="event__date">${new Date(eventObj.date).toLocaleDateString('en-US')}</div>
        <button id="weatherForecastButton--${eventObj.id}">Weather Forecast</button>
        <div id="eventForecast--${eventObj.id}"></div>
         </section>
    `
}