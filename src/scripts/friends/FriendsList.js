import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { saveFriend, getFriends, useFriends } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".saveFriend");
const currentUser = useCurrentUser();
let users = [];
let friends = [];

const render = () => {
  contentTarget.innerHTML = `<button class="" id="saveFriendButton" value="">Save New Friend</button>`;
};

export const FriendsList = () => {
  getUsers()
    .then(getFriends)
    .then(() => {
      users = useUsers();
      friends = useFriends();
      console.log(users);
      console.log(friends);
      //   render();
    });
};
