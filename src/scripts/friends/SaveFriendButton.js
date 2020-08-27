import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".saveFriend");
const currentUser = useCurrentUser();
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
    users = useUsers();
    const friendName = document.querySelector("#newFriendEntry").value;
    const matchingFriend = users.find((userObj) => {
      return userObj.username === friendName;
    });
    const newFriendObj = {
      userId: currentUser,
      following: matchingFriend.id,
    };
    debugger;
  }
});
