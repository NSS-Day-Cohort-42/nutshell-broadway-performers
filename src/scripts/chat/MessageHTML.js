export const MessageHTML = (messageObj, currentUserId) => {
  return `<div class="message">
            ${messageObj.user.username}
            </div>
            <div>${messageObj.message}</div>
            <div>${currentUserId}</div>
            <button id="deleteMessage--${messageObj.id}">Delete Message</button>
    `;
};
