import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { getMessages, useMessages, deleteMessage } from "./MessagesProvider.js";
import { MessageHTML } from "./MessageHTML.js";
import {
  getFriends,
  useFriends,
  saveFriend,
} from "../friends/FriendsProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".messagesList");
const modalTarget = document.querySelector(".modalContainer--chat");


let currentUser; 
let users = [];
let messages = [];
let friends = [];
let authorId;

export const MessagesList = () => {
  getUsers()
  .then(getMessages)
  .then(getFriends)
  .then(() => {
    users = useUsers();
    messages = useMessages();
    friends = useFriends();
    currentUser = useCurrentUser();
    render();
  });
};


// modal shit
const handleClickFunction = () => {
  const matchingFriendObjectsForCurrentUser = friends.filter((friendObj) => {
    return currentUser === friendObj.userId;
  });
  const idsOfAlreadyFollowing = matchingFriendObjectsForCurrentUser.map(
    (MFO) => {
      return MFO.following;
    }
    );
    if (idsOfAlreadyFollowing.includes(authorId)) {
      alert("You're already following this user... duh?");
    } else {
      renderModal();
      showModalDialog();
    }
  };
  
const showModalDialog = () => {
    document.getElementById("addFriendModal").showModal();
};
  
const renderModal = () => {
  modalTarget.innerHTML = `<dialog id="addFriendModal">
  <button class="button" id="addFriendModalAddButton">Add as Friend</button>
  <button class="button" id="addFriendModalExitButton">Close</button>
  </dialog>`;
};

// main render function
const render = () => {
  const sortedMessages = messages.reverse().slice(0,4).reverse()
  const messagesListHTML = sortedMessages
    .map((messageObj, currentUserId) => {
      currentUserId = currentUser;
      return MessageHTML(messageObj, currentUserId);
    })
    .join("");

  contentTarget.innerHTML = `<h2 class="featureHeading">Public Chat Messages:</h2>
  ${messagesListHTML}
`;
};


//event handlers. they just LOVE handling things
eventHub.addEventListener("messagesStateChanged", () => {
  messages = useMessages();
  render();
});

eventHub.addEventListener("friendsStateChanged", () => {
  friends = useFriends();
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
    const messageAuthorUserId = parseInt(clickEvent.target.id.split("--")[1]);
    authorId = messageAuthorUserId;
    handleClickFunction();
  }

  if (clickEvent.target.id === "addFriendModalExitButton") {
    const dialog = event.target.parentNode;
    dialog.close();
  }

  if (clickEvent.target.id === "addFriendModalAddButton") {
    const newFriend = {
      userId: currentUser,
      following: authorId,
    };
    saveFriend(newFriend);
    const dialog = event.target.parentNode;
    dialog.close();
  }
});


