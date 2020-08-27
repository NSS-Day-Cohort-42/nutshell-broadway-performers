import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { getMessages, useMessages, deleteMessage } from "./MessagesProvider.js";
import { MessageHTML } from "./MessageHTML.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".messagesList");
let currentUser; //changed this from invoking useCurrentUser() to just hanging out. seems to work the same?
let users = [];
let messages = [];

const render = () => {
  const messagesListHTML = messages
    .map((messageObj, currentUserId) => {
      currentUserId = currentUser;
      return MessageHTML(messageObj, currentUserId);
    })
    .join("");

  contentTarget.innerHTML = `${messagesListHTML}`;
};

export const MessagesList = () => {
  getUsers()
    .then(getMessages)
    .then(() => {
      users = useUsers();
      messages = useMessages();
      currentUser = useCurrentUser();
      render();
    });
};

eventHub.addEventListener("messagesStateChanged", () => {
  messages = useMessages();
  render();
});

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("deleteMessage")) {
    const idOfMessageObjToDelete = parseInt(
      clickEvent.target.id.split("--")[1]
    );
    deleteMessage(idOfMessageObjToDelete);
  }
});

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("messageAuthorId")) {
    const messageAuthorUserId = parseInt(clickEvent.target.id.split("--")[3]);
    debugger;
  }
});
