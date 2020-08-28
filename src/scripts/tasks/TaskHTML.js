export const noteHTMLConverter = (taskObj) => {
    return `
        <section id="task--${taskObj.id}" class="note">
        <div class="name">${taskObj.name}<input id="eventComplete--${taskObj.id}" class="showing" type="checkbox" /></div> 
        <div class="date"><strong>ETA:</strong> ${new Date(taskObj.date).toLocaleDateString('en-US')}</div>
        <button id="noteBtn--${taskObj.id}">Delete</button>
        </section>
    `
}


