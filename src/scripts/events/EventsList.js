import { useEvents, getEvents, deleteEvents } from "./EventsDataProvider.js"
import { eventsComponent } from "./EventsComponent.js"
import { useCurrentUser } from "../auth/LoginForm.js"
import { getFriends, useFriends } from "../friends/FriendsProvider.js"
import { getUsers, useUsers } from "../auth/UsersDataProvider.js"
import { getEventForecast, useEventForecast, getCurrentWeather, useCurrentWeather } from "../weather/ForecastDataProvider.js"
import { FriendsEventsComponent } from "./FriendsEventsComponent.js"
import { nextEventsComponent } from "./NextEventComponent.js"

const contentTarget = document.querySelector(".eventList")
const eventHub = document.querySelector(".container")

let events = []
let friends = []
let users = []
let matchingEventForecast = []
let currentUserId
let currentDate

eventHub.addEventListener("eventStateChanged", () => eventList())

eventHub.addEventListener("click", clickevent => {
    if (clickevent.target.id.startsWith("deleteEvent")) {
        const [prefix, id] = clickevent.target.id.split("--")
        const deleteEvent = new CustomEvent("deleteButtonClicked", {
            detail: {
                id: id
            }
        })
        deleteEvents(id).then(() => {
            events = useEvents()
            render()
        })
    }
})

eventHub.addEventListener("friendsStateChanged", () => {
    friends = useFriends()
    render()
})

const render = () => {
    currentUserId = useCurrentUser()
    const matchingEvents = events.filter(eventObj => {
        return eventObj.userId === currentUserId
    })

    const sortedEvents = matchingEvents.sort((eventA, eventB) => {
        return eventA.date - eventB.date
    })

    let nextEvent = []
    const nextEventComingUp = sortedEvents.shift()

    const pushFirstEvent = () => {
        nextEvent.push(nextEventComingUp)
    }
    pushFirstEvent()

    const nextEventToString = nextEvent.map(ne => {
        return nextEventsComponent(ne)
    }).join("")
    const allEventsToString = matchingEvents.map(eventObj => {
        return eventsComponent(eventObj)
    }).join("")

    //begin epic string of variable definitions to grab all events for all friends
    const matchingFriends = friends.filter(friendObj => {
        return friendObj.userId === currentUserId
    })

    const matchingFriendsAsUsers = matchingFriends.map(matchingFriendObj => {
        return (users.find(userObj => {
            return matchingFriendObj.following === userObj.id
        }))
    })

    const matchingFriendsUserIdVals = matchingFriendsAsUsers.map(matchingFriendObj => {
        return matchingFriendObj.id
    })

    const matchingUserEvents = events.filter(eventObj => {
        return (matchingFriendsUserIdVals.includes(eventObj.userId))
    })

    const allMatchingUserEventstoString = matchingUserEvents.map(matchingUserEventObj => {
        return FriendsEventsComponent(matchingUserEventObj)
    }).join("")

    contentTarget.innerHTML = `<h2>My Events:</h2>
                            <div>${nextEventToString}</div>
                            <div>${allEventsToString}</div>
                            <h2>Friends Events:</h2>
                            <div>${allMatchingUserEventstoString}</div>
                              `
}

export const eventList = () => {
    getEvents()
        .then(getFriends)
        .then(getUsers)
        .then(() => {
            events = useEvents()
            friends = useFriends()
            users = useUsers()
            render()
        })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("weatherForecastButton--")) {
        const eventId = parseInt(clickEvent.target.id.split("--")[1])
            //Find event object that matches the clicked on item and juice its date in ms
        const matchingEventObj = events.find(eventObj => eventObj.id === eventId)
        const matchingEventDateRaw = new Date(matchingEventObj.date)
            // see if the matching event's date is more than 16 days in the future, and if so, try to get forecast
        currentDate = Date.now()
        if (matchingEventDateRaw - currentDate < 1296000000) {
            const matchingEventDateFormatted = matchingEventDateRaw.toISOString().substring(0, 10)
            getEventForecast(matchingEventObj.location)
                .then(useEventForecast)
                .then(() => {
                    const eventForecast = useEventForecast()
                    matchingEventForecast = eventForecast.find(forecastObj => {
                        return forecastObj.valid_date === matchingEventDateFormatted
                    })
                    document.querySelector(`#eventForecast--${eventId}`).innerHTML =
                        `<div class="eventForecastDetails">
                        <h3 class="eventForecastDetails__heading">Event Forecast</h3>
                        <div class="eventForecastDetails_temp">${matchingEventForecast.temp}&#176<div>
                        <div class="eventForecastDetails_icon"><img src="https://www.weatherbit.io/static/img/icons/${matchingEventForecast.weather.icon}.png"</div>
                        <div class="eventForecastDetails_conditions">${matchingEventForecast.weather.description}<div>
                        <button class="forecastCloseButton" id="forecastCloseButton--${eventId}">Close</i></button>
                    </div>`
                })

            //if the location is valid but the date is out of range, show current weather there... .just to tease them i guess? idk MVP RULES MAN I DIDNT MAKE THEM UP
        } else getCurrentWeather(matchingEventObj.location)
            .then(useCurrentWeather)
            .then(() => {
                const currentWeatherObject = useCurrentWeather()
                document.querySelector(`#eventForecast--${eventId}`).innerHTML =
                    `<div class="eventForecastDetails currentWeather">
                        <h3 class="eventForecastDetails__heading">Date is out of range</h3>
                        <p>But here's what it's like there now!</p>
                        <div class="eventForecastDetails_temp">${currentWeatherObject.temp}&#176<div>
                        <div class="eventForecastDetails_icon"><img src="https://www.weatherbit.io/static/img/icons/${currentWeatherObject.weather.icon}.png"</div>
                        <div class="eventForecastDetails_conditions">${currentWeatherObject.weather.description}<div>
                        <button class="forecastCloseButton" id="forecastCloseButton--${eventId}">Close</button>
                    </div>`
            })

    }
    if (clickEvent.target.id.startsWith("forecastCloseButton")) {
        const idToClose = clickEvent.target.id.split("--")[1]
        document.querySelector(`#eventForecast--${idToClose}`).innerHTML = ""
    }

    if (clickEvent.target.id.startsWith("editEvent--")) {
        const idOfEventToEdit = parseInt(clickEvent.target.id.split("--")[1])
        eventHub.dispatchEvent(new CustomEvent("editEventButtonClicked", {
            detail: {
                editId: idOfEventToEdit
            }
        }))
    }
})


