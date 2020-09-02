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
let currentUserObj;
let users = [];
let messages = [];
let friends = [];
let authorId;
let chatWindowIsOpen

export const MessagesList = () => {
  getUsers()
    .then(getMessages)
    .then(getFriends)
    .then(() => {
      users = useUsers();
      messages = useMessages();
      friends = useFriends();
      currentUser = useCurrentUser();
      currentUserObj = users.find((userObj) => userObj.id === currentUser);
      chatWindowIsOpen = true;
      render();
    });
};

// modal stuff
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
  <button class="button" id="addFriendModalAddButton"><i class="fas fa-user-friends"></i> Add as Friend</button>
  <button class="button" id="addFriendModalExitButton"><i class="far fa-window-close"></i></button>
  </dialog>`;
};

eventHub.addEventListener("messagesStateChanged", () => {
  messages = useMessages();
  render();
});

eventHub.addEventListener("friendsStateChanged", () => {
MessagesList()
});


// main render function
const render = () => {
  currentUser = useCurrentUser()
  const matchingFriends = friends.filter(friendObj => {
    return friendObj.userId === currentUser
  })
  
const matchingFriendsAsUsers = matchingFriends.map(matchingFriendObj => {
    return (users.find(userObj => {
        return matchingFriendObj.following === userObj.id
    }))
})

const matchingFriendsUserIdVals = matchingFriendsAsUsers.map(matchingFriendObj => {
  return matchingFriendObj.id
})


  const filteredMessages = messages.filter((messageObj) => {
    return (
      !messageObj.message.startsWith("@") ||
      (messageObj.message.startsWith(`@${currentUserObj.username}`) &&
      matchingFriendsUserIdVals.includes(messageObj.userId)) ||
      messageObj.userId === currentUser
    );
  });

  const sortedMessages = filteredMessages.reverse().slice(0, 9).reverse();
  const messagesListHTML = sortedMessages
    .map((messageObj, currentUserId) => {
      currentUserId = currentUser;
      return MessageHTML(messageObj, currentUserId);
    })
    .join("");

  contentTarget.innerHTML = `<h2 class="featureHeading">Chat Messages:</h2>
  ${messagesListHTML}
`;
};

//event handlers. they just LOVE handling things

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("deleteMessage")) {
    const idOfMessageObjToDelete = parseInt(
      clickEvent.target.id.split("--")[1]
    );
    deleteMessage(idOfMessageObjToDelete);
  }

  if (clickEvent.target.id.startsWith("editMessage--")) {
    const idOfMessageToUpdate = parseInt(
      clickEvent.target.id.split("--")[1]
    )
    eventHub.dispatchEvent(new CustomEvent("editMessageButtonClicked", {
      detail: {
        messageId: idOfMessageToUpdate
      }
    }))
  }
});

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("messageAuthorId")) {
    const messageAuthorUserId = parseInt(clickEvent.target.id.split("--")[1]);
    authorId = messageAuthorUserId;
    if (authorId === currentUser) {
      alert("datsyouuuu");
    } else handleClickFunction();
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

setInterval(() => {
  //start setInterval callback
  if (chatWindowIsOpen === true ) {
    // open if statement
    getMessages()
      .then(getFriends)
      .then(() => {
        friends = useFriends();
        messages = useMessages();
        render();
      });
  } // close if statement
}, 2000); //close callback argument, define interval time and close setInterval arg list)
