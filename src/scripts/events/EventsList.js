import { useEvents, getEvents, deleteEvents } from "./EventsDataProvider.js"
import { eventsComponent } from "./EventsComponent.js"
import { useCurrentUser } from "../auth/LoginForm.js"
import { getFriends, useFriends } from "../friends/FriendsProvider.js"
import { getUsers, useUsers } from "../auth/UsersDataProvider.js"
import { getEventForecast, useEventForecast } from "../weather/ForecastDataProvider.js"

const contentTarget = document.querySelector(".eventList")
const eventHub = document.querySelector(".container")

let events = []
let currentUserId
let friends = []
let users = []
let matchingEventForecast = []

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
        return eventsComponent(matchingUserEventObj)
    }).join("")

    contentTarget.innerHTML = `<h2>My Events:</h2>
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
    if (clickEvent.target.id.startsWith("weatherForecast--")) {
        const eventId = parseInt(clickEvent.target.id.split("--")[1])
        const matchingEventObj = events.find(eventObj => eventObj.id === eventId)
        const matchingEventDateRaw = new Date(matchingEventObj.date)
        const matchingEventDateFormatted = matchingEventDateRaw.toISOString().substring(0,10)
        getEventForecast(matchingEventObj.location)
            .then(useEventForecast)
            .then(() => {
                const eventForecast = useEventForecast()
                matchingEventForecast = eventForecast.find(forecastObj => {
                    return forecastObj.valid_date === matchingEventDateFormatted
                })
                
            })
    }
})


//to pack up as custom event iffff wanted or needed?
                // const eventForecastButtonAction = new CustomEvent('eventForecastButtonClicked', {
                //     detail: {
                //         eventLocation: matchingEventObj.location,
                //         eventDate: matchingEventObj.date
                //     }
                // }
                // )
                // eventHub.dispatchEvent(eventForecastButtonAction)