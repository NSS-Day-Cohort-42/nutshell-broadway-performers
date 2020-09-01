export const MessageHTML = (messageObj, currentUserId) => {
  if (currentUserId !== messageObj.user.id) {
    return `<div class="message nonActiveUser__message" id="message--${messageObj.id}">
    
            <div class="message__author" id="messageAuthorId--${messageObj.user.id}--messageId--${messageObj.id}">
            ${messageObj.user.username}:
            </div>

            <div class="message__message" id="textForMessageId--${messageObj.id}">${messageObj.message}</div>

            </div>
    `;
  } else {
    return `<div class="message activeUser__message" id="message--${messageObj.id}">
            
            <div class="message__author" id="messageAuthorId--${messageObj.user.id}--messageId--${messageObj.id}">
            ${messageObj.user.username}:
            </div>

            <div class="message__message" id="textForMessageId--${messageObj.id}">${messageObj.message}</div>
            
            <button class="button delete__button" id="deleteMessage--${messageObj.id}"><i class="fas fa-trash-alt"></i>Delete Message</button>

            </div>
    `;
  }
};
