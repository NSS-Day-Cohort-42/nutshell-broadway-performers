//this component was created by Michael Tyler
//this component creates a form for events 
import { saveEvents, getEvents, useEvents, updateEvent } from "./EventsDataProvider.js"
import { useUsers, getUsers } from "../auth/UsersDataProvider.js"
import { useCurrentUser } from "../auth/LoginForm.js"
import { useEventForecast } from "../weather/ForecastDataProvider.js"

let events = []
let users = []
let currentUserId;



const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".eventsForm")

eventHub.addEventListener("click", clickevent => {

    if (clickevent.target.id === "saveEvent") {

        if (document.querySelector("#editEventId").value === "") {

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

        else {
            updateEvent({
                date: document.querySelector("#eventDate").valueAsNumber,
                title: document.querySelector("#eventTitle").value,
                location: document.querySelector("#eventLocation").value, 
                userId: useCurrentUser(),
                id: document.querySelector("#editEventId").value
            }) 
            document.querySelector("#eventDate").value = ""
            document.querySelector("#eventTitle").value = ""
            document.querySelector("#eventLocation").value = ""
            document.querySelector("#editEventId").value = ""
    }


    }

})

eventHub.addEventListener("editEventButtonClicked", customEvent => {
    render()
    events = useEvents()
    const matchingEventObj = events.find(eo => eo.id === customEvent.detail.editId)
    document.querySelector("#eventDate").value = matchingEventObj.date
    document.querySelector("#eventTitle").value = matchingEventObj.title
    document.querySelector("#eventLocation").value = matchingEventObj.location
    document.querySelector("#editEventId").value = matchingEventObj.id
})

const render = () => {
    contentTarget.innerHTML = `
        <section class="events">
            <h2>Add or Event Event</h2>
            <fieldset>
                <label for="eventDate">Date of event</label>
                <input type="date" name="eventDate" id="eventDate" valueAsNumber required>
                <label for="eventTitle">Event Title</label>
                <input type="text" name="eventTitle" id="eventTitle" autoComplete="off" required>
                <label for="eventLocation">Event Location</label>
                <input type="text" name="eventLocation" id="eventLocation" autoComplete="off" required>
                <button id="saveEvent"><i class="fas fa-calendar-check"></i> Save</button>
                <input type="hidden" id="editEventId" name="editEventId" value="">
                <button class="button close---button" id="closeEventForm"><i class="fas fa-window-close"></i></button>
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
            render()
        })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "closeEventForm") {
        contentTarget.innerHTML = ""
    }
})