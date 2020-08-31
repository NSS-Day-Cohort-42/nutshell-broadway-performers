import { saveNote, useNotes } from "./TaskProvider.js";
import { useCurrentUser } from "../auth/LoginForm.js";
import { getUsers } from "../auth/UsersDataProvider.js";



const contentTarget = document.querySelector(".list__column")
const eventHub = document.querySelector(".container")
let currentUser;

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "noteForm--saveNote") {

        const noteDate = document.querySelector("#taskDate")
        const noteName = document.querySelector("#noteForm--name")



        // Make a new object representation of a note

        const newNote = {
            date: noteDate.valueAsNumber,
            name: noteName.value,
            complete: false,
            userId: currentUser
        }

        // Change API state and application state
        saveNote(newNote)
    }
})


const render = () => {
    contentTarget.innerHTML = `
        <section class="entryForm">
        <form action="">
            <fieldset id="taskForm--date">
                <label for="journalDate">Completion Date</label>
                    <input class="date" type="date" name="taskDate" valueAsNumber id="taskDate"></input>
            </fieldset>
        </form>
           <input type="text" id="noteForm--name" placeholder="Task" />
            <button id="noteForm--saveNote">Save  Task</button>
            <button id="disableForm">Hide Task Form</button>
        </section>
    `
}

export const NoteButtonRender = () => {
    contentTarget.innerHTML =
        `<form><input id="enableForm" type="button" value="Open Task Form"></form>`

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "enableForm") {
            render()
        }
    })

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "disableForm") {
            NoteButtonRender()
        }
    })
}

export const NoteForm = () => {
    getUsers()
        .then(() => {
            currentUser = useCurrentUser()
            NoteButtonRender()
        })
}







// var checkbox = document.querySelector();