const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".addEvent")

const render = () => {
    contentTarget.innerHTML = `<button class="" id="addEventButton" value=""><i class="fas fa-calendar-plus"></i> Add new event</button>`
};

export const addNewEventButton = () => {
    render();
};

eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "addEventButton") {
        const eventEvent = new CustomEvent("addNewEventButtonClicked")
        eventHub.dispatchEvent(eventEvent)
    }
})