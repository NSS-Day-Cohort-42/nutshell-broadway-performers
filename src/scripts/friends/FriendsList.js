import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { getFriends, useFriends } from "./FriendsProvider.js";
import { FriendHTML } from "./FriendHTML.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".friendsList");
const currentUser = useCurrentUser();
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
      return FriendHTML(followerAsUserObj);
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

      render();
    });
};

eventHub.addEventListener("friendsStateChanged", () => {
  friends = useFriends();
  render();
});
