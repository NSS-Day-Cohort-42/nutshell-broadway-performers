  export const noteHTMLConverter = (taskObj) => {
      if (!taskObj.complete) {
          return `
        <section id="task--${taskObj.id}" class="note">
        <div class="name">${taskObj.name}<input id="eventComplete--${taskObj.id}" class="showing" type="checkbox" /></div> 
        <div class="date"><strong>ETA:</strong> ${new Date(taskObj.date + 86400000).toLocaleDateString('en-US')}</div>
        <button id="noteBtn--${taskObj.id}">Delete</button>
        <button id="editNote--${taskObj.id}">Edit</button>
        </section>
    `
      }
  }