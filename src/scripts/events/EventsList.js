import { useEvents, getEvents, deleteEvents } from "./EventsDataProvider.js"
import { eventsComponent } from "./EventsComponent.js"

const contentTarget = document.querySelector(".eventList")
const eventHub = document.querySelector(".container")

let events = []

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

const render = () => {
    const allEventsToString = events.map(
        (currentEvent) => {
            return eventsComponent(currentEvent)
        }
    ).join("")
    contentTarget.innerHTML = allEventsToString
}

export const eventList = () => {
    getEvents()
        .then(() => {
            events = useEvents()
            render()
        })
}