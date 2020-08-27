export const MessageHTML = (messageObj, currentUserId) => {
  if (currentUserId !== messageObj.user.id) {
    return `<div class="message">
            ${messageObj.user.username}
            </div>
            <div>${messageObj.message}</div>
            <div>${currentUserId}</div>
    `;
  } else {
    return `<div class="message">
            ${messageObj.user.username}
            </div>
            <div>${messageObj.message}</div>
            <div>${currentUserId}</div>
            <button id="deleteMessage--${messageObj.id}">Delete Message</button>
    `;
  }
};
