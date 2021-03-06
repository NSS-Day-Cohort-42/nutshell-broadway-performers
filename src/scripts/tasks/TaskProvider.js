let notes = []

const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")

    eventHub.dispatchEvent(noteStateChangedEvent)
}


export const saveNote = (noteObj) => {
    return fetch('http://localhost:8088/tasks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteObj)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}



export const deleteNote = (noteId) => {
    return fetch(`http://localhost:8088/tasks/${noteId}` , {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(getNotes)
        .then(dispatchStateChangeEvent)
}

export const saveUpdatedNote = (updatedNote) => {
    return fetch(`http://localhost:8088/tasks/${updatedNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then(getNotes)
      .then(dispatchStateChangeEvent);
  };


export const useNotes = () => {
    return notes.slice()
}

export const getNotes = () => {
    return fetch('http://localhost:8088/tasks')
    .then(response => response.json())
    .then(parsedNotes => {
        notes = parsedNotes
    })
    
}
