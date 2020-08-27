let events = []

const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("eventStateChanged"))
}

export const getEvents = () => {
    return fetch("http://localhost:8088/events")
        .then(response => response.json())
        .then(apiData =>
            events = apiData)
}

export const useEvents = () => {
    return events.slice()
}

export const saveEvents = (newEvents) => {
    fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvents)
        })
        .then(getEvents)
        .then(dispatchStateChangeEvent)
}

export const deleteEvents = (id) => {
    return fetch(`http://localhost:8088/events/${id }`, {
            method: "DELETE"
        })
        .then(getEvents)
        .then(dispatchStateChangeEvent)

}