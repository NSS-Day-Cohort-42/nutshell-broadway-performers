export const MessageHTML = (messageObj, currentUserId) => {
  if (currentUserId !== messageObj.user.id) {
    return `<section class="message item nonActiveUser--message" id="message--${messageObj.id}">
    
            <div class="name message__author" id="messageAuthorId--${messageObj.user.id}--messageId--${messageObj.id}">
            ${messageObj.user.username}:
            </div>

            <div class="message__message" id="textForMessageId--${messageObj.id}">${messageObj.message}</div>

            </section>
    `;
  } else {
    return `<section class="message item activeUser--Message" id="message--${messageObj.id}">
            
            <div class="name message__author" id="messageAuthorId--${messageObj.user.id}--messageId--${messageObj.id}">
            ${messageObj.user.username}:
            </div>

            
            <div class="message__message" id="textForMessageId--${messageObj.id}">${messageObj.message}</div>
            
            <button class="button delete__button" id="deleteMessage--${messageObj.id}"><i class="fas fa-trash-alt"></i></button>

            </section>
    `;
  }
};
