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
//     const allEventsToString = events.map(event => {
//         const friendships = friends.filter(friend => {
//             return friend.following === currentUserId
//         })
//         const friendsEvents = friendships.filter(fr => {
//             return event.userId === fr.userId
//         })
//     })
// }

const render = () => {
    currentUserId = useCurrentUser()


    const matchingFriendships = friends.filter(friendshipObj => {
        return friendshipObj.userId === currentUserId
    })
    const matchFriends = matchingFriendships.filter(currentRelationship => {
        return currentRelationship.following === users.id
    })
    console.log(matchFriends)
git st
    //
    const matchingEvents = events.filter(eventObj => {

        return eventObj.userId === currentUserId
    })

    const allEventsToString = matchingEvents.map(eventObj => {
        return eventsComponent(eventObj)
    }).join("")

    contentTarget.innerHTML = allEventsToString

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