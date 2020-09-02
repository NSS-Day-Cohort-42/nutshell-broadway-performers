export const nextEventsComponent = (eventObj) => {
    return `
    <section id="entry--${eventObj.id}" class="item firstEvent">
        <h3 class="nextEvent__heading">Your Next Upcoming Event</h3>
        <div class="name event__title">${eventObj.title}</div>        
        <div class="location event__location">Location: ${eventObj.location}</div>
        <div class="date event__date">Date: ${new Date(eventObj.date + 86400000).toLocaleDateString('en-US')}</div>
        <button class="button edit__event edit--button" id="editEvent--${eventObj.id}">Edit Event</button>
        <button class="button delete__event delete--button" id="deleteEvent--${eventObj.id}"><i class="fas fa-trash-alt"></i></button>
        <button class="button showForecast__event forecast--button" id="weatherForecastButton--${eventObj.id}"><i class="fas fa-sun"></i>
        <div class="forecast event__forecast" id="eventForecast--${eventObj.id}"></div>
         </section>
    `
}