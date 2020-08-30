export const eventsComponent = (eventObj) => {
    return `
    <section id="entry--${eventObj.id}" class="events">
        <div class="event__title">${eventObj.title}</div>        
        <div class="event__location">${eventObj.location}</div>
        <div class="event__date">${new Date(eventObj.date).toLocaleDateString('en-US')}</div>
        <button id="deleteEvent--${eventObj.id}">Delete</button>
        <button id="weatherForecast--">Weather Forecast</button>
    </section>
    `
}