export const nextEventsComponent = (eventObj) => {
    return `
    <section id="entry--${eventObj.id}" class="item firstEvent">
        <div class="name event__title">Event: ${eventObj.title}</div>        
        <div class="location event__location">Event location ${eventObj.location}</div>
        <div class="date event__date">Date of Event ${new Date(eventObj.date + 86400000).toLocaleDateString('en-US')}</div>
        <button class="button edit__event edit--button" id="editEvent--${eventObj.id}">Edit Event</button>
        <button class="button delete__event delete--button" id="deleteEvent--${eventObj.id}"><i class="fas fa-trash-alt"></i></button>
        <button class="button showForecast__event forecast--button" id="weatherForecastButton--${eventObj.id}"><i class="fas fa-sun"></i>
        <div class="forecast event__forecast" id="eventForecast--${eventObj.id}"></div>
         </section>
    `
}