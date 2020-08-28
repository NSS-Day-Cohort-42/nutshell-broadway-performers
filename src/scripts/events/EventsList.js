import { useEvents, getEvents, deleteEvents } from "./EventsDataProvider.js"
import { eventsComponent } from "./EventsComponent.js"
import { useCurrentUser } from "../auth/LoginForm.js"
import { getFriends, useFriends } from "../friends/FriendsProvider.js"
import { getUsers, useUsers } from "../auth/UsersDataProvider.js"

const contentTarget = document.querySelector(".eventList")
const eventHub = document.querySelector(".container")

let events = []
let currentUserId
let friends = []
let users = []
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

// const render = () => {
//     currentUserId = useCurrentUser()

//     const friendships = friends.filter(friend => {
//         return friend.userId === currentUserId
//     })
//     const matchingUsers = friendships.map(cf => {
//         return users.find(cu => {
//             return cu.id === cf.following
//         })
//     })
//     const friendsEvents = matchingUsers.map(mu => {
//         const fe = events.find(ce => {
//             return ce.userId === mu.id
//         })
//         return eventsComponent(fe)
//     })

//     console.log(friendsEvents)




//     const matchingEvents = events.filter(eventObj => {

//         return eventObj.userId === currentUserId
//     })

//     const allEventsToString = matchingEvents.map(eventObj => {
//         return eventsComponent(eventObj)
//     }).join("")

//     contentTarget.innerHTML = friendsEvents
// }

const render = () => {
    currentUserId = useCurrentUser()
    const friendShips = friends.filter(friend => {
        return friend.userId === currentUserId
    })
    const matchingUsers = friendShips.map(cf => {
        return users.find(cu => {
            return cu.id === cf.following
        })
    })
    console.log(matchingUsers)

    const allEventsConvertedToString = events.map(currentEvent => {
        return matchingUsers.id === currentEvent.userId
    })
    console.log(allEventsConvertedToString)


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