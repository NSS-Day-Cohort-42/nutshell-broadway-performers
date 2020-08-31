
import { getNotes, useNotes, saveUpdatedNote } from "./TaskProvider.js";
import { noteHTMLConverter } from "./TaskHTML.js";
import { deleteNote } from "./TaskProvider.js";
import { getUsers } from "../auth/UsersDataProvider.js";
import { useCurrentUser } from "../auth/LoginForm.js";

const contentTarget = document.querySelector(".show__notes")
const eventHub = document.querySelector(".container")
let currentUser;

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("noteBtn--")) {
        const [prompt, noteIdString] = clickEvent.target.id.split("--")
        deleteNote(noteIdString)
    }
})

  
eventHub.addEventListener("noteStateChanged", customEvent => {
    const allNotes = useNotes()

    render(allNotes)
})

const render = (noteArray) => {

    contentTarget.innerHTML = `<h2 class="featureHeading">My Tasks:</h2>
        ${noteArray.reverse().map(
        (noteObj) => { 
            return noteHTMLConverter(noteObj)
        }
    ).join("")}`
}
     
export const NoteList = () => {
    getNotes()
        .then(getUsers)
        .then(() => {
            currentUser = parseInt(useCurrentUser())
            const allNotes = useNotes()
            render(allNotes)
        })
}

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id.startsWith("eventComplete")) {
        const [prompt, checkId] = changeEvent.target.id.split("--")
        const idOfTaskToHide = parseInt(checkId)
        const updatedTask = {
            id: idOfTaskToHide,
            date: `who cares`,
            name: `not me`,
            complete: true,
            userId: currentUser
        }
        saveUpdatedNote(updatedTask)
    }
})
 