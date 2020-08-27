export const eventsComponent = (eventObj) => {
    return `
    <section id="entry--${eventObj.id}" class="events">
        <h3 class="event__title">${eventObj.title}</h3>        
        <div class="event__location">${eventObj.location}</div>
        <div class="event__date">${eventObj.date}</div>
        <button id="deleteEntry--${eventObj.id}">Delete</button>
         </section>
    `
}