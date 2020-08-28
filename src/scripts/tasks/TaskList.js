
import { getNotes, useNotes } from "./TaskProvider.js";
import { noteHTMLConverter } from "./TaskHTML.js";
import { deleteNote } from "./TaskProvider.js";

const contentTarget = document.querySelector(".show__notes")
const eventHub = document.querySelector(".container")

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
    contentTarget.innerHTML = noteArray.reverse().map(
        (noteObj) => { 
            return noteHTMLConverter(noteObj)
        }
    ).join("")
}
     
export const NoteList = () => {
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })
}

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id.startsWith("eventComplete")) {
        const [prompt, checkId] = changeEvent.target.id.split("--")
        const taskToHide = changeEvent.target.id.parentNode
        alert(taskToHide)
    }
})
 