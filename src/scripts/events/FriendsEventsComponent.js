export const FriendsEventsComponent = (eventObj) => {
    return `
    <section class="friendItem event" id="entry--${eventObj.id}" class="events">
        <h3 class="friendItem__name event__friendName">${eventObj.user.username}'s Event</h3>
        <div class="event__title">${eventObj.title}</div>        
        <div class="event__location">Location: ${eventObj.location}</div>
        <div class="event__date">Date: ${new Date(eventObj.date + 86400000).toLocaleDateString('en-US')}</div>
        <button classs="Forecast Button" id="weatherForecastButton--${eventObj.id}"><i class="fas fa-sun"></i></button>
        <div id="eventForecast--${eventObj.id}"></div>
         </section>
    `
}