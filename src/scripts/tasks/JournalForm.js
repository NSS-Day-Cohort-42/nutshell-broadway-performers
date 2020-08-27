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
    NoteButtonRender()
}







// export const NoteForm = () => {
//     <form> 
//   <input type="button" value="Start machine">
// </form>
// <p>The machine is stopped.</p>
//     const button = document.querySelector('input');
//     const paragraph = document.querySelector('p');
//     button.addEventListener('click', updateButton);
    
    
//     if (button.value === 'Add Task') {
//       button.value = 'Hide Task';
//       paragraph.textContent = 'The machine has started!';
//     } else {
//       button.value = 'Start machine';
//       paragraph.textContent = 'The machine is stopped.';
//     }