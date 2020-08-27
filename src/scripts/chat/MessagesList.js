import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { getFriends, useFriends, deleteFriend } from "./FriendsProvider.js";
import { FriendHTML } from "./FriendHTML.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".friendsList");
let currentUser; //changed this from invoking useCurrentUser() to just hanging out. seems to work the same?
let users = [];
let friends = [];

const render = () => {
  const matchingFriends = friends.filter((friendObj) => {
    return friendObj.userId === currentUser;
  });
  const followersAsUsers = matchingFriends.map((matchingFriendObj) => {
    return users.find((userObj) => {
      return matchingFriendObj.following === userObj.id;
    });
  });

  const friendsListHTML = followersAsUsers
    .map((followerAsUserObj) => {
      return FriendHTML(followerAsUserObj, matchingFriends);
    })
    .join("");

  contentTarget.innerHTML = `${friendsListHTML}`;
};

export const FriendsList = () => {
  getUsers()
    .then(getFriends)
    .then(() => {
      users = useUsers();
      friends = useFriends();
      currentUser = useCurrentUser();
      render();
    });
};

eventHub.addEventListener("friendsStateChanged", () => {
  friends = useFriends();
  render();
});

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("deleteFriend")) {
    const idOfFriendObjToDelete = parseInt(clickEvent.target.id.split("--")[1]);
    deleteFriend(idOfFriendObjToDelete);
  }
});
