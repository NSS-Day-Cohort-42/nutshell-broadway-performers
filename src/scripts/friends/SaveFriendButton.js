import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { saveFriend } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".saveFriend");
let currentUser;
let users = [];

const render = () => {
  contentTarget.innerHTML = `<button class="" id="saveFriendButton" value="">Save New Friend</button>`;
};

export const SaveFriendButton = () => {
  getUsers()
    .then(useUsers)
    .then(() => {
      users = useUsers();
      render();
    });
};

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveFriendButton") {
    currentUser = useCurrentUser();
    users = useUsers();
    const friendName = document.querySelector("#newFriendEntry").value;
    const matchingFriend = users.find((userObj) => {
      return userObj.username === friendName;
    });
    const newFriendObj = {
      userId: currentUser,
      following: matchingFriend.id,
    };

    saveFriend(newFriendObj);
  }
});
