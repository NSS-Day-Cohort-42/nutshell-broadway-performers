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
let currentUser; //changed this from invoking useCurrentUser() to just hanging out. seems to work the same?
let users = [];
let messages = [];
let friends = [];
let authorId;

const render = () => {
  const messagesListHTML = messages
    .map((messageObj, currentUserId) => {
      currentUserId = currentUser;
      return MessageHTML(messageObj, currentUserId);
    })
    .join("");

  contentTarget.innerHTML = `${messagesListHTML}
  <dialog id="addFriendModal">
  <form method="dialog">
  <button class="button" id="addFriendModalAddButton">Add as Friend</button>
  <button class="button" id="addFriendModalExitButton">Close</button>
  </form>
  </dialog>`;
};

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

function handleUserInput(returnValue){
    if (returnValue === 'Close' || returnValue === null) {
        console.log('no dice')
    } else if (returnValue === 'Add as Friend') {
        console.log('yes plz')
    }
}

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
    // this baby sees if the current user is already following another user
    const matchingFriendObjectsForCurrentUser = friends.filter((friendObj) => {
      return currentUser === friendObj.userId;
    });
    const idsOfAlreadyFollowing = matchingFriendObjectsForCurrentUser.map(
      (MFO) => {
        return MFO.following;
      }
    );
    if (idsOfAlreadyFollowing.includes(messageAuthorUserId)) {
      alert("WANNA GET BUCK?!!");
    } else {
        const addFriendModal = document.querySelector("#addFriendModal")
        addFriendModal.showModal();
        addFriendModal.addEventListener("click", clickEvent => {
            if (clickEvent.target.id === "addFriendModalAddButton") {
                const newFriend = {
                          userId: currentUser,
                          following: authorId,
                };
                console.log(newFriend)
                saveFriend(newFriend)
            }
        })
    }
  }
});

// eventHub.addEventListener("click", (clickEvent) => {
//   if (clickEvent.target.id === document.querySelector("#addFriendModalAddButton")) {
//     const newFriend = {
//       userId: currentUser,
//       following: authorId,
//     };
//     if (typeof authorId !== "undefined") {
//       console.log(newFriend);
//       debugger;
//     }
//     // saveFriend(newFriend);
//   }
// });
