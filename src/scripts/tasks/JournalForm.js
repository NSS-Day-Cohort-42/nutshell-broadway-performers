import { saveNote, useNotes } from "./JournalProvider.js";


const contentTarget = document.querySelector(".list__column")
const eventHub = document.querySelector(".container")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "noteForm--saveNote") {

        const noteDate = document.querySelector("#journalDate")
        const noteName = document.querySelector("#noteForm--name")
  
        

        // Make a new object representation of a note

        const newNote = {
            date: noteDate.value,
            name: noteName.value,
        }

        // Change API state and application state
        saveNote(newNote)
    } 
    })

const render = () => {
    contentTarget.innerHTML = `
        <section class="entryForm">
        <form action="">
            <fieldset id="noteForm--date">
                <label for="journalDate">Completion Date</label>
                    <input class="date" type="date" name="journalDate" id="journalDate"></input>
            </fieldset>
        </form>
           <input type="text" id="noteForm--name" placeholder="Task" />
            <button id="noteForm--saveNote">Save Note</button>
        </section>
    `
}

export const NoteForm = () => {
    render()
}