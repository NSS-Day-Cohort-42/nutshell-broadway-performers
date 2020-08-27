export const MessageHTML = (messageObj) => {
  return `<div class="message">
            ${messageObj.username}
            </div>
            <button id="deleteMessage--${messageObj.id}">Delete Message</button>
    `;
};
