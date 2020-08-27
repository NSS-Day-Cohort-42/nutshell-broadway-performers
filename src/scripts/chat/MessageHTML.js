export const MessageHTML = (messageObj) => {
  return `<div class="message">
            ${messageObj.user.username}
            </div>
            <div>${messageObj.message}</div>
            <button id="deleteMessage--${messageObj.id}">Delete Message</button>
    `;
};
