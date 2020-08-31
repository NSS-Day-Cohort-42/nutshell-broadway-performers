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
    currentUser = useCurrentUser()
    const matchingNotes = noteArray.filter(noteObj => {
        return noteObj.userId === currentUser
    })
    console.log(matchingNotes)
    contentTarget.innerHTML = `<h2 class="featureHeading">My Tasks:</h2>
        ${matchingNotes.reverse().map(
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

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editNote--")) {
        const answer1 = window.prompt("Fill prompt to update Task")
        const answer2 = window.prompt("Enter a new valid Date")
        const [prompt, editId] = clickEvent.target.id.split("--")
        const idOfEdit = parseInt(editId)
        const updatedEdit = {
            id: idOfEdit,
            date: answer2,
            name: answer1,
            complete: false,
            userId: currentUser
        }
        saveUpdatedNote(updatedEdit)
    }
})