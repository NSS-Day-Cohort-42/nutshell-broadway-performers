import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { saveFriend, useFriends, getFriends } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".saveFriend");
let currentUser;
let users = [];
let friends = [];
let currentFriendsIds = [];

const render = () => {
  contentTarget.innerHTML = `<button class="" id="saveFriendButton" value="">Save New Friend</button>`;
};

export const SaveFriendButton = () => {
  getUsers()
    .then(useUsers)
    .then(getFriends)
    .then(() => {
      users = useUsers();
      friends = useFriends();
      render();
    });
};

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveFriendButton") {
    friends = useFriends();
    currentUser = useCurrentUser();
    users = useUsers();
    currentFriendsIds = (friends.filter(friendObj => {
      return friendObj.userId === currentUser
    })).map(friendObj => {
      return friendObj.following
    })
    const friendName = document.querySelector("#newFriendEntry").value;
    const matchingFriend = users.find((userObj) => {
      return userObj.username === friendName;
    });
    if (!currentFriendsIds.includes(matchingFriend.id)) {
      const newFriendObj = {
        userId: currentUser,
        following: matchingFriend.id,
      };
      saveFriend(newFriendObj);
    } else alert("already friends!")
  }
});
