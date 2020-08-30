//this component was created by Michael Tyler
//this component creates a form for events 
import { saveEvents, getEvents, useEvents } from "./EventsDataProvider.js"
import { useUsers, getUsers } from "../auth/UsersDataProvider.js"
import { useCurrentUser } from "../auth/LoginForm.js"

let events = []
let users = []
let currentUserId;



const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".eventsForm")

eventHub.addEventListener("click", clickevent => {

    if (clickevent.target.id === "saveEvent") {

        const eventDate = document.querySelector("#eventDate")
        const eventTitle = document.querySelector("#eventTitle")
        const eventLocation = document.querySelector("#eventLocation")
        currentUserId = useCurrentUser()
        let thisUser = currentUserId
        let date = eventDate.value
        let title = eventTitle.value
        let location = eventLocation.value
        if (date !== "" && title !== "" && location !== "") {
            const newEvent = {
                date: eventDate.valueAsNumber,
                title: eventTitle.value,
                location: eventLocation.value,
                userId: thisUser
            }
            saveEvents(newEvent)
        } else {
            window.alert("Please fill out entire event form first")
        }
    }
})

const render = () => {
    contentTarget.innerHTML = `
        <section class="events">
            <h2>New Event</h2>
            <fieldset>
                <label for="eventDate">Date of event</label>
                <input type="date" name="eventDate" id="eventDate" valueAsNumber required>
                <label for="eventTitle">Event Title</label>
                <input type="text" name="eventTitle" id="eventTitle" autoComplete="off" required>
                <label for="eventLocation">Event Location</label>
                <input type="text" name="eventLocation" id="eventLocation" autoComplete="off" required>
                <button id="saveEvent">Save Event</button>
            </fieldset>
        </section>
    `
}

export const eventsForm = () => {
    getEvents()
        .then(getUsers)
        .then(() => {
            events = useEvents()
            users = useUsers()
            console.log(users)
            render()
        })
}