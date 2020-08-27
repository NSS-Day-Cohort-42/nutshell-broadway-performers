export const noteHTMLConverter = (noteObj) => {
    return `
        <section class="note">
        <div class="name">${noteObj.name}<input type="checkbox" /></div> 
        <div class="date"><strong>ETA:</strong> ${new Date(noteObj.date).toLocaleDateString('en-US')}</div>
        <button id="noteBtn--${noteObj.id}">Delete</button>
        </section>
    `
}