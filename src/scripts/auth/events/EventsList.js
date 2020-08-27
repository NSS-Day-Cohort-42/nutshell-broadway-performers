import { useEvents, getEvents, deleteEvents } from "./EventsDataProvider.js"
import { eventsComponent } from "./EventsComponent.js"

let events = []

const contentTarget = document.querySelector(".eventList")

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