  export const noteHTMLConverter = (taskObj) => {
      if (!taskObj.complete) {
          return `
        <section class="task item" id="task--${taskObj.id}">
        <div class="name task__name">${taskObj.name}<input id="eventComplete--${taskObj.id}" class="showing" type="checkbox" /></div> 
        <div class="date task__date"><strong>ETA:</strong> ${new Date(taskObj.date + 86400000).toLocaleDateString('en-US')}</div>
        <button class="button task__button delete--button" id="noteBtn--${taskObj.id}">Delete</button>
        <button class="button task__button edit--button" id="editNote--${taskObj.id}">Edit</button>
        </section>
    `
      }
  }